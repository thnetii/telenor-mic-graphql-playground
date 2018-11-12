import { Reducer } from "redux";

import { MicApiAnyAction } from "../actions/micapi.actions";
import { MicApiState } from "../types/micapi.types";
import {
  MICAPI_API_KEY_FECTH_START,
  MICAPI_API_KEY_FECTH_SUCCESS,
  MICAPI_API_KEY_FECTH_ABORT,
} from "../constants/micapi.constants";

const micapiReducer: Reducer<MicApiState, MicApiAnyAction> =
  (state = {}, action) => {
    switch (action.type) {
      case MICAPI_API_KEY_FECTH_START:
        return {
          ...state,
          requestedHostname: action.payload.hostname,
        };
      case MICAPI_API_KEY_FECTH_ABORT:
        return {
          ...state,
          requestedHostname: undefined
        };
      case MICAPI_API_KEY_FECTH_SUCCESS:
        return {
          ...state,
          requestedHostname: undefined,
          hostname: action.payload.hostname,
          apiBaseUrl: action.payload.apiBaseUrl,
          apiKey: action.payload.apiKey
        };
      default:
        return state;
    }
  };

export default micapiReducer;
