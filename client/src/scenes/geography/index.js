import React from 'react'
import {Box,useTheme } from '@mui/material';
import { useGetGeographyQuery } from '../../state/api';
import {Header} from '../../components/Header';
import {ResponsiveChoropleth} from '@nivo/geo';
import { gisdata } from '../../state/gisData';

const Geography = () => {

	const theme = useTheme();
	const {data} = useGetGeographyQuery();



  return (
	<Box m="1.5rem 2.5rem">
		<Header title="GEOGRAPHY" subtitle="Find out where users are located"/>
		<Box 
		mt="40px"
		height="75vh"
		border={`1px solid ${theme.palette.secondary[200]}`}
		borderRadius="4px"
		>
		{data ? 
		<ResponsiveChoropleth
        data={gisdata.features}
		theme= {{
			axis: {
				domain : {
					line : {
						stroke: theme.palette.secondary[200]
					}
				}, 
				legend : {
					text : {
						fill: theme.palette.secondary[200]
					}
				}
			}
		}}
        features="/* please have a look at the description for usage */"
        margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
        colors="nivo"
        domain={[ 0, 1000000 ]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
		projectionScale={150}
        projectionTranslation={[ 0.5, 0.5 ]}
        projectionRotation={[ 0, 0, 0 ]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            },
            {
                id: 'gradient',
                type: 'linearGradient',
                colors: [
                    {
                        offset: 0,
                        color: '#000'
                    },
                    {
                        offset: 100,
                        color: 'inherit'
                    }
                ]
            }
        ]}
        fill={[
            {
                match: {
                    id: 'CAN'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'CHN'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'ATA'
                },
                id: 'gradient'
            }
        ]}
        legends={[
            {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: '#444444',
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000000',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    /> : <>Loading ...</>}

		</Box>
	</Box>
  )
}

export default Geography