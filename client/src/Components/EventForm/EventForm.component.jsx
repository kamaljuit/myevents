import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import FormInput from "../FormInput/FormInput.component";
import { Button, TextField } from "@material-ui/core";
import { addEventStart, setEventError } from "../../Redux/Events/Events.action";
import { connect } from "react-redux";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    border: "2px solid darkgrey",
    margin: "10px"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 300
  },
  error: {
    border: "2px solid crimson",
    background: "white",
    color: "darkred",
    fontSize: "larger",
    borderRadius: "5px"
  }
}));

function EventForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    title: "",
    description: ""
  });

  const handleChange = property => event => {
    setValues({ ...values, [property]: event.target.value });
  };

  const [selectedDate, handleDateChange] = React.useState({
    startDate: new Date(),
    startTime: new Date(),
    endTime: new Date()
  });

  const handleDateTimeChange = property => value => {
    handleDateChange({
      ...selectedDate,
      [property]: value
    });
  };
  const onSubmit = event => {
    event.preventDefault();
    //dispatch event add error!
    if (
      selectedDate.startTime > selectedDate.endTime ||
      selectedDate.startTime < new Date()
    ) {
      props.dispatch(setEventError("Invalid Input!"));
    } else {
      props.dispatch(
        addEventStart({ ...values, ...selectedDate, user: props.user._id })
      );
    }
  };

  return (
    <div className={classes.root}>
      <div style={{ margin: "5px 20px" }}>
        <div style={{ alignSelf: "center", margin: "auto" }}>
          Add Your Event
        </div>

        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>
            <p>Title</p>
            <FormInput
              id="event-title"
              placeholder="Enter the title"
              type="text"
              value={values.title}
              onChange={handleChange("title")}
            />
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div>
                <p>Date: </p>
                <KeyboardDatePicker
                  value={selectedDate.startDate}
                  format="dd/MM/yyyy"
                  disablePast
                  variant="inline"
                  onChange={handleDateTimeChange("startDate")}
                />
              </div>
              <div>
                <p>Start Time: </p>
                <KeyboardTimePicker
                  value={selectedDate.startTime}
                  onChange={handleDateTimeChange("startTime")}
                  variant="inline"
                />
              </div>
              <div>
                <p>End Time: </p>
                <KeyboardTimePicker
                  value={selectedDate.endTime}
                  onChange={handleDateTimeChange("endTime")}
                  variant="inline"
                />
              </div>
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <TextField
              id="outlined-multiline-static"
              label="Event Description"
              multiline
              rows="4"
              variant="outlined"
              value={values.description}
              onChange={handleChange("description")}
            />
          </div>

          {props.eventError ? (
            <span className={classes.error}>{props.eventError}</span>
          ) : null}
          <Button type="submit" style={{ backgroundColor: "darkcyan" }}>
            Add Event
          </Button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  eventError: state.Event.errorMessage,
  user: state.User.user
});

export default connect(mapStateToProps)(EventForm);
