import { ChatUIProvider, ChatView } from '@pushprotocol/uiweb';
import React from 'react';

const PushUI = ({ chatId }) => {
  return (
    <>
      <div style={{ height: '75vh', margin: '20px auto' }}>
        <ChatUIProvider env="staging">
          <ChatView
            chatId={chatId}
            limit={10}
            isConnected={true}
            autoConnect={false}
          />
        </ChatUIProvider>
      </div>
    </>
  );
};

export default PushUI;
