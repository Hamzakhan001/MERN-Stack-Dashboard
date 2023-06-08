import React,{ useState } from 'react'
import {DataGrid} from '@mui/x-data-grid';
import { Box , useTheme } from "@mui/material"
import { useGetTransactionsQuery } from '../../state/api';
import { Header } from '../../components/Header';

const Transactions = () => {
  const theme = useTheme();

  const [page, setPage] =  useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");


  const { data, isLoading }= useGetTransactionsQuery({
	page,
	pageSize,
	sort : JSON.stringify(sort),
	search
  })


  const columns=[
		{
			field:"_id",
			headerName:"ID",
			flex:1,

		},
		{
			field:"userId",
			headerName:"User ID",
			flex: 1,

		},
		{
			field:"createdAt",
			headerName:"CREATED AT",
			flex:1,

		},
		{
			field:"products",
			headerName:"No. of Products",
			flex:0.5,
      sortable:false,
      renderCell: (params) => params.value.length

		},
		{
			field:"cost",
			headerName:"Cost",
			flex:0.5,
			renderCell:(params)=> `$${Number(params.value).toFixed(2)}`
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
	<Box height="80vh">
    <DataGrid 
    loadin={isLoading}
    getRowId={(row)=> row._id}
    rows={(data && data.transactions) || []}
    columns={columns}
    rowCount={(data && data.total) || 0}
    pagination
    page= {page}
    pageSize = {pageSize}
    paginationMode = "server"
    sortingMode = "server"
    onPageChange = {(newPage) => setPage(newPage)}
    onPageSizeChange = {(newPageSize) => setPageSize(newPageSize)}
    onSortModelChange = {(newSortModel) => setSort(...newSortModel)}
    // components={{ Toolbar: DataGridCustomerToolbar}}
    />
  </Box>
  )
}

export default Transactions