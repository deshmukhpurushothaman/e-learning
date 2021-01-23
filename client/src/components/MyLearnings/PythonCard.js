import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import python from "../../images/python.png";

export class PythonCard extends Component {
    render() {
        const user = this.props.user
        
        return (
            <div>
            {this.props.user === undefined   ? 
                    
                    ""                 
                    
                   : 
            <div className="card text-center">
                <div className="overflow">
                    <img src={python} width="50px" height="250px" alt="Python" className="card-img-top mylearn-course" ></img>
                </div>
                <div className="card-body text-dark">{console.log("User", this.props, this.props.user)}
                    <h4 className="card-title"><strong>Python</strong></h4>
                    <p className="card-text text-secondary">
                     Number of Tasks completed : <strong>{this.props.user.python}</strong>
                    </p>
                 <a href="/python"><button className="btn btn-outline-success">Continue</button></a>
                </div>
            </div>
    }
    </div>
        )
    }
}

export default PythonCard;
