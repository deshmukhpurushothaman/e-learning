import React, { Component } from 'react'
import python from "../../images/python.png";

export class PythonCard extends Component {
    render() {
        return (
            <div className="card text-center">
                <div className="overflow">
                    <img src={python} width="50px" height="250px" alt="Python" className="card-img-top mylearn-course" ></img>
                </div>
                <div className="card-body text-dark">
                    <h4 className="card-title"><strong>Python</strong></h4>
                    <p className="card-text text-secondary">
                        Number of days completed : <strong>5</strong>
                    </p>
                 <button className="btn btn-outline-success">Continue</button>
                </div>
                
            </div>
        )
    }
}

export default PythonCard;
