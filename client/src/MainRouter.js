import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Python from "./courses/Python"
import EditForm from "./components/Admin/EditForm";
import UpdateForm from "./components/Admin/UpdateForm";
import QuizMain from "./components/TakeQuiz/QuizMain";
import Start from "./components/TakeQuiz/Start"
import dashboard from "./components/dashboard"
import MyLearnings from "./components/MyLearnings/MyLearnings";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import ForgotPassword from "./user/ForgotPassword";


const MainRouter = () => (
    <div>
        {/* <Menu /> */}
        <Route exact path="/Signin" component={Signin}/>
         <Route exact path="/Signup"  component={Signup} />
      
        <Route exact path="/ForgotPassword" component={ForgotPassword}/>

    <div style={{ paddingTop: "80px" }} />
        <Switch>

            {/* Auth Routes @PUBLIC*/}
       


            @HomePage  , @Users Route  @PUBLIC
            <Route exact path="/"           component={Home} />
            <Route exact path="/python" component={Python} />
            <Route exact path="/admin-createpost" component={EditForm}/>
            <Route exact path="/:course/:day/:quizId" component={QuizMain} />
            <Route exact path="/edit/:course/:day/:quizId" component={UpdateForm} />
            <Route exact path="/dashboard" component={dashboard} />
            <Route exact path="/MyLearnings" component={MyLearnings}/>
           
          

            
        </Switch>
    </div>
);

export default MainRouter;