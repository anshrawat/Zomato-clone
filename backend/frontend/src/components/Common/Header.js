import React,{useState} from 'react';
import '../../Styles/Header.css'
import Modal from 'react-modal'
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root')

export default function Header() {
  const [isLoginModalOpen,setLoginModal]=useState(false)

  const responseFacebook = (response) => {
    console.log(response);
  }

  const responseGoogle = (response) => {
    console.log(response);
  }
  return (
    
      <div className="header">
        <div className="logo">
            <span>e!</span>
        </div>
        <div className="navigation">
            <button className="btn1" onClick={()=>setLoginModal(true)}>Login</button>
            <button className="btn2">Create an account</button>
        </div>
        <Modal isOpen={isLoginModalOpen} style={customStyles}>
          <h2>Login Modal
            <button className='btn btn-danger float-end' onClick={()=>setLoginModal(false)}>X</button>
          </h2>
          <form action="">
            <input type="text" placeholder='enter email'/><br />
            <input type="password" placeholder='enter password' />
            <button>Login</button>
          </form><br />
          <FacebookLogin
             appId="335012472172941"
             cssClass="btnFacebook"
            // autoLoad={true}
             fields="name,email,picture"
            //  onClick={componentClicked}
              callback={()=>responseFacebook} 
          />

          <GoogleLogin
              clientId="633708921037-344nhp6g1nd0qcr3a949qoht66e3r7l3.apps.googleusercontent.com"
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              className="btnGoogle"
            />
        </Modal>
      </div>
  );
}
