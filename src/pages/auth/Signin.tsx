// components/SignIn.tsx
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import {  GoogleOutlined } from '@ant-design/icons';
import { UseMutationResult } from 'react-query';
import { GoogleUrlAction, ILoginRequest } from '../../models/interfaces/request/login';
import { IUser } from '../../models/interfaces/Response/user';
import { zodResolver } from '@hookform/resolvers/zod';
import  z from 'zod';

interface SignInFormData {
  email: string;
  password: string;
}

const loginSchema = z.object({
  email: z.string({required_error: 'User Name or Email is required.'}).min(3),
  password: z.string({required_error: 'password field must not be empty.'}).min(8) 
})

interface ISignInProps {
  login: UseMutationResult<IUser, unknown, ILoginRequest, unknown>;
  loginWithGoogle: UseMutationResult<{url: string;}, unknown, GoogleUrlAction, unknown>
}

export const SignIn: React.FC<ISignInProps> = ({login, loginWithGoogle}: ISignInProps) => {
  const { control, handleSubmit } = useForm<SignInFormData>({resolver: zodResolver(loginSchema), reValidateMode: 'onChange', defaultValues: {email: '', password: ''} },);

  const onSubmit = (data: SignInFormData) => {
      login.mutate({userName: data.email, password: data.password})
    // Handle sign in logic here
  };

  const onLoginWithGoogle = () => {
    loginWithGoogle.mutate('login')
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Typography.Title level={1}>Sign in</Typography.Title> 
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } }}
        render={({ field, fieldState }) => (
          <Form.Item validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message}>
            <Input {...field} placeholder="Email" />
          </Form.Item>
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: 'Password is required' }}
        render={({ field, fieldState }) => (
          <Form.Item validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message}>
            <Input.Password {...field} placeholder="Password" />
          </Form.Item>
        )}
      />

      <a href="#" className="forgot-password">
        Forgot your password?
      </a>
      
      <Button type='primary' htmlType="submit" className="auth-button ">
        Sign In
      </Button>
      <Button type="primary" htmlType='button' className="auth-button " onClick={() => onLoginWithGoogle()} >
      <GoogleOutlined  style={{ fontSize: "25px"}}  />
       Sign in with google
      </Button>
    </Form>
  );
};