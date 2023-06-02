import React from 'react'
import {Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import { SettingsOutlined } from '@material-ui/icons'
import { useEffect,useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';

const Sidebar = ({drawerWidth,isNonMobile,isSidebarOpen,setisSidebarOpen}) => {
  const {pathname} = useLocation();
  const [active, setActive]= useState("");
  const navigate = useNavigate();
  const theme= useTheme();


  useEffect(()=>{
    setActive(pathname.substring(1));
  },[pathname])

  return (
    <Box component="nav">
      {isSidebarOpen && (
      <Drawer 
      open={isSidebarOpen}
      onClose={()=> setisSidebarOpen(false)}
      variant='persistent'
      anchor="left"
      sx={{
        width:drawerWidth,
        "& .MuiDrawer-paper":{
          color:theme.palette.secondary[200],
          backgroundColor:theme.palette.background.alt,
          boxSixing:'border-box',
          borderWidth: isNonMobile ? 0 : "2px",
          width:drawerWidth
        }
      }}
      />)}

    </Box>
  )
}

export default Sidebar