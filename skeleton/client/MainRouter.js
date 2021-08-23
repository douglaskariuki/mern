import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Menu from "./core/Menu"
import Signup from './user/Signup'
import Users from './user/Users'

const MainRouter = () => {
    return ( 
        <div>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users" component={Users} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </div>
    )
}
export default MainRouter