import React,{useState} from 'react';
import { FormControl,Box, InputLabel, Select, MenuItem } from '@mui/material';
import Header from '../../components/Header'
import OveriewChart from '../../components/OveriewChart'

const Overview = () => {

  const [view, setView ] = useState("units");

  return (
	<Box m="1.5rem 2.5rem">
    <Header title="OVERVIEW" subtitle = "Overview of general revenue and profit" />
    <Box height="75vh">
      <FormControl sx={{mt:"1rem"}}>
        <InputLabel>View</InputLabel>
        <Select
        value={view}
        label="view"
        onChange={(e)=>e.target.value}
        >
          <MenuItem value="sales">Sales</MenuItem>
          <MenuItem value="units">Units</MenuItem>

        </Select>
      </FormControl>
    </Box>

  </Box>
  )
}

export default Overview