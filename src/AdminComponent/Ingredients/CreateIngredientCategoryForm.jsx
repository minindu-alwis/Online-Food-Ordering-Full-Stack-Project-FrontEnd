import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const CreateIngredientCategoryForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        restaurantId: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: formData.name,
            restaurantId: formData.restaurantId
        };
        console.log(data);
        // Add your API call here
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <div className='p-5'>
            <h1 className='space-y-5 text-gray-400 text-center text-xl pb-10'>Create Ingredient Category</h1>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        fullWidth
                        id='name'
                        name='name'
                        label='Food Category'
                        variant='outlined'
                        onChange={handleInputChange}
                        value={formData.name}
                    />
                    
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
                                    backgroundColor: 'primary.main',
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
    )
}

export default CreateIngredientCategoryForm