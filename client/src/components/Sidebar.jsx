import React from 'react'
import {Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import { ChevronLeft, HomeOutlined, PublicOutlined, SettingsOutlined, ShoppingCartOutlined, TodayOutlined, TrendingUpOutlined } from '@material-ui/icons'
import { useEffect,useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import { AdminPanelSettingsOutlined, CalendarMonthOutlined, Groups2Outlined, LibraryAddCheckRounded, PieChartOutlineOutlined, PointOfSaleOutlined, ReceiptLongOutlined } from '@mui/icons-material';

const navItems=[
  {
    text:"Dashboard",
    icon:<HomeOutlined/>
  },
  {
    text:"Client Facing",
    icon:null,
  },
  {
    text:"Products",
    icon:<ShoppingCartOutlined/>
  },
  {
    text:"Transactions",
    icon:<ReceiptLongOutlined/>
  },
  {
    text:"Geography",
    icon:<PublicOutlined/>
  },
  {
    text:"Sales",
    icon:null
  },
  {
    text:"Overview",
    icon:<PointOfSaleOutlined/>
  },
  {
    text:"Daily",
    icon:<TodayOutlined/>
  },
  {
    text:"Monthly",
    icon: <CalendarMonthOutlined/>
  },
  {
    text:"Breakdown",
    icon: <PieChartOutlineOutlined/>
  },
  {
    text:"Management",
    icon: null
  },
  {
    text:"Admin",
    icon: <AdminPanelSettingsOutlined/>
  },
  {
    text:"Performance",
    icon: <TrendingUpOutlined/>
  }

]



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
      >
        <Box width="100%">
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display="flex" alignItems="center" gap="0.5rem"
              >
                <Typography variant='h4' fontWeight="bold">
                  EcomVision
                </Typography>
              </Box>
              {!isNonMobile && (
                <IconButton onClick={()=> setisSidebarOpen(!isSidebarOpen)}>
                  <ChevronLeft />
                </IconButton>
              )}
            </FlexBetween>
          </Box>
          <List>
                {navItems.map(({text,icon})=> {
                  if (!icon) {
                    return (
                      <Typography key={text} sx={{ m:"2.5rem 0 1rem 3rem" }}>
                        {text}
                      </Typography>
                    )
                  }

                  const lowerText = text.toLowerCase()
                  return (
                  <ListItem key={text} disablePadding>
                  </ListItem>
                  )
                  
                })}
          </List>
        </Box>
      </Drawer>
      )}
    </Box>
  )
}

export default Sidebar