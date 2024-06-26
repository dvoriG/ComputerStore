import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {userOut} from './features/user/userSlice'
import './navbar.css';
// import './features/product/product.css';
// import {setResetCategory} from ProductSlice;
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';

import { Outlet, Link } from "react-router-dom";
import { current } from '@reduxjs/toolkit';


// const pages = ['בחר רכב', 'כל הרכבים', 'מי אנחנו', 'כניסה', 'הרשמה'];
// const settings = ['ההזמנות שלי', 'יציאה'];

const ResponsiveAppBar = (currentUser) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector((state) => state.user.currentUser);



  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = (page = null) => {
    setAnchorElNav(null);
    page && navigate(page.href);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  

  

    const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);
 
    const handleOpenAdminMenu = (event) => {
      setAnchorElAdmin(event.currentTarget);
    };
    

    const handleCloseAdminMenu = () => {
      setAnchorElAdmin(null);
    };
    const handleLogout = () => {
      
      
      alert(" נשמח לראותך שוב");
      // navigate('/')
      
      dispatch(userOut());
    };



  return (
    <AppBar className='NavBar'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
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
                   {/* <ImportantDevicesIcon  /> */}
             <ImportantDevicesIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
           <Link to={"/"} className="boxLink">  <img src="./images/logo.jpg" width={180}
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
           {/* <img src="./pic/7934918.jpg" width={190}
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
               </Link>
            {/* <Button  size="small" ><Link to={"Login"} >כניסה {<MoreVertIcon color="inherit"/>}</Link></Button> */}

            {/* <Button size="small" ><Link to={"Login"} >כניסה</Link></Button> */}
            {/* <Button size="small" ><Link to={"/"} >כל הרכבים</Link></Button> */}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              
              <MenuItem key={"all"}>
                <Typography textAlign="center" 
                // onClick={resetCategory}
                ><Link to={"/"} className="boxLink">  לכל המחשבים</Link></Typography>
              </MenuItem>
              {/* <MenuItem key={"/"}>
                <Typography textAlign="center"><Link to={"/"} className="boxLink"> בחר רכב</Link></Typography>
              </MenuItem> */}

              <p className='user'>{!user? 
              //  &&!admin 
                <MenuItem key={"login"}>
                  <Typography textAlign="center"><Link to={"/login"} className="boxLink">כניסה</Link></Typography>
                </MenuItem>
                : ''}</p>

              <p className='user'>{!user  ? 
              // &&!admin
                <MenuItem key={"register"}>
                  <Typography textAlign="center"><Link to={"/register"} className="boxLink">הרשמה</Link></Typography>
                </MenuItem>
                : ''}</p>
      
              <p className='admin'>
              {user && user.role=="ADMIN" ?
                <MenuItem key={"addProduct"}>
                  <Typography textAlign="center"><Link to={"/addProduct"} className="boxLink">מנהל הוסף מוצר</Link></Typography>
                </MenuItem>
                 : ''} 
                </p>


              {/* {pages.map((page) => (
                <MenuItem key={page.title}
                  onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

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
          >  <img src="./images/logo.jpg" width={200}
          sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />


            {/* <img src="./pic/7934918.jpg" width={200}
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          </Typography >
          {/* <Button size="small" ><Link to={"Login"} >כניסה</Link></Button> */}
          {/* LOGO */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        
            <MenuItem key={"all"}>
              <Typography textAlign="center"><Link to={"/"} className="navBarLink"> לצפיה בכל המחשבים</Link></Typography>
            </MenuItem>
            {/* <MenuItem key={"/"}>
              <Typography textAlign="center"><Link to={"/"} className="navBarLink">  בחר רכב</Link></Typography>
            </MenuItem>
        */}
            <p className='user'>{!user ?  
            <MenuItem key={"login"}>
              <Button variant="contained" className='navBarButton' type={"submit"} ><Link to={"/login"} className="buttonLink2">כניסה</Link></Button>
            </MenuItem>
             : ''}</p>
            { <p className='user'>{!user ?
            <MenuItem key={"register"}>
              <Button variant="contained" className='navBarButton' type={"submit"} ><Link to={"/register"} className="buttonLink2">הרשמה</Link></Button>
            </MenuItem>
             : ''}</p> }
               <p className='admin'>
              {user && user.role=="ADMIN" ?
            <MenuItem key={"addProduct"}>
              <Button variant="contained" className='navBarButton' type={"submit"} ><Link to={"/addProduct"} className="buttonLink2">מנהל הוסף מוצר</Link></Button>
            </MenuItem>
            :""}  
             </p> 
 

            {/* {pages.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <p className='user'>{user ? "hello" + " " + user.userName : 'אורח'}</p>
                <Avatar className='user' alt={user ? user.userName : 'אורח'} />
              </IconButton>
            </Tooltip>
            <p className='user'>{user?  
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
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}> */}
             
              <Typography textAlign="center">
                {/* {setting} */}
              
                <MenuItem key={"logout"}>
                  <Typography textAlign="center"><Link to={"/"} className="boxLink" onClick={handleLogout}> יציאה</Link></Typography>
                </MenuItem>
                <MenuItem key={"cart"}>
                  <Typography textAlign="center"><Link to={"/basket"} className="boxLink">סל קניות</Link></Typography>
                </MenuItem>
              </Typography>
             
              {/* </MenuItem> */}
              {/* ))} */}
            </Menu>
            : ''}</p>
          </Box>
        </Toolbar>
      </Container>

    </AppBar>
  );
}
export default ResponsiveAppBar;



{/* <img src="./pic/NavBar.jpg" width={1720} /> */ }

// const NavBar
//   = () => {
//     return (
//       <div>
//         <img src="./pic/logo.jpg" width={1720} />
//         {/* <img src="./pic/NavBar.jpg" width={1720} /> */}
//       </div>
//     );
//   }

// export default NavBar
//   ;
























