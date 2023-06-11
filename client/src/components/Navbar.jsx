import React,{useState} from 'react'
import {FlightLand , DarkModeOutlined, Search, SettingsOutlined, ArrowDropDownOutlined} from '@material-ui/icons';
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '../state';
import { useTheme } from '@emotion/react';
import MenuIcon from "@material-ui/icons/Menu";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { AppBar, Button, IconButton, InputBase, Toolbar,Typography,Box, Menu} from '@mui/material'
// import {DarkModeOutlinedIcon} from '@mui/icons-material/DarkModeOutlined';


const Navbar = ({isSidebarOpen,setisSidebarOpen,user}) => {
  const dispatch= useDispatch();
  const theme= useTheme()
  const [anchorEl, setAnchorEl]=useState(null);
  const isOpen=Boolean(anchorEl)
  const handleClick =(e)=> setAnchorEl(e.target.value)
  const handleClose = () => setAnchorEl(null)

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
		 <FlexBetween>
			<Button onClick={handleClick} sx={{display:'flex',justifyContent:"space-between", alignItems:"center", textTransform:"none", gap:"1rem"}}>
			<Box
            component="img"
            alt="profile"
            // src={}
            height="32px"
            width="32px"
            borderRadius="50%"
            sx={{objectFit : "cover"}}
            />
			<Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.85rem" sx={{color: theme.palette.secondary[100]}}>
                  {user?.name}
                </Typography>
                <Typography  fontSize="0.75rem" sx={{color: theme.palette.secondary[200]}}>
                  {user?.occupation}
                </Typography>
			</Box>
                <ArrowDropDownOutlined sx={{
					color: theme.palette.secondary[300],fontSize: "25px" }} />
			</Button>
			<Menu anchorEl={anchorEl} open={isOpen} close={handleClose} anchorOrigin={{ vertical:"bottom" , horizontal:"center"}}>
				
			</Menu>
		 </FlexBetween>
		</FlexBetween>

		</Toolbar>
	</AppBar>
  )
}

export default Navbar