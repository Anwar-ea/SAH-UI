import React, { useState } from 'react';
import {
  Typography,
  Card,
  Tabs,
  Table,
  Divider,
  Space,
  Button,
  Select,
  message,
  Collapse,
  Tag,
  Tooltip,
  Alert
} from 'antd';
import {
  CopyOutlined,
  CodeOutlined,
  InfoCircleOutlined,
  BookOutlined,
  FileTextOutlined,
  ApiOutlined,
  WarningOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;

// Types for the API documentation
interface ParamType {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

interface HeaderType {
  name: string;
  required: boolean;
  description: string;
}

interface ErrorCodeType {
  code: number;
  description: string;
}

interface VersionType {
  version: string;
  date: string;
  changes: string[];
}

interface ResponseFieldType {
  field: string;
  type: string;
  description: string;
  nested?: boolean;
}

const  Developers: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('curl');
  
  const codeExamples = {
    curl: `curl -X GET "\${config.backendUrl}/api/analytics/get_analytics/app_12345" \\
  -H "x-api-key: your-api-key-here" \\
  -H "Content-Type: application/json"`,
    javascript: `const apiKey = 'your-api-key';
const applicationId = 'your-application-id';
const baseUrl = config.backendUrl;

async function fetchAnalytics() {
  try {
    const response = await fetch(
      \`\${baseUrl}/api/analytics/get_analytics/\${applicationId}\`,
      {
        method: 'GET',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(\`API Error: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    throw error;
  }
}`,
    python: `import requests

api_key = "your-api-key"
application_id = "your-application-id"
base_url = config.backend_url

def fetch_analytics():
    url = f"{base_url}/api/analytics/get_analytics/{application_id}"
    headers = {
        "x-api-key": api_key,
        "Content-Type": "application/json"
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        raise Exception(f"API Error: {response.status_code}")
        
    return response.json()`,
    node: `const axios = require('axios');

const apiKey = 'your-api-key';
const applicationId = 'your-application-id';
const baseUrl = config.backendUrl;

async function fetchAnalytics() {
  try {
    const response = await axios.get(
      \`\${baseUrl}/api/analytics/get_analytics/\${applicationId}\`,
      {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch analytics:', error.message);
    throw error;
  }
}`
  };

  const requestParams: ParamType[] = [
    {
      name: 'applicationId',
      type: 'string',
      required: true,
      description: 'The unique identifier of your application'
    }
  ];

  const requestHeaders: HeaderType[] = [
    {
      name: 'x-api-key',
      required: true,
      description: 'Your API key for authentication'
    },
    {
      name: 'Content-Type',
      required: false,
      description: 'Should be set to application/json if body is included'
    }
  ];

  const queryParams: ParamType[] = [
    {
      name: 'startDate',
      type: 'string',
      required: false,
      description: 'Start date for analytics data (format: YYYY-MM-DD)',
      defaultValue: '30 days ago'
    },
    {
      name: 'endDate',
      type: 'string',
      required: false,
      description: 'End date for analytics data (format: YYYY-MM-DD)',
      defaultValue: 'Current date'
    },
    {
      name: 'timezone',
      type: 'string',
      required: false,
      description: 'Timezone for data aggregation (e.g., "America/New_York")',
      defaultValue: 'UTC'
    }
  ];

  const errorCodes: ErrorCodeType[] = [
    { code: 200, description: 'Success' },
    { code: 400, description: 'Bad Request - Check request parameters' },
    { code: 401, description: 'Unauthorized - Invalid or missing API key' },
    { code: 403, description: 'Forbidden - You don\'t have permission to access this resource' },
    { code: 404, description: 'Not Found - The requested application ID does not exist' },
    { code: 429, description: 'Too Many Requests - You have exceeded your rate limit' },
    { code: 500, description: 'Internal Server Error - Something went wrong on our end' }
  ];

  const responseFields: ResponseFieldType[] = [
    { field: 'sessions', type: 'object', description: 'Information about user sessions' },
    { field: 'sessions.total', type: 'number', description: 'Total number of sessions', nested: true },
    { field: 'sessions.diffPercent', type: 'number', description: 'Percentage change compared to previous period', nested: true },
    { field: 'visitors', type: 'object', description: 'Information about unique visitors' },
    { field: 'visitors.total', type: 'number', description: 'Total number of unique visitors', nested: true },
    { field: 'visitors.diffPercent', type: 'number', description: 'Percentage change compared to previous period', nested: true },
    { field: 'pageViews', type: 'object', description: 'Information about page views' },
    { field: 'pageViews.total', type: 'number', description: 'Total number of page views', nested: true },
    { field: 'pageViews.diffPercent', type: 'number', description: 'Percentage change compared to previous period', nested: true },
    { field: 'averageDurationPersession', type: 'object', description: 'Information about session duration' },
    { field: 'averageDurationPersession.total', type: 'number', description: 'Average session duration in seconds', nested: true },
    { field: 'averageDurationPersession.diffPercent', type: 'number', description: 'Percentage change compared to previous period', nested: true },
    { field: 'bounceRate', type: 'object', description: 'Information about bounce rate' },
    { field: 'bounceRate.total', type: 'number', description: 'Bounce rate percentage', nested: true },
    { field: 'bounceRate.diffPercent', type: 'number', description: 'Percentage change compared to previous period', nested: true },
    { field: 'pagesViewedPerSession', type: 'object', description: 'Information about pages per session' },
    { field: 'pagesViewedPerSession.total', type: 'number', description: 'Average number of pages viewed per session', nested: true },
    { field: 'pagesViewedPerSession.diffPercent', type: 'number', description: 'Percentage change compared to previous period', nested: true },
    { field: 'engagedSessions', type: 'object', description: 'Information about engaged sessions' },
    { field: 'engagedSessions.total', type: 'number', description: 'Total number of engaged sessions', nested: true },
    { field: 'engagedSessions.diffPercent', type: 'number', description: 'Percentage change compared to previous period', nested: true },
    { field: 'oldVsNewUsers', type: 'object', description: 'Breakdown of new vs returning users' },
    { field: 'oldVsNewUsers.new', type: 'number', description: 'Count of new users', nested: true },
    { field: 'oldVsNewUsers.returning', type: 'number', description: 'Count of returning users', nested: true },
    { field: 'usersByDevices', type: 'array', description: 'Breakdown of users by device type' },
    { field: 'usersByDevices[].deviceName', type: 'string', description: 'Name of device type (desktop, mobile, tablet)', nested: true },
    { field: 'usersByDevices[].userCount', type: 'number', description: 'Number of users on this device type', nested: true },
    { field: 'usersByCountry', type: 'array', description: 'Breakdown of users by country' },
    { field: 'usersByCountry[].countryName', type: 'string', description: 'Name of country', nested: true },
    { field: 'usersByCountry[].usersDetails', type: 'object', description: 'User details for this country', nested: true },
    { field: 'usersByCountry[].usersDetails.total', type: 'number', description: 'Total users from this country', nested: true },
    { field: 'usersByCountry[].usersDetails.diffPercent', type: 'number', description: 'Percentage change compared to previous period', nested: true }
  ];

  const versionHistory: VersionType[] = [
    {
      version: '1.1',
      date: '2024-10-15',
      changes: [
        'Added support for timezone parameter',
        'Improved performance for large date ranges'
      ]
    },
    {
      version: '1.0',
      date: '2024-07-01',
      changes: [
        'Initial release of the Analytics API'
      ]
    }
  ];

  const copyText = (text: string) => {
    message.success('Copied to clipboard!');
  };

  const responseExample = `{
  "sessions": {
    "total": 12500,
    "diffPercent": 8.2
  },
  "visitors": {
    "total": 9800,
    "diffPercent": 5.7
  },
  "pageViews": {
    "total": 45000,
    "diffPercent": 12.3
  },
  "averageDurationPersession": {
    "total": 186,
    "diffPercent": -2.1
  },
  "bounceRate": {
    "total": 42.5,
    "diffPercent": -1.8
  },
  "pagesViewedPerSession": {
    "total": 3.6,
    "diffPercent": 4.2
  },
  "engagedSessions": {
    "total": 8750,
    "diffPercent": 9.3
  },
  "oldVsNewUsers": {
    "new": 3136,
    "returning": 6664
  },
  "usersByDevices": [
    {
      "deviceName": "desktop",
      "userCount": 5390
    },
    {
      "deviceName": "mobile",
      "userCount": 3920
    },
    {
      "deviceName": "tablet",
      "userCount": 490
    }
  ],
  "usersByCountry": [
    {
      "countryName": "United States",
      "usersDetails": {
        "total": 4900,
        "diffPercent": 6.2
      }
    },
    {
      "countryName": "United Kingdom",
      "usersDetails": {
        "total": 980,
        "diffPercent": 4.5
      }
    }
  ]
}`;

  const errorResponseExample = `{
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid or expired",
    "details": {
      "requestId": "req_1234567890"
    }
  }
}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center mb-6">
        <ApiOutlined className="text-2xl mr-3 text-blue-500" />
        <Title level={1} className="mb-0">Analytics API Documentation</Title>
      </div>
      
      <Card className="mb-8 shadow-md">
        <Title level={4}>Overview</Title>
        <Paragraph>
          The Analytics API allows you to retrieve detailed analytics data for your applications. 
          This documentation provides comprehensive information on how to authenticate, make requests, 
          and understand the responses from our Analytics API.
        </Paragraph>
        
        <Alert 
          message="Authentication Required" 
          description="All API requests require your API key for authentication. Your API key can be found in your developer dashboard."
          type="info" 
          showIcon 
          className="mb-4"
        />
        
        <Title level={4}>Base URL</Title>
        <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center mb-4">
          <code className="text-sm">${'{config.backendUrl}'}/api/analytics/get_analytics/${'{'}<span className="text-green-600">applicationId</span>{'}'}</code>
          <CopyToClipboard text="${config.backendUrl}/api/analytics/get_analytics/${applicationId}" onCopy={() => copyText('URL')}>
            <Button icon={<CopyOutlined />} size="small">Copy</Button>
          </CopyToClipboard>
        </div>
        
        <Divider />
        
        <Title level={4}>Authentication</Title>
        <Text strong>API Key Header</Text>
        <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center mb-4">
          <code className="text-sm">x-api-key: {'<your-api-key>'}</code>
          <CopyToClipboard text="x-api-key: your-api-key" onCopy={() => copyText('Header')}>
            <Button icon={<CopyOutlined />} size="small">Copy</Button>
          </CopyToClipboard>
        </div>
        <Paragraph>Your API key should be kept secure and not shared publicly.</Paragraph>
      </Card>
      
      <Tabs defaultActiveKey="1" type="card" className="api-doc-tabs">
        <TabPane 
          tab={
            <span>
              <FileTextOutlined />
              Endpoints
            </span>
          } 
          key="1"
        >
          <Card className="shadow-md">
            <Space direction="vertical" size="large" className="w-full">
              <div>
                <div className="flex items-center">
                  <Tag color="green" className="mr-2">GET</Tag>
                  <Text strong className="text-lg">Analytics Data</Text>
                </div>
                <Paragraph className="ml-12">
                  Retrieves comprehensive analytics data for a specific application.
                </Paragraph>
              </div>
              
              <Divider orientation="left">Request Parameters</Divider>
              <Table 
                dataSource={requestParams}
                columns={[
                  {
                    title: 'Parameter',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type',
                    render: (text) => <Tag color="blue">{text}</Tag>
                  },
                  {
                    title: 'Required',
                    dataIndex: 'required',
                    key: 'required',
                    render: (required) => required ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>
                  },
                  {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description'
                  }
                ]}
                pagination={false}
                size="small"
                bordered
              />
              
              <Divider orientation="left">Request Headers</Divider>
              <Table 
                dataSource={requestHeaders}
                columns={[
                  {
                    title: 'Header',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: 'Required',
                    dataIndex: 'required',
                    key: 'required',
                    render: (required) => required ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>
                  },
                  {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description'
                  }
                ]}
                pagination={false}
                size="small"
                bordered
              />
              
              <Divider orientation="left">Optional Query Parameters</Divider>
              <Table 
                dataSource={queryParams}
                columns={[
                  {
                    title: 'Parameter',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text) => <Text strong>{text}</Text>
                  },
                  {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type',
                    render: (text) => <Tag color="blue">{text}</Tag>
                  },
                  {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description'
                  },
                  {
                    title: 'Default',
                    dataIndex: 'defaultValue',
                    key: 'defaultValue',
                    render: (text) => <Text italic>{text}</Text>
                  }
                ]}
                pagination={false}
                size="small"
                bordered
              />
              
              <Divider orientation="left">Example Request</Divider>
              <div className="mb-4">
                <Select 
                  value={selectedLanguage} 
                  onChange={setSelectedLanguage}
                  style={{ width: 150 }} 
                  className="mb-2"
                >
                  <Option value="curl">cURL</Option>
                  <Option value="javascript">JavaScript</Option>
                  <Option value="python">Python</Option>
                  <Option value="node">Node.js</Option>
                </Select>
                <div className="relative">
                  <div className="bg-gray-900 text-white p-4 rounded-md overflow-auto max-h-96">
                    <pre className="text-sm whitespace-pre-wrap">{codeExamples[selectedLanguage as keyof typeof codeExamples]}</pre>
                  </div>
                  <div className="absolute top-2 right-2">
                    <CopyToClipboard text={codeExamples[selectedLanguage as keyof typeof codeExamples]} onCopy={() => copyText('Code')}>
                      <Button icon={<CopyOutlined />} size="small">Copy</Button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
              
              <Divider orientation="left">Response Format</Divider>
              <div className="mb-4">
                <div className="relative">
                  <div className="bg-gray-900 text-white p-4 rounded-md overflow-auto max-h-96">
                    <pre className="text-sm whitespace-pre-wrap">{responseExample}</pre>
                  </div>
                  <div className="absolute top-2 right-2">
                    <CopyToClipboard text={responseExample} onCopy={() => copyText('Response')}>
                      <Button icon={<CopyOutlined />} size="small">Copy</Button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
              
              <Divider orientation="left">Response Fields</Divider>
              <Table 
                dataSource={responseFields}
                columns={[
                  {
                    title: 'Field',
                    dataIndex: 'field',
                    key: 'field',
                    render: (text, record) => (
                      <Text strong style={{ paddingLeft: record.nested ? 20 : 0 }}>
                        {record.nested && '↳ '}{text}
                      </Text>
                    )
                  },
                  {
                    title: 'Type',
                    dataIndex: 'type',
                    key: 'type',
                    render: (text) => <Tag color="blue">{text}</Tag>
                  },
                  {
                    title: 'Description',
                    dataIndex: 'description',
                    key: 'description'
                  }
                ]}
                pagination={{ pageSize: 10 }}
                size="small"
                bordered
              />
            </Space>
          </Card>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <WarningOutlined />
              Errors
            </span>
          } 
          key="2"
        >
          <Card className="shadow-md">
            <Title level={4}>Error Codes</Title>
            <Table 
              dataSource={errorCodes}
              columns={[
                {
                  title: 'Status Code',
                  dataIndex: 'code',
                  key: 'code',
                  render: (code) => {
                    let color = 'green';
                    if (code >= 400 && code < 500) color = 'orange';
                    if (code >= 500) color = 'red';
                    return <Tag color={color}>{code}</Tag>;
                  }
                },
                {
                  title: 'Description',
                  dataIndex: 'description',
                  key: 'description'
                }
              ]}
              pagination={false}
              size="middle"
              bordered
            />
            
            <Divider />
            
            <Title level={4}>Error Response Format</Title>
            <div className="relative mb-4">
              <div className="bg-gray-900 text-white p-4 rounded-md overflow-auto">
                <pre className="text-sm whitespace-pre-wrap">{errorResponseExample}</pre>
              </div>
              <div className="absolute top-2 right-2">
                <CopyToClipboard text={errorResponseExample} onCopy={() => copyText('Error Response')}>
                  <Button icon={<CopyOutlined />} size="small">Copy</Button>
                </CopyToClipboard>
              </div>
            </div>
          </Card>
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <InfoCircleOutlined />
              Additional Info
            </span>
          } 
          key="3"
        >
          <Card className="shadow-md">
            <Space direction="vertical" size="large" className="w-full">
              <div>
                <Title level={4}>Rate Limits</Title>
                <Paragraph>
                  The API has the following rate limits:
                </Paragraph>
                <ul className="list-disc pl-8">
                  <li>100 requests per minute per API key</li>
                  <li>5,000 requests per day per API key</li>
                </ul>
                <Paragraph>
                  Exceeding these limits will result in a 429 status code. The response will include 
                  <Text code>Retry-After</Text> header indicating when you can resume making requests.
                </Paragraph>
              </div>
              
              <Divider />
              
              <div>
                <Title level={4}>Versioning</Title>
                <Paragraph>
                  This documentation is for API version 1.0. The API version can be specified in the URL:
                </Paragraph>
                <div className="bg-gray-100 p-4 rounded-md mb-4">
                  <code className="text-sm">${'{config.backendUrl}'}/api/v1/analytics/get_analytics/${'{'}<span className="text-green-600">applicationId</span>{'}'}</code>
                </div>
                <Paragraph>
                  If no version is specified, the latest version will be used.
                </Paragraph>
              </div>
              
              <Divider />
              
              <div>
                <Title level={4}>SDK Support</Title>
                <Paragraph>
                  We provide SDKs for the following languages:
                </Paragraph>
                <ul className="list-disc pl-8">
                  <li>JavaScript/TypeScript: <a href="https://www.npmjs.com/package/your-analytics-sdk" target="_blank" rel="noopener noreferrer">npm package</a></li>
                  <li>Python: <a href="https://pypi.org/project/your-analytics-sdk/" target="_blank" rel="noopener noreferrer">PyPI package</a></li>
                  <li>Java: <a href="https://mvnrepository.com/artifact/com.yourcompany/analytics-sdk" target="_blank" rel="noopener noreferrer">Maven Central</a></li>
                </ul>
              </div>
              
              <Divider />
              
              <div>
                <Title level={4}>Support</Title>
                <Paragraph>
                  If you need assistance with our API, please contact our developer support team at <a href="mailto:api-support@example.com">api-support@example.com</a> or 
                  visit our <a href="https://developers.example.com/forum" target="_blank" rel="noopener noreferrer">Developer Forum</a>.
                </Paragraph>
              </div>
              
              <Divider />
              
              <div>
                <Title level={4}>Changelog</Title>
                <Table 
                  dataSource={versionHistory}
                  columns={[
                    {
                      title: 'Version',
                      dataIndex: 'version',
                      key: 'version',
                      render: (text) => <Tag color="blue">{text}</Tag>
                    },
                    {
                      title: 'Release Date',
                      dataIndex: 'date',
                      key: 'date'
                    },
                    {
                      title: 'Changes',
                      dataIndex: 'changes',
                      key: 'changes',
                      render: (changes) => (
                        <ul className="list-disc pl-5 m-0">
                          {changes.map((change: any, index: any) => (
                            <li key={index}>{change}</li>
                          ))}
                        </ul>
                      )
                    }
                  ]}
                  pagination={false}
                  size="middle"
                  bordered
                />
              </div>
            </Space>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default  Developers;