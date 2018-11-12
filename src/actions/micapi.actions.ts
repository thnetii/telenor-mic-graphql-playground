import { Dispatch } from "redux";

import { FluxStandardActionAuto, ErrorFluxStandardActionAuto } from "../helpers/flux-standard-action";

import { GlobalState } from "../types";
import { micApiService } from "../services/micapi.service";

import {
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
} from "../constants/micapi.constants";

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

type MicApiHostnameRequestInfo = MicApiHostnameInfo & MicApiRequestInfo;

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

export type MicApiAnyAction = (
  MicApiApiKeyFetchStartAction |
  MicApiApiKeyFetchSuccessAction |
  MicApiApiKeyFetchAbortAction |
  MicApiApiKeyFetchFailureAction |

  MicApiManifestRequestAction |
  MicApiManifestResponseAction |
  MicApiManifestFailureAction |

  MicApiMetadataManifestRequestAction |
  MicApiMetadataManifestResponseAction |
  MicApiMetadataManifestFailureAction
);

export const micapiActions = {
  fetchApiKey,
  abortApiKey
}

function isRequestedHostname(hostname: string, getGlobalState: () => GlobalState) {
  const { requestedHostname } = getGlobalState().micapi;
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
  if (typeof hostname === "undefined" || !hostname) {
    return;
  }

  return async (dispatch: Dispatch<MicApiAnyAction>, getGlobalState: () => GlobalState) => {
    dispatch({
      type: MICAPI_API_KEY_FECTH_START,
      payload: { hostname }
    });

    try {
      const micManifest = await fetchManifest(hostname, dispatch);
      if (!isRequestedHostname(hostname, getGlobalState)) {
        return;
      }
      const apiBaseUrl = micApiService.getApiGatewayBaseUrl(micManifest);
      const apiManifest = await fetchMetadataManifest(hostname, apiBaseUrl, dispatch);
      if (!isRequestedHostname(hostname, getGlobalState)) {
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

function abortApiKey(hostname?: string): MicApiApiKeyFetchAbortAction {
  return {
    type: MICAPI_API_KEY_FECTH_ABORT,
    payload: { hostname }
  }
}
