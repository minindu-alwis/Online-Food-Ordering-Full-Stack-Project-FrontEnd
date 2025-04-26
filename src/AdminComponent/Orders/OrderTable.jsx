import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRestaurantOrders, updateOrderStatus } from '../../component/State/Restaurant Order/Action';

const orderStatus = [
  { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Delivered", value: "DELIVERED" },
];

const OrderTable = ({ filterStatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { restaurant, menu, restaurantOrder } = useSelector((store) => store);
  console.log("restaurant orders", restaurantOrder);
  
  const jwt = localStorage.getItem("jwt");
  const restaurantId = restaurant.userRestaurants?.id;

  const [anchorElMap, setAnchorElMap] = React.useState({});

  const handleClick = (event, orderId) => {
    setAnchorElMap(prev => ({
      ...prev,
      [orderId]: event.currentTarget
    }));
  };

  const handleClose = (orderId) => {
    setAnchorElMap(prev => ({
      ...prev,
      [orderId]: null
    }));
  };

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantOrders({
        jwt,
        restaurantId,
        status: filterStatus === "ALL" ? null : filterStatus
      }))
    }
  }, [restaurantId, jwt, filterStatus]);

  const handleUpdateOrder = (orderId, orderStatus) => {
    console.log("orderId", orderId, orderStatus);
    dispatch(updateOrderStatus({orderId, orderStatus, jwt}));
    handleClose(orderId);
  };

  // Filter orders based on the filterStatus
  const filteredOrders = filterStatus === "ALL" 
    ? restaurantOrder.orders 
    : restaurantOrder.orders.filter(order => order.orderStatus === filterStatus);

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader 
          title={"All Orders"}
          sx={{pt:2, alignItems:"center"}}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((item) => {
                const isMenuOpen = Boolean(anchorElMap[item.id]);
                
                return (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">
                      <AvatarGroup>
                        {item.items.map((orderItem, index) => (
                          <Avatar key={index} src={orderItem.food.images[0]} />
                        ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell align="right">{item.customer?.fullName}</TableCell>
                    <TableCell align="right">Rs {item.totalPrice} .00</TableCell>
                    <TableCell align="right">
                      {item.items.map((orderItem, index) => (
                        <p key={index}>{orderItem.food?.name}</p>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      {item.items.map((orderItem, index) => (
                        <div key={index}>
                          {orderItem.ingredients?.length > 0 ? (
                            orderItem.ingredients.map((ingredient, i) => (
                              <Chip key={i} label={ingredient} />
                            ))
                          ) : (
                            <Chip label="No ingredients" color="primary" />
                          )}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell align="right">{item.orderStatus}</TableCell>
                    <TableCell align="right">
                      <Button
                        id={`basic-button-${item.id}`}
                        aria-controls={isMenuOpen ? `basic-menu-${item.id}` : undefined}
                        aria-haspopup="true"
                        aria-expanded={isMenuOpen ? 'true' : undefined}
                        onClick={(e) => handleClick(e, item.id)}
                      >
                        Update
                      </Button>
                      <Menu
                        id={`basic-menu-${item.id}`}
                        anchorEl={anchorElMap[item.id]}
                        open={isMenuOpen}
                        onClose={() => handleClose(item.id)}
                        MenuListProps={{
                          'aria-labelledby': `basic-button-${item.id}`,
                        }}
                      >
                        {orderStatus.map((status, index) => (
                          <MenuItem 
                            key={index}
                            onClick={() => handleUpdateOrder(item.id, status.value)}
                          >
                            {status.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}

export default OrderTable