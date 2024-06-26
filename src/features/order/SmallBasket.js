import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import ItemSmallBasket from './ItemSmallBasket';
import { useState, useEffect } from 'react';
import { setShowSmallBasket } from './orderSlice'
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import './SmallBasket.css';

// const [open, setOpen] = React.useState(false);



const SmallBasket = () => {
    const handleClickOpen = () => {
    setOpen(true);
};
    let sumPrice = useSelector(state => state.order.sumPrice);
    let countProduct = useSelector(state => state.order.countProduct);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true);
 let basket = useSelector(state => state.order.basket);
    let finalPrice = useSelector(state => state.order.finalPrice);
    const toggleDrawer = (newOpen) => () => {
        if (!newOpen)
            dispatch(setShowSmallBasket(true))
        setOpen(newOpen);
    };



    const DrawerList = (
        <Box sx={{ width: 400 ,ml:3 ,mr:7}} role="presentation" onClick={toggleDrawer(false)}>
            {/* <IconButton onClick={toggleDrawer(false)}><ClearIcon /></IconButton> */}

            <List>
                <h4 className='h3Style'> פרטי הזמנה </h4>
                {basket?.map(item =>
                    <ListItem key={item._id} disablePadding>
                        <ItemSmallBasket one={item} />
                    </ListItem>
                )}

            </List>
            <Divider />
            <h5 > סה"כ פריטים: {countProduct} </h5>
            <h4 >סה"כ לתשלום:$ {sumPrice} </h4>
        </Box>
    );
    // useEffect(() => {
    //     if (false)
    //         dispatch(setShowSmallBasket(false))
    // }, [open])
    return (
        <div>
            <IconButton aria-label="cart" onClick={toggleDrawer(true)} color="default">
                <ShoppingCartIcon />
            </IconButton>
           
            {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList} 
                <MenuItem key={"finalOrder"}>
              <Button variant="contained" className='buttonOrder' type={"submit"} sx={{width:'85%', ml:'7%'}}  >
            <Link to={"/basket"} className='buttonLi'>להזמנה</Link></Button>
            </MenuItem>
            <MenuItem key={"login"}>
              <Button variant="contained" className='buttonAll' type={"submit"} sx={{width:'85%', ml:'7%'}} >
                <Link to={"/"} className="buttonL">לכל המחשבים</Link></Button>
            </MenuItem>

            </Drawer>
        </div>
    );
}

export default SmallBasket;
