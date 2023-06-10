import React,{useMemo} from 'react';
import {ResponsiveLine} from "@nivo/line";
import { useTheme } from '@mui/material';
import { useGetSalesQuery } from '../state/api';


const OveriewChart = ({ isDashboard =false, view }) => {
	const theme = useTheme();
	const { data,isLoading } = useGetSalesQuery();
	const [totalSalesLine, totalUnitsLine] =useMemo (()=>{
		if(!data) return [];

		const {monthlyData} = data;
		const totalSalesLine ={
			id:"totalSales",
			color: theme.palette.secondary.main,
			data :[]
		};

		const totalUnitsLine = {
			id:"totalUnits",
			color:theme.palette.secondary[600],
			data:[],
		}
		Object.values(monthlyData).reduce((acc ,{month,totalSales, totalUnits}) =>{
			const currSales = acc.sales + totalSales;
			const currUnits = acc.units + totalUnits;

			totalSalesLine.data = [
				...totalSalesLine.data,
				{
					x:month,
					y:currSales
				}
			];
			totalUnitsLine.data = [
				...totalUnitsLine.data,
				{
					x:month,
					y:currUnits
				}
			]
			return { sales:currSales, units:currUnits}
		})
	},[data])

	if (!data || isLoading) return "Loading ..."

  return (
	<ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
		/>
  )
}

export default OveriewChart