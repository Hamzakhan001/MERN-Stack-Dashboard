import React from 'react';
import { Box,useTheme } from '@mui/system';
import { useGetCustomersQuery } from '../../state/api';
import { Header } from '../../components/Header';
import {DataGrid} from '@mui/x-data-grid'
import { useState } from 'react';



const Customers = () => {
	const theme = useTheme();
	const {data,isDataLoading} =useGetCustomersQuery()


	const columns=[
		{
			field:"_id",
			headerName:"ID",
			flex:1,

		},
		{
			field:"name",
			headerName:"Name",
			flex:0.5,

		},
		{
			field:"_id",
			headerName:"ID",
			flex:1,

		},
		{
			field:"email",
			headerName:"Email",
			flex:1,

		},
		{
			field:"phoneNumber",
			headerName:"Phone Number",
			flex:0.5,
			renderCell:(params)=>{
				return params.value.replace(/^(\d{3})(\d{3})(\d{4})/,"($1)$2-$3")
			}
		},
		{
			field:"country",
			headerName:"Country",
			flex:0.4,

		},
		{
			field:"occupation",
			headerName:"Occupation",
			flex:1,

		},
		{
			field:"role",
			headerName:"Role",
			flex:1,

		},
	]
  return (
	<Box m="1.5rem 2.5rem">
		<Header title="CUSTOMERS" subtitle="List of Customers" />
		<Box mt="40px" height="75vh">
			<DataGrid 
			loading={isDataLoading || !data}
			getRowId={(row)=> row._id}
			rows={data || []}
			columns={columns}
			/>
		</Box>
	</Box>
  )
}

export default Customers