import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import { MenuItem } from '@mui/material';

// List of pages in the navigation menu
const pages = ['Products', 'Pricing', 'Blog'];

// Responsive AppBar component
function ResponsiveAppBar() {
  // State for anchor element of the navigation menu
  const [anchorElNav, setAnchorElNav] = useState(null);

  // Function to handle opening the navigation menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // Function to handle closing the navigation menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2f3030' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and brand name */}
          <AdbIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              color: 'white',
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TRAVELERZ
          </Typography>

          {/* Menu icon for mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* Navigation menu for mobile */}
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* Generate menu items from the pages list */}
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo and brand name for mobile */}
          <AdbIcon
            sx={{
              display: { xs: 'flex', md: 'none' },
              mr: 1,
              color: 'white',
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* Navigation links for desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* Link to Places page */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button sx={{ mx: 1, color: 'white' }}>Places</Button>
            </Link>
            {/* Link to Hotels page */}
            <Link to="/hotel" style={{ textDecoration: 'none' }}>
              <Button sx={{ mx: 1, color: 'white' }}>Hotels</Button>
            </Link>
            {/* Link to Restaurants page */}
            <Link to="/restaurant" style={{ textDecoration: 'none' }}>
              <Button sx={{ mx: 1, color: 'white' }}>Restaurant</Button>
            </Link>
            {/* Link to Restaurants page */}
            <Link to="/Form" style={{ textDecoration: 'none' }}>
              <Button sx={{ mx: 1, color: 'white' }}>Plan</Button>
            </Link>
            {/* Link to AI Search page */}
            <Link to="/imagesearch" style={{ textDecoration: 'none' }}>
              <Button sx={{ mx: 1, color: 'white' }}>AI Search</Button>
            </Link>
            {/* Link to Chat page */}
            <Link to="/chat" style={{ textDecoration: 'none' }}>
              <Button sx={{ mx: 1, color: 'white' }}>Chat</Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
