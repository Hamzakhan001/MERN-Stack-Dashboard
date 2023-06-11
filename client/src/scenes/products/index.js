import React, { useState } from 'react';
import {Box, card, CardActions, CardContent, Collapse, Button, Typography, useMediaQuery, Card, Rating} from '@mui/material';
import { Header } from '../../components/Header';
import {useGetProductsQuery} from '../../state/api'
import { useTheme } from '@emotion/react';


const Product=({
	_id,name,description,price,rating,category, supply, stat
})=>{
	const theme= useTheme()
	const [isExpanded,setIsExpanded] = useState(false);

	return <Card sx={{
		backgroundImage:"none",
		backgroundColor:theme.palette.background.alt,
		borderRadius:"0.55rem"
	}}>
		<CardContent>
			<Typography sx={{fontSize:14}} color={theme.palette.secondary[700]} gutterBottom >
				{category}
			</Typography>
			<Typography variant="h5" component="div">
				{category}
			</Typography>
			<Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]} gutterBottom >
				${Number(price).toFixed(3)}
			</Typography>
			<Rating value={rating} readOnly />
			<Typography variant='body2'>{description}</Typography>
		</CardContent>
		<CardActions>
			<Button variant='primary' size="small" onClick={()=> setIsExpanded(!isExpanded)}>
				See More
			</Button>
		</CardActions>
		<Collapse
		in={isExpanded}
		timeout="auto"
		unmountOnExit
		sx={{
			color:theme.palette.neutral[300]

		}}
		>
			<CardContent>
				<Typography>id : {_id}</Typography>
				<Typography>Supply : {supply}</Typography>
				<Typography>Yearly sales this year  : {stat.yearlySalesTotal}</Typography>
				<Typography>Yearly unis sold this year  : {stat.yearlyTotalSoldUnits}</Typography>
			</CardContent>
		</Collapse>
	</Card>
}

const Products = () => {
	const {data,isLoading} = useGetProductsQuery
	const isNonMobile = useMediaQuery("(min-width:1000px)")

  return (
	<Box m="1.5rem 2.5rem">
		<Header title="" />
		{data || !isLoading ? (
			<Box mt="20px" display="grid" 
			gridTemplateColumns="repeat(4, minmax(0,1fr)"
			justifyContent="space-between"
			rowGap="20px"
			columnGap="1.33%"
			// sx={{
			// 	"& > div": {gridColumn ? isNonMobile ? undefined : "span 4"}
			// }}
			>
				{
					data.map(({_id,name,description,price,rating,category,supply,stat})=>(
						<Product
					     id={_id}
						 name={name}
						 description={description}
						 price={price}
						 rating={rating}
						 category={category}
						 supply={supply}
						 stat={stat}
					/>
					))
				}
			</Box>
		):<>Loading ...</> }
	</Box>
  )
}

export default Products