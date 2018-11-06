import { Reducer } from 'redux';
import { MicHostinfoAnyAction } from '../actions/MicHostinfo';
import { MicHostinfoState, initialState } from '../types/MicHostinfo';
import { HOSTNAME_ONCHANGE_EVENT, HOSTNAME_ONBLUR_EVENT, FETCH_MIC_MANIFEST, RECEIVE_MIC_MANIFEST, HOSTNAME_CHANGE_FAILED, FETCH_API_MANIFEST, RECEIVE_API_MANIFEST, HOSTNAME_CHANGE_SUCCEEDED } from '../constants/MicHostinfo';

export const MicHostinfoReducer: Reducer<MicHostinfoState, MicHostinfoAnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case HOSTNAME_ONCHANGE_EVENT:
      return state.requestedHostname === action.payload.hostname ? state : {
        ...state,
        requestedHostname: action.payload.hostname
      };
    case HOSTNAME_ONBLUR_EVENT:
      return {
        ...state,
        status: {
          type: 'warning',
          text: 'The MIC Hostname has changed.'
        }
      };
    case FETCH_MIC_MANIFEST:
      return {
        ...state,
        status: {
          type: 'warning',
          text: 'Fetching MIC Stack Manifest...'
        }
      };
    case RECEIVE_MIC_MANIFEST:
      return {
        ...state,
        status: {
          type: 'warning',
          text: 'Fetching MIC Stack Manifest... Succeeded!'
        }
      };
    case FETCH_API_MANIFEST:
      return {
        ...state,
        status: {
          type: 'warning',
          text: 'Fetching MIC API Manifest...'
        }
      };
    case RECEIVE_API_MANIFEST:
      return {
        ...state,
        status: {
          type: 'warning',
          text: 'Fetching MIC API Manifest... Succeeded!'
        }
      };
    case HOSTNAME_CHANGE_SUCCEEDED:
      return {
        ...state,
        ...action.payload,
        status: {
          type: 'success',
          text: `Connected to MIC Cloud REST API.`
        }
      };
    case HOSTNAME_CHANGE_FAILED:
      return {
        ...state,
        status: {
          type: 'error',
          text: `${action.payload.name}: ${action.payload.message}`
        }
      };
    default:
      return state;
  }
};
