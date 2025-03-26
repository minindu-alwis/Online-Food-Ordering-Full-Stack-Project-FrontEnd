import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const initialValues = {
    email: "",
    password: "",
    password: "",
    role: "ROLE_CUSTOMER"
}


const RegisterForm = () => {
    const navigate = useNavigate()

    const handleSubmit = (values) => {
        console.log("form values",values);
    }


    return (
        <div>
            <Typography variant='h5' className='text-center'>
                Login
            </Typography>

            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form>

                    <Field as={TextField}
                        name="fullName"
                        label="Full Name"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />

                    <Field as={TextField}
                        name="email"
                        label="email"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />

                    <Field as={TextField}
                        name="password"
                        label="password"
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        type="password"
                    />

                    <FormControl fullWidth margin='normal'>
                        <InputLabel id="role-simple-select-label">Role</InputLabel>
                        <Field as={Select}
                            labelId="role-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Role"
                            name='role'
                            // onChange={handleChange}
                        >
                            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant Owner</MenuItem>
                        </Field>
                    </FormControl>

                    <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type='submit' variant='contained'>
                        Register
                    </Button>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 2 }}>
                        <Typography variant='body2' color='text.secondary'>
                            If have an Account Already ?
                        </Typography>

                        <Button
                            variant='contained'
                            color='primary'
                            size='medium'
                            onClick={() => navigate('/account/login')}
                            sx={{
                                textTransform: 'capitalize',
                                fontWeight: 600,
                                px: 4,
                                boxShadow: 1,
                                '&:hover': {
                                    boxShadow: 2,
                                    transform: 'translateY(-1px)'
                                },
                                transition: 'all 0.2s ease-in-out'
                            }}
                        >
                            Login
                        </Button>
                    </Box>

                </Form>
            </Formik>

        </div>
    )
}

export default RegisterForm