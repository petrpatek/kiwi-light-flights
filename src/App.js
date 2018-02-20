import React, {Component} from "react";

import Typography from "material-ui/Typography";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Paper from "material-ui/Paper";
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';


class App extends Component {
    constructor(){

    }
    _submitForm(){

    }
    _getHeader() {
        return (
            <header>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Light Flight Search
                        </Typography>
                    </Toolbar>
                </AppBar>
            </header>
        );
    }

    _getForm() {
        return (
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Paper style={{padding: "0 24px"}}>
                    <TextField
                        id="search"
                        label="From"
                        type="search"
                        margin="normal"
                    />
                    <TextField
                        id="search"
                        label="To"
                        type="search"
                        margin="normal"
                    />
                    <TextField
                        id="date"
                        label="Date from"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="date"
                        label="Date to"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button variant="raised" color="primary" onClick={_submitForm}>
                        Find flight
                    </Button>
                    <Button variant="raised" color="secondary">
                        Reset
                    </Button>
                </Paper>
            </Grid>
        )
    }

    render() {
        return <div>
            {this._getHeader()}
            <Grid container spacing={24}>

                {this._getForm()}
            </Grid>
        </div>;
    }
}

export default App;
