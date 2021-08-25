import { Card } from '@material-ui/core';
import React, { useEffect } from 'react'
import { isAuthenticated } from '../auth/auth-helper'
import { read, update } from './api-user'

export default function EditProfile() {
    const [user, setUser] = useState({});
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const userId = props.match.params.userId;
    const jwt = isAuthenticated()
    
    const clickSubmit = () => {

        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        update({userId}, {t: jwt.token}, user).then((data) => {
            if(data && data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, userId: data.id, redirectToProfile: true})
            }
        })

    }

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

    if(values.redirectToProfile) {
        return (
            <Redirect to={`/user/${values.userId}`} />
        )
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Edit Profile
                </Typography>

                <TextField 
                    id="name" 
                    label="Name"
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange("name")}
                    margin="normal"
                >
                    
                </TextField>

                <br/>

                <TextField 
                    id="email" 
                    label="Email"
                    type="email"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange("email")}
                    margin="normal"
                >
                    
                </TextField>

                <br/>

                <TextField 
                    id="password" 
                    label="Password"
                    type="password"
                    className={classes.textField}
                    value={values.password}
                    onChange={handleChange("password")}
                    margin="normal"
                >
                    
                </TextField>

                <br />
                
                {
                    values.error && (
                        <Typography component="p" color="error">
                            <Icon color="error" className={classes.error}>
                                error
                            </Icon>
                            {values.error}
                        </Typography>
                    )
                }
            </CardContent>
        </Card>            

    )
}
