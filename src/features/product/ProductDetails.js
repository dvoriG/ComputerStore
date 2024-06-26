

import CardActions from '@mui/material/CardActions';
import { deleteProductById } from "./productApi";
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import GetAppIcon from '@mui/icons-material/GetApp';
import { addToBasket } from "../order/orderSlice";
// import {useDispatch} from"react-redux";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './productDetails.css'

// import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuItem from '@mui/material/MenuItem';


const ProductDetails = () => {
  const user = useSelector((state) => state.user.currentUser);
  let one = useLocation().state;
  let navigate = useNavigate();
  const theme = useTheme();
  let dispatch = useDispatch();
  const [numOfProduct, setNumOfProduct] = useState(1);
  // const admin = useSelector((state) => state.admin);
  const increase = () => {
    setNumOfProduct(numOfProduct + 1);
  }
  const reduce = () => {
    setNumOfProduct(Math.max(numOfProduct - 1, 0));
  }

  const addProductInClient = async (one) => {
    try {

      dispatch(addToBasket({ one, numOfProduct }))
      alert(" הפריט נוסף");
      navigate('/smallBasket')

    } catch (err) {
      alert(" לא הצליח להוסיף");
      // setTimeout(()=>
      // navigate('/register')
      // )(2000)
    }
  }
  const deleteFromServer = async () => {
    try {
      let res = await deleteProductById(one._id, user.token);
      console.log(res);
      alert("האם אתה בטוח במחיקה")
    } catch (err) {
      alert(err + "המחיקה נכשלה")
      console.log(err)

    }
  }


  return (
    <div className="details">
      <Card sx={{ display: 'flex', marginTop: "10%" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              <h4>{one.productName}</h4>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">


              <h4>{"model: "+one.description}</h4>

              <h4>{"CPUspeed: " + one.CPUspeed}</h4>
              <h4>{"target: " + one.target}</h4>
              <h4>{"price: " + one.price + "$"}</h4>

            </Typography>
            <p className='admin'>
                {user && user.role == "ADMIN" ? "":
            <ButtonGroup variant="contained" sx={{ direction: 'ltr' }} className='allButtonGroup' >
              <Button variant="contained" className='buttonGroup' type={"submit"} onClick={increase}>+</Button>
              <Button variant="contained" className='buttonGroup'>{numOfProduct}</Button>
              <Button variant="contained" className='buttonGroup' type={"submit"} onClick={reduce}>-</Button>
            </ButtonGroup>
         }
         </p>
          
          </CardContent>


          <p className='admin'>

            <Box sx={{ display: 'flex', alignItems: 'center', pl: 3, pb: 50 }}>
              <p className='admin'>
                {user && user.role == "ADMIN" ?
                  <Button onClick={deleteFromServer} variant="contained" className='btn'  >
                    מחק אותי</Button>
                  :
                  <Button variant="contained" className='btn' onClick={() => addProductInClient(one)} >
                    הוסף לסל </Button>
                }
              </p>

            </Box>
          </p>
        </Box>
        <CardMedia className='cardMediad'
          component="img"
           sx={{ width: 600 }}
          image={one.picture}
          alt="pic"
        />
      </Card>
    </div>
  );




}
export default ProductDetails;