import React from "react";
import { useEffect, useState } from "react";
import { getAllProduct } from "./productApi";
import { useSelector } from "react-redux";

import { Product } from "./Product";
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from '@mui/material/Button';

// export default function CustomIcons() {
//   return (
//     <Stack spacing={2}>
//       <Pagination
//         count={10}
//         renderItem={(item) => (
//           <PaginationItem
//             slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
//             {...item}
//           />
//         )}
//       />
//     </Stack>
//   );
// }

import './productList.css';
const ProductList = () => {


  const [arrOfProducts, setArrOfProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {

    setIsLoading(true);
    // setTimeout(()=>{
    getAllProduct(currentPage, 12, "").then(res => {
      setArrOfProducts(res.data)

      handleClick(SlideTransition, "The connection to the server was successful")();

    })
      .catch(err => {

        handleClick(SlideTransition, "Failed to connect to the server")();
        // alert("לא הצליח להביא את המוצרים")
      }).finally(() => {
        setIsLoading(false);
        //   })
        // },1000);
      })
  }, [currentPage])


  const handlePageChange = (event, value) => {
    setCurrentPage(value);

  }
  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
    successMessage: "",
  });

  const handleClick = (Transition, message) => () => {
    setState({
      open: true,
      Transition,
      successMessage: message,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  const goToBackPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  // }, [currentPage])
  return (

    <div >
      {state.open && <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={state.successMessage}
        key={state.Transition.name}
        autoHideDuration={5000}
      />}

      {isLoading && <img src="/images/gif-computer.gif" className="gif" />}
      <Box className="allItems" sx={{ flexGrow: 2.5, mt: "10%", mb: "3%", ml: "5%", mf: "2%" }} >
        <Grid container spacing={3}>
          {arrOfProducts.map((item) => {
            return (

              <Grid item xs={12} sm={6} lg={4} key={item._id}>
                {/* sm={6} md={4} */}
                <Product className="allProducts" key={item._id} Product one={item} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
      {/* &&currentPage>0 */}
      {/* {!isLoading&& < Stack spacing={2}sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={goToNextPage}
                    >
                       Next  Page
                    </Button>
                    {/* {!isLoading&& < Stack spacing={2}sx={{ mt: 2 }}> */}
      {/* <Button
                        variant="contained"
                        color="primary"
                        onClick={goToBackPage}
                    >
                         Back Page
                    </Button> */}
      {!isLoading && < Stack spacing={1} sx={{ mt: 6 }}>
        <Pagination
          //  className="pagination"
          style={{ marginBottom: "7%", display: "flex", color: "red", marginLeft: "45%", marginLeft: "45%" }}
          count={3}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>}
    </div>);
}
export default ProductList;