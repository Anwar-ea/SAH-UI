import * as React from 'react';
import { Card, Divider } from 'antd';
import { useState } from 'react';
import { convertSecondsToTime } from '../utility/time-utility';
import { AnalyticsDashboard } from '../models/interfaces/Response/analytics-response';
import { WorldMap } from './charts/world-map';
import { PieChart } from './charts/pie';
import { VariableRadiusPieChart } from './charts/variableRadiusPie';
import { getNumberInKs } from '../utility/numbers-utility';

export interface IAnalyticsDataProps {
  data: AnalyticsDashboard
}

export default function AnalyticsData({data}: IAnalyticsDataProps) {

  const getUpDownClass = (num: number): string => {
    return num > 0 ? 'text-green-500' : (num < 0 ? 'text-red-500' : 'text-gray-500')
  }

  const [num, setNum] = useState(64)
  return (
    <>
    <div className=' h-full overflow-y-scroll'>
    <div className="grid grid-cols-3 gap-3">
      <Card className="max-w-[400px]">
        <div className="flex justify-center">
          <h4 className="text-md border-b-2 border-green-500 ">Sessions</h4>
        </div>
        <Divider />
        <div className="flex flex-col justify-center items-center">
          <span className='text-7xl'>{data.sessions.total}</span>
          <p> </p>
        </div>
        <Divider />
        <div className="flex justify-center">
          <span className={getUpDownClass(data.sessions.diffPercent)}>
            {data.sessions.diffPercent}%
          </span>
        </div>
      </Card>
      <Card className="max-w-[400px]">
        <div className="flex justify-center">
          <h4 className="text-md border-b-2 border-green-500">Visitors</h4>
        </div>
        <Divider />
        <div className="flex flex-col justify-center items-center">
          <span className='text-7xl'>{data.visitors.total}</span>
          <p> </p>
        </div>
        <Divider />
        <div className="flex justify-center">
          <span className={getUpDownClass(data.visitors.diffPercent)}>
            {data.visitors.diffPercent}%
          </span>
        </div>
      </Card>
      <Card className="max-w-[400px]">
        <div className="flex justify-center">
          <h4 className="text-md border-b-2 border-green-500">Page views</h4>
        </div>
        <Divider />
        <div className="flex flex-col justify-center items-center">
          <span className='text-7xl'>{getNumberInKs(data.pageViews.total)}</span>
          <p> </p>
        </div>
        <Divider />
        <div className="flex justify-center">
          <span className={getUpDownClass(data.pageViews.diffPercent)}>
            {data.pageViews.diffPercent}%
          </span>
        </div>
      </Card>
      <Card className="max-w-[400px]">
        <div className="flex justify-center">
          <h4 className="text-md border-b-2 border-green-500">Average Time On Site</h4>
        </div>
        <Divider />
        <div className="flex flex-col justify-center items-center">
          <span className='text-7xl'>{convertSecondsToTime(data.averageDurationPersession.total)}</span>
          <p> </p>
        </div>
        <Divider />
        <div className="flex justify-center">
          <span className={getUpDownClass(data.averageDurationPersession.diffPercent)}>
            {data.averageDurationPersession.diffPercent}%
          </span>
        </div>
      </Card>
      <Card className="max-w-[400px]">
        <div className="flex justify-center">
          <h4 className="text-md border-b-2 border-green-500">Bounce Rate</h4>
        </div>
        <Divider />
        <div className="flex flex-col justify-center items-center">
          <span className='text-7xl'>{data.bounceRate.total}%</span>
          <p> </p>
        </div>
        <Divider />
        <div className="flex justify-center">
          <span className={getUpDownClass(data.bounceRate.diffPercent)}>
            {data.bounceRate.diffPercent}%
          </span>
        </div>
      </Card>
      <Card className="max-w-[400px]">
        <div className="flex justify-center">
          <h4 className="text-md border-b-2 border-green-500">Pages Per Session</h4>
        </div>
        <Divider />
        <div className="flex flex-col justify-center items-center">
          <span className='text-7xl'>{data.pagesViewedPerSession.total}</span>
          <p> </p>
        </div>
        <Divider />
        <div className="flex justify-center">
          <span className={getUpDownClass(data.pagesViewedPerSession.diffPercent)}>
            {data.pagesViewedPerSession.total}%
          </span>
        </div>
      </Card>
      <Card className="max-w-[400px]">
        <div className="flex justify-center">
          <h4 className="text-md border-b-2 border-green-500">Engaged Sessions</h4>
        </div>
        <Divider />
        <div className="flex flex-col justify-center items-center">
          <span className='text-7xl'>{data.engagedSessions.total}</span>
          <p> </p>
        </div>
        <Divider />
        <div className="flex justify-center">
          <span className={getUpDownClass(data.engagedSessions.diffPercent)}>
            {data.engagedSessions.diffPercent}%
          </span>
        </div>
      </Card>
      <Card className="max-w-[400px]">
        <div className="flex justify-center">
          <h4 className="text-md border-b-2 border-green-500">New Vs Returning Visitors</h4>
        </div>
        <Divider />
        <div className="flex flex-col justify-center items-center">
          <VariableRadiusPieChart data={Object.entries(data.oldVsNewUsers).sort((a, b) => a[1] - b[1]).map((x, index) => ({name: x[0].toUpperCase(), y: x[1], z: index + 1}))} />
        </div>
        <Divider />
        <div className="flex justify-center">
          <span>
            Visit source code on GitHub.
          </span>
        </div>
      </Card>
      <Card className="max-w-[400px]">
        <div className="flex justify-center">
          <h4 className="text-md border-b-2 border-green-500">Devices Of Visitors</h4>
        </div>
        <Divider />
        <div className="flex flex-col justify-center items-center">
          <PieChart data={data.usersByDevices.sort((a, b) => b.userCount- a.userCount).map((x, index)=> ({name: x.deviceName.toUpperCase(), y: x.userCount, sliced: (index > 0)}))}/>
        </div>
        <Divider />
        <div className="flex justify-center">
          <span>
            Visit source code on GitHub.
          </span>
        </div>
      </Card>
    </div>
    <div className='flex justify-center'>
      <div className='w-1/2 h-1/2'>
        <WorldMap data={data.usersByCountry.map(x => ([x.countryName, x.usersDetails.total]))} />
      </div>
    </div>

    </div>
    </>
  );
}