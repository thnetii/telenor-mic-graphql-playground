import * as React from "react";
import {
  bindActionCreators,
  Dispatch,
} from "redux";
import { connect } from "react-redux";
import {
  Button,
  ButtonGroup
} from "reactstrap";
import IncrementOneIcon from "@material-ui/icons/ExposurePlus1";
import DecrementOneIcon from "@material-ui/icons/ExposureNeg1";

import { GlobalState } from "../types";
import { CounterState, CounterProps } from "../types/counter.types";

import { CounterAnyAction, counterActions } from "../actions/counter.actions";

import AppPage from "../components/AppPage";

export const CounterView = ({ count, onClick, reset }: CounterProps) =>
  <AppPage>
    <h2>Counter</h2>
    <p>This is an example counter component using React, Redux and TypeScript.</p>
    <p>Current Count: <strong>{count}</strong></p>
    <ButtonGroup>
      <Button onClick={onClick} data-amount="+1"><IncrementOneIcon titleAccess="Increment" /></Button>
      <Button onClick={reset}>Reset</Button>
      <Button onClick={onClick} data-amount="-1"><DecrementOneIcon titleAccess="Decrement" /></Button>
    </ButtonGroup>
  </AppPage>;

export const ConnectedCounterView = connect(
  (state: GlobalState): CounterState => state.counter,
  (dispatch: Dispatch<CounterAnyAction>) => bindActionCreators(counterActions, dispatch)
)(CounterView);

export default ConnectedCounterView;
