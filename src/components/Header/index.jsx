import { AccountCircle, Close, Logout, PersonAdd, Settings } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom';
import './styles.scss';

const MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
}

export default function Header() {
    const loggedInUser = useSelector(state => state.user.current);
    const isLoggedIn = !!loggedInUser.id;
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        const action = logout();
        dispatch(action);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <CodeIcon
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link className="Menu-Btn" to="/">My Shop</Link>
                    </Typography>

                    <NavLink className="Menu-Btn" to='/todo-list'>
                        <Button color="inherit">Todos</Button>
                    </NavLink>

                    <NavLink className="Menu-Btn" to='/albums'>
                        <Button color="inherit">Albums</Button>
                    </NavLink>

                    {!isLoggedIn && (
                        <Button color="inherit" onClick={handleClickOpen}>
                            LOGIN
                        </Button>
                    )}

                    {isLoggedIn && (
                        <IconButton color="inherit" onClick={handleUserClick}>
                            <AccountCircle />
                        </IconButton>
                    )}

                </Toolbar>
            </AppBar>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleCloseMenu}>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogContent>
                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose} />

                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                                    Already have an account. Login here.
                                </Button>
                            </Box>
                        </>

                    )}

                    {mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose} />

                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                                    Don't have an account?
                                </Button>
                            </Box>
                        </>

                    )}


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}