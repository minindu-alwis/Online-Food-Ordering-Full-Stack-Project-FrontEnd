import { Dashboard, ShoppingBag } from '@mui/icons-material'
import React from 'react'
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import CategoryIcon from '@mui/icons-material/Category';
import { Divider, Drawer, useMediaQuery, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';
import { styled } from '@mui/material/styles';

const menu = [
    { title: "Dashboard", icon: <Dashboard />, path: "/" },
    { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
    { title: "Menu", icon: <ShopTwoIcon />, path: "/menu" },
    { title: "Food Category", icon: <CategoryIcon />, path: "/category" },
    { title: "Ingredients", icon: <FastfoodIcon />, path: "/Ingredients" },
    { title: "Events", icon: <EventIcon />, path: "/event" },
    { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
    { title: "Logout", icon: <LoginIcon />, path: "/" },
];

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        width: '20vw',
        [theme.breakpoints.down('lg')]: {
            width: '70vw',
        },
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
    '&.Mui-selected:hover': {
        backgroundColor: theme.palette.action.selected,
    },
}));

const AdminSideBar = ({ handleClose }) => {
    const isSmallScreen = useMediaQuery("(max-width:1080px)");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        navigate(`/admin/restaurants${item.path}`);
        if (item.title === "Logout") {
            navigate("/");
            dispatch(logout());
            handleClose();
        }
    };

    return (
        <StyledDrawer
            variant={isSmallScreen ? "temporary" : "permanent"}
            onClose={handleClose}
            open={true}
            anchor='left'
            sx={{ zIndex: 1 }}
        >
            <div className='w-[70vw] lg:w-[20vw] h-screen flex flex-col'>
                <Typography 
                    variant="h6" 
                    sx={{ 
                        p: 3, 
                        fontWeight: 'bold',
                        color: 'primary.main',
                        textAlign: 'center'
                    }}
                >
                    Admin Panel
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
                    © {new Date().getFullYear()} Restaurant Admin
                </Typography>
            </div>
        </StyledDrawer>
    );
};

export default AdminSideBar;