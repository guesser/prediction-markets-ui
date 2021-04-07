
import { faPlug, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { useConnection, useConnectionConfig } from '../utils/connection.helper';
import { useWallet } from '../utils/wallet.utils';
export default function WalletConnect() {
  const [balance, setBalance] = useState<number>(0)
  const [loadingBalance, setLoading] = useState<boolean>(false)
  const { connected, wallet, select, connect, disconnect } = useWallet();
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || '';
  const connection = useConnection()
  const {
    endpoint,
    endpointInfo,
  } = useConnectionConfig();
  useEffect(() => {
    if (connected) {
      setLoading(true)
      let pk = wallet?.publicKey
      connection.getBalance(pk as PublicKey).then(res => {
        let rounded = Math.round(res / Math.pow(10, 6)) / 1000
        setBalance(rounded)
      }).finally(() => setLoading(false))
    }
    else setBalance(0)
  }, [connected])

  //renders 
  const renderInfoConnection = () => {
    return <div className="flex items-center">
      { loadingBalance ? <FontAwesomeIcon spin icon={faSpinner} /> : <div className="flex items-center mx-2"><span>{balance}</span><span className="ml-1 text-primary font-bold">SOL</span></div> }
      <div className="mx-2 uppercase text-secondary font-bold">{endpointInfo?.name}</div>
    </div>
  }
  return (
    <div className="flex items-center">
      { connected && renderInfoConnection()}
      <button className="px-2 py-1 border border-primary rounded text-primary hover:border-opposite hover:text-default" onClick={connected ? disconnect : connect}>
        {connected ? 'Disconnect' : 'Connect'}
        <FontAwesomeIcon className="ml-2" icon={faPlug} />
      </button>
    </div>
  );
}