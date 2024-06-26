import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { IoLocation } from "react-icons/io5";
import { FaCarAlt } from "react-icons/fa";
import { PiPhoneDisconnectFill } from "react-icons/pi";
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import './footer.css';



export default function BottomAppBar() {
    return (
        <React.Fragment>
            <AppBar className="Footer" position="fixed" 
            sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer">
                 <ImportantDevicesIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 2 }} />
                    <IconButton className='addres' color="inherit">
                        <Typography textAlign="center"  >  גן הדסים - מודיעין עילית</Typography>
                        < IoLocation/>
                    </IconButton>
                    <IconButton className='addres' color="inherit">
                    <Typography textAlign="center"  className='addres'> 0556796184</Typography>
                    <PiPhoneDisconnectFill />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}