import { Reducer } from 'redux';
import { MicStackState } from '../types/micstack.types';
import { MicStackAnyAction } from '../actions/micstack.actions';
import {
  MICSTACK_CONNECT_START, MICSTACK_CONNECT_SUCCESS, MICSTACK_CONNECT_FAILURE,
} from '../constants/micstack.constants';
import {
  MICAPI_MANIFEST_REQUEST,
  MICAPI_MANIFEST_RESPONSE,
  MICAPI_METADATA_MANIFEST_REQUEST,
  MICAPI_METADATA_MANIFEST_RESPONSE
} from '../constants/micapi.constants';

const micstackReducer: Reducer<MicStackState, MicStackAnyAction> = (state = {}, action) => {
  switch (action.type) {
    case MICSTACK_CONNECT_START:
      return {
        ...state,
        isConnecting: true,
        statusText: 'Connecting to MIC Cloud REST API.'
      };

    case MICSTACK_CONNECT_SUCCESS:
      return {
        ...state,
        isError: false,
        isConnecting: false,
        statusText: 'Connected to MIC Cloud REST API.',
        ...action.payload
      };

    case MICSTACK_CONNECT_FAILURE:
      return {
        ...state,
        isConnecting: false,
        isError: true,
        statusText: action.payload.message
      };

    case MICAPI_MANIFEST_REQUEST:
      return {
        ...state,
        statusText: 'Fetching MIC Cloud REST API Stack Manifest.'
      };

    case MICAPI_MANIFEST_RESPONSE:
      return {
        ...state,
        statusText: 'Received MIC Cloud REST API Stack Manifest.'
      };

    case MICAPI_METADATA_MANIFEST_REQUEST:
      return {
        ...state,
        statusText: 'Fetching MIC Cloud REST API Metadata Manifest.'
      };

    case MICAPI_METADATA_MANIFEST_RESPONSE:
      return {
        ...state,
        statusText: 'Received MIC Cloud REST API Metadata Manifest.'
      };

    default:
      return state;
  }
};

export default micstackReducer;
