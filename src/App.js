import React, { Component } from "react";

// MUI components
import Typography from "material-ui/Typography";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";

// custom components
import Form from "./components/Form.js";
import Flight from "./components/Flight.js";

// api calls
import RequestHandler from "./request-handler/request-handler";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      error: "",
      offset: 0,
      userInput: ""
    };

    this._onChangeForm = this._onChangeForm.bind(this);
    this.loadData = this.loadData.bind(this);
    this._onLoadSuccess = this._onLoadSuccess.bind(this);
    this._onLoadError = this._onLoadError.bind(this);
    this._showFlights = this._showFlights.bind(this);
    this.loadData = this.loadData.bind(this);
    this._setOffset = this._setOffset.bind(this);
    this.setError = this.setError.bind(this);
  }
  // component interface
    /**
     * loads data about flights via RequestHandler and then triggers onPromiseFulfilled _onLoadSuccess and onPromiseRejected triggers _onLoadError
     * @param {object} data - Object containing necessary information anout flight - from, to, dateFrom, dateTo.
     */
  loadData(data) {
    this.setState({ loading: true, userInput: data });
    RequestHandler.getFlights(
      data.from,
      data.to,
      data.dateFrom,
      data.dateTo,
      this.state.offset
    ).then(this._onLoadSuccess, this._onLoadError);
  }
    /**
     * Sets error
     * @param {string} error - error message.
     */
  setError(error) {
    this.setState({ error: error });
  }
  // private methods
    /**
     * gets app header
     */
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
    /**
     * Sets offset
     * @param {number} offset - number representing page offset.
     */
  _setOffset(offset) {
    this.setState({ offset: offset }, () =>
      this.loadData(this.state.userInput)
    );
  }
    /**
     * Sets data loaded by loadData method and stops loading
     * @param {object} result - request result.
     */
  _onLoadSuccess(result) {
    this.setState({
      data: result.data,
      loading: false
    });
  }
    /**
     * Sets error, when loading flights ends with error
     * @param {string} error - error message.
     */
  _onLoadError(error) {
    this.setState({ error: error, loading: false });
  }
    /**
     * Sets value by events target id
     * @param {object} event - event.
     */
  _onChangeForm(event) {
    let stateObj = {};
    stateObj[event.target.id] = event.target.value;
    this.setState(stateObj);
  }
    /**
     * gets form component
     */
  _getForm() {
    return (
      <Grid item xs={12}>
        <Form loadData={this.loadData} />
      </Grid>
    );
  }
    /**
     * Shows error
     */
  _showError() {
    return <p>{this.state.error}</p>;
  }
    /**
     * gets pagination controls
     */
  _getControls() {
    return (
      <div>
        <Button
          variant="raised"
          color="default"
          type="submit"
          onClick={() => this._setOffset(this.state.offset - 5)}
        >
          {"< Previous page"}
        </Button>
        <span style={{ margin: "8px" }}>{this.state.offset / 5}</span>
        <Button
          variant="raised"
          color="primary"
          type="submit"
          onClick={() => this._setOffset(this.state.offset + 5)}
        >
          Next page >
        </Button>
      </div>
    );
  }
    /**
     * gets flights if data about flights are loaded
     */
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
      result = this.state.data.data.map((flight, index) => {
        return (
          <Grid item xs={4} key={index}>
            <Flight
              currency={this.state.data.currency}
              cityFrom={flight.cityFrom}
              cityTo={flight.cityTo}
              flyFrom={flight.flyFrom}
              flyTo={flight.flyTo}
              flyDuration={flight.fly_duration}
              aTime={flight.aTime}
              dTime={flight.dTime}
              price={flight.price}
            />
          </Grid>
        );
      });
    }
    return result;
  }
  // render
  render() {
    return (
      <div>
        {this._getHeader()}
        <Grid container spacing={24}>
          {this._getForm()}
          {this.state.error ? this._showError() : this._showFlights()}
          {this.state.data ? this._getControls() : null}
        </Grid>
      </div>
    );
  }
}

export default App;
