import React ,{Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuthenticated} from './index'

const PrivateRoute = ({component: Component , ...rest}) => (
    //props means components passed to this private route component
    <Route {...rest} render={props => isAuthenticated() ? (
        <Component {...props} />
    ) : (
        <Redirect to={{pathname: "/Signin", state:{from: props.location}}} /> 
    )} />
)

export default PrivateRoute;