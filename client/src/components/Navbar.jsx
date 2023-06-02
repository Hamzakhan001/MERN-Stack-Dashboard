import React,{useState} from 'react'
import {FlightLand , DarkModeOutlined, Search, SettingsOutlined, ArrowDropDownOutlined} from '@material-ui/icons';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '../state';
import { useTheme } from '@emotion/react';
import MenuIcon from "@material-ui/icons/Menu";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { AppBar, IconButton, InputBase, Toolbar } from '@mui/material'
// import {DarkModeOutlinedIcon} from '@mui/icons-material/DarkModeOutlined';


const Navbar = ({isSidebarOpen,setisSidebarOpen}) => {
  const dispatch= useDispatch();
  const theme= useTheme()

  return (
	<AppBar
	sx={{
		position:"static",
		background : "none",
		boxShadow: "none"
	}}
	>
		<Toolbar
		  sx={{
				justifyContent:"space-between"
		   }}
		>
			
		{/* Left side */}
		 <FlexBetween>
			<IconButton onClick={()=>setisSidebarOpen(!isSidebarOpen)}>
				<MenuIcon/>
			</IconButton>
			<FlexBetween
			backgroundColor={theme.palette.background.alt}
			borderRadius="9px"
			gap="3rem"
			p="0.1rem 1.5rem"
			>
			 <InputBase placeholder='Search...' />
			 <IconButton>
				<Search />
			 </IconButton>

			</FlexBetween>
		</FlexBetween>

		{/* Right Side */}
		<FlexBetween gap="1.5rem">
		<IconButton onClick={()=> dispatch(setMode())}> 
			{theme.palette.mode === 'dark' ? (
				<FlightLand sx={{fontSize : "25px"}} />
			): (
				<FlightLand sx={{fontSize : "25px"}} />
			)}
		 </IconButton>
		 <IconButton>
			<SettingsOutlined sx={{fontSize : "25px"}} />
		 </IconButton>
		</FlexBetween>

		</Toolbar>
	</AppBar>
  )
}

export default Navbar