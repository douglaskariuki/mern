import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home';
import Menu from "./core/Menu";
import Signup from './user/Signup';
import Users from './user/Users';
import Profile from "./user/Profile";
import EditProfile from './user/EditProfile';

const MainRouter = () => {
    return ( 
        <div>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users" component={Users} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
                <Route path="/user/:userId" component={Profile}/>
            </Switch>
        </div>
    )
}
export default MainRouter