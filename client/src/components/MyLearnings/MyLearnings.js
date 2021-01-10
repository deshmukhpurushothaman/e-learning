import React, { Component } from 'react'
import "../../css/mylearnings.css";
import PythonCard from "./PythonCard";
import FlutterCard from "./FlutterCard";
import DartCard from "./DartCard";
import Menu from "../../core/Menu.js";


class MyLearnings extends Component {
    render() {
        return (
            <div className="back-mylearn">
                <Menu/>
                <div className="container-fluid d-flex justify-content-center mt-5">
                <h2 className="enrol"><strong>Enrolled Courses</strong></h2>
                    </div>
                <div className="container-fluid d-flex justify-content-center">
                 <div className="row">
                    <div className="col-md-4">
                        <PythonCard/>
                    </div>
                    <div className="col-md-4">
                        <FlutterCard/>
                    </div>
                    <div className="col-md-4">
                        <DartCard/>
                    </div>                     
                 </div>   
                </div>
            </div>
        )
    }
}

export default MyLearnings;
