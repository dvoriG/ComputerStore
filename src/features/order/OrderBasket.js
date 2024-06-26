import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { saveOrderInServer } from "./orderApi";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Outlet, Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './orderBasket.css'
// import Payment from './Payment';
// import ProductInBasket from './ProductInBasket';
// import '../product/styleProduct.css'

import { Product } from "../product/Product"

export const Basket = () => {
    let basket = useSelector(state => state.order.basket)
    let sumPrice = useSelector(state => state.order.sumPrice)
    let countProduct = useSelector(state => state.order.countProduct)
    const user = useSelector((state) => state.user.currentUser);
    let dispatch = useDispatch();
    const adreesOrder = " rabi akiva";
    const [address, setAddress] = React.useState("")



    const saveOrder = async () => {
        try {

            let res = await saveOrderInServer(basket, user, adreesOrder);

            alert(" ההזמנה נשלחה");

            // navigate('/')
        } catch (err) {


            // <Alert severity="success" color="warning">
            //    טעות בשם משתמש או הסיסמא עליך להרשם
            // </Alert>
            alert("  שליחת ההזמנה נכשלה נסה במועד מאוחר יותר");
            // setTimeout(()=>
            navigate('/register')
            // )(2000)
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };





    let navigate = useNavigate();
    return (

        countProduct > 0 ?
            <>
                <Card sx={{ display: 'flex' }} className='orderCard'>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography component="div" variant="h5">
                            פרטי הזמנה
                        </Typography>
                        <Card >
                            <Box sx={{ width: '40%', maxWidth: 450,height:"40%", bgcolor: 'background.paper' }}>

                                {basket.map(item => (
                                    <div key={item._id}>
                                        <Product
                                            one={item}
                                            displayType={'basket'}
                                            numOfProductBasket={basket.findIndex(i => i._id === item._id) != -1 ? basket[basket.findIndex(i => i._id === item._id)].count : 1}
                                        />
                                    </div>
                                ))}
                            </Box>
                        </Card>

                        <Typography component="div" variant="h7">
                            כמות מוצרים {countProduct}
                        </Typography>
                        <Typography component="div" variant="h7">
                            סה"כ לתשלום: {sumPrice}$
                        </Typography>

                        {/* <Button onClick={() => { saveOrder(basket, user.token) }}>cgvhbj</Button> */}
                        <div className='bottom2'>
                            <IconButton aria-label="play/pause" variant="outlined" onClick={() => navigate(-1)}>
                                <KeyboardBackspaceIcon sx={{ height: 20, width: 20 }} />
                            </IconButton>

                            <React.Fragment>
                                <p>
                                    {!user ? <Link to={"/login"} >שים לב! אתה לא רשום בבקשה הירשם
                                    </Link> :
                                        
                                            <Button variant="contained" className='buttonOrder' onClick= { handleClickOpen }>
                                                אישור הזמנה
                                            </Button>
                                       
                                    }
                                </p>

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        component: 'form',
                                        onSubmit: (event) => {
                                            event.preventDefault();
                                            const formData = new FormData(event.currentTarget);
                                            const formJson = Object.fromEntries(formData.entries());
                                            const email = formJson.email;
                                            setAddress(email); // Set the address state to the entered email
                                            console.log(address);
                                            console.log(email);
                                            handleClose();
                                            debugger;
                                         

                                        },
                                    }}
                                >

                                    <DialogTitle>אישור הזמנה</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            בבקשה רשום את הכתובת המלאה שלך
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            required
                                            margin="dense"
                                            id="name"
                                            name="email"
                                            label="כתובת למשלוח ההזמנה"
                                            // type="email"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>ביטול</Button>
                                        <Button type="submit" onClick={() => { saveOrder(basket, user.token) }}>אישור </Button>
                                    </DialogActions>
                                </Dialog>
                            </React.Fragment>
                        </div>
                    </Box>
                </Card>



            </>
            :
            <Card sx={{ display: 'flex' }} className='orderCard'>
                <Box
                // sx={{ display: 'flex', flexDirection: 'column' }}
                >
                    {/* <Typography component="div" variant="h5">
                          רוצה לצפות בכל המחשבים שלנו? 

                    </Typography> */}
                    <Typography component="div" variant="h5">
                        רוצה לצפות בכל המחשבים שלנו,
                        מעונין לבחור מסך שיתאים לך בדיוק?

                    </Typography>



                    <Button variant="contained" className='buttonOrder' >
                        <Link to={"/"} className="boxLink"> לכל המחשבים</Link>
                    </Button>

                </Box>
            </Card>
    );








}

