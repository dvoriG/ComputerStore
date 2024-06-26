import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket, updateQty } from "./orderSlice";
import * as React from 'react';
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, ButtonGroup } from '@mui/material';
import './ItemSmallBasket.css';



const ItemSmallBasket = ({ one }) => {
    let dispatch = useDispatch();

    // const deleteFromBasket = () => {
    //     dispatch(removeFromBasket(one._id));
    // }
    const textSecondry=()=>{
        return `כמות מוצרים: ${one.count} `
    }
    return (<div>

        <ListItem className="listItemStyle" sx={{ width: "450px" }}>

            <Button>
                <img src={one.picture} alt={one.productName}  className='imgStyle' />
            </Button>
            <ListItemText
                primary={one.productName}
                // primary={one.productName}
                // secondary= {one.qty}
                secondary={textSecondry()}
            />
            <div> {one.price * one.count} $</div>

            {/* <p>{one.qty}</p> */}
            {/* <Button className="xBtnStyle"
                aria-label="clear"
                onClick={deleteFromBasket}
            >
                <ClearIcon fontSize="small" />
            </Button> */}



        </ListItem>
    </div>);
}

export default ItemSmallBasket;