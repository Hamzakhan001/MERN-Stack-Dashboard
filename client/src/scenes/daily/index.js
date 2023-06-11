import React,{useState,useMemo} from 'react';
import { FormControl,Box, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import {Header} from '../../components/Header.js';
import {ResponsiveLine} from "@nivo/line";
import { useGetSalesQuery } from '../../state/api';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

const Daily = () => {
	const [startdate,setStartDate] =useState('2023-10-07');
	const [enddate,setEndDate] =useState('2023-10-08');
	const {data} = useGetSalesQuery();
	const theme = useTheme();

	const [formattedData] =useMemo (()=>{
		if(!data) return [];

		const { dailyData } = data;
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
		Object.values(dailyData).forEach(({date, totalSales, totalUnits})=> {
			const formattedDate = new Date(date);
			if(formattedDate >= startdate && formattedDate <= enddate) {
				const splitDate = date.substring(date.indexOf("-") + 1);

				totalSalesLine.data = [
					...totalSalesLine.data,
					{
						x:splitDate,
						y:totalSales
					}
				];
				totalUnitsLine.data = [
					...totalUnitsLine.data,
					{
						x:splitDate,
						y:totalUnits
					}
				]

			}
		});

		const formattedData= [totalSalesLine, totalUnitsLine]
		return [formattedData]
	},[data,startdate,enddate])


  return (
	<Box m="1.5rem 2.5rem">
		<Header title="DAILY SALES" subtitle ="Daily Sales Chart" />
		<Box height="75vh">
			<Box display="flex" justifyContent="flex-end">
			<Box>
			<DatePicker
			selected={startdate}
			onChange={(date)=>setStartDate(date)}
			selectsStart
			showTimeSelect
			startDate={startdate}
			endDate={enddate}
			/>
			</Box>
			<Box>
			<DatePicker
			selected={enddate}
			onChange={(date)=>setEndDate(date)}
			selectsStart
			showTimeSelect
			startDate={startdate}
			endDate={enddate}
			/>
			</Box>
			
			</Box>

			{data ?
			<ResponsiveLine
			data={formattedData}
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
				legend: "Daily",
				legendOffset: 36,
				legendPosition: 'middle'
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: 'Daily Sales' ,
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
			:''}
		</Box>
	</Box>
  )
}

export default Daily