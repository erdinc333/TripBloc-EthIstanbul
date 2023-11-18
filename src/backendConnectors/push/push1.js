import * as PushAPI from '@pushprotocol/restapi';
import * as ethers from 'ethers';

export async function push(status,id) {

  let to = "0x60f94DBa25380610Dc4cBa80eEE249B6F1007E60"
  const PK = '84a239ff5b2917efd3feaa57dbfcb3e05be804c91fcbae6cff5f1124811f78c2'; // channel private key
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);

  if (status === 'book') {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `Booking Request: TripBloc`,
        body: `There is new booking for you hotel, please response`,
      },
      payload: {
        title: `Booking Request: TripBloc`,
        body: `There is new booking for you hotel, please response`,
        cta: '',
        img: '',
      },
      recipients: `eip155:5:${to}`, // recipient address
      channel: 'eip155:5:0xe8A9c115d575586FC42fD2d046FB7535e06E7c5F', // your channel address
      env: 'staging',
    });
  }
  if (status === 'chat') {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `chat request`,
        body: `chat request with ${id} : `,
      },
      payload: {
        title: `chat request`,
        body: `chat request with ${id} : `,
        cta: '',
        img: '',
      },
      recipients: `eip155:5:${to}`, // recipient address
      channel: 'eip155:5:0xe8A9c115d575586FC42fD2d046FB7535e06E7c5F', // your channel address
      env: 'staging',
    });
  }
}
