/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { TransitionMotion, spring } from "react-motion";
// Child Components
import { RoundOutlineButton } from "components/common/buttons";
import ExpandLink from "components/common/ExpandLink";
import LoginInformation from "./LoginInformation";
import DetailsInformation from "./DetailsInformation";
// SVG Imports
import SuccessIcon from "images/successIconCircle.svg";

export default class ConfirmationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkmarkAnimationFinished: false,
      shiftingAnimationFinished: false,
      detailsExpanded: false
    };
    this.startAnimations = this.startAnimations.bind(this);
  }

  componentDidMount() {
    if (this.props.inConfirmationMode) {
      this.startAnimations();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.inConfirmationMode && !this.props.inConfirmationMode) ||
      !this.state.checkmarkAnimationFinished
    ) {
      this.startAnimations();
    }
  }

  startAnimations() {
    // set shiftingAnimationFinished to true and start the staggered motion
    setTimeout(() => this.setState({ checkmarkAnimationFinished: true }), 1500);
    setTimeout(() => this.setState({ shiftingAnimationFinished: true }), 1750);
  }

  render() {
    const { changeIsOpen, newDeviceId, newAuthId, newPw, tenant } = this.props;
    const {
      shiftingAnimationFinished,
      checkmarkAnimationFinished,
      detailsExpanded
    } = this.state;

    return (
      <div className="confirm-registration" id="new-reg-content">
        <div className="top-content">
          <SuccessIcon
            id="successIcon"
            className={shiftingAnimationFinished ? "pulse" : null}
          />
          <h3>
            <span>{newDeviceId}</span> successfully registered!
          </h3>
        </div>
        <TransitionMotion
          defaultStyles={[{ key: "modal-body", style: { height: 0 } }]}
          styles={[
            {
              key: "modal-body",
              style: {
                height: checkmarkAnimationFinished ? spring(79.612) : 0
              }
            }
          ]}
        >
          {interpStyles => (
            <span
              key={interpStyles[0].key}
              style={{
                maxHeight: `${interpStyles[0].style.height}%`,
                overflowY: shiftingAnimationFinished ? "auto" : "hidden"
              }}
            >
              <p>You can now send messages from your device</p>
              <div className="modal-body-content">
                <DetailsInformation deviceId={newDeviceId} authId={newAuthId} />
                <ExpandLink
                  expanded={this.state.detailsExpanded}
                  toggle={() =>
                    this.setState(state => ({
                      detailsExpanded: !state.detailsExpanded
                    }))
                  }
                >
                  Details
                </ExpandLink>
                {detailsExpanded && (
                  <LoginInformation
                    authId={newAuthId}
                    tenant={tenant}
                    pw={newPw}
                    shiftingAnimationFinished={shiftingAnimationFinished}
                  />
                )}
              </div>
              <RoundOutlineButton
                type="button"
                id="ok-btn"
                secondary
                onClick={() => changeIsOpen(false)}
              >
                OK
              </RoundOutlineButton>
            </span>
          )}
        </TransitionMotion>
      </div>
    );
  }
}

ConfirmationView.propTypes = {
  changeIsOpen: PropTypes.func.isRequired,
  inConfirmationMode: PropTypes.bool.isRequired,
  newDeviceId: PropTypes.string,
  newAuthId: PropTypes.string,
  newPw: PropTypes.string,
  tenant: PropTypes.string
};
