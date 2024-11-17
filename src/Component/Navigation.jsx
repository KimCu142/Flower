import React, { useContext, useState } from 'react';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthConext';
import "./Nav.css";
import { ThemeContext } from './ThemeContext';
import { Avatar, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';

export default function Navigation() {
    const { theme, toggle, dark } = useContext(ThemeContext);
    const { user, logOut } = UserAuth();

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error('Logout Error:', error);
        }
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div>
            <nav style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/origin">Origin</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: '10px' }}>
                        <a
                            className='switch-mode'
                            onClick={toggle}
                            style={{
                                backgroundColor: theme.backgroundColor,
                                color: theme.color,
                                outline: 'none',
                                cursor: 'pointer',
                            }}
                            data-testid="toggle-theme-btn"
                        >
                            {!dark ? <SunOutlined /> : <MoonOutlined />}
                        </a>
                    </div>

                    {user?.displayName ? (
                        <div>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user.email} src={user.photoURL} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">
                                        <Link to='/dashboard' style={{ textDecoration: "none" }}>Dashboard</Link>
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleSignOut}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Link to='/login' style={{ textDecoration: "none" }}>
                            <Button sx={{ my: 2, color: theme.color, display: 'block' }}>
                                Sign in
                            </Button>
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
}
