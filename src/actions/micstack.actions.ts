import { Dispatch } from 'redux';

import { FSAAuto, ErrorFSAAuto } from '../helpers/flux-standard-action';

import {
  MICSTACK_CONNECT_START, MICSTACK_CONNECT_SUCCESS, MICSTACK_CONNECT_FAILURE,
} from '../constants/micstack.constants';

import {
  micapiActions,
  MicApiManifestAnyAction,
  MicApiMetadataManifestAnyAction,
} from './micapi.actions';
import { micApiService } from '../services/micapi.service';

export const MicStackActions = {
  connectTo
};

interface MicStackConnectStartPayload {
  hostname: string
}

interface MicStackConnectSuccessPayload extends MicStackConnectStartPayload {
  apiBaseUrl: string;
  apiKey: string;
}

type MicStackConnectStartAction = FSAAuto<MicStackConnectStartPayload, undefined, MICSTACK_CONNECT_START>;
type MicStackConnectSuccessAction = FSAAuto<MicStackConnectSuccessPayload, MicStackConnectStartPayload, MICSTACK_CONNECT_SUCCESS>;
type MicStackConnectFailureAction = ErrorFSAAuto<Error, MicStackConnectStartPayload, MICSTACK_CONNECT_FAILURE>;

export type MicStackConnectAnyAction = (
  MicStackConnectStartAction |
  MicStackConnectSuccessAction |
  MicStackConnectFailureAction |

  MicApiManifestAnyAction |
  MicApiMetadataManifestAnyAction
);

async function connectTo(hostname: string, dispatch: Dispatch<MicStackConnectAnyAction>) {
  if (!hostname) {
    return;
  }

  const params = { hostname };
  dispatch({ type: MICSTACK_CONNECT_START, payload: params });
  try {
    const manifest = await micapiActions.fetchManifest(params.hostname, dispatch);
    const apiBaseUrl = micApiService.getApiGatewayBaseUrl(manifest);
    const metadataManifest = await micapiActions.fetchMetadataManifest(apiBaseUrl, dispatch);
    const apiKey = metadataManifest.ApiKey;
    dispatch({
      type: MICSTACK_CONNECT_SUCCESS,
      payload: { hostname, apiBaseUrl, apiKey }, meta: params
    });
  } catch (error) {
    dispatch({
      type: MICSTACK_CONNECT_FAILURE, error: true,
      payload: error as Error, meta: params
    });
  }
}

export type MicStackAnyAction = (
  MicStackConnectAnyAction
);
