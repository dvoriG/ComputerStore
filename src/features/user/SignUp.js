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
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Outlet, Link } from "react-router-dom";

import { Controller } from "react-hook-form"
// import { Input } from "@material-ui/core"

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import './login.css'


import { useDispatch } from "react-redux";
import { registerInServer } from "./userApi";
import { userIn } from "./userSlice";

import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  userName: yup.string().min(2, "שם משתמש לפחות 2 תוים").required("שדה חובה"),
  password: yup.string().matches(/^[a-zA-Z0-9]{3,15}$/, " יש לבחור סיסמה בין 3-15 תוים, אותיות באנגלית וספרות ").required("שדה חובה"),
  email: yup.string().email("כתובת מייל אינה תקינה").required("שדה חובה")
});
export const SignUp = () => {
  let dispatch = useDispatch();
  const { control, handleSubmit, field, formState: { errors }, reset } = useForm({ mode: "Signup", resolver: yupResolver(schema) });



  const signup = async (data) => {
    try {

      // await schema.validateAsync(data, { abortEarly: false });
      let res = await registerInServer(data);
      alert("התחברת בהצלחה");
      dispatch(userIn(res.data));
      navigate('/')
    } catch (err) {
      alert("התרחשה שגיאה");
      navigate('/')
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
        />

        <Box className="login" sx={{
          marginRight: 1,
          marginLeft: 4,
          display: 'flex'
          , flexWrap: 'wrap'
        }}>
          <div>
            
            <form onSubmit={handleSubmit(signup)}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" label="מייל " variant="outlined" type="email"{...field} />
                  }
                />
                <FormHelperText>{errors.email?.message}</FormHelperText>
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
                    <Button variant="contained" className='button' type={"submit"}>כניסה</Button>
                   
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
