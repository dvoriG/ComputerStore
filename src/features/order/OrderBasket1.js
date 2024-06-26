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
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { Product } from "../product/Product"
import { Controller } from "react-hook-form"
import { useForm } from "react-hook-form";
import FormHelperText from '@mui/material/FormHelperText';
import { height } from '@mui/system';


const schema = yup.object().shape({
    userName: yup.string().required("שדה חובה"),
    password: yup.string().required(" שדה חובה")
});

// import Payment from './Payment';
// import ProductInBasket from './ProductInBasket';
// import '../product/styleProduct.css'



export const Basket = () => {
    let basket = useSelector(state => state.order.basket)
    let sumPrice = useSelector(state => state.order.sumPrice)
    let countProduct = useSelector(state => state.order.countProduct)
    const user = useSelector((state) => state.user.currentUser);
    let dispatch = useDispatch();
    const [address, setAddress] = React.useState("");
    // const adreesOrder = " rtcyvb";
    const { control, handleSubmit, register, formState: { errors }, reset } = useForm({ mode: "saveOrder", resolver: yupResolver(schema) });

    const saveOrder = async (adress) => {
        debugger;
        try {

            let res = await saveOrderInServer(basket, user, address);

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
                            <Box sx={{ width: '50%', maxWidth: 400, bgcolor: 'background.paper' }}>

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
                            כמות המוצרים: {countProduct}
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

                                <Button variant="contained" className='buttonOrder' onClick={() => { handleClickOpen() }}>
                                    אישור הזמנה
                                </Button>

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
                                            console.log(email);
                                            handleClose();
                                            setAddress(email);
                                            saveOrder(basket, user.token)

                                        },
                                    }}
                                >




                                    {/* <form onSubmit={handleSubmit(saveOrder)}>
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 1, width: '25ch' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        > */}
                                    {/* <Controller
                                                name="adress"
                                                control={control}
                                                render={({ field }) => <TextField id="outlined-basic" label="כתובת למשלוח הזמנה" variant="outlined" {...field} />
                                                }

                                            />
                                            <FormHelperText>{errors.userName?.message}</FormHelperText> */}
                                    {/* </Box> */}
                                    {/* <Box> */}
                                    {/* <Stack spacing={3} className='buttons' direction="row"> */}
                                    {/* <Button variant="contained" className='button' type={"submit"}>הוסף מוצר</Button> */}
                                    {/* </Stack> */}
                                    {/* </Box> */}

                                    {/* </form> */}



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
                                        <Button type="submit">אישור </Button>
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
                    <Typography component="div" variant="h5">
                        {/* עדיין לא צפית בכל המחשבים שלנו? */}

                    </Typography>
                    <Typography component="div" variant="h5">

                        מעונין לבחור מסך שיתאים לך בדיוק?


                    </Typography>



                    <Button variant="contained" className='buttonOrder' >
                        <Link to={"/"} className="boxLink"> לכל המחשבים</Link>
                    </Button>

                </Box>
            </Card>
    );










    {/* <h1 className='title-basket'>My Basket</h1>
    <h3 className="pay-qty">Total payment: {sumPrice}$</h3>
    <h3 className="pay-qty">count: {countProduct}</h3>
        <div className='details-list'>
            {basket.map(item => (
                <div key={item._id}>
                    <Product one={item} />
                </div>
            ))}
        </div>
        <div className='bottom2'>
            <button onClick={() => navigate("/")}>לכל המוצרים</button>
         

            <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
       אישור הזמנה
      </Button>
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
            console.log(email);
            handleClose();
            saveOrderInClient();

            
          },
        }}
      >{countProduct}
        <DialogTitle>אישור הזמנה</DialogTitle>
        <DialogContent>
          <DialogContentText>
      בבקשה רשום את הכתובת המלאה שלך
          </DialogContentText>
          <TextField className='boxLink'
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
          <Button className='boxLink' onClick={handleClose}>ביטול</Button>
          <Button className='boxLink' type="submit">אישור </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
        </div>
        {/* <Button onClick={()=>{ saveOrderInClient(basket,user._id)}}></Button> */}
    {/* </>);  */ }
}

