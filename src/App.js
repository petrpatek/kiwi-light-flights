import React, { Component } from "react";
import moment from "moment";

// MUI components
import Typography from "material-ui/Typography";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import { CircularProgress } from "material-ui/Progress";

//custom components
import Form from "./components/Form.js";

// api calls
import RequestHandler from "./request-handler/request-handler";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      error: ""
    };

    this._onChangeForm = this._onChangeForm.bind(this);
    this.loadData = this.loadData.bind(this);
    this._onLoadSuccess = this._onLoadSuccess.bind(this);
    this._onLoadError = this._onLoadError.bind(this);
    this._showFlights = this._showFlights.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData(data) {
    this.setState({ loading: true });
    RequestHandler.getFlights(
      data.from,
      data.to,
      data.dateFrom,
      data.dateTo
    ).then(this._onLoadSuccess, this._onLoadError);
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
      <Grid item xs={12}>
        <Form loadData={this.loadData} />
      </Grid>
    );
  }

  _getDateFromUnix(timeStamp) {
    return moment(timeStamp, "X").format("DD-MM-YYYY HH:mm");
  }

  _showError() {}

  _showFlights() {
    let result;
    if (this.state.loading) {
      result = (
        <Grid item xs={12}>
          <Paper>
            <CircularProgress />
          </Paper>
        </Grid>
      );
    } else if (this.state.data) {
      result = this.state.data.data.data.map((flight, index) => {
        console.log(flight.duration, "Flight");
        return (
          <Grid item xs={4} key={index}>
            <Paper style={{ padding: "24px" }} key={index}>
              <Typography variant="title">
                {`${flight.cityFrom} - ${flight.cityTo}`}
              </Typography>
              <Typography variant="subheading">
                {`Departure: ${this._getDateFromUnix(
                  flight.dTime
                )} Arrival: ${this._getDateFromUnix(flight.aTime)} `}
              </Typography>
              <p>{`${flight.flyFrom} => ${flight.flyTo}`}</p>
              <p>{`Flight Duration: ${flight.fly_duration} `}</p>
              <p>{`Price: ${flight.price} ${this.state.data.data.currency}`}</p>
            </Paper>
          </Grid>
        );
      });
    }
    return result;
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
