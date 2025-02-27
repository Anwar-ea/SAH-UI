import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, Input, Button, DatePicker, Space, Card, Typography, message } from 'antd';
import moment from 'moment';
import { LinkOutlined, KeyOutlined, IdcardOutlined, BarChartOutlined, PictureOutlined, GoogleCircleFilled } from '@ant-design/icons';
import { IApplication, IApplicationRequest } from '../../../models/interfaces/Response/applicatipon';
import { useMutation, useQuery } from 'react-query';
import { applicationService } from '../../../services/application.service';
import { useParams, useNavigate, redirect } from 'react-router-dom';
import { div } from 'framer-motion/client';
import { ILoginWithGoogle } from '../../../models/interfaces/request/login';
import { authService } from '../../../services/auth.service';
import { useUserContext } from '../../../stateContext/root-state-context';
const { Title } = Typography;
// Define Zod schema for validation
const applicationSchema = z.object({
  name: z.string().min(1, { message: 'Application name is required' }),
  url: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  analyticsAccountId: z.string().optional().or(z.literal('')),
  accountName: z.string().optional().or(z.literal('')),
  propertyId: z.string().optional().or(z.literal('')),
  imageUrl: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  propertyName: z.string().optional().or(z.literal('')),
});

interface IAppFormProps {
}

const AppForm: React.FunctionComponent<IAppFormProps> = (props) => {
  const reidrect = useNavigate()
  const id = useParams<{id?: string}>().id;
  const {user: currentUser} = useUserContext();
  const [appToUpdate, setAppToUpdate] = useState<IApplication | null>(null);
  const [formState, setFormState] = useState<'initial' | 'google' | 'accounts' | 'property'>('initial');

  useEffect(() => {
    if(id){
      appToUpdateMutation.mutate(id);
    }
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<IApplicationRequest>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: '',
      url: '',
      analyticsAccountId: '',
      accountName: '',
      propertyId: '',
      imageUrl: '',
      propertyName: '',
    }
  });

  const addAppliationMutaion = useMutation((payload: IApplicationRequest) => applicationService.createRecord(payload), {
    onSuccess: (data) => {
      message.success('Application added successfully.');
      redirect(`/console/app/edit/${data.id}`)

    },
    onError: (err) => {
      message.error('An error occured while creating application.');
    }
  });

  const updateAppliationMutaion = useMutation(({payload, id}:{payload: IApplicationRequest, id: string}) => applicationService.updateRecord(id, payload), {
    onSuccess: (data) => {
      message.success('Application updated successfully.');
      reidrect('/console/app/list');
    },
    onError: (err) => {
      message.error('An error occured while updating application.');
    }
  });

  const appToUpdateMutation = useMutation((id:string) => applicationService.getById(id), {
    onSuccess: (data) => {
      if(data){
        reset();
        setAppToUpdate(data);
        setValue('name', data.name);
        setValue('url', data.url);
        setValue('analyticsAccountId', data.analyticsAccountId);
        setValue('propertyId', data.propertyId);
        if(data.imageUrl) setValue('imageUrl', data.imageUrl);

      }
    },
    onError: (err) => {

    }
  });

  const connectToGoogleMutation = useMutation((data: ILoginWithGoogle) => authService.generateGoogleAuthUrl(data), {
    onSuccess:(x) => {
      location.href = x.url;
    },
    onError: (err) => {
      message.error('An error occured while connecting to google.')
    }
  })

  const onSubmit = (payload: IApplicationRequest) => {
    if(appToUpdate){
      updateAppliationMutaion.mutate({payload, id: appToUpdate.id});
    } else {
      addAppliationMutaion.mutate(payload);
    }
  }

  return (
    <Card>
      <Title level={3}>{!id ? 'Add' : 'Edit'} Application</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Application Name"
              required
              validateStatus={errors.name ? 'error' : undefined}
              help={errors.name?.message}
            >
              <Input 
                {...field} 
                placeholder="Enter application name" 
                prefix={<IdcardOutlined />} 
              />
            </Form.Item>
          )}
        />

        <Controller
          name="url"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="URL"
              validateStatus={errors.url ? 'error' : undefined}
              help={errors.url?.message}
            >
              <Input 
                {...field} 
                placeholder="Enter application URL" 
                prefix={<LinkOutlined />} 
              />
            </Form.Item>
          )}
        />


         <Space direction="vertical" size="middle" style={{ width: '100%', marginTop: 20 }}>
          <Title level={5}>Analytics Information</Title>
         {appToUpdate && appToUpdate.refreshToken ? (
          
          <Controller
            name="analyticsAccountId"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Analytics Account ID"
                validateStatus={errors.analyticsAccountId ? 'error' : undefined}
                help={errors.analyticsAccountId?.message}
              >
                <Input 
                  {...field} 
                  placeholder="Enter analytics account ID" 
                  prefix={<BarChartOutlined />} 
                />
              </Form.Item>
            )}
          />) : 
            <div className='flex justify-center items-center'>
              <Button onClick={()=>{
                connectToGoogleMutation.mutate({action: 'add-app', applicationId: id, userId: currentUser?.id});
              }}><GoogleCircleFilled/> Connect Google Account</Button>
            </div>
          }

          {appToUpdate && appToUpdate.analyticsAccountId ? (<Controller
            name="propertyId"
            control={control}
            render={({ field }) => (
              <Form.Item
                label="Property ID"
                validateStatus={errors.propertyId ? 'error' : undefined}
                help={errors.propertyId?.message}
              >
                <Input 
                  {...field} 
                  placeholder="Enter property ID" 
                />
              </Form.Item>
            )}
          />) : ''}
        </Space>

        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <Form.Item
              label="Image URL"
              validateStatus={errors.imageUrl ? 'error' : undefined}
              help={errors.imageUrl?.message}
            >
              <Input 
                {...field} 
                placeholder="Enter image URL" 
                prefix={<PictureOutlined />} 
              />
            </Form.Item>
          )}
        />

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={addAppliationMutaion.isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AppForm;
