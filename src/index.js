import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { SearchContextProvider } from './context/SearchContext';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';

const projectId = 'a6c1b0f365aaef1f0617e77730208a3e';

const metadata = {
  name: 'TripBloc',
  description: 'TripBloc description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/'],
};

const zksync = {
  chainId: 280,
  name: 'zksync',
  currency: 'MNT',
  rpcUrl: 'https://zksync-era-testnet.blockpi.network/v1/rpc/public',
};
const polygonZkEvm = {
  chainId: 1442,
  name: 'Polygon zkEVM',
  currency: 'ETH',
  rpcUrl: 'https://rpc.public.zkevm-test.net',
};
const scroll = {
  chainId: 534351,
  name: 'Scroll Sepolia Testnet',
  currency: 'ETH',
  rpcUrl: 'https://scroll-sepolia.blockpi.network/v1/rpc/public',
};
const Arbitrum = {
  chainId: 421613,
  name: 'Arbitrum Goerli Testnet',
  currency: 'ETH',
  rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
};
const Chiliz = {
  chainId: 88882,
  name: 'Chiliz Scoville Testnet',
  currency: 'CHZ',
  rpcUrl: 'https://chiliz-spicy.publicnode.com',
};
const Base = {
  chainId: 84531,
  name: 'Base Goerli Testnet',
  currency: 'ETH',
  rpcUrl: 'https://base-goerli.diamondswap.org/rpc',
};
const celo = {
  chainId: 44787,
  name: 'Celo Alfajores Testnet',
  currency: 'CELO',
  rpcUrl: 'https://alfajores-forno.celo-testnet.org',
};
const NeonEVM = {
  chainId: 245022926,
  name: 'Neon EVM DevNet',
  currency: 'NEON',
  rpcUrl: 'https://proxy.devnet.neonlabs.org/solana',
};
const Mantle = {
  chainId: 5001,
  name: 'Mantle Testnet',
  currency: 'MNT',
  rpcUrl: 'https://rpc.testnet.mantle.xyz',
};
const linea = {
  chainId: 59140,
  name: 'Linea Testnet',
  currency: 'ETH',
  rpcUrl: 'https://rpc.goerli.linea.build',
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [
    zksync,
    polygonZkEvm,
    scroll,
    Arbitrum,
    Chiliz,
    Base,
    celo,
    NeonEVM,
    Mantle,
    linea,
  ], //near, cartesi
  projectId,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </>
);
