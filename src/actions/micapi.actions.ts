import { Dispatch } from 'redux';

import { FluxStandardActionAuto, ErrorFluxStandardActionAuto } from '../helpers/flux-standard-action';

import {
  MicAuthLoginRequest,
  MicAuthLoginResponse,
  MicApiState
} from '../types/micapi.types';

import { micApiService } from '../services/micapi.service';

import {
  MICAPI_API_KEY_RESET,
  MICAPI_API_KEY_FECTH_START,
  MICAPI_API_KEY_FECTH_SUCCESS,
  MICAPI_API_KEY_FECTH_ABORT,
  MICAPI_API_KEY_FECTH_FAILURE,
  MICAPI_MANIFEST_REQUEST,
  MICAPI_MANIFEST_RESPONSE,
  MICAPI_MANIFEST_FAILURE,
  MICAPI_METADATA_MANIFEST_REQUEST,
  MICAPI_METADATA_MANIFEST_RESPONSE,
  MICAPI_METADATA_MANIFEST_FAILURE,
  MICAPI_AUTH_LOGIN_REQUEST,
  MICAPI_AUTH_LOGIN_RESPONSE,
  MICAPI_AUTH_LOGIN_SUCCESS,
  MICAPI_AUTH_LOGIN_FAILURE,
} from '../constants/micapi.constants';

interface MicApiHostnameInfo {
  hostname: string;
}

interface MicApiRequestInfo {
  url: RequestInfo,
  params: RequestInit
}

interface MicApiResponseInfo {
  response: Response,
  body: any
}

interface MicApiStackDetails extends MicApiHostnameInfo {
  apiKey: string;
  apiBaseUrl: string;
}

interface MicAuthLoginRequestInfo extends MicApiRequestInfo {
  request: MicAuthLoginRequest;
}

interface MicAuthLoginRequestDetails {
  apiBaseUrl: string;
  apiKey?: string
  request: MicAuthLoginRequest;
}

type MicApiHostnameRequestInfo = MicApiHostnameInfo & MicApiRequestInfo;

type MicApiKeyResetAction = FluxStandardActionAuto<undefined, undefined, MICAPI_API_KEY_RESET>;

type MicApiApiKeyFetchStartAction = FluxStandardActionAuto<MicApiHostnameInfo, undefined, MICAPI_API_KEY_FECTH_START>;
type MicApiApiKeyFetchSuccessAction = FluxStandardActionAuto<MicApiStackDetails, undefined, MICAPI_API_KEY_FECTH_SUCCESS>;
type MicApiApiKeyFetchAbortAction = FluxStandardActionAuto<Partial<MicApiHostnameInfo>, undefined, MICAPI_API_KEY_FECTH_ABORT>;
type MicApiApiKeyFetchFailureAction = ErrorFluxStandardActionAuto<Error, MicApiHostnameInfo, MICAPI_API_KEY_FECTH_FAILURE>;

type MicApiManifestRequestAction = FluxStandardActionAuto<MicApiHostnameRequestInfo, undefined, MICAPI_MANIFEST_REQUEST>
type MicApiManifestResponseAction = FluxStandardActionAuto<MicApiResponseInfo, undefined, MICAPI_MANIFEST_RESPONSE>
type MicApiManifestFailureAction = ErrorFluxStandardActionAuto<Error, MicApiHostnameInfo, MICAPI_MANIFEST_FAILURE>

type MicApiMetadataManifestRequestAction = FluxStandardActionAuto<MicApiHostnameRequestInfo, undefined, MICAPI_METADATA_MANIFEST_REQUEST>;
type MicApiMetadataManifestResponseAction = FluxStandardActionAuto<MicApiResponseInfo, undefined, MICAPI_METADATA_MANIFEST_RESPONSE>;
type MicApiMetadataManifestFailureAction = ErrorFluxStandardActionAuto<Error, MicApiHostnameInfo, MICAPI_METADATA_MANIFEST_FAILURE>;

type MicApiAuthLoginRequestAction = FluxStandardActionAuto<MicAuthLoginRequestInfo, undefined, MICAPI_AUTH_LOGIN_REQUEST>;
type MicApiAuthLoginResponseAction = FluxStandardActionAuto<MicApiResponseInfo, MicAuthLoginRequest, MICAPI_AUTH_LOGIN_RESPONSE>;
type MicApiAuthLoginSuccessAction = FluxStandardActionAuto<MicAuthLoginResponse, MicAuthLoginRequest, MICAPI_AUTH_LOGIN_SUCCESS>;
type MicApiAuthLoginFailureAction = ErrorFluxStandardActionAuto<Error, MicAuthLoginRequestDetails, MICAPI_AUTH_LOGIN_FAILURE>;

