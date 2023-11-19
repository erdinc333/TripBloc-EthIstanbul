import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import * as ethers from 'ethers';

export const sendPushNotification = async (message) => {
  const PK = '84a239ff5b2917efd3feaa57dbfcb3e05be804c91fcbae6cff5f1124811f78c2'; // channel private key
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);
  const userAlice = await PushAPI.initialize(signer, {
    env: CONSTANTS.ENV.STAGING,
  });

  // List inbox notifications
  const inboxNotifications = await userAlice.notification.list('INBOX');
  console.log('inboxNotifications', inboxNotifications);

  // List spam notifications
  const spamNotifications = await userAlice.notification.list('SPAM');
  console.log('spamNotifications', spamNotifications);

  // Push channel address
  const pushChannelAdress = '0xe8A9c115d575586FC42fD2d046FB7535e06E7c5F';

  // Subscribe to push channel
  await userAlice.notification.subscribe(
    `'eip155:5:${pushChannelAdress}` // channel address in CAIP format
  );

  // Send notification, provided userAlice has a channel
  const response = await userAlice.channel.send(['*'], {
    notification: {
      title: message,
      body: message,
    },
  });
  console.log('response', response);

  // To listen to real time notifications
  const stream = await userAlice.initStream([CONSTANTS.STREAM.NOTIF]);

  // Set stream event handling
  stream.on(CONSTANTS.STREAM.NOTIF, (data) => {
    console.log(data);
  });

  // Connect to stream
  stream.connect();
};
