import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, Input, Button, DatePicker, Space, Card, Typography, message, Select, Spin } from 'antd';
import moment from 'moment';
import { LinkOutlined, KeyOutlined, IdcardOutlined, BarChartOutlined, PictureOutlined, GoogleCircleFilled } from '@ant-design/icons';
import { IApplication, IApplicationRequest } from '../../../models/interfaces/Response/applicatipon';
import { useMutation, useQuery } from 'react-query';
import { applicationService } from '../../../services/application.service';
import { useParams, useNavigate } from 'react-router-dom';
import { ILoginWithGoogle } from '../../../models/interfaces/request/login';
import { authService } from '../../../services/auth.service';
import { useUserContext } from '../../../stateContext/root-state-context';
import { analyticsService } from '../../../services/analytics.service';

const { Title } = Typography;
const { Option } = Select;

// Define Zod schema for validation
const applicationSchema = z.object({
  name: z.string().min(8, { message: 'Application name is required' }),
  url: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  analyticsAccountId: z.string().optional().or(z.literal('')),
  accountName: z.string().optional().or(z.literal('')),
  propertyId: z.string().optional().or(z.literal('')),
  imageUrl: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  propertyName: z.string().optional().or(z.literal('')),
});

interface IAppFormProps {}

// Define interfaces for dropdown data
interface IAnalyticsAccount {
  id: string;
  name: string;
}

interface IAnalyticsProperty {
  id: string;
  name: string;
}

