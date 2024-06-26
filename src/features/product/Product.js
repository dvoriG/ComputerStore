import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// import { Outlet, Link } from "react-router-dom";
import './product.css'

import { addOrder } from '../order/orderApi';
import { addProduct } from './productApi';
import { deleteProductById, getAllProduct } from "./productApi";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { addToBasket, removeFromBasket } from "../order/orderSlice"
import { useState } from 'react';


export const Product = ({ one, displayType = 'regular', numOfProductBasket = 1 }) => {
  let dispatch = useDispatch();
  let basket = useSelector(state => state.order.basket);
  const [numOfProduct, setNumOfProduct] = useState(numOfProductBasket);
  let navigate = useNavigate();

  const increase = () => {
    setNumOfProduct(numOfProduct + 1);
    dispatch(addToBasket({ one, numOfProduct: 1 }))
  }
  const reduce = () => {
    setNumOfProduct(Math.max(numOfProduct - 1, 0));
    dispatch(removeFromBasket({ one, numOfProduct: 1 }))
  }

  const addProductInClient = async (one) => {
    try {

      dispatch(addToBasket({ one, numOfProduct }))
      alert(" הפריט נוסף");
      navigate('/basket')

    } catch (err) {
      alert(" לא הצליח להוסיף");
      // setTimeout(()=>
      // navigate('/register')
      // )(2000)
    }
  }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  // export default function RecipeReviewCard() {
  //   const [expanded, setExpanded] = React.useState(false);

  //   const handleExpandClick = () => {
  //     setExpanded(!expanded);
  //   };

  return (
    <Card className='card' sx={{ width: 450, height:500}}>
      {/* backgroundColor:"red" */}
      {displayType == 'regular' ?
        <CardHeader
          avatar={
            // , backgroundColor:"rgba(41,65,56, 0.75)"
            <img src={one.company} alt="pic" style={{ width: "auto", height: "40px" }} />}
        /> : " "}




      <Link to={"details"} state={one}>
        <CardMedia 
          component="img"
          //  height="300px"
          //  width="auto"

          image={one.picture}
          //  style={{ height:"200px", width:"auto"}} 
          alt="pic"
        />
      </Link>


      {displayType == 'regular' ?
        <CardContent style={{ height: "150px", width: "auto" }}  >
          <Typography variant="body2" color="text.secondary">
            <h3 className='h2'> {one.productName}</h3>
            <h2>{one.price + "$"}</h2>
          </Typography>
        </CardContent>
        :
        <div>
         
          <Typography variant="body2" color="text.secondary">
            <h3 className='h2'>מחיר:{one.price}$ </h3>
            <h3 className='h2'>מחיר ס"ה למוצר זה:{one.price * one.count}$  </h3>
          </Typography>
          <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ direction: 'ltr' }} className="allButtonGroup">
            <Button variant="contained" sx={{ direction: 'ltr' }} className='buttonGroup' type={"submit"} onClick={increase}>+</Button>
            <Button variant="contained" className='buttonGroup'>{numOfProduct}</Button>
            <Button variant="contained" className='buttonGroup' type={"submit"} onClick={reduce}>-</Button>
          </ButtonGroup>
          
        </div>
      }
      {/* <CardActions style={{display: 'flex', justifyContent: 'space-between'}} > */}


      {/* <ExpandMore */}
      {/* // expand={expanded}
          // onClick={handleExpandClick}
          // aria-expanded={expanded} */}
      {/* aria-label="show more" */}
      {/* > */}
      {/* <Link to={"details"} state={one}>
              <outlet/>
             <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
          </Link>
          <outlet/> */}
      {/* </ExpandMore> */}
      {/* </CardActions> */}
    </Card>
  );
}
