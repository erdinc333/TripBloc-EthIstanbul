import { ethers } from 'ethers';
import abi from './abi.json';
import jsonData from './data.json';
import api3Abi from './datafeedabi.json';

async function commonFunction() {
  try {
    const selectedNetwork = localStorage.getItem('selectedNetworkId');
    if (!selectedNetwork) {
      console.error('No selected network ID found in localStorage');
      return null;
    }
    if (!jsonData[selectedNetwork]) {
      console.error(`No data found for network ID: ${selectedNetwork}`);
      return null;
    }
    return jsonData[selectedNetwork];
  } catch (error) {
    console.error('Error in commonFunction:', error);
    return null;
  }
}

//helpers
export async function getAddress() {
  const desiredChainID = await commonFunction();
  return desiredChainID?.address;
}

export async function getRPC() {
  const desiredChainID = await commonFunction();
  return desiredChainID?.rpcUrl;
}

//read
export async function hotelOwnerAddress() {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.public.zkevm-test.net'
  );
  const contract = new ethers.Contract(
    '0xc9C214a1BA1c266e632C3274B2c2d33422f3963b',
    abi,
    provider
  );
  let value = await contract.hotels(1);
  let bool = ethers.utils.isAddress(value[1]);
  let address;
  if (!bool) {
    address = await provider.resolveName(value[1]);
  } else {
    address = value[1];
  }
  return address;
}

export async function nextIDAuth(devAuth) {
  try {
    const provider = ethers.getDefaultProvider();
    let address = await provider.resolveName(devAuth);
    return address;
  } catch (e) {
    console.log('Valid Mask Authentication Failed', e);
  }
}

export async function isApproved() {
  try {
    let contractAddress = await getAddress();
    const rpc = await getRPC();
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    let value = await contract.getProposalInfo(1, 0);
    return value?.status;
  } catch (e) {
    console.log(e);
    return 2;
  }
}
export async function roomPrice() {
  try {
    let contractAddress = await getAddress();
    console.log('contractAddress', contractAddress);
    const rpc = await getRPC();
    const provider = new ethers.providers.JsonRpcProvider(rpc);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    let value = await contract.hotels(1);
    return value[3];
  } catch (e) {
    console.log(e);
    return '17999999999999998';
  }
}

const handleWeb3Inbox = async () => {
  const response = await fetch(
    'https://notify.walletconnect.com/fb989323951b178ce95251fbb3c62192/notify',
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer d5a162fd-7f01-4282-9f13-d975b2619f87',
      },
      body: JSON.stringify({
        notification: {
          type: '2ee309f6-17f8-4e21-b947-b0c89070cac6',
          title: 'Notification Title',
          body: 'Notification body',
        },
        accounts: ['eip155:1442:0xEF4f36c338a9518F5bb7519b90a97ef297657e73'],
      }),
    }
  );
  console.log('response', response);
  return response;
};

//action
export async function sendProposal(signer) {
  let contractAddress = await getAddress();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  let tx = await contract.sendProposal(1, 1, '100', {
    value: '100',
  });
  handleWeb3Inbox();
}
export async function acceptProposal(signer) {
  let contractAddress = await getAddress();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  let tx = await contract.acceptProposal(1, 0);
}

export async function rejectProposal(signer) {
  let contractAddress = await getAddress();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  let tx = await contract.rejectProposal(1, 0);
}

//api3
export async function fetchDataFeed() {
  const provider = new ethers.providers.JsonRpcProvider(
    'https://rpc.public.zkevm-test.net'
  );
  const contract = new ethers.Contract(
    '0xc9C214a1BA1c266e632C3274B2c2d33422f3963b',
    api3Abi,
    provider
  );
  let data = await contract.readDataFeed();
  return data[0];
}
