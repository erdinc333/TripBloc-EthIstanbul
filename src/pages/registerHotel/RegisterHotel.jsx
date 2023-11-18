import React from 'react';
import './regiterHotel.css';

const RegisterHotel = () => {
  return (
    <div className="registration-container">
      <div className="registration-box">
        <h1 className="title">Hotel Admin Panel</h1>
          <button className="register-btn">
            Accept Proposal
          </button>
          <button className="register-btn">
            Reject Proposal
          </button>
          <button className="register-btn">
            Push Chat
          </button>
          <button className="register-btn">
            Waku Chat
          </button>
      </div>
    </div>
  );
};

export default RegisterHotel;