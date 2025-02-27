import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { analyticsService } from '../../../services/analytics.service';
import AnalyticsData from '../../../components/AnalyticsData';
import { AnalyticsDashboard } from '../../../models/interfaces/Response/analytics-response';
import { Empty, message } from 'antd';

interface IApplicationAnalyticsProps {
}

const ApplicationAnalytics: React.FC = () => {
  const [dashboardData, setDashboardData] = React.useState<AnalyticsDashboard | null>(null)
  const appId: string = useParams<{appId: string}>().appId as string;
  const analyticsMutation = useMutation((payload:{applicationId: string}) => analyticsService.getAnalytics(payload.applicationId), {
    onSuccess: (x) => {
      setDashboardData(x);
    },
    onError: (err) => {
      message.error('An erro occured while fetching analytics data.')
    }
  });
  React.useEffect(() => {
    if(appId) analyticsMutation.mutate({applicationId:appId});
  },[])

  if(!dashboardData){
    return (
      <>
        <div className="flex flex-col justify-between">
          
        <div className="w-full flex justify-center items-center p-8">
          <Empty description="No Data" />
        </div>
        </div>
      </>
    )
  }
  return (
    <>
    <AnalyticsData data={dashboardData}></AnalyticsData>
    </>
  );
};

export default ApplicationAnalytics;
