import { createEncoder } from '@waku/sdk';
import protobuf from 'protobufjs';
import React from 'react';

const WakuUI = ({ waku, messages }) => {
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
      let value = await waku.relay.send(Encoder, { payload });
      console.log('Message sent', value);
    } catch (e) {
      console.log('Send Custom Message');
    }
  };
  
  return (
    <>
      <div className="chat-interface">
        <button onClick={() => sendMessage('Hello from Waku!')}>
          Send Waku Message
        </button>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.payloadAsUtf8}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WakuUI;
