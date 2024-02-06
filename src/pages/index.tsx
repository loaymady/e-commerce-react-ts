import { Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Grid>
      HomePage
      <Link to="/products">Products</Link>
    </Grid>
  );
};

export default HomePage;
