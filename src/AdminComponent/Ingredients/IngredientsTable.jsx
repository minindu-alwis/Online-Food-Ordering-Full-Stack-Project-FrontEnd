import React, { useEffect } from 'react'
import { 
  Box, 
  Button, 
  Card, 
  CardHeader, 
  IconButton, 
  Modal, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  Typography,
  Avatar,
  Divider
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import AddIcon from '@mui/icons-material/Add'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import LocalDiningIcon from '@mui/icons-material/LocalDining'
import CreateIngredientForm from './CreateIngredientForm'
import { useDispatch, useSelector } from 'react-redux'
import { getAllIngredientsOfRestaurant, updateStock } from '../../component/State/Ingredients/Action'

const IngredientsTable = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  }

  const jwt = localStorage.getItem("jwt")
  const { restaurant, ingredients } = useSelector((store) => store)
  const dispatch = useDispatch()
  const id = restaurant.userRestaurants?.id

  useEffect(() => {
    if (jwt && id) {
      dispatch(getAllIngredientsOfRestaurant({ jwt, id }))
    }
  }, [dispatch, jwt, id])

  const handleUpdateStock = (inId) => {
    if (!inId) return
    dispatch(updateStock({ inId, jwt }))
      .then(() => {
        dispatch(getAllIngredientsOfRestaurant({ jwt, id }))
      })
  }

  return (
    <Box>
      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <LocalDiningIcon />
            </Avatar>
          }
          action={
            <IconButton onClick={handleOpen} color="primary">
              <AddIcon />
            </IconButton>
          }
          title={<Typography variant="h6" fontWeight="600">Ingredients</Typography>}
          subheader="Manage your restaurant's ingredients"
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        />

        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="ingredients table">
            <TableHead sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Category</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.ingredients?.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography fontWeight="500">{item.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={item.category?.name || 'Uncategorized'} 
                      size="small"
                      color="secondary"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      icon={item.inStock ? <CheckCircleIcon /> : <CancelIcon />}
                      label={item.inStock ? "In Stock" : "Out of Stock"}
                      color={item.inStock ? "success" : "error"}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleUpdateStock(item.id)}
                      variant="contained"
                      size="small"
                      color={item.inStock ? "success" : "error"}
                      sx={{ mr: 1 }}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </Button>
                    <IconButton size="small">
                      <CreateIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
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
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
            Add New Ingredient
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <CreateIngredientForm handleClose={handleClose}/>
        </Box>
      </Modal>
    </Box>
  )
}

export default IngredientsTable