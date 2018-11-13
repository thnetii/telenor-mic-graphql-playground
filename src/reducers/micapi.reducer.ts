import { Reducer } from "redux";

import { MicApiAnyAction } from "../actions/micapi.actions";
import { MicApiState } from "../types/micapi.types";
import {
  MICAPI_API_KEY_FECTH_START,
  MICAPI_API_KEY_FECTH_SUCCESS,
  MICAPI_API_KEY_FECTH_ABORT,
  MICAPI_API_KEY_FECTH_FAILURE,
  MICAPI_MANIFEST_REQUEST,
  MICAPI_MANIFEST_RESPONSE,
  MICAPI_METADATA_MANIFEST_REQUEST,
  MICAPI_METADATA_MANIFEST_RESPONSE,
  MICAPI_API_KEY_RESET,
} from "../constants/micapi.constants";

const micapiReducer: Reducer<MicApiState, MicApiAnyAction> =
  (state = {}, action) => {
    switch (action.type) {
      case MICAPI_API_KEY_RESET:
        return {
          ...state,
          requestedHostname: undefined,
          hostname: undefined,
          apiBaseUrl: undefined,
          apiKey: undefined,
          apiKeyStatusText: undefined,
          apiKeyError: undefined
        };
      case MICAPI_API_KEY_FECTH_START:
        return {
          ...state,
          requestedHostname: action.payload.hostname,
          apiKeyError: false,
          apiKeyStatusText: "Connecting to MIC Cloud REST API."
        };
      case MICAPI_API_KEY_FECTH_ABORT:
        return {
          ...state,
          requestedHostname: undefined,
          apiKeyStatusText: "Connection aborted."
        };
      case MICAPI_API_KEY_FECTH_SUCCESS:
        return {
          ...state,
          apiKeyError: false,
          requestedHostname: undefined,
          apiKeyStatusText: "Connected to MIC Cloud REST API.",
          hostname: action.payload.hostname,
          apiBaseUrl: action.payload.apiBaseUrl,
          apiKey: action.payload.apiKey
        };
      case MICAPI_API_KEY_FECTH_FAILURE:
        return {
          ...state,
          apiKeyError: true,
          requestedHostname: undefined,
          apiKeyStatusText: action.payload.message
        };
      case MICAPI_MANIFEST_REQUEST:
        return {
          ...state,
          apiKeyError: false,
          apiKeyStatusText: "Fetching MIC Manifest."
        };
      case MICAPI_MANIFEST_RESPONSE:
        return {
          ...state,
          apiKeyError: false,
          apiKeyStatusText: "Received MIC Manifest."
        };
      case MICAPI_METADATA_MANIFEST_REQUEST:
        return {
          ...state,
          apiKeyError: false,
          apiKeyStatusText: "Fetching MIC Cloud REST API Metadata Manifest."
        };
      case MICAPI_METADATA_MANIFEST_RESPONSE:
        return {
          ...state,
          apiKeyError: false,
          apiKeyStatusText: "Received MIC Cloud REST API Metadata Manifest."
        };
      default:
        return state;
    }
  };

export default micapiReducer;
