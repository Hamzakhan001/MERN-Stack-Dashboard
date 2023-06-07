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
			
		}
	]
  return (
	<Box m="1.5rem 2.5rem">
		<Header title="CUSTOMERS" subtitle="List of Customers" />
		<Box>
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