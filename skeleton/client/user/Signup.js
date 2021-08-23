import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, Icon, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { create } from './api-user'

export default function Signup() {
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

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        

        create(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error})
            } else {
                setValues({ ...values, error: '', open: true})
            }
        })
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" className={classes.title}>
                        Sign Up
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

                    <Dialog open={values.open} disableBackdropClick={true}>
                        <DialogTitle>
                            New Account
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText>
                                New account successfully created.
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Link to="/signin">
                                <Button color="primary" autoFocus="autoFocus" variant="contained">
                                    Sign In
                                </Button>
                            </Link>
                        </DialogActions>
                    </Dialog>
                </CardContent>
            </Card>            
        </div>
    )
}

