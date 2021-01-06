import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import "../App.css";
import { signUp } from '../auth/index'

const useStyles = makeStyles((theme) => ({
  // backgroundColor: "#000000",
 
}));

export default class Signup extends Component {
  //  classes = useStyles();
  constructor(){
    super ()
    this.state = {
        name: "",
        email: "",
        password: "",
        error: "",
        open: false
    }
  }


  handleChange = (name) => (event) => {
    this.setState({error: ""})
    this.setState({[name]: event.target.value}); // The array symbol makes it dynamic. The value in the array "name" changes according to the form event.
    //console.log("Handle Change", event.target.value);
  };

clickSubmit = event => {
  event.preventDefault();  //This will protect default reload
  const {name, email, password} = this.state
  const user = {
      name,
      email,
      password
  };
  console.log("User", user)
  signUp(user)
  .then(data => {
      if(data.error) this.setState({error: data.error})
      else 
          this.setState({
              error: "",
              name: "",
              email: "",
              password: "",
              open: true
      });
  }
  );
  
};

  signupForm = (name,email,password) => {
    return (
      <div>
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div justify="flex-center" className= "paper">
        <Avatar className="">
          <LockOutlinedIcon />
        </Avatar>
        <Typography justify="flex-right" component="h1" variant="h5">
          Sign up
        </Typography>
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={this.handleChange("name")}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.handleChange("email")}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange("password")}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
            onClick = {this.clickSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <Link href={`/Signin`} variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box className="social-login-icon" mt={5}>
      <a class="btn-floating btn-lg btn-fb" type="button" role="button"><i class="fab fa-facebook-f"></i></a>

      <a class="btn-floating btn-lg btn-gplus" type="button" role="button"><i class="fab fa-google-plus-g"></i></a>

      <a class="btn-floating btn-lg btn-git" type="button" role="button"><i class="fab fa-github"></i></a>
      </Box> */}
    </Container>
      </div>
    )
  }
  
  render() {
    const { name, email, password, error, open} = this.state;
    return (
           
      <div className="container">

          <div
              className="alert alert-danger"
              style={{ display: error ? "" : "none" }}
          >
              {error}
          </div>
          

          <div
              className="alert alert-info"
              style={{ display: open ? "" : "none" }}
          >
              New account is successfully created. Please <Link to="/signin">Sign In</Link>
          </div>


      {this.signupForm(name, email, password)}

          
      </div>
  );
  }
}

