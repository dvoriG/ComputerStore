import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Outlet, Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";


import { Controller } from "react-hook-form"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';


import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { addProduct } from './productApi';

import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup.object().shape({
  productName: yup.string().min(3, "שם המוצר לפחות 3 תוים").required("שדה חובה"),
  // price: yup.number("כתוב מחיר").required(" שדה חובה ")
});




export const AddProductAdmin = () => {
  //   let dispatch = useDispatch();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const { control, handleSubmit, register, formState: { errors }, reset } = useForm({ mode: "addProductInClient", resolver: yupResolver(schema) });
  // let {
  //   register,
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm({
  //   // defaultValues:{name:"sss"}
  // });

  const addProductInClient = async (data) => {

    try {
      // await schema.validateAsync(data, { abortEarly: false });

      let res = await addProduct(data);
      alert(" המוצר נוסף ");

    } catch (err) {
      alert("התרחשה שגיאה");

    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  let navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();

  };


  return (



    <div>
      <Card sx={{
        p: 0,
        margin: 'auto',
        maxWidth: 300,
        maxHeight: 1000,
        marginTop: 20,
        flexGrow: 1,
      }}>
        <CardMedia
          sx={{ height: 200 }}
          image='../images/homepage-seen-laptop-screen.jpg'
          title="green iguana"
          backgroundColor="rgb(251, 98, 98)"
        />

        <Box className="login" sx={{
          marginRight: 1,
          marginLeft: 4,
          display: 'flex'
          , flexWrap: 'wrap'
        }}>
          <div>
            {/* <Typography 
         id="outlined-start-adornment"
         sx={{ m: 2, width: '25ch' }}
      component="div" variant="h5">
        Welcome to carent 
                        </Typography> */}
            <form onSubmit={handleSubmit(addProductInClient)}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Controller
                  name="productName"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" label="שם המוצר " variant="outlined" {...field} />}
                  onChange={(event) =>
                    setProductName(event.target.value)
                  }

                />
                <FormHelperText>{errors.productName?.message}</FormHelperText>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" label="מחיר " variant="outlined" {...field} />}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                />
                <FormHelperText>{errors.price?.message}</FormHelperText>
              
                <Controller
                  name="picture"
                  control={control}
                  render={({ field }) => <TextField defaultValue={"/images/"} id="outlined-basic" label="src :תמונה " variant="outlined" {...field} />

                  }
                />



                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" label="תיאור  " variant="outlined" {...field} />
                  }
                />
                <Controller
                  name="target"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" label="למי מיועד  " variant="outlined" {...field} />
                  }
                />
                <Controller
                  name="company"
                  control={control}
                  render={({ field }) => <TextField defaultValue={"/images/"} id="outlined-basic" label="src :מותג " variant="outlined" {...field} />
                  }
                />
                <Controller
                  name="CPUspeed"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" label="מהירות המעבד  " variant="outlined" {...field} />
                  }
                />
              </Box>




              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <Box>
                  <Stack spacing={3} className='buttons' direction="row">
                    <Button variant="contained" className='button' type={"submit"}>הוסף מוצר</Button>
                  </Stack>
                </Box>
                <Box>
                  <Stack spacing={3} className='buttons' direction="row">
                    <Typography variant="subtitle1" color="text.secondary" >
                      <Link to={"/"} >
                        to all product
                   
                      </Link>

                    </Typography>
                   

                  </Stack>
                </Box>




              </FormControl>
            </form>
          </div>

        </Box>




      </Card>
    </div>

  )
}
