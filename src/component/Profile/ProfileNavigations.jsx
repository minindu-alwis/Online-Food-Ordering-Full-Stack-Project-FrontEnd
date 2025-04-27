import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';
import { styled } from '@mui/material/styles';

const menu = [
    { title: "Orders", icon: <ShoppingBagIcon /> },
    { title: "Favourites", icon: <FavoriteIcon /> },
    { title: "Address", icon: <HomeIcon /> },
    { title: "Payments", icon: <AccountBalanceWalletIcon /> },
    { title: "Notification", icon: <NotificationsIcon /> },
    { title: "Events", icon: <EventAvailableIcon /> },
    { title: "LogOut", icon: <LogoutIcon /> }
];

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        width: '20vw',
        [theme.breakpoints.down('lg')]: {
            width: '50vw',
        },
        position: 'fixed',
        top: 0,
        height: '100vh',
        overflowY: 'auto'
    },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(1.5, 3),
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-selected': {
        backgroundColor: theme.palette.action.selected,
        borderLeft: `4px solid ${theme.palette.primary.main}`,
    },
}));

const ProfileNavigations = ({ open, handleClose }) => {
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        if (item.title === "LogOut") {
            dispatch(logout());
            navigate("/");
        } else {
            navigate(`/my-profile/${item.title.toLowerCase()}`);
        }
        if (isSmallScreen) handleClose();
    };

    return (
        <StyledDrawer
            variant={isSmallScreen ? "temporary" : "permanent"}
            onClose={handleClose}
            open={isSmallScreen ? open : true}
            anchor='left'
            sx={{ 
                zIndex: 1,
                '& .MuiDrawer-paper': {
                    position: 'fixed',
                    top: 0,
                    height: '100vh'
                }
            }}
        >
            <Box sx={{ 
                width: isSmallScreen ? '50vw' : '20vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        p: 3, 
                        fontWeight: 'bold',
                        color: 'primary.main',
                        textAlign: 'center'
                    }}
                >
                    My Profile
                </Typography>
                <Divider />
                <List sx={{ flexGrow: 1 }}>
                    {menu.map((item, i) => (
                        <React.Fragment key={item.title}>
                            <StyledListItem 
                                button 
                                onClick={() => handleNavigate(item)}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.title} 
                                    primaryTypographyProps={{ 
                                        variant: 'body1',
                                        fontWeight: 'medium'
                                    }} 
                                />
                            </StyledListItem>
                            {i !== menu.length - 1 && <Divider variant="middle" />}
                        </React.Fragment>
                    ))}
                </List>
                <Divider />
                <Typography 
                    variant="caption" 
                    sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        color: 'text.secondary'
                    }}
                >
                    © {new Date().getFullYear()} User Profile
                </Typography>
            </Box>
        </StyledDrawer>
    );
};

export default ProfileNavigations;