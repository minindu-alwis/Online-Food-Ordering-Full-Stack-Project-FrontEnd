import { Box, Button, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../State/Authentication/Action'


const initialValues = {
    email: "",
    password: ""
}

const LoginForm = () => {

    const navigate = useNavigate()
    const dispatch=useDispatch()

    const handleSubmit = (values) => {

        dispatch(loginUser({userData:values,navigate}))

    }

    return (
        <div>
            <Typography variant='h5' className='text-center'>
                Login
            </Typography>

            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form>
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
                    />

                    <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type='submit' variant='contained'>
                        Login
                    </Button>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mt: 2 }}>
                        <Typography variant='body2' color='text.secondary'>
                            Don't have an account?
                        </Typography>

                        <Button
                            variant='contained'
                            color='primary'
                            size='medium'
                            onClick={() => navigate('/account/register')}
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
                            Create Account
                        </Button>
                    </Box>

                </Form>
            </Formik>

        </div>
    )
}

export default LoginForm