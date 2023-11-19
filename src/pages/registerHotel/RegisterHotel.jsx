import React, { useState } from 'react';
import './regiterHotel.css';
import { ChatUIProvider, ChatView } from '@pushprotocol/uiweb';
import {
  acceptProposal,
  rejectProposal,
} from '../../backendConnectors/integration';
import { useWeb3ModalSigner } from '@web3modal/ethers5/react';

const RegisterHotel = () => {
  const [inputMessage, setInputMessage] = useState('');
  const { signer } = useWeb3ModalSigner();
  const [isPushProtocolConnected, setIsPushProtocolConnected] = useState(false);

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h1 className="title">Hotel Admin Panel</h1>
        <button className="register-btn" onClick={() => acceptProposal(signer)}>
          Accept Proposal
        </button>
        <button className="register-btn" onClick={() => rejectProposal(signer)}>
          Reject Proposal
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={localStorage.getItem('chatID') || 'Enter the ChatID'}
        />
        <button
          className="register-btn"
          onClick={() => setIsPushProtocolConnected(true)}
        >
          Push Chat
        </button>
        <button className="register-btn">Waku Chat</button>
      </div>
      {isPushProtocolConnected && (
        <>
          <ChatUIProvider env="staging">
            <ChatView
              chatId={inputMessage}
              limit={10}
              isConnected={isPushProtocolConnected}
              autoConnect={false}
            />
          </ChatUIProvider>
        </>
      )}
    </div>
  );
};

export default RegisterHotel;
