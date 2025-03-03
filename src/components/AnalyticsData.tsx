import * as React from 'react';
import { Card, Divider } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { convertSecondsToTime } from '../utility/time-utility';
import { AnalyticsDashboard } from '../models/interfaces/Response/analytics-response';
import { WorldMap } from './charts/world-map';
import { PieChart } from './charts/pie';
import { VariableRadiusPieChart } from './charts/variableRadiusPie';
import { getNumberInKs } from '../utility/numbers-utility';

export interface IAnalyticsDataProps {
  data: AnalyticsDashboard
}

export default function AnalyticsData({ data }: IAnalyticsDataProps) {

  const getUpDownClassAndIcon = (num: number) => {
    if (num > 0) {
      return { className: 'text-green-500', icon: <ArrowUpOutlined className="mr-1" /> };
    } else if (num < 0) {
      return { className: 'text-red-500', icon: <ArrowDownOutlined className="mr-1" /> };
    } else {
      return { className: 'text-gray-500', icon: null };
    }
  };

  return (
    <div className='h-[800px] overflow-y-auto p-4'>
      {/* Responsive Grid for Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { label: "Sessions", value: data.sessions.total, diff: data.sessions.diffPercent },
          { label: "Visitors", value: data.visitors.total, diff: data.visitors.diffPercent },
          { label: "Page views", value: getNumberInKs(data.pageViews.total), diff: data.pageViews.diffPercent },
          { label: "Avg. Time On Site", value: convertSecondsToTime(data.averageDurationPersession.total), diff: data.averageDurationPersession.diffPercent },
          { label: "Bounce Rate", value: `${data.bounceRate.total}%`, diff: data.bounceRate.diffPercent },
          { label: "Pages Per Session", value: data.pagesViewedPerSession.total, diff: data.pagesViewedPerSession.diffPercent },
          { label: "Engaged Sessions", value: data.engagedSessions.total, diff: data.engagedSessions.diffPercent }
        ].map((item, index) => {
          const { className, icon } = getUpDownClassAndIcon(item.diff);
          return (
            <Card key={index} className="w-full shadow-md">
              <div className="text-center">
                <h4 className="text-md font-semibold border-b-2 border-green-500 inline-block">{item.label}</h4>
              </div>
              <Divider />
              <div className="flex flex-col items-center">
                <span className='text-5xl md:text-6xl'>{item.value}</span>
              </div>
              <Divider />
              <div className="text-center">
                <span className={className}>{icon}{item.diff}%</span>
              </div>
            </Card>
          );
        })}

        {/* Pie Chart: New vs Returning Visitors */}
        <Card className="w-full shadow-md">
          <div className="text-center">
            <h4 className="text-md font-semibold border-b-2 border-green-500 inline-block">New Vs Returning Visitors</h4>
          </div>
          <Divider />
          <div className="flex justify-center">
            <VariableRadiusPieChart data={Object.entries(data.oldVsNewUsers)
              .sort((a, b) => a[1] - b[1])
              .map((x, index) => ({ name: x[0].toUpperCase(), y: x[1], z: index + 1 }))} />
          </div>
        </Card>

        {/* Pie Chart: Devices of Visitors */}
        <Card className="w-full shadow-md">
          <div className="text-center">
            <h4 className="text-md font-semibold border-b-2 border-green-500 inline-block">Devices Of Visitors</h4>
          </div>
          <Divider />
          <div className="flex justify-center">
            <PieChart data={data.usersByDevices
              .sort((a, b) => b.userCount - a.userCount)
              .map((x, index) => ({ name: x.deviceName.toUpperCase(), y: x.userCount, sliced: (index > 0) }))} />
          </div>
        </Card>
      </div>

      {/* World Map Section */}
      <div className='flex justify-center mt-6'>
        <div className='w-full md:w-3/4 lg:w-1/2'>
          <WorldMap data={data.usersByCountry.map(x => ([x.countryName, x.usersDetails.total]))} />
        </div>
      </div>
    </div>
  );
}
