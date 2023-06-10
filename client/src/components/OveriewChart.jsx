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
	<div>OveriewChart</div>
  )
}

export default OveriewChart