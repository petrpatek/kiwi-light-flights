import React, { Component } from "react";
import PropTypes from "prop-types";

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
    this.state = {
      from: "",
      to: "",
      dateFrom: "",
      dateTo: "",
      locations: []
    };
    this._onChangeForm = this._onChangeForm.bind(this);
    this._loadSuggestions = this._loadSuggestions.bind(this);
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
      stateObj.locations = data.data.locations;
      console.log(data);
      this.setState(stateObj);
    });
  }
  _setSelected(stateKey, value) {
    let state = {};
    state[stateKey] = value;
    this.setState(state);
  }
  _getAutoComplete(type){
      return(<AutoComplete
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
          onSelect={(value) =>this._setSelected(type, value)}

      />)
  }

  render() {
    return (
      <Paper style={{ padding: "0 24px" }}>
          {this._getAutoComplete("from")}
          {this._getAutoComplete("to")}
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
    );
  }
}

Form.propTypes = {
  loadData: PropTypes.func
};

export default Form;
