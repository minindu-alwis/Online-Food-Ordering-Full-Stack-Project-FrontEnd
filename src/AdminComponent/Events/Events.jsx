import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import React from 'react'
import { styled, keyframes } from '@mui/system'

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

// Styled components
const AnimatedButton = styled(Button)({
  animation: `${pulse} 2s infinite`,
  '&:hover': {
    animation: 'none',
    transform: 'scale(1.05)'
  }
})

const EventCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-5px)'
  }
}))

const Events = () => {
  const [open, setOpen] = React.useState(false)
  const [events, setEvents] = React.useState([])
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [formValues, setFormValues] = React.useState({
    image: '',
    location: '',
    name: '',
    startedAt: '',
    endsAt: null,
    description: ''
  })

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    animation: `${fadeIn} 0.3s ease-out`
  }

  const handleFormChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setEvents([...events, {
        ...formValues,
        id: Date.now()
      }])
      setFormValues({
        image: '',
        location: '',
        name: '',
        startedAt: '',
        endsAt: null,
        description: ''
      })
      setIsSubmitting(false)
      handleClose()
    }, 1000)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Restaurant Events
        </Typography>
        <AnimatedButton 
          variant="contained" 
          onClick={handleOpen}
          color="primary"
          sx={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          }}
        >
          Create New Event
        </AnimatedButton>
      </Box>

      {/* Events List */}
      {events.length > 0 ? (
        <Grid container spacing={3}>
          {events.map(event => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <EventCard>
                {event.image && (
                  <Box 
                    sx={{ 
                      height: 150, 
                      backgroundImage: `url(${event.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '4px',
                      mb: 2
                    }}
                  />
                )}
                <Typography variant="h6" gutterBottom>
                  {event.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {event.location}
                </Typography>
                <Typography variant="caption" display="block">
                  {event.startedAt} {event.endsAt && `- ${event.endsAt}`}
                </Typography>
                {event.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {event.description}
                  </Typography>
                )}
              </EventCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ 
          textAlign: 'center', 
          py: 10,
          opacity: 0.7
        }}>
          <Typography variant="h6" gutterBottom>
            No events scheduled yet
          </Typography>
          <Typography variant="body1">
            Create your first event to attract more customers!
          </Typography>
        </Box>
      )}

      {/* Create Event Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
            Create New Event
          </Typography>
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField 
                  name="image"
                  label="Image URL"
                  variant="outlined"
                  fullWidth
                  value={formValues.image}
                  onChange={handleFormChange}
                  placeholder="https://example.com/event-image.jpg"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField 
                  name="name"
                  label="Event Name"
                  variant="outlined"
                  fullWidth
                  value={formValues.name}
                  onChange={handleFormChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField 
                  name="location"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={formValues.location}
                  onChange={handleFormChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField 
                  name="startedAt"
                  label="Start Date & Time"
                  type="datetime-local"
                  variant="outlined"
                  fullWidth
                  value={formValues.startedAt}
                  onChange={handleFormChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField 
                  name="endsAt"
                  label="End Date & Time (Optional)"
                  type="datetime-local"
                  variant="outlined"
                  fullWidth
                  value={formValues.endsAt || ''}
                  onChange={handleFormChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField 
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={formValues.description}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined" 
                  onClick={handleClose}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  type="submit"
                  disabled={isSubmitting}
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    minWidth: 120
                  }}
                >
                  {isSubmitting ? 'Creating...' : 'Create Event'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </Box>
  )
}

export default Events