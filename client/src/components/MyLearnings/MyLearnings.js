import React, { Component } from 'react'
import "../../css/mylearnings.css";
import PythonCard from "./PythonCard";
import FlutterCard from "./FlutterCard";
import DartCard from "./DartCard";
import Menu from "../../core/Menu.js";
import { isAuthenticated } from '../../auth/index';
import { getSingleUser } from '../../courses/api/index';


class MyLearnings extends Component {

    constructor() {
        super ()
        this.state = {
            user: "",
        }
    }

    init = (userId) => {
    
        const token = isAuthenticated().token;
        getSingleUser(userId, token).then((data) => {
          //this.setState({ loading: false });
          if (data.error) {
            //this.setState({ redirectToSignin: true });
            console.log(data.error)
          } else {
            this.setState({user: data})
            //console.log("My Learn", data)            
          }
        });
      };

    componentDidMount(){
        let userId = isAuthenticated().user._id;
        //let token = isAuthenticated().user.token;
        this.init(userId)
    }
    render() {
        const { user } = this.state
        //console.log("My learning2", user)
        return (
            <div className="back-mylearn">
                <Menu/>
                <div className="container-fluid d-flex justify-content-center mt-5">
                <h2 className="enrol"><strong>Enrolled Courses</strong></h2>
                    </div>
                    {user.length === ""  ? 
                    
                    "Loading..."                    
                    
                   : 
                <div className="container-fluid d-flex justify-content-center">
                 <div className="row">
                     
                    <div className="col-md-4">
                    {user.python === 0 ? "" :
                        <PythonCard user={user}/>
                    }
                    </div>
                    
                    <div className="col-md-4">
                    {user.flutter === 0 ? "" :
                        <FlutterCard user={user}/>
                    }
                    </div>
                    
                    <div className="col-md-4">
                    {user.dart === 0 ? "" :
                        <DartCard user={user}/>
                    }
                    </div>   
                                   
                 </div>   
                </div>
    }
            </div>
        )
    }
}

export default MyLearnings;
