import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'

const CreateIngredientForm = () => {

    const [formData,setFormData] = useState({name:"",ingredientCategoryId:""})

    const handleSubmit = () => {
        const data = {
            name: formData.categoryName,  
            restaurantId: {
                id: 1
            }
        };
        console.log(data);
    }

    const handleInputChange = (e) => {
        const {name,value}=e.target
        setFormData({
            ...formData,[name]:value
        })
    }

  return (
    <div>

        <div className='p-5'>

            <h1 className='space-y-5 text-gray-400 text-center text-xl pb-10'>Create Ingredient</h1>

            <form onSubmit={handleSubmit}>
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    <TextField
      fullWidth
      id='ingredient'
      name='ingredient'
      label='Ingredient'
      variant='outlined'
      onChange={handleInputChange}
      value={formData.ingredient}
    />

<FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="category"
                    value={formData.ingredientCategoryId}
                    label="Category"
                    onChange={handleInputChange}
                    name='ingredientCategoryId'
                >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>
                </FormControl>
    
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                    variant='contained'
                    type='submit'
                    sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    backgroundColor: '#1976d2',
                    '&:hover': {
                        backgroundColor: 'primary',
                        transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                    boxShadow: 2,
                    borderRadius: 1
                    }}
                >
                    Create Category
                </Button>
                </Box>
            </Box>
            </form>
        </div>
        
    </div>
  )
}

export default CreateIngredientForm