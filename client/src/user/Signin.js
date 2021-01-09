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
import {Redirect} from 'react-router-dom'
import { signin , authenticate} from '../auth/index'




export default class Signin extends Component {

  constructor(){
    super ()
    this.state = {
        email: "",
        password: "",
        error: "",
        redirectToReferer: false,
        loading: false
    }
}

handleChange = (name) => (event) => {
  this.setState({error: ""})
  this.setState({[name]: event.target.value}); // The array symbol makes it dynamic. The value in the array "name" changes according to the form event.
};

clickSubmit = event => {
  event.preventDefault();  //This will protect default reload
  this.setState({loading: true})
  const {email, password} = this.state
  const user = {
      email,
      password
  };
  
  signin(user).then(data => {
      if (data.error) {
          this.setState({ error: data.error, loading: false });
      } 
      
      else{
          //Authenticate

          authenticate(data, () => {
              this.setState({redirectToReferer: true})
          })
          //Redirect
      }
  });
  
};

signinForm = (email, password) => {
  return (
    <div>
      <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className="paper">
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className="form" noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={this.handleChange("email")}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={this.handleChange("password")}
          autoComplete="current-password"
        />
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="submit"
          onClick={this.clickSubmit}
        >
          Sign In
        </Button>
        <Grid container justify="flex-end">
          {/* <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid> */}

          <Grid item>
          <Link href={"/Signup"} className="text-primary">
            
            Already have an account? Signup
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
    const {email, password, error, redirectToReferer, loading} = this.state;

    if(redirectToReferer) {
      return <Redirect to="/" />
  }
  return (
           
    <div className="container">
        

        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>

        {loading ? (
            <div className="jumbotron text-center">
                <h2>Loading...</h2>
            </div>
        ) : (
            ""
        )}
    {this.signinForm(email, password)}

        
    </div>
);
  }
}






