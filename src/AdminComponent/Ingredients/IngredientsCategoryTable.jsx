import React, { useEffect } from 'react'
import { 
  Box, 
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
  Typography,
  Avatar,
  Divider
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import AddIcon from '@mui/icons-material/Add'
import CategoryIcon from '@mui/icons-material/Category'
import CreateIngredientCategoryForm from './CreateIngredientCategoryForm'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredientCategory } from '../../component/State/Ingredients/Action'

const IngredientsCategoryTable = () => {
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

  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const { restaurant, ingredients } = useSelector((store) => store)
  const id = restaurant.userRestaurants?.id

  useEffect(() => {
    if (id && jwt) {
      dispatch(getIngredientCategory({ id, jwt }))
    }
  }, [id, jwt, dispatch])

  return (
    <Box>
      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <CategoryIcon />
            </Avatar>
          }
          action={
            <IconButton onClick={handleOpen} color="secondary">
              <AddIcon />
            </IconButton>
          }
          title={<Typography variant="h6" fontWeight="600">Ingredient Categories</Typography>}
          subheader="Organize your ingredients into categories"
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        />

        <TableContainer component={Paper} elevation={0}>
          <Table aria-label="category table">
            <TableHead sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Category Name</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.category.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography fontWeight="500">{item.name}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
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
            Add New Category
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <CreateIngredientCategoryForm handleClose={handleClose}/>
        </Box>
      </Modal>
    </Box>
  )
}

export default IngredientsCategoryTable