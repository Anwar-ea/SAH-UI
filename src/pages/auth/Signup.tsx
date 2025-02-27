// components/SignUp.tsx
import React from 'react';
import { Form, Input, Button, Typography, Select, DatePicker } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { GoogleOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import {UseMutationResult} from "react-query"
import { IUser } from '../../models/interfaces/Response/user';
import { GoogleUrlAction } from '../../models/interfaces/request/login';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface ISignUpRequest {
  userName: string;
  email: string;
  phoneNum: string;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: Date;
  address?: string;
  temporaryAddress?: string;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: number;
}
interface ISignUpProps {
  signUp: UseMutationResult<IUser, unknown, ISignUpRequest, unknown>;
  signUpWithGoogle: UseMutationResult<{url: string;}, unknown, GoogleUrlAction, unknown>
}

export const SignUp: React.FC<ISignUpProps> = ({signUp, signUpWithGoogle}: ISignUpProps) => {
  const { control, handleSubmit } = useForm<ISignUpRequest>();

  const onSubmit = (data: ISignUpRequest) => {
    console.log('Sign Up Data:', data);
    // Handle sign-up logic here
  };

  const onSignUpWithGoogle = () => {
    signUpWithGoogle.mutate('signup');
  }

  return (
    <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className='h-max mt-16 mb-0 grid grid-cols-2 gap-2'>
      <Typography.Title level={1} className='col-span-2 mb-12 '>Create Account</Typography.Title>

      <Controller
        name="userName"
        control={control}
        defaultValue=""
        rules={{ required: 'Username is required' }}
        render={({ field, fieldState }) => (
          <Form.Item  className='col-span-1 col-start-1' label="Username" validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message}>
            <Input {...field} placeholder="Username" />
          </Form.Item>
        )}
      />

      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } }}
        render={({ field, fieldState }) => (
          <Form.Item label="Email" validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message}>
            <Input {...field} placeholder="Email" />
          </Form.Item>
        )}
      />

      <Controller
        name="phoneNum"
        control={control}
        defaultValue=""
        rules={{ required: 'Phone number is required' }}
        render={({ field, fieldState }) => (
          <Form.Item label="Phone Number" validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message}>
            <Input {...field} placeholder="Phone Number" />
          </Form.Item>
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
        render={({ field, fieldState }) => (
          <Form.Item label="Password" validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message}>
            <Input.Password {...field} placeholder="Password" />
          </Form.Item>
        )}
      />

      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        rules={{ required: 'First name is required' }}
        render={({ field, fieldState }) => (
          <Form.Item label="First Name" validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message}>
            <Input {...field} placeholder="First Name" />
          </Form.Item>
        )}
      />

      <Controller
        name="middleName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Form.Item label="Middle Name (Optional)">
            <Input {...field} placeholder="Middle Name" />
          </Form.Item>
        )}
      />

      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        rules={{ required: 'Last name is required' }}
        render={({ field, fieldState }) => (
          <Form.Item label="Last Name" validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message}>
            <Input {...field} placeholder="Last Name" />
          </Form.Item>
        )}
      />

      <Controller
        name="gender"
        control={control}
        defaultValue={Gender.Male}
        rules={{ required: 'Gender is required' }}
        render={({ field, fieldState }) => (
          <Form.Item label="Gender" validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message}>
            <Select {...field} options={Object.entries(Gender).map(([key, value]) => ({ label: key, value }))} placeholder="Select Gender" />
          </Form.Item>
        )}
      />

      <Controller
        name="dateOfBirth"
        control={control}
        defaultValue={new Date()}
        rules={{ required: 'Date of birth is required' }}
        render={({ field, fieldState }) => (
          <Form.Item label="Date of Birth" validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message}>
   <DatePicker
      {...field}
      value={field.value ? dayjs(field.value) : null}
      onChange={(date) => field.onChange(date ? dayjs(date) : null)}
    />          </Form.Item>
        )}
      />

      <Controller
        name="address"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Form.Item label="Address (Optional)">
            <Input {...field} placeholder="Address" />
          </Form.Item>
        )}
      />

      <Controller
        name="temporaryAddress"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Form.Item label="Temporary Address (Optional)">
            <Input {...field} placeholder="Temporary Address" />
          </Form.Item>
        )}
      />

      <Controller
        name="country"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Form.Item label="Country (Optional)">
            <Input {...field} placeholder="Country" />
          </Form.Item>
        )}
      />

      <Controller
        name="state"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Form.Item label="State (Optional)">
            <Input {...field} placeholder="State" />
          </Form.Item>
        )}
      />

      <Controller
        name="city"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Form.Item label="City (Optional)">
            <Input {...field} placeholder="City" />
          </Form.Item>
        )}
      />

      <Controller
        name="zipCode"
        control={control}
        defaultValue={undefined}
        render={({ field }) => (
          <Form.Item label="Zip Code (Optional)">
            <Input type="number" {...field} placeholder="Zip Code" />
          </Form.Item>
        )}
      />

      <Button type="primary" htmlType="submit" className="auth-button col-span-2 w-44 ml-52 mt-5 mb-0">
        Sign Up
      </Button>

      <Button type="primary" className="auth-button col-span-2 w-64 ml-40" onClick={() => onSignUpWithGoogle()}>
        <GoogleOutlined style={{ fontSize: "24px" }} />
        Sign up with Google
      </Button>
    </Form>
  );
};
