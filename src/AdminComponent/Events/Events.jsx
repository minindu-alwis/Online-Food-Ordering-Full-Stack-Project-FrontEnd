import { Box, Button, Grid, Modal, TextField } from '@mui/material'
import React from 'react'


const Events = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () =>{
    
  }

  const [fromValues,setFormValues] = React.useState({
    image:"",
    location:"",
    name:"",
    startedAt:"",
    endsAt:null
  })

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleFormChange = (e) =>{
    setFormValues({...fromValues,[e.target.name]:e.tartget.value})
  } 


  return (
    <div>
      <div className='p-5'>
        <Button variant="contained" onClick={handleOpen}>Create New Event</Button>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField 
                name='image'
                label='Image URL'
                variant='outlined'
                fullWidth
                value={fromValues.image}
                onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField 
                name='location'
                label='Location'
                variant='outlined'
                fullWidth
                value={fromValues.location}
                onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField 
                name='name'
                label='Event Name'
                variant='outlined'
                fullWidth
                value={fromValues.name}
                onChange={handleFormChange}
                />
              </Grid>

          
            </Grid>

          </form>
          
        </Box>
      </Modal>


      </div>
    </div>
  )
}

export default Events