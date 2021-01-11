import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Python from "./courses/Python"
import Flutter from "./courses/Flutter"
import Dart from "./courses/Dart"
import EditForm from "./components/Admin/EditForm";
import UpdateForm from "./components/Admin/UpdateForm";
import QuizMain from "./components/TakeQuiz/QuizMain";
import Start from "./components/TakeQuiz/Start"
import dashboard from "./components/dashboard"
import PrivateRoute from "./auth/PrivateRoute"
import AdminRoute from "./auth/AdminRoutes"
import MyLearnings from "./components/MyLearnings/MyLearnings";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";


const MainRouter = () => (
    <div>
        {/* <Menu /> */}
        <Route exact path="/Signin" component={Signin}/>
         <Route exact path="/Signup"  component={Signup} />
      
        <Route exact path="/forgot-password" component={ForgotPassword}/>
        <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />

    <div style={{ paddingTop: "80px" }} />
        <Switch>

            {/* Auth Routes @PUBLIC*/}
       


            @HomePage  , @Users Route  @PUBLIC
            <Route exact path="/"           component={Home} />
            <PrivateRoute exact path="/python" component={Python} />
            <PrivateRoute exact path="/flutter" component={Flutter} />
            <PrivateRoute exact path="/dart" component={Dart} />
            <AdminRoute exact path="/admin-createpost" component={EditForm}/>
            <PrivateRoute exact path="/:course/:day/:quizId" component={QuizMain} />
            <AdminRoute exact path="/edit/:course/:day/:quizId" component={UpdateForm} />
            <PrivateRoute exact path="/dashboard" component={dashboard} />
            <PrivateRoute exact path="/MyLearnings" component={MyLearnings}/>
           
          

            
        </Switch>
    </div>
);

export default MainRouter;