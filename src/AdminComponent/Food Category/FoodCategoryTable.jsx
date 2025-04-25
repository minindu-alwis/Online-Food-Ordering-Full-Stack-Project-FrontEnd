import { Box, Card, CardActions, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import CreateFoodCategory from './CreateFoodCategory';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsCategory } from '../../component/State/Restaurant/Action';
import { fetchRestaurantOrders } from '../../component/State/Restaurant Order/Action';

const orders = [1,1,1,1,1,1,1,1]
const FoodCategoryTable = () => {

  
   const jwt = localStorage.getItem("jwt")
     const {restaurant } = useSelector((store) => store)
     console.log("restauren",restaurant);
     
     const restaurantId = restaurant.userRestaurants?.id
     const dispatch=useDispatch()



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
      useEffect(() => {
          if (restaurantId) {
              // Fetch restaurant categories
              dispatch(getRestaurantsCategory({
                  jwt,
                  restaurantId
              }))
  
              // Fetch restaurant orders
              dispatch(fetchRestaurantOrders({
                  jwt,
                  restaurantId,
              }))
  
              // You might want to add these too
              //dispatch(getMenuItemsByRestaurantId({ restaurantId, jwt }))
              //dispatch(getRestaurantById({ restaurantId, jwt }))
          }
      }, [restaurantId, jwt])



  return (
    <Box>
        <Card className='mt-1'>
            <CardHeader
            action={
                <IconButton onClick={handleOpen} aria-label="settings">
                  <CreateIcon />
                </IconButton>
              }
            title={"Food Category"}
            sx={{pt:2,alignItems:"center"}}
            />


<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Name</TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurant.categories.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell align="left">{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>



        </Card>

        <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <CreateFoodCategory/>
  </Box>
</Modal>

</Box>
  )
}

export default FoodCategoryTable