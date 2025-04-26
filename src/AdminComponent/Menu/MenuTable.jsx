import { Avatar, Box, Card, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getRestaurantFoods } from '../../component/State/Menu/Action';

const MenuTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { restaurant, menu } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const restaurantId = restaurant.userRestaurants?.id;

  useEffect(() => {
    if (restaurantId && jwt) {
      dispatch(getRestaurantFoods({
        restaurantId,
        jwt
      }));
    }
  }, [restaurantId, jwt, dispatch]);
  
  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({foodId, jwt}));
  }
  return (
    <Box>
        <Card className='mt-1'>
            <CardHeader
            action={
                <IconButton onClick={()=>navigate("/admin/restaurants/add-menu/")} aria-label="settings">
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
          {menu.menuItems.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Avatar src={item.images[0]} />
              </TableCell>
              <TableCell align="right">{item.name}</TableCell>
              <TableCell align="right">
                {item.ingredients.map((ingredient)=><Chip label={ingredient.name}/>)}
              </TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.available?"in-stock":"out-of-stoke"}</TableCell>
              <TableCell align="right"><IconButton color='primary' onClick={()=>handleDeleteFood(item.id)}></IconButton><Delete/></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>



        </Card>
    </Box>
  )
}

export default MenuTable