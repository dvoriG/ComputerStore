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
import { useLocation, useNavigate } from "react-router-dom";

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import './login.css'


import { useDispatch, useSelector } from "react-redux";
import { loginInServer } from "./userApi";
import { userIn } from "./userSlice";
import { Controller } from "react-hook-form"
import { Outlet, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from '@mui/material/Alert';
import SnackbarContent from '@mui/material/SnackbarContent';

const action = (
  <Button color="secondary" size="small">
    lorem ipsum dolorem
  </Button>
);



const schema = yup.object().shape({
  userName: yup.string().required("שדה חובה"),
  password: yup.string().required(" שדה חובה")
});

export const Login = () => {
  const { control, handleSubmit, register, formState: { errors }, reset } = useForm({ mode: "login", resolver: yupResolver(schema) });
  let navigate=useNavigate();
  let dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  console.log('u', user);

  const login = async (data) => {
    try {

      let res = await loginInServer(data);
      dispatch(userIn(res.data))
      alert("התחברת בהצלחה");
    
       navigate("/")
    } catch (err) {


      <Alert severity="success" color="warning">
        טעות בשם משתמש או הסיסמא עליך להרשם
      </Alert>
      alert("  אתה לא רשום בבקשה הירשם");
      // setTimeout(()=>
      navigate('/register')
      // )(2000)
    }
  };


  const [showPassword, setShowPassword] = React.useState(false);
 
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
        />

        <Box className="login" sx={{
          marginRight: 1,
          marginLeft: 4,
          display: 'flex',
          flexWrap: 'wrap'
        }}>
          <div>
   
            <form onSubmit={handleSubmit(login)}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Controller
                  name="userName"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" label="שם משתמש" variant="outlined" {...field} />
                  }
                />
                <FormHelperText>{errors.userName?.message}</FormHelperText>
              </Box>


              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">סיסמה</InputLabel>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) =>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  }
                />

                <FormHelperText>{errors.password?.message}</FormHelperText>
                <Box>
                  <Stack spacing={10} className='buttons' direction="row">
                  </Stack>
                </Box>
                <Box>
                  <Stack spacing={10} className='buttons' direction="row">
                    <Button variant="contained" className='button' type={"onS"} >כניסה</Button>
                  </Stack>
                </Box>
                <Typography variant="subtitle1">
                  <Link to={"/register"} className='linkRegister'>

                    עדין לא רשום? הירשם

                  </Link>

                </Typography>



              </FormControl>
            </form>
          </div>

        </Box>




      </Card>
    </div>

  )
}