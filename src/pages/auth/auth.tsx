import React, { useEffect, useState } from 'react';
import { message, Typography } from 'antd';
import {ISignUpRequest, SignUp} from "./Signup";
import {SignIn} from "./Signin";
import {useSearchParams} from 'react-router-dom'
import "./auth.scss";
import { authService } from '../../services/auth.service';
import { useMutation } from 'react-query';
import { GoogleUrlAction, ILoginRequest, ILoginWithGoogle } from '../../models/interfaces/request/login';
import { useUserContext } from '../../stateContext/root-state-context';

const Auth: React.FC = () => {
  const {setUserState} = useUserContext()
  const [searchParams, SetSearchParams] = useSearchParams();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  useEffect(() => {
    let action = searchParams.get('action')
    if(action === 'signup') setIsRightPanelActive(true);
    else setIsRightPanelActive(false)
  }, [])

  const handleSignUpClick = () => {
    SetSearchParams((prev) => ({'action': 'signup'}))
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    SetSearchParams((prev) => ({'action': 'login'}))

    setIsRightPanelActive(false);
  };

  const loginMutation = useMutation(
    ( payload: ILoginRequest ) =>
      authService.login(payload),
    {
      onSuccess: (x) => {
        setUserState(x);
        message.success("Loged In successfully");
      },
      onError: () => {
        message.error("Failed to login");
      },
    }
  );

  const loginWithGoogleMutation = useMutation((action: GoogleUrlAction) => authService.generateGoogleAuthUrl({action: action}) , {
    onSuccess:(x) => {
      location.href = x.url;
    },
    onError: (x) => {
        message.error("An error occurred while logging in with google")
    }
  })
  const signUp = useMutation((payload: ISignUpRequest) => authService.signUp(payload) , {
    onSuccess:(x) => {
      setUserState(x);
        message.success("Loged In successfully");
    },
    onError: (x) => {
        message.error("An error occurred signup")
    }
  })

  return (
    <div className="auth-page">
      <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container overflow-y-auto bg-white">
          <SignUp signUp={signUp} signUpWithGoogle={loginWithGoogleMutation} />
        </div>
        <div className="form-container sign-in-container">
          <SignIn login={loginMutation} loginWithGoogle={loginWithGoogleMutation} />
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <Typography.Title level={1}>Welcome Back!</Typography.Title>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={handleSignInClick}>
                Sign In
              </button>
            

            </div>
            <div className="overlay-panel overlay-right">
              <Typography.Title level={1}>Hello, Friend!</Typography.Title>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp" onClick={handleSignUpClick}>
                Sign Up
              </button>
              
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>
          Smart Analytics Hub - Your Data Intelligence Platform
        </p>
      </footer>
    </div>
  );

};

export default Auth;