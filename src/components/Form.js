import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

// MUI components
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import AutoComplete from "react-autocomplete";

// api calls
import RequestHandler from "../request-handler/request-handler";

class Form extends Component {
  constructor(props) {
    super(props);
    let dates = this._getInitalDates();
    this.state = {
      from: "",
      to: "",
      dateFrom: dates[0],
      dateTo: dates[1],
      locations: []
    };
    this._onChangeForm = this._onChangeForm.bind(this);
    this._loadSuggestions = this._loadSuggestions.bind(this);
    this._submitForm = this._submitForm.bind(this);
    this._resetFrom = this._resetFrom.bind(this);
  }
  _getInitalDates() {
    let now = moment(new Date());
    let format = "YYYY-MM-DD";
    return [now.format(format), now.add(5, "days").format(format)];
  }

  _onChangeForm(event, setStateCallback) {
    let stateObj = {};
    stateObj[event.target.id] = event.target.value;
    this.setState(stateObj, setStateCallback);
    console.log(event.target);
  }

  //TODO: onRejected promise
  _loadSuggestions(stateKey) {
    RequestHandler.getLocations(this.state[stateKey]).then(data => {
      let stateObj = {};
      stateObj[`locations`] = data.data.locations;
      console.log(data);
      this.setState(stateObj);
    });
  }
  _setSelected(stateKey, value) {
    let state = { locations: [] };
    state[stateKey] = value;
    this.setState(state);
  }
  _getAutoComplete(type) {
    return (
      <div>
        <label htmlFor={type}> {type}</label>
        <AutoComplete
          getItemValue={item => item.name}
          items={this.state.locations}
          renderItem={(item, isHighlighted) => (
            <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
              {item.name}
            </div>
          )}
          value={this.state[type]}
          inputProps={{ id: type, label: type.toUpperCase() }}
          onChange={event =>
            this._onChangeForm(event, this._loadSuggestions(event.target.id))
          }
          onSelect={value => this._setSelected(type, value)}
        />
      </div>
    );
  }
  _submitForm() {
    this.props.loadData(this.state);
  }
  _resetFrom() {
    let dates = this._getInitalDates();
    this.setState({ from: "", to: "", dateFrom: dates[0], dateTo: dates[1] });
  }

  render() {
    return (
      <Paper
        style={{
          padding: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {this._getAutoComplete("from")}
        {this._getAutoComplete("to")}
        <TextField
          id="dateFrom"
          label="Date from"
          type="date"
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
          InputLabelProps={{
            shrink: true
          }}
          onChange={this._onChangeForm}
          value={this.state.dateTo}
        />
        <Button
          variant="raised"
          color="primary"
          onClick={this._submitForm}
          type="submit"
        >
          Find flight
        </Button>
        <Button
          variant="raised"
          color="secondary"
          onClick={this._resetFrom}
          type="reset"
        >
          Reset
        </Button>
      </Paper>
    );
  }
}

Form.propTypes = {
  loadData: PropTypes.func
};

export default Form;
