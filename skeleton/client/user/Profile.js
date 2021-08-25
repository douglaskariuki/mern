import React, { useEffect, useState } from 'react'
import { Paper, Typography, ListItemSecondaryAction, IconButton, List, ListItem, ListItemAvatar, ListItemText, } from '@material-ui/core'
import {authenticate, isAuthenticated} from "../auth/auth-helper"
import {read} from "./api-user";
import { Link, Redirect } from "react-router-dom";
import DeleteUser from './DeleteUser';

export default function Profile() {
    const [user, setUser] = useState({});
    const [redirectToSignin, setRedirectToSignin] = useState(false);

    const userId = props.match.params.userId;

    useEffect(() => {
        const abortController = new AbortController()    
        const signal = abortController.signal    
        const jwt = isAuthenticated()

        read({userId}, {t: jwt.token}, signal).then((data) => {
            if(data && data.error) {
                setRedirectToSignin(true)
            } else {
                setUser(data)
            }
        })

        return () => {
            abortController.abort()
        }
    }, [userId])

    if(redirectToSignin) {
        return (
            <Redirect to="/signin" />
        )
    }

    return (
        <Paper>
            <Typography variant="h6" className={classes.title}>
                Profile
            </Typography>

            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Person />
                        </Avatar>
                    </ListItemAvatar>

                    <ListItemText primary={user.name} secondary={user.email} />
                
                    {isAuthenticated().user && isAuthenticated().user._id == user._id
                    && (
                        <ListItemSecondaryAction>
                            <Link to={`/user/edit/${user._id}`}>
                                <IconButton aria-label="Edit" color="primary">
                                    <Edit />
                                </IconButton>
                            </Link>

                            <DeleteUser userId={user._id} />
                        </ListItemSecondaryAction>
                    )}

                </ListItem>

                <Divider />

                <ListItem>
                    <ListItemText primary={"Joined: " + (new Date(user.created)).toDateString()} />
                </ListItem>
            </List>
        </Paper> 
    )
}
