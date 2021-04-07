 const getOpacityColors = (color, opacityVariable, opacityValue) => {
  if (opacityValue !== undefined) {
    return `rgba(${color}, ${opacityValue})`
  }
  if (opacityVariable !== undefined) {
    return `rgba(${color}, var(${opacityVariable}, 1))`
  }
  return `rgb(${color})`
}
module.exports = {
  theme: {
    purge: [],
    darkMode: 'media',
    extend: {
      opacity: {
        15: '0.15',
      },
    },
    screens: {
      xs: '410px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      'full-hd': '1920px',
      '2k': '2048px',
      '4k': '3840px',
    },
    colors: {
      black: '#222222',
      white: '#FFFFFF',
      sky: {
        DEFAULT: ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-sky)',
            opacityVariable,
            opacityValue
          )
        },
      },
      mustard: {
        light: ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-mustard-light)',
            opacityVariable,
            opacityValue
          )
        },
        DEFAULT: ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-mustard-default)',
            opacityVariable,
            opacityValue
          )
        },
      },
      green: {
        DEFAULT: ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-green)',
            opacityVariable,
            opacityValue
          )
        },
      },
      red: {
        DEFAULT: ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-red)',
            opacityVariable,
            opacityValue
          )
        },
      },
      primary: {
        'depth-1': ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-primary-depth-1)',
            opacityVariable,
            opacityValue
          )
        },
        DEFAULT: ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-primary)',
            opacityVariable,
            opacityValue
          )
        },
      },
      secondary: {
        DEFAULT: ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-secondary)',
            opacityVariable,
            opacityValue
          )
        },
      }
    },
    fontSize: {
      sm: '12px',
      DEFAULT: '16px',
      md: '20px',
      lg: '24px',
      xl: '36px',
      '2xl': '46px',
      '3xl': '64px',
    },
    stroke: (theme) => ({
      ...theme('colors'),
      current: 'currentColor',
    }),
    backgroundColor: (theme) => ({
      ...theme('colors'),
      default: ({ opacityVariable, opacityValue }) => {
        return getOpacityColors(
          'var(--color-bg-default)',
          opacityVariable,
          opacityValue
        )
      },
      opposite: ({ opacityVariable, opacityValue }) => {
        return getOpacityColors(
          'var(--color-opposite)',
          opacityVariable,
          opacityValue
        )
      },
      depth: {
        1: ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-bg-depth-1)',
            opacityVariable,
            opacityValue
          )
        },
        2: ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-bg-depth-2)',
            opacityVariable,
            opacityValue
          )
        },
        3: ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-bg-depth-3)',
            opacityVariable,
            opacityValue
          )
        },
      },
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      default: ({ opacityVariable, opacityValue }) => {
        return getOpacityColors(
          'var(--color-text-default)',
          opacityVariable,
          opacityValue
        )
      },
      opposite: ({ opacityVariable, opacityValue }) => {
        return getOpacityColors(
          'var(--color-opposite)',
          opacityVariable,
          opacityValue
        )
      },
      depth: {
        1: ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-text-depth-1)',
            opacityVariable,
            opacityValue
          )
        },
      },
    }),
    fontFamily: {
      display: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      body: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
    },
    borderColor: (theme) => ({
      ...theme('colors'),
      default: ({ opacityVariable, opacityValue }) => {
        return getOpacityColors(
          'var(--color-bg-default)',
          opacityVariable,
          opacityValue
        )
      },
      depth: {
        1: ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-bg-depth-1)',
            opacityVariable,
            opacityValue
          )
        },
        2: ({ opacityVariable, opacityValue }) => {
          return getOpacityColors(
            'var(--color-bg-depth-2)',
            opacityVariable,
            opacityValue
          )
        }
      },
      opposite: ({ opacityVariable, opacityValue }) => {
        return getOpacityColors(
          'var(--color-opposite)',
          opacityVariable,
          opacityValue
        )
      },
    }),
    transitionProperty: (theme) => ({
      ...theme,
      width: 'width',
      height: 'height',
    }),
    borderRadius: {
      none: 0,
      DEFAULT: '5px',
      md: '10px',
      lg: '15px',
      xl: '20px',
      '2xl': '30px',
      full: '9999px',
    },
  },
  variants: {
    opacity: ['disabled'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    backgroundOpacity: ['dark'],
    borderColor: ['responsive', 'hover', 'focus', 'active', 'last'],
    textColor: ['responsive', 'hover', 'focus', 'active'],
    padding: ['hover'],
    margin: ['hover'],
    fontWeight: ['hover'],
    container: ['responsive'],
    textAlign: ['first', 'last', 'even', 'odd', 'responsive'],
    borderWidth: ['last', 'focus'],
    scale: ['hover'],
    cursor: ['disabled']
  },
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.html',
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
  corePlugins: {
    float: false,
    container: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: 'var(--container-sm)',
          },
          '@screen md': {
            maxWidth: 'var(--container-md)',
          },
          '@screen lg': {
            maxWidth: 'var(--container-lg)',
          },
          '@screen xl': {
            maxWidth: 'var(--container-xl)',
          },
          '@screen 2xl': {
            maxWidth: 'var(--container-2xl)',
          },
          '@screen full-hd': {
            maxWidth: 'var(--container-full-hd)',
          },
          '@screen 2k': {
            maxWidth: 'var(--container-2k)',
          },
          '@screen 4k': {
            maxWidth: 'var(--container-4k)',
          },
        },
      })
    },
  ],
}
