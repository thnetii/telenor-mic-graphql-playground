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
import IncrementIcon from "@material-ui/icons/Add";
import DecrementIcon from "@material-ui/icons/Remove";

import { GlobalState } from "../types";
import { CounterState, CounterProps } from "../types/counter.types";

import { CounterAnyAction, counterActions } from "../actions/counter.actions";

import AppPage from "../components/apppage.component";

export const CounterView = ({ count, onClick, reset }: CounterProps) =>
  <AppPage>
    <h2>Counter</h2>
    <p>This is an example counter component using React, Redux and TypeScript.</p>
    <p>Current Count: <strong>{count}</strong></p>
    <ButtonGroup>
      <Button onClick={onClick} data-amount="+10"><span className="align-middle"><IncrementIcon /> 10</span></Button>
      <Button onClick={onClick} data-amount="+1">Increment</Button>
      <Button onClick={reset}>Reset</Button>
      <Button onClick={onClick} data-amount="-1">Decrement</Button>
      <Button onClick={onClick} data-amount="-10"><span className="align-middle"><DecrementIcon /> 10</span></Button>
    </ButtonGroup>
  </AppPage>;

export const ConnectedCounterView = connect(
  (state: GlobalState): CounterState => state.counter,
  (dispatch: Dispatch<CounterAnyAction>) => bindActionCreators(counterActions, dispatch)
)(CounterView);

export default ConnectedCounterView;
