import React from "react";
import Signup from "../user/Signup";
import Menu from "./Menu";
import "../components/AdminHomepage";
import AdminHomepage from "../components/AdminHomepage";


const Home = () => (
  <>
   <Menu/>
   {/* <Signup/> */}
   <AdminHomepage/>
  </>
);

export default Home;
