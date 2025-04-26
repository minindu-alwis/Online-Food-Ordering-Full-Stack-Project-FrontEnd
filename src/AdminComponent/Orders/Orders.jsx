import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import OrderTable from './OrderTable';

const orderStatusOptions = [
    {label:"All", value:"ALL"},
    {label:"Pending", value:"PENDING"},
    {label:"Completed", value:"COMPLETED"},
    {label:"Out For Delivery", value:"OUT_FOR_DELIVERY"},
    {label:"Delivered", value:"DELIVERED"},
]

const Orders = () => {
    const [filterValue, setFilterValue] = useState("ALL");

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
    }

  return (
    <div className='px-2'>
        <Card className='p-5'>
            <Typography sx={{paddingBottom:"1rem"}} variant='h5'>
                Order Status
            </Typography>    

            <FormControl>
                <RadioGroup 
                    onChange={handleFilterChange} 
                    row 
                    name='order-status'
                    value={filterValue}
                >
                    {orderStatusOptions.map((item) => (
                        <FormControlLabel 
                            key={item.value}
                            value={item.value} 
                            control={<Radio />} 
                            label={item.label} 
                            sx={{color:"gray"}}
                        />
                    ))}
                </RadioGroup>
            </FormControl>   
        </Card>
        <OrderTable filterStatus={filterValue}/>
    </div>
  )
}

export default Orders