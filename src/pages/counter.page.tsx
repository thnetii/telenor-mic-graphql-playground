import * as React from "react";
import {
  Button,
  ButtonGroup
} from "reactstrap";
import {
  Add as IncrementIcon,
  Remove as DecrementIcon
} from "@material-ui/icons";

import { CounterProps } from "../types/counter.types";

import AppPage from "../components/apppage.component";

const CounterPage = ({ count, onClick, reset }: CounterProps) =>
  <AppPage>
    <h2>Counter</h2>
    <p>This is an example counter component using React, Redux and TypeScript.</p>
    <p>Current Count: <strong>{count}</strong></p>
    <ButtonGroup>
      <Button onClick={onClick} data-amount="+10"><IncrementIcon /> 10</Button>
      <Button onClick={onClick} data-amount="+1">Increment</Button>
      <Button onClick={reset}>Reset</Button>
      <Button onClick={onClick} data-amount="-1">Decrement</Button>
      <Button onClick={onClick} data-amount="-10"><DecrementIcon /> 10</Button>
    </ButtonGroup>
  </AppPage>;

export default CounterPage;
