import { Box, Button, Card, Divider, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { AddressCard } from './AddressCard'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/Action';
import { clearCart } from '../State/Cart/Action';
import { useNavigate } from 'react-router-dom';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  postalCode: "",
  city: ""
}

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [billDetails, setBillDetails] = useState({
    itemTotal: 0,
    deliveryFee: 90,
    platformFee: 20,
    restaurantCharges: 20,
    totalPayment: 130 // Initial sum of fees
  });

  const { cart, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  
  // This handles opening the modal
  const handleOpenAddressModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Use the cartItems directly from Redux store
  const cartItems = cart.cartItems || [];
  const hasItems = cartItems.length > 0;

  // Update bill details whenever cart changes
  useEffect(() => {
    // Calculate total price from all cart items
    let itemTotal = 0;
    if (cartItems && cartItems.length > 0) {
      itemTotal = cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);
    }

    // Update bill details
    setBillDetails({
      itemTotal,
      deliveryFee: 90,
      platformFee: 20,
      restaurantCharges: 20,
      totalPayment: itemTotal + 90 + 20 + 20
    });
    
    
    console.log("Bill details updated:", itemTotal);
  }, [cartItems]);
  
  const handleSubmit = async (values) => {
    if (!cartItems || cartItems.length === 0) {
      console.error("Cart is empty. Cannot create an order.");
      return;
    }

    const restaurantId = cartItems[0]?.food?.restaurant?.id;
    if (!restaurantId) {
      console.error("Restaurant ID is missing.");
      return;
    }

    const data = {
      jwt,
      order: {
        restaurantId,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: "Sri Lanka",
        },
      },
    };

    try {
      const result = await dispatch(createOrder(data));
      console.log("created order", result);

      if (result?.payment_url) {
        window.location.href = result.payment_url;
        dispatch(clearCart(jwt));
      }
    } catch (err) {
      console.error("Order creation failed", err);
    }
  };

  const EmptyCartUI = () => (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/123.mp4" type="video/mp4" />
        
      </video>
  
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 bg-black/60">
        <div className="flex flex-col items-center justify-center bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg">
          <div className="relative mb-6">
            <div className="absolute -top-4 -right-4 bg-red-500 rounded-full p-3 shadow-lg">
              <ShoppingCartIcon fontSize="medium" className="text-white" />
            </div>
            <div className="bg-gray-800 rounded-full p-8 mb-2">
              <img 
                src="/api/placeholder/180/180" 
                alt="Empty cart" 
                className="opacity-70"
              />
            </div>
          </div>
          
          <Typography variant="h5" className="text-white font-bold mb-2 text-center">
            Your Cart is Empty
          </Typography>
          
          <Typography variant="body1" className="text-gray-400 mb-6 mt-22 text-center">
            Looks like you haven't added any delicious items to your cart yet
          </Typography>
          
          <Divider className="w-full bg-gray-700 my-6" />
          
          <div className="w-full space-y-4">
            <Button 
              variant="contained" 
              color="primary"
              fullWidth
              size="large"
              startIcon={<RestaurantIcon />}
              onClick={() => navigate('/')}
              className="py-3"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                mt: '16px'
              }}
            >
              Browse Restaurants
            </Button>
            
            <Button 
              variant="outlined" 
              color="primary"
              fullWidth
              size="large"
              onClick={() => navigate('/')}
              className="py-3"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              View Today's Offers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  

  return (
    <>
      {!hasItems ? (
        <EmptyCartUI />
      ) : (
        <main className="lg:flex justify-between bg-black min-h-screen">
          <section className="lg:w-1/3 space-y-6 p-5 bg-black shadow-sm">
            <Typography variant="h5" className="font-semibold pb-4 border-b">
              Your Cart
            </Typography>

            {cartItems.map((item, index) => (
              <CartItem key={`${item.id}-${item.quantity}-${index}`} item={item} />
            ))}

            <Divider />

            <div className="billDetails px-2 text-sm">
              <Typography variant="subtitle1" className="font-medium py-3">
                Bill Details
              </Typography>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Typography variant="body2" color="textSecondary">Item Total</Typography>
                  <Typography variant="body2">Rs {billDetails.itemTotal}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body2" color="textSecondary">Delivery Fee</Typography>
                  <Typography variant="body2">Rs {billDetails.deliveryFee}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body2" color="textSecondary">Platform Fee</Typography>
                  <Typography variant="body2">Rs {billDetails.platformFee}</Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="body2" color="textSecondary">Restaurant Charges</Typography>
                  <Typography variant="body2">Rs {billDetails.restaurantCharges}</Typography>
                </div>

                <Divider />

                <div className="flex justify-between font-medium pt-2">
                  <Typography variant="subtitle2">Total Payment</Typography>
                  <Typography variant="subtitle2" color="primary">Rs {billDetails.totalPayment}</Typography>
                </div>
              </div>
            </div>
          </section>

          <Divider orientation="vertical" flexItem className="hidden lg:block" />

          <section className="lg:w-2/3 p-5">
            <Box className="max-w-2xl mx-auto">
              <Typography variant="h5" className="font-semibold text-center py-6">
                Delivery Address
              </Typography>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {/* This would show saved addresses when implemented */}
                
                <Card className="flex items-center gap-4 p-4 border hover:border-primary cursor-pointer transition-all">
                  <AddLocationAltIcon color="primary" fontSize="large" />
                  <div className="space-y-2">
                    <Typography variant="subtitle1" className="font-medium">
                      Add New Address
                    </Typography>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenAddressModal}
                      size="small"
                    >
                      Add Address
                    </Button>
                  </div>
                </Card>
              </div>
            </Box>
          </section>
        </main>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-address-modal"
      >
        <Box sx={style}>
          <Typography variant="h6" className="mb-4">Add Delivery Address</Typography>
          
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage name="streetAddress" component="div" className="text-red-500 text-sm mt-1" />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="postalCode"
                    label="Postal Code"
                    fullWidth
                    variant="outlined"
                  />
                  <ErrorMessage name="postalCode" component="div" className="text-red-500 text-sm mt-1" />
                </Grid>

                <Grid item xs={12} className="mt-4">
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;