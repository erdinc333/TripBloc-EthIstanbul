import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import CryptoList from '../../components/cryptoList/CryptoList';

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <CryptoList />
      <MailList />
      <Footer />
    </>
  );
};

export default Home;
