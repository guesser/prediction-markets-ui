
import { useWallet } from '../utils/wallet.utils';

export default function WalletConnect() {
  const { connected, wallet, select, connect, disconnect } = useWallet();
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || '';


  return (
    <button className="px-2 py-1 border border-primary rounded text-primary hover:border-opposite hover:text-default" onClick={connected ? disconnect : connect}>
      {connected ? 'Disconnect' : 'Connect'}
    </button>
  );
}