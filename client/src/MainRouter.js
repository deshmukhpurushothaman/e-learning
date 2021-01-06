import React from "react";
import { Route, Switch } from "react-router-dom";
import Signup       from "./user/Signup";
import Signin       from "./user/Signin";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Python from "./courses/Python"
import EditForm from "./components/Admin/EditForm";
import UpdateForm from "./components/Admin/UpdateForm";
import QuizMain from "./components/TakeQuiz/QuizMain";
import Start from "./components/TakeQuiz/Start"

const MainRouter = () => (
    <div>
        {/* <Menu /> */}
    <div style={{ paddingTop: "80px" }} />
        <Switch>

            {/* Auth Routes @PUBLIC*/}
            <Route exact path="/Signup"  component={Signup} />
            <Route exact path="/Signin"  component={Signin} />


            @HomePage  , @Users Route  @PUBLIC
            <Route exact path="/"           component={Home} />
            <Route exact path="/python" component={Python} />
            <Route exact path="/admin-createpost" component={EditForm}/>
            <Route exact path="/:course/:day/:quizId" component={QuizMain} />
            <Route exact path="/edit/:course/:day/:quizId" component={UpdateForm} />
            
        </Switch>
    </div>
);

export default MainRouter;