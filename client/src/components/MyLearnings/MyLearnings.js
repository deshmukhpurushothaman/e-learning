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
        //console.log("Get Single USer1234")
        const token = isAuthenticated().token;
        getSingleUser(userId, token).then((data) => {
          //this.setState({ loading: false });
          //console.log("Get Single USer")
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
        
        console.log("My learning2", user)
        return (
            <div className="back-mylearn">
                <Menu/>
                <div className="container-fluid d-flex justify-content-center mt-5">
                <h2 className="enrol"><strong>Enrolled Courses</strong></h2>
                    </div>
                    {user === ""    ? 
                    
                    "Loading..."                 
                    
                   : 
                <div className="container-fluid d-flex justify-content-center">
                 <div className="row">
                    <div className="col">
                        <PythonCard/>
                    </div>
                    <div className="col">
                        <FlutterCard/>
                    </div>
                    <div className="col">
                        <DartCard/>
                    </div>                     
                     
                    <div className="col">
                    {user.python === 0 ? "" :
                        <PythonCard user={user}/>
                    }
                    </div>
                    
                    <div className="col">
                    {user.flutter === 0 ? "" :
                        <FlutterCard user={user}/>
                    }
                    </div>
                    
                    <div className="col">
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