export type MicApiAnyAction = (
  MicApiKeyResetAction |

  MicApiApiKeyFetchStartAction |
  MicApiApiKeyFetchSuccessAction |
  MicApiApiKeyFetchAbortAction |
  MicApiApiKeyFetchFailureAction |

  MicApiManifestRequestAction |
  MicApiManifestResponseAction |
  MicApiManifestFailureAction |

  MicApiMetadataManifestRequestAction |
  MicApiMetadataManifestResponseAction |
  MicApiMetadataManifestFailureAction |

  MicApiAuthLoginRequestAction |
  MicApiAuthLoginResponseAction |
  MicApiAuthLoginSuccessAction |
  MicApiAuthLoginFailureAction
);

export const micapiActions = {
  fetchApiKey,
  resetApiKey,
  abortApiKey,
  fetchAuthLogin
}

function isRequestedHostname(hostname: string, getState: () => MicApiState) {
  const { requestedHostname } = getState();
  return hostname === requestedHostname;
}

async function fetchManifest(hostname: string, dispatch: Dispatch<MicApiAnyAction>) {
  return await micApiService.fetchManifest(hostname, {
    onPreFetch: (url, params) => {
      dispatch({
        type: MICAPI_MANIFEST_REQUEST,
        payload: { url, params, hostname }
      });
    },
    onResponse: (response, body) => dispatch({
      type: MICAPI_MANIFEST_RESPONSE,
      payload: { response, body, hostname }
    }),
    onFailed: (error) => dispatch({
      type: MICAPI_MANIFEST_FAILURE, error: true,
      payload: error, meta: { hostname }
    })
  });
}

async function fetchMetadataManifest(hostname: string, baseUrl: string, dispatch: Dispatch<MicApiAnyAction>) {
  return await micApiService.fetchMetadataManifest(baseUrl, {
    onPreFetch: (url, params) => {
      dispatch({
        type: MICAPI_METADATA_MANIFEST_REQUEST,
        payload: { url, params, hostname }
      });
    },
    onResponse: (response, body) => dispatch({
      type: MICAPI_METADATA_MANIFEST_RESPONSE,
      payload: { response, body, hostname }
    }),
    onFailed: (error) => dispatch({
      type: MICAPI_METADATA_MANIFEST_FAILURE, error: true,
      payload: error, meta: { hostname }
    })
  });
}

function fetchApiKey(hostname: string) {
  if (typeof hostname === 'undefined' || !hostname) {
    return;
  }

  return async (dispatch: Dispatch<MicApiAnyAction>, getState: () => MicApiState) => {
    dispatch({
      type: MICAPI_API_KEY_FECTH_START,
      payload: { hostname }
    });

    try {
      const micManifest = await fetchManifest(hostname, dispatch);
      if (!isRequestedHostname(hostname, getState)) {
        return;
      }
      const apiBaseUrl = micApiService.getApiGatewayBaseUrl(micManifest);
      const apiManifest = await fetchMetadataManifest(hostname, apiBaseUrl, dispatch);
      if (!isRequestedHostname(hostname, getState)) {
        return;
      }
      dispatch({
        type: MICAPI_API_KEY_FECTH_SUCCESS,
        payload: { hostname, apiBaseUrl, apiKey: apiManifest.ApiKey }
      });
    } catch (error) {
      dispatch({
        type: MICAPI_API_KEY_FECTH_FAILURE, error: true,
        payload: error, meta: { hostname }
      });
    }
  };
}

function resetApiKey(): MicApiKeyResetAction {
  return { type: MICAPI_API_KEY_RESET };
}

function abortApiKey(hostname?: string): MicApiApiKeyFetchAbortAction {
  return {
    type: MICAPI_API_KEY_FECTH_ABORT,
    payload: { hostname }
  }
}

function fetchAuthLogin(apiBaseUrl: string, apiKey: string | undefined, request: MicAuthLoginRequest) {
  return async (dispatch: Dispatch<MicApiAnyAction>) => {
    try {
      const authLogin = await micApiService.fetchAuthLogin(apiBaseUrl, apiKey, request, {
        onPreFetch: (url, params) => {
          dispatch({
            type: MICAPI_AUTH_LOGIN_REQUEST,
            payload: { url, params, request }
          })
        },
        onResponse: (response, body) => dispatch({
          type: MICAPI_AUTH_LOGIN_RESPONSE,
          payload: { response, body },
          meta: request
        }),
        onFailed: (error) => dispatch({
          type: MICAPI_AUTH_LOGIN_FAILURE, error: true,
          payload: error, meta: { apiBaseUrl, apiKey, request }
        })
      });
      dispatch({
        type: MICAPI_AUTH_LOGIN_SUCCESS,
        payload: authLogin,
        meta: request
      });
    } catch {
      // Error already dispatched by micApiService
    }
  };
}
