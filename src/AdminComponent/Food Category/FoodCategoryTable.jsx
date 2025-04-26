import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Card, 
  CardHeader,
  Chip,
  Divider,
  IconButton, 
  Modal, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import CreateFoodCategory from './CreateFoodCategory';
import { getRestaurantsCategory } from '../../component/State/Restaurant/Action';
import { fetchRestaurantOrders } from '../../component/State/Restaurant Order/Action';

const FoodCategoryTable = () => {
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store);
  const restaurantId = restaurant.userRestaurants?.id;
  const dispatch = useDispatch();
  
  // State management
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Modal style
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };
  
  // Modal handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // Filtered categories based on search term
  const filteredCategories = restaurant.categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Fetch data
  useEffect(() => {
    if (restaurantId) {
      setLoading(true);
      Promise.all([
        dispatch(getRestaurantsCategory({ jwt, restaurantId })),
        dispatch(fetchRestaurantOrders({ jwt, restaurantId }))
      ]).then(() => {
        setLoading(false);
      });
    }
  }, [restaurantId, jwt, dispatch]);
  
  // Refresh data handler
  const handleRefresh = () => {
    setLoading(true);
    Promise.all([
      dispatch(getRestaurantsCategory({ jwt, restaurantId })),
      dispatch(fetchRestaurantOrders({ jwt, restaurantId }))
    ]).then(() => {
      setLoading(false);
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Card elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <CardHeader
          title={
            <Box display="flex" alignItems="center">
              <Typography variant="h6" fontWeight="600">Food Categories</Typography>
              <Chip 
                label={`${restaurant.categories.length} Categories`} 
                size="small" 
                color="primary" 
                sx={{ ml: 2 }} 
              />
            </Box>
          }
          action={
            <Box display="flex">
              <Tooltip title="Refresh Data">
                <IconButton 
                  onClick={handleRefresh} 
                  color="primary" 
                  sx={{ mr: 1 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : <RefreshIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Add New Category">
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<AddIcon />} 
                  onClick={handleOpen}
                  size="small"
                >
                  Add Category
                </Button>
              </Tooltip>
            </Box>
          }
        />
        
        <Divider />
        
        <Box p={2}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Box>
        
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="food categories table">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#00000' }}>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>ID</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Category Name</TableCell>
                
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    <CircularProgress size={30} />
                    <Typography color="textSecondary" sx={{ mt: 1 }}>
                      Loading categories...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                    <Typography color="textSecondary">
                      {searchTerm ? 'No matching categories found' : 'No categories available'}
                    </Typography>
                    <Button 
                      variant="text" 
                      color="primary" 
                      onClick={handleOpen} 
                      startIcon={<AddIcon />}
                      sx={{ mt: 1 }}
                    >
                      Add Your First Category
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCategories.map((category) => (
                  <TableRow
                    key={category.id}
                    sx={{ 
                      '&:hover': { backgroundColor: '##FFBF00' },
                      '&:last-child td, &:last-child th': { border: 0 } 
                    }}
                  >
                    <TableCell>{category.id}</TableCell>
                    <TableCell align="center">
                      <Typography variant="body1" fontWeight="500">
                        {category.name}
                      </Typography>
                    </TableCell>
                    
                    <TableCell align="right">
                      <Tooltip title="Edit Category">
                        <IconButton size="small" color="primary" sx={{ mr: 1 }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Category">
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Create New Food Category
          </Typography>
          <CreateFoodCategory onSuccess={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default FoodCategoryTable;