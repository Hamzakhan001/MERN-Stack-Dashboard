import React,{useState,useMemo} from 'react';
import { FormControl,Box, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import Header from '../../components/Header'
import OveriewChart from '../../components/OveriewChart';
import { useGetSalesQuery } from '../state/api';
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from 'react-datepicker';

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

			</Box>
		</Box>

	</Box>
  )
}

export default Daily