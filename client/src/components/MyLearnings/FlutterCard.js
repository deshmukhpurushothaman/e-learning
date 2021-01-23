import React, { Component } from 'react'
import flutter from "../../images/flutter.png";

export class FlutterCard extends Component {
    render() {
        return (
            <div>
                
            {this.props.user === undefined   ? 
                    
                    ""                 
                    
                   : 
            <div className="card text-center">
                <div className="overflow">
                    <img src={flutter} width="50px" height="250px" alt="Flutter" className="card-img-top" ></img>
                </div>
                <div className="card-body text-dark">
                    <h4 className="card-title"><strong>Flutter</strong></h4>
                    <p className="card-text text-secondary">
        Number of Tasks completed : <strong>{this.props.user.flutter}</strong>
                    </p>
                 <a href="/flutter"><button className="btn btn-outline-success btn-con">Continue</button></a>
                </div>
                </div>}
            </div>
    
        )
    }
}

export default FlutterCard;
