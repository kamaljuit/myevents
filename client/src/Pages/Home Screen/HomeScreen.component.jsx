/**
 * Main HomePage Component
 */
import React from "react";
import { connect } from "react-redux";
import HeaderComponent from "../../Components/Header/Header.component";
import EventForm from "../../Components/EventForm/EventForm.component";
import ExpansionPanel from "../../Components/ExpansionPanel/ExpansionPanel.component";
import GridList from "../../Components/GridList/GridList.component";
import { Container } from "@material-ui/core";
import "./HomeScreen.styles.scss";
class Home extends React.Component {
  state = {};

  handleChange = property => event => {
    this.setState({ [property]: event.target.value });
  };

  render() {
    return (
      <div>
        <div className="header">
          <HeaderComponent />
        </div>

        <Container maxWidth="md">
          <div>
            <EventForm />
            <ExpansionPanel heading="See Your Events">
              <GridList data={this.props.selfEvents} />
            </ExpansionPanel>
          </div>
          <div className="user-url-list">
            <ExpansionPanel heading="See All Events">
              <GridList data={this.props.allEvents} />
            </ExpansionPanel>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allEvents: state.Event.allEvents,
  selfEvents: state.Event.selfEvents
});

export default connect(mapStateToProps)(Home);
