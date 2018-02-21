import React, { Component } from "react";

// MUI components
import Typography from "material-ui/Typography";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

// api calls
import RequestHandler from "./request-handler/request-handler";

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          from: "",
          to: "",
          dateFrom: "",
          dateTo: "",
          data: "",
          error: ""
      };
      this._onChangeForm = this._onChangeForm.bind(this);
      this._loadData = this._loadData.bind(this);
      this._onLoadSuccess = this._onLoadSuccess.bind(this);
      this._onLoadError = this._onLoadError.bind(this);
      this._showFlights = this._showFlights.bind(this);
  }
  _onLoadSuccess(result) {
    this.setState({
      data: result,
      loading: false
    });
  }

  _onLoadError(error) {
    this.setState({ error: error, loading: false });
  }

  _loadData() {
    this.setState({ loading: true });
    RequestHandler.getFlights(
      this.state.from,
      this.state.to,
      this.state.dateFrom,
      this.state.dateTo
    ).then(this._onLoadSuccess, this._onLoadError);
  }

  _onChangeForm(event) {
    let stateObj = {};
    stateObj[event.target.id] = event.target.value;
    this.setState(stateObj);
    console.log(event.target.id);
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
        <Paper style={{ padding: "0 24px" }}>
          <TextField
            id="from"
            label="From"
            type="search"
            margin="normal"
            onChange={this._onChangeForm}
            value={this.state.from}
          />
          <TextField
            id="to"
            label="To"
            type="search"
            margin="normal"
            onChange={this._onChangeForm}
            value={this.state.to}
          />
          <TextField
            id="dateFrom"
            label="Date from"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true
            }}
            onChange={this._onChangeForm}
            value={this.state.dateFrom}
          />
          <TextField
            id="dateTo"
            label="Date to"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true
            }}
            onChange={this._onChangeForm}
            value={this.state.dateTo}
          />
          <Button
            variant="raised"
            color="primary"
            onClick={this._loadData}
            type={"submit"}
          >
            Find flight
          </Button>
          <Button variant="raised" color="secondary">
            Reset
          </Button>
        </Paper>
      </Grid>
    );
  }

  _showError() {}

  _showFlights() {
      if(this.state.data) {
          this.state.data.data.map((flight, index) => {
              console.log(flight)
          })
      }
  }

  render() {
    return (
      <div>
        {this._getHeader()}
        <Grid container spacing={24}>
          {this._getForm()}
          {this.state.error ? this._showError() : this._showFlights()}
        </Grid>
      </div>
    );
  }
}

export default App;
