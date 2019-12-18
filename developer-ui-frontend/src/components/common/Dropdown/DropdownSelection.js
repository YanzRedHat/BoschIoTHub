/*
 * Copyright 2018 Bosch Software Innovations GmbH ("Bosch SI"). All rights reserved.
 */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ArrowDropdown from "images/arrow-dropdown.svg";

const DropdownSelectBox = styled.div`
  z-index: 3;
  border: 1px solid #ddd;
  height: 3rem;
  position: relative;
  display: inline-flex;
  margin: 0;
  padding: 0;
  font-weight: 400;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.2s ease-out;

  ${props =>
    !props.isOpen &&
    `
    &:hover {
      border: 1px solid ${props.theme.accentColor};
    }
  `};
`;

const CaretContainer = styled.div`
  padding-right: 1.2rem;
  width: 1.8rem;
  height: 1.8rem;
  position: relative;
`;

const Caret = styled(ArrowDropdown)`
  transition: transform 0.3s;
  width: 1.8rem;
  height: 1.8rem;
  transform: rotateZ(0);
  transform-origin: center;
  ${props => props.rotated && `transform: rotateZ(180deg);`};
`;

const DropdownSelectedValue = styled.div`
  padding: 0 3rem 0 1.2rem;
`;

const DropdownCurrentSelection = ({
  selected,
  toggle,
  isOpen,
  header,
  input
}) => (
  <DropdownSelectBox isOpen={isOpen} onClick={toggle}>
    {selected ? (
      <DropdownSelectedValue {...input}>
        {selected && selected.value}
      </DropdownSelectedValue>
    ) : (
      <DropdownSelectedValue {...input}>{header}</DropdownSelectedValue>
    )}

    <CaretContainer>
      <Caret rotated={isOpen ? 1 : 0} />
    </CaretContainer>
  </DropdownSelectBox>
);

DropdownCurrentSelection.propTypes = {
  toggle: PropTypes.func.isRequired,
  selected: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  header: PropTypes.string,
  input: PropTypes.object
};

export default DropdownCurrentSelection;
