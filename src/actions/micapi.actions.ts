import { Dispatch } from 'redux';

import { FSAAuto, ErrorFSAAuto } from '../helpers/flux-standard-action';

import {
  MicAuthLoginRequest,
} from '../types/micapi.types';

import {
  micApiService,
  MicApiRequestParams,
  MicApiResponseParams
} from '../services/micapi.service';

import {
  MICAPI_MANIFEST_REQUEST,
  MICAPI_MANIFEST_RESPONSE,
  MICAPI_MANIFEST_FAILURE,
  MICAPI_METADATA_MANIFEST_REQUEST,
  MICAPI_METADATA_MANIFEST_RESPONSE,
  MICAPI_METADATA_MANIFEST_FAILURE,
  MICAPI_AUTH_LOGIN_REQUEST,
  MICAPI_AUTH_LOGIN_RESPONSE,
  MICAPI_AUTH_LOGIN_FAILURE,
} from '../constants/micapi.constants';

export const micapiActions = {
  fetchManifest,
  fetchMetadataManifest,
  fetchAuthLogin
}

export type MicApiAnyAction = (
  MicApiManifestAnyAction |
  MicApiMetadataManifestAnyAction |
  MicApiAuthLoginAnyAction
);

interface MicApiFetchManifestParams {
  hostname: string;
}

type MicApiManifestRequestAction = FSAAuto<MicApiRequestParams, MicApiFetchManifestParams, MICAPI_MANIFEST_REQUEST>;
type MicApiManifestResponseAction = FSAAuto<MicApiResponseParams, MicApiFetchManifestParams, MICAPI_MANIFEST_RESPONSE>;
type MicApiManifestFailureAction = ErrorFSAAuto<Error, MicApiFetchManifestParams, MICAPI_MANIFEST_FAILURE>;

export type MicApiManifestAnyAction = (
  MicApiManifestRequestAction |
  MicApiManifestResponseAction |
  MicApiManifestFailureAction
);

async function fetchManifest(hostname: string, dispatch: Dispatch<MicApiManifestAnyAction>) {
  const params = { hostname };
  return await micApiService.fetchManifest(hostname, {
    onPreFetch: (url, fetchParams) => {
      dispatch({
        type: MICAPI_MANIFEST_REQUEST,
        payload: { url, params: fetchParams },
        meta: params
      });
    },
    onResponse: (response, body) => dispatch({
      type: MICAPI_MANIFEST_RESPONSE,
      payload: { response, body },
      meta: params
    }),
    onFailed: (error) => dispatch({
      type: MICAPI_MANIFEST_FAILURE, error: true,
      payload: error, meta: params
    })
  });
}

interface MicApiFetchMetadataManifestParams {
  baseUrl: string;
}

type MicApiMetadataManifestRequestAction = FSAAuto<MicApiRequestParams, MicApiFetchMetadataManifestParams, MICAPI_METADATA_MANIFEST_REQUEST>;
type MicApiMetadataManifestResponseAction = FSAAuto<MicApiResponseParams, MicApiFetchMetadataManifestParams, MICAPI_METADATA_MANIFEST_RESPONSE>;
type MicApiMetadataManifestFailureAction = ErrorFSAAuto<Error, MicApiFetchMetadataManifestParams, MICAPI_METADATA_MANIFEST_FAILURE>;

export type MicApiMetadataManifestAnyAction = (
  MicApiMetadataManifestRequestAction |
  MicApiMetadataManifestResponseAction |
  MicApiMetadataManifestFailureAction
);

async function fetchMetadataManifest(baseUrl: string, dispatch: Dispatch<MicApiMetadataManifestAnyAction>) {
  const params = { baseUrl };
  return await micApiService.fetchMetadataManifest(baseUrl, {
    onPreFetch: (url, fetchParams) => {
      dispatch({
        type: MICAPI_METADATA_MANIFEST_REQUEST,
        payload: { url, params: fetchParams }, meta: params
      });
    },
    onResponse: (response, body) => dispatch({
      type: MICAPI_METADATA_MANIFEST_RESPONSE,
      payload: { response, body }, meta: params
    }),
    onFailed: (error) => dispatch({
      type: MICAPI_METADATA_MANIFEST_FAILURE, error: true,
      payload: error, meta: params
    })
  });
}

interface MicApiFetchAuthLoginParams {
  apiBaseUrl: string;
  apiKey?: string;
  request: MicAuthLoginRequest;
}

type MicApiAuthLoginRequestAction = FSAAuto<MicApiRequestParams, MicApiFetchAuthLoginParams, MICAPI_AUTH_LOGIN_REQUEST>;
type MicApiAuthLoginResponseAction = FSAAuto<MicApiResponseParams, MicApiFetchAuthLoginParams, MICAPI_AUTH_LOGIN_RESPONSE>;
type MicApiAuthLoginFailureAction = ErrorFSAAuto<Error, MicApiFetchAuthLoginParams, MICAPI_AUTH_LOGIN_FAILURE>;

export type MicApiAuthLoginAnyAction = (
  MicApiAuthLoginRequestAction |
  MicApiAuthLoginResponseAction |
  MicApiAuthLoginFailureAction
);

async function fetchAuthLogin(apiBaseUrl: string, apiKey: string | undefined,
  request: MicAuthLoginRequest,
  dispatch: Dispatch<MicApiAuthLoginAnyAction>) {
  const params = { apiBaseUrl, apiKey, request };
  return await micApiService.fetchAuthLogin(apiBaseUrl, apiKey, request, {
    onPreFetch: (url, fetchParams) => {
      dispatch({
        type: MICAPI_AUTH_LOGIN_REQUEST,
        payload: { url, params: fetchParams }, meta: params
      })
    },
    onResponse: (response, body) => dispatch({
      type: MICAPI_AUTH_LOGIN_RESPONSE,
      payload: { response, body },
      meta: params
    }),
    onFailed: (error) => dispatch({
      type: MICAPI_AUTH_LOGIN_FAILURE, error: true,
      payload: error, meta: params
    })
  });
}
