import { RouterState } from "connected-react-router";

import { CounterState } from "./counter.types";
import { MicApiState } from "./micapi.types";

export interface GlobalState {
  counter: CounterState;
  micapi: MicApiState,
  router: RouterState;
}
