import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import dart from "../../images/dart.jpg";

export class DartCard extends Component {
    render() {
        return (
            <div>
                
            {this.props.user === undefined   ? 
                    
                    ""                 
                    
                   : 
            <div className="card text-center">
            <div className="overflow">
                <img src={dart} width="50px" height="250px" alt="Dart" className="card-img-top" ></img>
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title"><strong>Dart</strong></h4>
                <p className="card-text text-secondary">
        Number of days completed : <strong>{this.props.user.dart}</strong>
                </p>
             <a href="/dart"><button className="btn btn-outline-success">Continue</button></a>
            </div>
            
        </div>
    }
    </div>
        )
    }
}

export default DartCard;
