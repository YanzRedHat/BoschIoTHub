/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import "styles/subscriptionsConfigForm.scss"; // TODO: Move shared scss to registryListing.scss
import "styles/registrations.scss";
// React
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter, Route } from "react-router-dom";
import { matchPath } from "react-router";
// Redux
import { connect } from "react-redux";
import {
  selectNumberOfAllDevices,
  hasDevice,
  selectIsFetchingAny
} from "reducers/selectors";
import { formValueSelector, change } from "redux-form/immutable";
// Child Components
import BigCard from "components/common/BigCard";
import MainContent from "./MainContent/MainContent";
import SideContent from "./SideContent/SideContent";
import AddRegistrationButton from "./AddRegistrationButton";
import Modals from "./Modals";

export class Registrations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainPanelExpanded: false,
      ...props.initialState
    };
    this.setMainPanel = this.setMainPanel.bind(this);
  }

  /* eslint-disable react/no-did-mount-set-state */
  // On first render, check the path and either redirect if that device
  // doesn't exist or select that device in the Redux Form state
  componentDidMount() {
    // wait some time to prevent laggy background transition
    setTimeout(() => document.body.classList.add("withBgPattern"), 500);
    const {
      history,
      validateDeviceId,
      changeCurrentlySelectedDevice
    } = this.props;
    const match = matchPath(history.location.pathname, {
      path: "/registrations/:selectedDeviceId",
      exact: false,
      strict: false
    });
    const pathDeviceId = match && match.params.selectedDeviceId;
    if (pathDeviceId) {
      if (validateDeviceId(pathDeviceId)) {
        changeCurrentlySelectedDevice(pathDeviceId);
        this.setState({ mainPanelExpanded: true });
      } else {
        history.push("/registrations");
      }
    }
  }

  setMainPanel(newState) {
    this.setState({ mainPanelExpanded: newState });
  }

  render() {
    const { mainPanelExpanded } = this.state;
    const { numberOfDevices, anyFetching } = this.props;
    return (
      <Route
        path="/registrations/:selectedDeviceId?/:registrationsSubMenu?/:authId?"
        render={() => (
          <Fragment>
            <BigCard
              loadingBarShown={anyFetching}
              title="Manage Device Registrations"
              id="registrations-form-container"
              className={mainPanelExpanded ? "expanded" : null}
            >
              <div id="form-content">
                <SideContent
                  mainPanelExpanded={mainPanelExpanded}
                  setMainPanel={this.setMainPanel}
                />
                <MainContent
                  mainPanelExpanded={mainPanelExpanded}
                  setMainPanel={this.setMainPanel}
                />

                <AddRegistrationButton
                  hasCallout={numberOfDevices === 0}
                  setMainPanel={this.setMainPanel}
                />
              </div>
            </BigCard>
            <Modals setMainPanel={this.setMainPanel} />
          </Fragment>
        )}
      />
    );
  }
}

Registrations.propTypes = {
  initialState: PropTypes.object,
  numberOfDevices: PropTypes.number.isRequired,
  selectedDevice: PropTypes.string,
  anyFetching: PropTypes.bool,
  history: PropTypes.object.isRequired,
  changeCurrentlySelectedDevice: PropTypes.func.isRequired,
  validateDeviceId: PropTypes.func.isRequired
};

Registrations = withRouter(
  connect(
    state => ({
      selectedDevice: formValueSelector("registrationsTabListing")(
        state,
        "selectedDevice"
      ),
      anyFetching: selectIsFetchingAny(state),
      numberOfDevices: selectNumberOfAllDevices(state),
      validateDeviceId: deviceId => hasDevice(state, deviceId)
    }),
    dispatch => ({
      changeCurrentlySelectedDevice: deviceId =>
        dispatch(change("registrationsTabListing", "selectedDevice", deviceId))
    })
  )(Registrations)
);

export default Registrations;
