import { useEffect, useReducer } from 'react';

import assert from 'assert';

const pageLoadTime = new Date();

const globalCache = new Map();

class FetchLoopListener {

  constructor(
    cacheKey,
    fn,
    refreshInterval,
    refreshIntervalOnError,
    callback,
    cacheNullValues
  ) {
    this.cacheKey = cacheKey;
    this.fn = fn;
    this.refreshInterval = refreshInterval;
    this.refreshIntervalOnError = refreshIntervalOnError;
    this.callback = callback;
    this.cacheNullValues = cacheNullValues;
  }
}

class FetchLoopInternal {

  constructor(cacheKey, fn, cacheNullValues) {
    this.cacheKey = cacheKey;
    this.fn = fn;
    this.timeoutId = null;
    this.listeners = new Set();
    this.errors = 0;
    this.cacheNullValues = cacheNullValues;
  }

  get refreshInterval() {
    return Math.min(
      ...[...this.listeners].map((listener) => listener.refreshInterval),
    );
  }

  get refreshIntervalOnError() {
    const refreshIntervalsOnError = [...this.listeners]
      .map((listener) => listener.refreshIntervalOnError)
      .filter((x) => x !== null);
    if (refreshIntervalsOnError.length === 0) {
      return null;
    }
    return Math.min(...refreshIntervalsOnError);
  }

  get stopped() {
    return this.listeners.size === 0;
  }

  addListener(listener) {
    const previousRefreshInterval = this.refreshInterval;
    this.listeners.add(listener);
    if (this.refreshInterval < previousRefreshInterval) {
      this.refresh();
    }
  }

  removeListener(listener) {
    assert(this.listeners.delete(listener));
    if (this.stopped) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener.callback());
  }

  refresh = async () => {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.stopped) {
      return;
    }

    let errored = false;
    try {
      const data = await this.fn();
      if (!this.cacheNullValues && data === null) {
        console.log(`Not caching null value for ${this.cacheKey}`);
        // cached data has not changed so no need to re-render
        this.errors = 0;
        return data;
      } else {
        globalCache.set(this.cacheKey, data);
        this.errors = 0;
        this.notifyListeners();
        return data;
      }
    } catch (error) {
      ++this.errors;
      console.warn(error);
      errored = true;
    } finally {
      if (!this.timeoutId && !this.stopped) {
        let waitTime = this.refreshInterval;
        if (
          errored &&
          this.refreshIntervalOnError &&
          this.refreshIntervalOnError > 0
        ) {
          waitTime = this.refreshIntervalOnError;
        }

        // Back off on errors.
        if (this.errors > 0) {
          waitTime = Math.min(1000 * 2 ** (this.errors - 1), 60000);
        }

        // Don't do any refreshing for the first five seconds, to make way for other things to load.
        const timeSincePageLoad = +new Date() - +pageLoadTime;
        if (timeSincePageLoad < 5000) {
          waitTime += 5000 - timeSincePageLoad / 2;
        }

        // Refresh background pages slowly.
        if (document.visibilityState === 'hidden') {
          waitTime = 60000;
        } else if (!document.hasFocus()) {
          waitTime *= 1.5;
        }

        // Add jitter so we don't send all requests at the same time.
        waitTime *= 0.8 + 0.4 * Math.random();

        this.timeoutId = setTimeout(this.refresh, waitTime);
      }
    }
  };
}

class FetchLoops {
  loops = new Map();

  addListener(listener) {
    if (!this.loops.has(listener.cacheKey)) {
      this.loops.set(
        listener.cacheKey,
        new FetchLoopInternal<T>(
          listener.cacheKey,
          listener.fn,
          listener.cacheNullValues),
      );
    }
    this.loops.get(listener.cacheKey).addListener(listener);
  }

  removeListener(listener) {
    const loop = this.loops.get(listener.cacheKey);
    loop.removeListener(listener);
    if (loop.stopped) {
      this.loops.delete(listener.cacheKey);
      globalCache.delete(listener.cacheKey);
    }
  }

  refresh(cacheKey) {
    if (this.loops.has(cacheKey)) {
      this.loops.get(cacheKey).refresh();
    }
  }

  refreshAll() {
    return Promise.all([...this.loops.values()].map((loop) => loop.refresh()));
  }
}
const globalLoops = new FetchLoops();

export function useAsyncData(
  asyncFn,
  cacheKey,
  { refreshInterval = 60000, refreshIntervalOnError = null } = {},
  cacheNullValues = true,
) {
  const [, rerender] = useReducer((i) => i + 1, 0);

  useEffect(() => {
    if (!cacheKey) {
      return () => {};
    }
    const listener = new FetchLoopListener<T>(
      cacheKey,
      asyncFn,
      refreshInterval,
      refreshIntervalOnError,
      rerender,
      cacheNullValues);
    globalLoops.addListener(listener);
    return () => globalLoops.removeListener(listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey, refreshInterval]);

  if (!cacheKey) {
    return [null, false];
  }

  const loaded = globalCache.has(cacheKey);
  const data = loaded ? globalCache.get(cacheKey) : undefined;
  return [data, loaded];
}

export function refreshCache(cacheKey, clearCache = false) {
  if (clearCache) {
    globalCache.delete(cacheKey);
  }
  const loop = globalLoops.loops.get(cacheKey);
  if (loop) {
    loop.refresh();
    if (clearCache) {
      loop.notifyListeners();
    }
  }
}

export function refreshAllCaches() {
  for (const loop of globalLoops.loops.values()) {
    loop.refresh();
  }
}

export function setCache(
  cacheKey,
  value,
  { initializeOnly = false } = {},
) {
  if (initializeOnly && globalCache.has(cacheKey)) {
    return;
  }
  globalCache.set(cacheKey, value);
  const loop = globalLoops.loops.get(cacheKey);
  if (loop) {
    loop.notifyListeners();
  }
}