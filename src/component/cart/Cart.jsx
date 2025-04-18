import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material'
import React from 'react'
import CartItem from './CartItem'
import { AddressCard } from './AddressCard'
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik } from 'formik';
// import * as Yup from "yup"


export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline:"none",
    boxShadow: 24,
    p: 4,
  };

const initialValues={
    streetAddress:"",
    state:"",
    postatlcode:"",
    city:""
}  

// const validationSchema=Yup.object.shape({
//     streetAddress:Yup.string().required('Street Address is Required'),
//     state:Yup.string().required('State is Required'),
//     postatlcode:Yup.string().required('Postal Code is Required'),
//     city:Yup.string().required('City is Required'),

// })

const items = [1, 1]

const Cart = () => {

    const createOrderUseingSelectedAddress=()=>{

    }

    const handleOpenAddressModal=()=> setOpen(true);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleSubmit = (values)=>{
        console.log("from value",values);
        
    }

    return (
        <>
            <main className='lg:flex justify-between'>
                <section className='lg:w-[30] space-y-6 lg:min-h-screen pt-10'>

                    {items.map((item) => <CartItem />)}



                    <Divider />

                    <div className='billDetails px-5 text-sm'>

                        <p className='font-extralight py-5'>Bill Details</p>

                        <div className='space-y-3'>
                            <div className='flex justify-between text-gray-400'>
                                <p>Item Total</p>
                                <p>Rs 100</p>
                            </div>

                            <div className='flex justify-between text-gray-400'>
                                <p>Deliver Fee</p>
                                <p>Rs 90</p>
                            </div>

                            <div className='flex justify-between text-gray-400'>
                                <p>Platform Fee</p>
                                <p>Rs 20</p>
                            </div>

                            <div className='flex justify-between text-gray-400'>
                                <p>Restaurent Chargers</p>
                                <p>Rs 20</p>
                            </div>

                            <Divider/>

                        </div>

                    <div className='flex justify-between text-gray-400'>
                        <p>Total Payment</p>
                        <p>Rs 5000</p>

                    </div>

                    </div>

                </section>


                <Divider orientation='vertical' flexItem/>

                <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>

                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivary Address</h1>
                   <div className='flex gap-5 flex-wrap justify-center'>
                        {[1,1,1,1,1].map((item)=><AddressCard handleSelectAddress={createOrderUseingSelectedAddress} item={item} showButton={true}/>)}
                  
                  <Card className="flex gap-5 w-64 p-5">
                          <AddLocationAltIcon/>
                          <div className='space-y-3 text-gray-500'>
                              <h1 className='font-semibold  text-lg text-white'>Add New Address</h1>
                          
                  
                            <Button variant='outlined' fullWidth  onClick={handleOpenAddressModal}>Add</Button>
                  
                          </div>
                      </Card>
                  
                   </div>
                    </div>



                </section>



            </main>

            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>

            <Formik initialValues={initialValues} onSubmit={handleSubmit} 
            // validationSchema={validationSchema}
            >

                <Form>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <Field as={TextField}
                        name="streetAddress"
                        label="Street Address"
                        fullWidth
                        variant="outlined"
                        error={!ErrorMessage("StreetAddress")}
                        // helperText={
                        //     <ErrorMessage>
                        //         {(msg)=><span className='text-red-600'>{msg}</span>}
                        //     </ErrorMessage>
                        // }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Field as={TextField}
                        name="state"
                        label="State"
                        fullWidth
                        variant="outlined"
                        error={!ErrorMessage("StreetAddress")}
                        // helperText={
                        //     <ErrorMessage>
                        //         {(msg)=><span className='text-red-600'>{msg}</span>}
                        //     </ErrorMessage>
                        // }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Field as={TextField}
                        name="city"
                        label="City"
                        fullWidth
                        variant="outlined"
                        error={!ErrorMessage("StreetAddress")}
                        // helperText={
                        //     <ErrorMessage>
                        //         {(msg)=><span className='text-red-600'>{msg}</span>}
                        //     </ErrorMessage>
                        // }
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <Field as={TextField}
                        name="postatlcode"
                        label="Postal Code"
                        fullWidth
                        variant="outlined"
                        error={!ErrorMessage("StreetAddress")}
                        // helperText={
                        //     <ErrorMessage>
                        //         {(msg)=><span className='text-red-600'>{msg}</span>}
                        //     </ErrorMessage>
                        // }
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" type="submit" color='secondary'>Deliver Here</Button>

                    </Grid>

                    

                    

                </Grid>
                </Form>
            </Formik>
        
        </Box>
        </Modal>

    </>
    )
}

export default Cart