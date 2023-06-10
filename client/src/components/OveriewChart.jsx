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
			
		})
	},[data])



  return (
	<div>OveriewChart</div>
  )
}

export default OveriewChart