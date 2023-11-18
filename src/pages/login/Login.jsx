import React, { useRef, useState } from 'react';
import { GateFiDisplayModeEnum, GateFiSDK } from '@gatefi/js-sdk';
import './login.css';

const Login = () => {
  const [showIframe, setShowIframe] = useState(false);
  const embedInstanceSDK = useRef(null);

  const generateRandomHex = (size) => {
    let result = '';
    for (let i = 0; i < size; i++) {
      result += Math.floor(Math.random() * 16).toString(16);
    }
    return result;
  };

  const createEmbedSdkInstance = () => {
    const randomString = generateRandomHex(64);

    embedInstanceSDK.current =
      typeof document !== 'undefined' &&
      new GateFiSDK({
        merchantId: '9e34f479-b43a-4372-8bdf-90689e16cd5b',
        displayMode: GateFiDisplayModeEnum.Embedded,
        nodeSelector: '#embed-button',
        isSandbox: true,
        walletAddress: '0xe8A9c115d575586FC42fD2d046FB7535e06E7c5F',
        email: 'agujarati.010@gmail.com',
        externalId: randomString,
        defaultFiat: {
          currency: 'USD',
          amount: '20.51',
        },
        defaultCrypto: {
          currency: 'ETH',
        },
      });
  };

  const handleOnClickEmbed = () => {
    if (showIframe) {
      embedInstanceSDK.current?.hide();
      setShowIframe(false);
    } else {
      if (!embedInstanceSDK.current) {
        createEmbedSdkInstance();
      }
      embedInstanceSDK.current?.show();
      setShowIframe(true);
    }
  };

  const handleCloseEmbed = () => {
    embedInstanceSDK.current?.destroy();
    embedInstanceSDK.current = null;
    setShowIframe(false);
  };

  return (
    <>
      <div className="hackathon-login-container">
        <div className="hackathon-login-box">
          <button onClick={handleOnClickEmbed}>Embed</button>
          <div id="embed-button"></div>
        </div>
      </div>
      {showIframe && (
        <button
          onClick={handleCloseEmbed}
          style={{
            position: 'absolute',
            right: '113px',
            transform: 'none',
            top: '10px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '5px 15px',
            cursor: 'pointer',
            zIndex: 2000,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          Close
        </button>
      )}
    </>
  );
};

export default Login;