const AppForm: React.FunctionComponent<IAppFormProps> = (props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { user: currentUser } = useUserContext();
  const [appToUpdate, setAppToUpdate] = useState<IApplication | null>(null);
  
  // States for dropdown data
  const [analyticsAccounts, setAnalyticsAccounts] = useState<IAnalyticsAccount[]>([]);
  const [analyticsProperties, setAnalyticsProperties] = useState<IAnalyticsProperty[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<IApplicationRequest>({
    resolver: zodResolver(applicationSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      name: undefined,
      url: undefined,
      analyticsAccountId: undefined,
      accountName: undefined,
      propertyId: undefined,
      imageUrl: undefined,
      propertyName: undefined,
    }
  });

  // Watch the analyticsAccountId to update properties dropdown
  const watchAnalyticsAccountId = watch('analyticsAccountId');

  useEffect(() => {
    if (id) {
      appToUpdateMutation.mutate(id);
    }
  }, [id]);

  useEffect(() => {
    // When the app has a refresh token, fetch analytics accounts
    if (appToUpdate?.refreshToken) {
      fetchAnalyticsAccounts();
    }
  }, [appToUpdate]);

  useEffect(() => {
    // When analytics account changes, fetch properties for that account
    if (watchAnalyticsAccountId && watchAnalyticsAccountId !== selectedAccountId) {
      setSelectedAccountId(watchAnalyticsAccountId);
      fetchAnalyticsProperties(watchAnalyticsAccountId);
    }
  }, [watchAnalyticsAccountId]);

  // Mock functions for fetching analytics data - replace with actual API calls
  const fetchAnalyticsAccounts = async () => {
    if (!appToUpdate) return;
    
    setLoadingAccounts(true);
    try {
      // Replace with your actual API call
      const response = await analyticsService.getAccounts(appToUpdate.id);
      
      setAnalyticsAccounts(response);
      
      // If the app already has an account set, select it
      if (appToUpdate.analyticsAccountId) {
        setSelectedAccountId(appToUpdate.analyticsAccountId);
        fetchAnalyticsProperties(appToUpdate.analyticsAccountId);
      }
    } catch (error) {
      message.error('Failed to load analytics accounts');
    } finally {
      setLoadingAccounts(false);
    }
  };

  const fetchAnalyticsProperties = async (accountId: string) => {
    if (!accountId) return;
    
    setLoadingProperties(true);
    try {
      // Replace with your actual API call
      const response = await analyticsService.getProperties(id as string, accountId);
      
      // Mock data for demonstration
      
      setAnalyticsProperties(response);
    } catch (error) {
      message.error('Failed to load properties');
    } finally {
      setLoadingProperties(false);
    }
  };

  const addAppliationMutaion = useMutation((payload: IApplicationRequest) => applicationService.createRecord(payload), {
    onSuccess: (data) => {
      message.success('Application added successfully.');
      navigate(`/console/app/edit/${data.id}`);
    },
    onError: (err) => {
      message.error('An error occurred while creating application.');
    }
  });

  const updateAppliationMutaion = useMutation(({payload, id}:{payload: IApplicationRequest, id: string}) => applicationService.updateRecord(id, payload), {
    onSuccess: (data) => {
      message.success('Application updated successfully.');
      navigate('/console/app/list');
    },
    onError: (err) => {
      message.error('An error occurred while updating application.');
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
      message.error('Failed to load application data');
    }
  });

  const connectToGoogleMutation = useMutation((data: ILoginWithGoogle) => authService.generateGoogleAuthUrl(data), {
    onSuccess:(x) => {
      location.href = x.url;
    },
    onError: (err) => {
      message.error('An error occurred while connecting to Google.')
    }
  });

  const handleAccountChange = (value: string, option: any) => {
    // Get account name from the selected option
    console.log('change account', value);
    
    const selectedAccount = analyticsAccounts.find(acc => acc.id === value);
    if (selectedAccount) {
      setValue('accountName', selectedAccount.name);
      setValue('analyticsAccountId', selectedAccount.id);
    }
    
    // Clear property values when account changes
    setValue('propertyId', undefined);
    setValue('propertyName', undefined);
  };

  const handlePropertyChange = (value: string, option: any) => {
    // Get property name from the selected option
    const selectedProperty = analyticsProperties.find(prop => prop.id === value);
    if (selectedProperty) {
      setValue('propertyName', selectedProperty.name);
      setValue('propertyId', selectedProperty.id);
    }
  };

  const onSubmit = (payload: IApplicationRequest) => {
    if (appToUpdate) {
      updateAppliationMutaion.mutate({ payload, id: appToUpdate.id });
    } else {
      addAppliationMutaion.mutate(payload);
    }
  };

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
        {
          appToUpdate && 
        <Space direction="vertical" size="middle" style={{ width: '100%', marginTop: 20 }}>
          <Title level={5}>Analytics Information</Title>
          
          {appToUpdate && appToUpdate.refreshToken ? (
            <>
              <Controller
                name="analyticsAccountId"
                control={control}
                render={({ field }) => (
                  <Form.Item
                    label="Analytics Account"
                    validateStatus={errors.analyticsAccountId ? 'error' : undefined}
                    help={errors.analyticsAccountId?.message}
                  >
                    <Select
                      {...field}
                      placeholder="Select analytics account"
                      loading={loadingAccounts}
                      onChange={(x) => handleAccountChange(x, undefined)}
                      style={{ width: '100%' }}
                    >
                      {analyticsAccounts.map(account => (
                        <Option key={account.id} value={account.id}>
                          {account.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              />

              {watchAnalyticsAccountId ? (
                <Controller
                  name="propertyId"
                  control={control}
                  render={({ field }) => (
                    <Form.Item
                      label="Property"
                      validateStatus={errors.propertyId ? 'error' : undefined}
                      help={errors.propertyId?.message}
                    >
                      <Select
                        {...field}
                        placeholder="Select property"
                        loading={loadingProperties}
                        onChange={handlePropertyChange}
                        style={{ width: '100%' }}
                      >
                        {analyticsProperties.map(property => (
                          <Option key={property.id} value={property.id}>
                            {property.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  )}
                />
              ):''}
            </>
          ) : (
            <div className="flex justify-center items-center">
              <Button 
                onClick={() => {
                  connectToGoogleMutation.mutate({
                    action: 'add-app', 
                    applicationId: id, 
                    userId: currentUser?.id
                  });
                }}
                loading={connectToGoogleMutation.isLoading}
              >
                <GoogleCircleFilled/> Connect Google Account
              </Button>
            </div>
          )}
        </Space>
        }

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
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={addAppliationMutaion.isLoading || updateAppliationMutaion.isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AppForm;