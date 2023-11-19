import { createEncoder } from '@waku/sdk';
import protobuf from 'protobufjs';
import React, { useState } from 'react';

const WakuUI = ({ waku, messages }) => {
  const [inputMessage, setInputMessage] = useState('');
  const ContentTopic = `/js-waku-examples/1/chat/proto`;
  const Encoder = createEncoder({ contentTopic: ContentTopic });

  const SimpleChatMessage = new protobuf.Type('SimpleChatMessage')
    .add(new protobuf.Field('timestamp', 1, 'uint32'))
    .add(new protobuf.Field('text', 2, 'string'));

  const sendMessage = async (message) => {
    try {
      if (!waku) return;

      const protoMsg = SimpleChatMessage.create({
        timestamp: Date.now(),
        text: message,
      });
      const payload = SimpleChatMessage?.encode(protoMsg)?.finish();
      let value = await waku.lightPush.send(Encoder, { payload });
    } catch (e) {
      console.log('Send Custom Message');
    }
  };

  const handleSubmit = () => {
    sendMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <>
      <div className="chat-interface">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button onClick={handleSubmit}>Send Waku Message</button>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.text}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WakuUI;
