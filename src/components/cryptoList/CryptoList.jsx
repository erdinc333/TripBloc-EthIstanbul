import './cryptoList.css';

const CryptoList = () => {
  const cryptos = [
    {
      name: 'Polygon zkEVM',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2F536ub%2Fimages%2FWhite%20on%20Gradient%20Square.png',
    },
    {
      name: 'zksync',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Fy24y0%2Flogo%2F1682968553958_icon_zkSync_Era_round.svg',
    },
    {
      name: 'Scroll',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Fyip67%2Fimages%2F5122.png',
    },
    {
      name: 'Arbitrum',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Fspp1v%2Fimages%2Farbitrum-shield-1.1-aspect-ratio.png',
    },
    {
      name: 'Chiliz',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Fpj01t%2Flogo%2F1696872425081_IIZuBkNS_400x400.jpg',
    },
    {
      name: 'Base',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Fh5ps8%2Flogo%2F1678294488367_W-9qsu1e_400x400.jpeg',
    },
    {
      name: 'Celo',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Finotq%2Flogo%2F1678316332198_InjXBNx9_400x400.jpeg',
    },
    {
      name: 'Neon',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2F0p5er%2Fimages%2F%D0%BB%D0%BE%D0%B3%D0%BE.png',
    },
    {
      name: 'Mantle',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Fjzpj5%2Flogo%2F1677013312206_Screen%20Shot%202023-02-21%20at%204.01.34%20PM.png',
    },
    {
      name: 'Linea',
      logo: 'https://icons.llamao.fi/icons/chains/rsz_linea.jpg',
    },
    {
      name: 'WorldCoin',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2F3zpxc%2Fimages%2Fapple-touch-icon%20(1).png',
    },
    {
      name: 'Lens Protocol',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Fvxwti%2Flogo%2F1678645512720_Screen%20Shot%202023-03-12%20at%2011.25.01%20AM.png',
    },
    {
      name: 'Unlimit',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Fbiwnb%2Flogo%2F1686058413399_nDmyygdt_400x400.jpeg',
    },
    {
      name: 'UMA',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Ffp1x1%2Flogo%2F1664750381528_uma.jpeg',
    },
    {
      name: 'API3',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Faa2tg%2Flogo%2F1697461420212_api3twitter.jpeg',
    },
    {
      name: 'Push Protocol',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2F10a1v%2Flogo%2F1664802172170_aiOxYOJI_400x400.jpeg',
    },
    {
      name: 'Waku Protocol',
      logo: 'https://storage.googleapis.com/ethglobal-api-production/organizations%2Fpyhsm%2Flogo%2F1697648764524_waku%20logo.jpeg',
    },
  ];
  return (
    <div className="crypto">
      <h1 className="cryptoTitle">Sponsor's</h1>
      <span className="cryptoDesc">
        Easily Pay for your bookings using your favourite cryptocurrencies
      </span>
      <div className="crypto-logos">
        {cryptos.map((crypto) => (
          <div key={crypto.name} className="crypto-logo">
            <img src={crypto.logo} alt={crypto.name} title={crypto.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoList;
