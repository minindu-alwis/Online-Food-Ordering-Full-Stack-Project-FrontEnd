import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Grid, 
  Grow, 
  Fade, 
  Slide,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Restaurant as RestaurantIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../../component/State/Restaurant/Action';

const RestaurantDetails = () => {
  const { restaurant } = useSelector((store) => store);
  const dispatch = useDispatch();
  
  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus({
      restaurantId: restaurant.userRestaurants.id,
      jwt: localStorage.getItem("jwt")
    }));
  };

  const statusColor = restaurant.userRestaurants?.open ? "success" : "error";
  const statusText = restaurant.userRestaurants?.open ? "OPEN" : "CLOSED";

  return (
    <div className='px-4 lg:px-8 py-6 max-w-7xl mx-auto'>
      {/* Restaurant Header with Status */}
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-6 mb-8'>
          <div className='flex items-center gap-4'>
            <Grow in={true}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'primary.main',
                  boxShadow: 3
                }}
              >
                <RestaurantIcon sx={{ fontSize: 40 }} />
              </Avatar>
            </Grow>
            <div>
              <Fade in={true} style={{ transitionDelay: '100ms' }}>
                <h1 className='text-3xl lg:text-5xl font-bold text-gray-800 dark:text-white'>
                  {restaurant.userRestaurants?.name}
                </h1>
              </Fade>
              <Fade in={true} style={{ transitionDelay: '200ms' }}>
                <div className='flex items-center gap-2 mt-1'>
                  <Chip
                    label={statusText}
                    color={statusColor}
                    variant="filled"
                    size="small"
                    icon={<LockIcon fontSize="small" />}
                    sx={{ fontWeight: 600 }}
                  />
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {restaurant.userRestaurants?.cuisineType}
                  </span>
                </div>
              </Fade>
            </div>
          </div>
          
          <Fade in={true} style={{ transitionDelay: '300ms' }}>
            <Button
              color={statusColor}
              variant="contained"
              onClick={handleRestaurantStatus}
              size="large"
              sx={{
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {restaurant.userRestaurants?.open ? "Close Restaurant" : "Open Restaurant"}
            </Button>
          </Fade>
        </div>
      </Slide>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Restaurant Information Card */}
        <Grid item xs={12} md={6}>
          <Grow in={true} style={{ transitionDelay: '200ms' }}>
            <Card sx={{
              borderRadius: 3,
              height: '100%',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              '&:hover': {
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              },
              transition: 'all 0.3s ease'
            }}>
              <CardHeader 
                title="Restaurant Details"
                avatar={<RestaurantIcon color="primary" />}
                sx={{ 
                  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                  bgcolor: 'rgba(0, 0, 0, 0.02)'
                }}
                titleTypographyProps={{
                  variant: 'h6',
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              />
              <CardContent>
                <div className='space-y-4'>
                  <DetailItem 
                    icon={<PersonIcon color="action" />}
                    label="Owner"
                    value={restaurant.userRestaurants?.owner.fullName}
                  />
                  <Divider sx={{ my: 1 }} />
                  <DetailItem 
                    icon={<RestaurantIcon color="action" />}
                    label="Restaurant Name"
                    value={restaurant.userRestaurants?.name}
                  />
                  <Divider sx={{ my: 1 }} />
                  <DetailItem 
                    icon={<ScheduleIcon color="action" />}
                    label="Opening Hours"
                    value={restaurant.userRestaurants?.openingHours || "Not specified"}
                  />
                </div>
              </CardContent>
            </Card>
          </Grow>
        </Grid>

        {/* Address Information Card */}
        <Grid item xs={12} md={6}>
          <Grow in={true} style={{ transitionDelay: '300ms' }}>
            <Card sx={{
              borderRadius: 3,
              height: '100%',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              '&:hover': {
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              },
              transition: 'all 0.3s ease'
            }}>
              <CardHeader 
                title="Address Information"
                avatar={<LocationIcon color="primary" />}
                sx={{ 
                  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                  bgcolor: 'rgba(0, 0, 0, 0.02)'
                }}
                titleTypographyProps={{
                  variant: 'h6',
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              />
              <CardContent>
                <div className='space-y-4'>
                  <DetailItem 
                    icon={<LocationIcon color="action" />}
                    label="Street Address"
                    value={restaurant?.userRestaurants?.address?.streetAddress || "Not specified"}
                  />
                  <Divider sx={{ my: 1 }} />
                  <DetailItem 
                    icon={<LocationIcon color="action" />}
                    label="City"
                    value={restaurant?.userRestaurants?.address?.city || "Not specified"}
                  />
                  <Divider sx={{ my: 1 }} />
                  <DetailItem 
                    icon={<LocationIcon color="action" />}
                    label="Postal Code"
                    value={restaurant?.userRestaurants?.address?.postalCode || "Not specified"}
                  />
                </div>
              </CardContent>
            </Card>
          </Grow>
        </Grid>

        {/* Contact Information Card */}
        <Grid item xs={12}>
          <Grow in={true} style={{ transitionDelay: '400ms' }}>
            <Card sx={{
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              '&:hover': {
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              },
              transition: 'all 0.3s ease'
            }}>
              <CardHeader 
                title="Contact Information"
                avatar={<PhoneIcon color="primary" />}
                sx={{ 
                  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                  bgcolor: 'rgba(0, 0, 0, 0.02)'
                }}
                titleTypographyProps={{
                  variant: 'h6',
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <div className='space-y-4'>
                      <DetailItem 
                        icon={<EmailIcon color="action" />}
                        label="Email"
                        value={restaurant?.userRestaurants?.contactInformation?.email || "Not specified"}
                      />
                      <Divider sx={{ my: 1 }} />
                      <DetailItem 
                        icon={<PhoneIcon color="action" />}
                        label="Mobile"
                        value={restaurant?.userRestaurants?.contactInformation?.mobile || "Not specified"}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className='flex flex-col h-full justify-between'>
                      <div>
                        <p className='flex items-center text-gray-600 mb-2'>
                          <LocationIcon color="action" sx={{ mr: 1 }} />
                          <span className='font-medium'>Social Media</span>
                        </p>
                        <Divider sx={{ mb: 2 }} />
                      </div>
                      <div className='flex gap-3 justify-center md:justify-start'>
                        {[
                          { icon: <InstagramIcon />, color: "#E1306C", label: "Instagram" },
                          { icon: <TwitterIcon />, color: "#1DA1F2", label: "Twitter" },
                          { icon: <FacebookIcon />, color: "#1877F2", label: "Facebook" },
                          { icon: <LinkedInIcon />, color: "#0077B5", label: "LinkedIn" }
                        ].map((social, index) => (
                          <Tooltip key={index} title={social.label} arrow>
                            <IconButton
                              sx={{
                                bgcolor: `${social.color}10`,
                                color: social.color,
                                '&:hover': {
                                  bgcolor: `${social.color}20`,
                                  transform: 'scale(1.1)'
                                },
                                transition: 'all 0.3s ease',
                                width: 48,
                                height: 48
                              }}
                            >
                              {social.icon}
                            </IconButton>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grow>
        </Grid>
      </Grid>
    </div>
  );
};

// Reusable Detail Item Component
const DetailItem = ({ icon, label, value }) => (
  <Fade in={true}>
    <div className='flex items-start'>
      <div className='mr-3 mt-1'>
        {icon}
      </div>
      <div>
        <p className='text-sm font-medium text-gray-500'>{label}</p>
        <p className='text-base font-normal text-gray-800 dark:text-gray-200'>
          {value}
        </p>
      </div>
    </div>
  </Fade>
);

export default RestaurantDetails;