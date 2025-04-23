import { Box, Card, CardActions, CardHeader, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';

const orders = [1,1,1,1,1,1,1,1]
const FoodCategoryTable = () => {
  return (
    <Box>
        <Card className='mt-1'>
            <CardHeader
            action={
                <IconButton aria-label="settings">
                  <CreateIcon />
                </IconButton>
              }
            title={"Menu"}
            sx={{pt:2,alignItems:"center"}}
            />


<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Image</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Ingredients</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Avaibilty</TableCell>
            <TableCell align="right">Delete</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {1}
              </TableCell>
              <TableCell align="right">{"Image"}</TableCell>
              <TableCell align="right">{"minidualwis@gmail.com"}</TableCell>
              <TableCell align="right">{"price"}</TableCell>
              <TableCell align="right">{"burger"}</TableCell>
              <TableCell align="right"><IconButton></IconButton><Delete/></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>



        </Card>
    </Box>
  )
}

export default FoodCategoryTable