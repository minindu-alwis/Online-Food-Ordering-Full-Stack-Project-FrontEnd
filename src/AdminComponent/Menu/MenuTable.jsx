import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  alpha
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getRestaurantFoods } from '../../component/State/Menu/Action';

const MenuTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  
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
  
  const handleDeleteConfirm = () => {
    if (selectedFoodId) {
      dispatch(deleteFoodAction({foodId: selectedFoodId, jwt}));
      setDeleteConfirmOpen(false);
      setSelectedFoodId(null);
    }
  };

  const handleDeleteClick = (foodId) => {
    setSelectedFoodId(foodId);
    setDeleteConfirmOpen(true);
  };

  const handleEditFood = (foodId) => {
    navigate(`/admin/restaurants`);
  };
  
  return (
    <Box sx={{ mb: 4 }}>
      <Card elevation={3} sx={{ backgroundColor: '#121212', color: '#fff', borderRadius: '12px' }}>
        <CardHeader
          avatar={
            <Box sx={{ backgroundColor: alpha('#fff', 0.1), p: 1, borderRadius: '10px' }}>
              <RestaurantMenuIcon sx={{ color: '#FFD700' }} fontSize="large" />
            </Box>
          }
          action={
            <Button
              variant="contained"
              sx={{ 
                marginTop: '12px',
    marginRight: '15px',
                backgroundColor: '#FFD700', 
                color: '#000', 
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: alpha('#FFD700', 0.8),
                }
              }}
              startIcon={<AddIcon />}
              onClick={() => navigate("/admin/restaurants/add-menu/")}
            >
              Add New Item
            </Button>
          }
          title={
            <Typography variant="h5" fontWeight="bold" color="#fff">
              Menu Management
            </Typography>
          }
          subheader={
            <Typography variant="subtitle2" color="#bdbdbd">
              {menu.menuItems.length} items available
            </Typography>
          }
          sx={{ borderBottom: '1px solid #333', pb: 2 }}
        />
        
        <TableContainer component={Paper} sx={{ backgroundColor: '#121212', boxShadow: 'none' }}>
          <Table sx={{ minWidth: 650 }} aria-label="menu items table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ color: '#FFD700', fontWeight: 'bold', borderBottom: '1px solid #333' }}>Item</TableCell>
                <TableCell align="left" sx={{ color: '#FFD700', fontWeight: 'bold', borderBottom: '1px solid #333' }}>Name</TableCell>
                <TableCell align="left" sx={{ color: '#FFD700', fontWeight: 'bold', borderBottom: '1px solid #333' }}>Ingredients</TableCell>
                <TableCell align="right" sx={{ color: '#FFD700', fontWeight: 'bold', borderBottom: '1px solid #333' }}>Price</TableCell>
                <TableCell align="center" sx={{ color: '#FFD700', fontWeight: 'bold', borderBottom: '1px solid #333' }}>Status</TableCell>
                <TableCell align="center" sx={{ color: '#FFD700', fontWeight: 'bold', borderBottom: '1px solid #333' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.length > 0 ? (
                menu.menuItems.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{ 
                      '&:nth-of-type(odd)': { backgroundColor: alpha('#fff', 0.03) },
                      '&:hover': { backgroundColor: alpha('#FFD700', 0.07) },
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <TableCell sx={{ borderBottom: '1px solid #333' }}>
                      <Avatar 
                        src={item.images[0]} 
                        variant="rounded"
                        sx={{ 
                          width: 60, 
                          height: 60, 
                          border: '2px solid #FFD700',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.5)'
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#fff', borderBottom: '1px solid #333' }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {item.name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #333' }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {item.ingredients.map((ingredient, index) => (
                          <Chip 
                            key={index}
                            label={ingredient.name}
                            size="small"
                            sx={{ 
                              backgroundColor: alpha('#FFD700', 0.2), 
                              color: '#fff', 
                              mr: 0.5, 
                              mb: 0.5,
                              border: '1px solid #FFD700',
                            }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ color: '#fff', borderBottom: '1px solid #333' }}>
                      <Typography variant="body1" fontWeight="bold" sx={{ color: '#FFD700' }}>
                        ${item.price.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: '1px solid #333' }}>
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="In Stock"
                        sx={{ 
                          backgroundColor: alpha('#4CAF50', 0.2), 
                          color: '#4CAF50', 
                          fontWeight: 'bold',
                          border: '1px solid #4CAF50'
                        }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: '1px solid #333' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Tooltip title="Edit item">
                          <IconButton 
                            onClick={() => handleEditFood(item.id)}
                            size="small"
                            sx={{ 
                              color: '#FFD700', 
                              mr: 1,
                              backgroundColor: alpha('#FFD700', 0.1),
                              '&:hover': {
                                backgroundColor: alpha('#FFD700', 0.2)
                              }
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete item">
                          <IconButton 
                            onClick={() => handleDeleteClick(item.id)}
                            size="small"
                            sx={{ 
                              color: '#f44336',
                              backgroundColor: alpha('#f44336', 0.1),
                              '&:hover': {
                                backgroundColor: alpha('#f44336', 0.2)
                              }
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4, color: '#bdbdbd', borderBottom: '1px solid #333' }}>
                    <Box sx={{ p: 4 }}>
                      <Typography variant="h6" color="#bdbdbd" gutterBottom>
                        Your menu is empty
                      </Typography>
                      <Typography variant="body2" color="#999" sx={{ mb: 2 }}>
                        Add your first menu item to get started
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => navigate("/admin/restaurants/add-menu/")}
                        sx={{ 
                          borderColor: '#FFD700', 
                          color: '#FFD700',
                          '&:hover': {
                            borderColor: alpha('#FFD700', 0.8),
                            backgroundColor: alpha('#FFD700', 0.1)
                          }
                        }}
                      >
                        Add Menu Item
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        PaperProps={{
          style: {
            backgroundColor: '#222',
            color: '#fff',
            borderRadius: '10px'
          }
        }}
      >
        <DialogTitle sx={{ color: '#f44336' }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#bdbdbd' }}>
            Are you sure you want to remove this item from your menu? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setDeleteConfirmOpen(false)} 
            sx={{ color: '#bdbdbd' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            sx={{ 
              backgroundColor: '#f44336', 
              color: '#fff',
              '&:hover': {
                backgroundColor: alpha('#f44336', 0.8)
              } 
            }}
            autoFocus
          >
            Delete Item
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuTable;