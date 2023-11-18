import './hotel.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import mockHotels from '../../context/mockHotels';
import { GateFiDisplayModeEnum, GateFiSDK } from '@gatefi/js-sdk';
import toast from 'react-hot-toast';
import { isApproved, sendProposal } from '../../backendConnectors/integration';
import { useWeb3ModalSigner } from '@web3modal/ethers5/react';
import { Box, Modal, Typography } from '@mui/material';
import { createChat } from '../../backendConnectors/push/push2';
import protobuf from 'protobufjs';
import {
  createRelayNode,
  createDecoder,
  waitForRemotePeer,
} from '@waku/sdk';
import PushUI from './pushUI';
import WakuUI from './wakuUI';
import { eas } from '../../backendConnectors/EAS';
const Hotel = () => {
  const ContentTopic = `/js-waku-examples/1/chat/proto`;
  const Decoder = createDecoder(ContentTopic);

  const SimpleChatMessage = new protobuf.Type('SimpleChatMessage')
    .add(new protobuf.Field('timestamp', 1, 'uint32'))
    .add(new protobuf.Field('text', 2, 'string'));
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [status, setStatus] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const embedInstanceSDK = useRef(null);
  const [chatId, setChatId] = useState(null);
  const [waku, setWaku] = useState(undefined);
  const [messages, setMessages] = useState([]);

  const { loading } = useFetch(`/hotels/find/${id}`);
  const user =
    JSON.parse(localStorage.getItem('user')) &&
    JSON.parse(localStorage.getItem('user')).email;
  const { signer } = useWeb3ModalSigner();

  const days = 28;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    const totalImages = mockHotels[0].photos.length;

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? totalImages - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === totalImages - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = async () => {
    if (!user) {
      toast('Please Login !!!', {
        icon: '👨‍💻',
      });
    } else {
      sendProposal(signer);
    }
  };

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

  const checkApproval = async () => {
    try {
      let value = await isApproved();
      setStatus(value);
    } catch (error) {
      console.error('Error in isApproved:', error);
      return null;
    }
  };

  const getButtonStatusText = () => {
    switch (status) {
      case 0:
        return 'Pending Confirmation';
      case 1:
        return 'Confirm Booked';
      case 2:
        return 'Book Now';
      default:
        return 'Book Now';
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChat = async () => {
    const getChatID = await createChat(signer);
    setChatId(getChatID?.chatId);
  };

  const handleWakuSelect = async () => {
    await initializeWaku();
    setOpenModal(false);
  };

  async function initializeWaku() {
    if (waku) return;

    const wakuNode = await createRelayNode({ defaultBootstrap: true });
    await wakuNode.start();
    await waitForRemotePeer(wakuNode, ['relay']);

    wakuNode.relay.subscribe(Decoder, (wakuMessage) => {
      if (!wakuMessage.payload) return;
      const decodedMessage = SimpleChatMessage.decode(wakuMessage.payload);
      setMessages((prevMessages) => [
        {
          text: decodedMessage.text,
          timestamp: new Date(decodedMessage.timestamp),
        },
        ...prevMessages,
      ]);
    });

    setWaku(wakuNode);
  }

  useEffect(() => {
    checkApproval();
  }, []);


  async function temp(){
    console.log("working")
    await eas(signer);
  }

  return (
    <>
      {(!chatId || !waku) && (
        <>
          <Navbar type="list" />
          <Header type="list" />
          {loading ? (
            'loading'
          ) : (
            <div className="hotelContainer">
              {open && (
                <div className="slider">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="close"
                    onClick={() => setOpen(false)}
                  />
                  <FontAwesomeIcon
                    icon={faCircleArrowLeft}
                    className="arrow"
                    onClick={() => handleMove('l')}
                  />
                  <div className="sliderWrapper">
                    <img
                      src={mockHotels[0].photos[slideNumber]}
                      alt={`Slide ${slideNumber}`}
                      className="sliderImg"
                    />
                  </div>
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="arrow"
                    onClick={() => handleMove('r')}
                  />
                </div>
              )}
              <div
                id="embed-button"
                style={{ position: 'absolute', left: '37%', zIndex: '1' }}
              />
              {showIframe && (
                <button
                  onClick={handleCloseEmbed}
                  style={{
                    position: 'absolute',
                    right: '25%',
                    transform: 'none',
                    top: '15%',
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
              <div className={`hotelWrapper ${showIframe ? 'blurCSS' : null}`}>
                <button className="bookNow" onClick={handleOnClickEmbed}>
                  Buy via Unlimit Crypto
                </button>
                <h1 className="hotelTitle">{mockHotels[0].name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{mockHotels[0].address}</span>
                </div>
                <span className="hotelDistance">
                  Excellent location – {mockHotels[0].distance}m from center
                </span>
                <span className="hotelPriceHighlight">
                  Book a stay over ${mockHotels[0].cheapestPrice} at this
                  property and get a free airport taxi
                </span>
                <div className="hotelImages">
                  {mockHotels[0].photos?.map((photo, i) => (
                    <div className="hotelImgWrapper" key={i}>
                      <img
                        onClick={() => handleOpen(i)}
                        src={photo}
                        alt="Hotel Images"
                        className="hotelImg"
                      />
                    </div>
                  ))}
                </div>
                <div className="hotelDetails">
                  <div className="hotelDetailsTexts">
                    <h1 className="hotelTitle">{mockHotels[0].title}</h1>
                    <p className="hotelDesc">{mockHotels[0].description}</p>
                  </div>
                  <div className="hotelDetailsPrice">
                    <h1>Perfect for a {days}-night stay!</h1>
                    <span>
                      Located in the real heart of Krakow, this property has an
                      excellent location score of 9.8!
                    </span>
                    <h2>
                      <b>${days * mockHotels[0].cheapestPrice}</b> ({days}{' '}
                      nights)
                    </h2>
                    <button onClick={handleClick}>
                      {getButtonStatusText()}
                    </button>
                    <button
                      disabled={!!!signer}
                      onClick={temp}
                    >
                      Communicationssssssss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Modal open={openModal} onClick={handleClose} className="modal">
            <Box className="box-style">
              <Box className="box-flex">
                <Box className="box-inside-flex" onClick={handleChat}>
                  <img
                    src="https://push.org/assets/docs/PushLogoTextDark.svg"
                    loading="lazy"
                    alt="Push Protocol"
                  />
                  <Typography variant="caption" component="h6">
                    Communicate with Push Protocol
                  </Typography>
                </Box>
              </Box>
              <Box className="box-flex">
                <Box className="box-inside-flex" onClick={handleWakuSelect}>
                  <img
                    src="https://waku.org/theme/image/logo.svg"
                    loading="lazy"
                    alt="Waku Protocol"
                  />
                  <Typography variant="caption" component="h6">
                    Communicate with Waku Protocol
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Modal>
        </>
      )}
      {waku && <WakuUI waku={waku} messages={messages} />}
      {chatId && <PushUI chatId={chatId} />}
    </>
  );
};

export default Hotel;
