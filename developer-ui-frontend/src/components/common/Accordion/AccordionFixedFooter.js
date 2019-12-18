/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { withAccordionContext } from "./Accordion";

const AccordionFixedFooterStyled = styled.div`
  &:not(.adding-mode) {
    cursor: pointer;
  }
  position: relative;
  z-index: 1;
  display: flex;
  height: 4rem;
  align-content: center;
  background: #fff;
  border: 1px solid #ccc;
  font-weight: 500;
  padding: 0 1rem;
  box-sizing: border-box;
  color: #757575;
  align-items: center;
  justify-content: flex-start;

  /*
  This could be used to indicate that one can scroll further
  &:before {
    content: "";
    position: absolute;
    top: -100%;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at bottom,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 75%,
      rgba(0, 0, 0, 0) 100%
    );
  } */
`;
/* eslint-disable react/prop-types */
const AccordionFixedFooter = ({ snapFooter, ...props }) =>
  snapFooter ? (
    ReactDOM.createPortal(
      <AccordionFixedFooterStyled snapFooter={snapFooter} {...props} />,
      document.getElementById("fixed-acc-footer-modal")
    )
  ) : (
    <AccordionFixedFooterStyled snapFooter={snapFooter} {...props} />
  );

export default withAccordionContext(AccordionFixedFooter);
