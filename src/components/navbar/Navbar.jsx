import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logoImage from '../../assets/images/lightImage.png';
import { Box, Modal, Typography } from '@mui/material';
import { IDKitWidget, useIDKit } from '@worldcoin/idkit';
import { useAuth0 } from '@auth0/auth0-react';
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/ethers5/react';

const Navbar = ({ type }) => {
  const { dispatch } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const { open } = useWeb3Modal();
  const { selectedNetworkId } = useWeb3ModalState();
  const { loginWithRedirect } = useAuth0();
  // const { open, setOpen } = useIDKit();

  const dynamicConnected =
    localStorage.getItem('dynamic_authenticated_user') &&
    JSON.parse(localStorage.getItem('dynamic_authenticated_user')).email;

  const lensConnected =
    JSON.parse(localStorage.getItem('user')) &&
    JSON.parse(localStorage.getItem('user')).email;

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    dispatch({ type: 'LOGOUT' });
  };

  const connectWallet = () => {
    open();
  };

  const handleClose = () => {
    setOpenModal(false);
    dispatch({ type: 'LOGIN_START' });
    dispatch({
      type: 'LOGIN_SUCCESS',
      name: dynamicConnected,
      loginWith: 'Dynamic',
    });
  };

  const connectWithLensProtocol = () => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: 'lensprotocol',
        email: 'dev@gmail.com',
      })
    );
  };

  useEffect(() => {
    const networkId = localStorage.getItem('selectedNetworkId');
    if (!networkId && selectedNetworkId) {
      localStorage.setItem('selectedNetworkId', selectedNetworkId);
    }
  }, []);

  useEffect(() => {
    if (selectedNetworkId) {
      localStorage.setItem('selectedNetworkId', selectedNetworkId);
    }
  }, [selectedNetworkId]);

  return (
    <>
      <div className={type !== 'list' ? 'navbar' : 'navbar-list'}>
        <div className="navContainer">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <img src={logoImage} alt="TripBloc Logo" className="logo" />
          </Link>
          <div className="navItems">
            {!!dynamicConnected || lensConnected ? (
              <>
                <button
                  className="navButton-connectWallet"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
                <span>{dynamicConnected || lensConnected}</span>
                <button className="navButton" onClick={handleLogout}>
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  className="navButton"
                  onClick={() => setOpenModal(true)}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal open={openModal} onClick={handleClose} className="modal">
        <Box className="box-style">
          <Box className="box-flex">
            {/* <IDKitWidget
                app_id="wid_staging_9f3a190dcfd6bcd9a27f6f88bc31793e"
                action="vote_1"
                signal="user_value"
                onSuccess={() => console.log('success')}
                credential_types={['phone']}
                enableTelemetry
              >
                {({ open }) => ( */}
            <Box
              className="box-inside-flex"
              onClick={() => loginWithRedirect()}
            >
              <img
                src="https://worldcoin.org/icons/logo-small.svg"
                loading="lazy"
                alt="World Coin"
              />
              <Typography variant="caption" component="h6">
                Connect with your World Coin
              </Typography>
            </Box>
            {/* )}
              </IDKitWidget> */}
          </Box>
          <Box className="box-flex">
            <Box className="box-inside-flex" onClick={connectWithLensProtocol}>
              <img
                src="https://raw.githubusercontent.com/lens-protocol/brand-kit/074e865b5da4b2b80133915b15e82f9ba1f02881/01%20Logo/SVG/Icon-Black.svg"
                loading="lazy"
                alt="Lens Protocol"
              />
              <Typography variant="caption" component="h6">
                Connect with Lens Protocol
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
