import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

// MUI components
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";

class Flight extends Component {
  constructor(props) {
    super(props);
  }
   _getDateFromUnix(timeStamp) {
    return moment(timeStamp, "X").format("DD-MM-YYYY HH:mm");
  }

  render() {
    let flight = this.props;
    return (
      <Paper style={{ padding: "24px" }}>
        <Typography variant="title">
          {`${flight.cityFrom} - ${flight.cityTo}`}
        </Typography>
        <Typography variant="subheading">
          {`Departure: ${this._getDateFromUnix(flight.dTime)}`}
        </Typography>
        <Typography variant="subheading">
          {`Arrival: ${this._getDateFromUnix(flight.aTime)}`}
        </Typography>
        <p>{`${flight.flyFrom} => ${flight.flyTo}`}</p>
        <p>{`Flight Duration: ${flight.flyDuration} `}</p>
        <p>{`Price: ${flight.price} ${flight.currency}`}</p>
      </Paper>
    );
  }
}

Flight.propTypes = {
  cityFrom: PropTypes.string,
  cityTo: PropTypes.string,
  dTime: PropTypes.number,
  aTime: PropTypes.number,
  flyFrom: PropTypes.string,
  flyTo: PropTypes.string,
  flyDuration: PropTypes.string,
  price: PropTypes.number,
  currency: PropTypes.string
};

export default Flight;
