
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_map from 'highcharts/modules/map';
import { worldMapTopology } from '@/app/_constants/world-map-topology';

// Initialize the map module
HC_map(Highcharts);

export const WorldMap = ({ data }: { data: Array<[string, any]> }) => {
    
    const transformData = data.map(x => ([worldMapTopology.objects.default.geometries.find(y=> y.properties.name.includes(x[0]))?.properties['hc-key'], x[1]]));    
    const options: HighchartsReact.Props = {
        chart: {
          map: worldMapTopology,
          height: '40%',
        //   innerWidth: "80",
          type: 'map',
          backgroundColor: '#757f82'
        },
        title: {
          text: 'Total Users Count By Countries',
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                align: 'left',          // Align to the left
                verticalAlign: 'top',   // Align to the top
            },
        },
        colorAxis: {
            dataClasses: [
                {
                    from: 0,
                    to: 5,
                    color: '#8FE3CF',
                    name: '< 5'
                },
                {
                    from: 6,
                    to: 20,
                    color: '#256D85',
                    name: '6 - 20'
                },
                {
                    from: 21,
                    to: 50,
                    color: '#2B4865',
                    name: '21 - 50'
                },
                {
                    from: 51,
                    to: 100,
                    color: '#1C1678',
                    name: '51 - 100'
                },
                {
                    from: 101,
                    to: 1000,
                    color: '#002B5B',
                    name: '101 <'
                }
            ]
        },
        tooltip: {
            formatter: function() {
                // Index 2 in the data array
                console.log(this.point);
                
                return `${this.point.name}: <b>${this.point.value}</b>`;
            }
        },
        series: [
          {
            data: transformData,
            mapData: worldMapTopology,
            joinBy: 'hc-key',
            name: 'Users',
            states: {
              hover: {
                color: '#a4edba'
              }
            },
            dataLabels: {
                enabled: false,
                format: '{point.name}',
                style: {
                    textOverflow: 'ellipsis', // Truncate text if too long
                    fontSize: '10px',
                },
                crop: false, // Show labels outside the countries if needed
            }
          }
        ]
      }


    return (
        <div className='py-5 ' style={{height: "50vh"}}>
            <HighchartsReact highcharts={Highcharts} constructorType={'mapChart'} options={options} />
        </div>
    );
};