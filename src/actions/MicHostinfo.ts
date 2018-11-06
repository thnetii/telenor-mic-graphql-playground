import * as React from 'react';
import { Dispatch } from 'redux';
import { FluxStandardAction, ErrorFluxStandardAction } from '../types/FluxStandardAction';

import { GlobalState } from '../types';
import { MicStackManifest, MicApiManifest } from '../types/MicApi';

import * as Constants from '../constants/MicHostinfo';
import { MicHostinfoAnyActionType } from '../constants/MicHostinfo';

export interface MicHostinfoHostnamePayload {
  hostname: string;
}

export interface MicHostinfoManifestUrlPayload {
  manifestUrl: string;
}

export interface MicHostinfoManifestPayload<Manifest> {
  manifest: Manifest;
}

export interface MicHostinfoDetailsPayload {
  hostname: string;
  apiRootUrl: string;
  apiKey: string;
}

export type MicHostinfoBaseAction<Type extends MicHostinfoAnyActionType, Payload = undefined, Meta = undefined> = FluxStandardAction<Type, Payload, Meta>;

export type MicHostinfoHostnameOnChangeAction = MicHostinfoBaseAction<Constants.HOSTNAME_ONCHANGE_EVENT, MicHostinfoHostnamePayload>;
export type MicHostinfoHostnameOnBlurAction = MicHostinfoBaseAction<Constants.HOSTNAME_ONBLUR_EVENT, MicHostinfoHostnamePayload>;

export type MicHostinfoFetchMicManifestAction = MicHostinfoBaseAction<Constants.FETCH_MIC_MANIFEST, undefined, MicHostinfoManifestUrlPayload>;
export type MicHostinfoReceiveMicManifestAction = MicHostinfoBaseAction<Constants.RECEIVE_MIC_MANIFEST, undefined, MicHostinfoManifestPayload<MicStackManifest>>;

export type MicHostinfoFetchApiManifestAction = MicHostinfoBaseAction<Constants.FETCH_API_MANIFEST, undefined, MicHostinfoManifestUrlPayload>;
export type MicHostinfoReceiveApiManifestAction = MicHostinfoBaseAction<Constants.RECEIVE_API_MANIFEST, undefined, MicHostinfoManifestPayload<MicApiManifest>>;

export type MicHostinfoHostnameChangeSucceededAction = MicHostinfoBaseAction<Constants.HOSTNAME_CHANGE_SUCCEEDED, MicHostinfoDetailsPayload>;
export type MicHostinfoHostnameChangeFailedAction = ErrorFluxStandardAction<Constants.HOSTNAME_CHANGE_FAILED, Error, MicHostinfoHostnamePayload>;

export type MicHostinfoAnyAction = (
  MicHostinfoHostnameOnChangeAction |
  MicHostinfoHostnameOnBlurAction |
  MicHostinfoFetchMicManifestAction |
  MicHostinfoReceiveMicManifestAction |
  MicHostinfoFetchApiManifestAction |
  MicHostinfoReceiveApiManifestAction |
  MicHostinfoHostnameChangeSucceededAction |
  MicHostinfoHostnameChangeFailedAction
);

const hostnameOnChange = (event: React.FocusEvent<HTMLInputElement>): MicHostinfoHostnameOnChangeAction => {
  return {
    type: Constants.HOSTNAME_ONCHANGE_EVENT,
    payload: { hostname: event.target.value }
  };
};

const isHostnameRequested = (hostname: string, getState: () => GlobalState): boolean => {
  const state = getState();
  if (hostname !== state.hostinfo.requestedHostname || !hostname) {
    return false;
  }
  return true;
}

const fetchMicManifest = async (hostname: string, dispatch: Dispatch<MicHostinfoAnyAction>, getGlobalState: () => GlobalState): Promise<MicStackManifest | undefined> => {
  if (!isHostnameRequested(hostname, getGlobalState)) {
    return undefined;
  }

  const qHostname = encodeURIComponent(hostname);
  const manifestUrl = `https://1u31fuekv5.execute-api.eu-west-1.amazonaws.com/prod/manifest/?hostname=${qHostname}`;
  const fetchMicManifestAction: MicHostinfoFetchMicManifestAction = {
    type: Constants.FETCH_MIC_MANIFEST,
    meta: { manifestUrl }
  };
  dispatch(fetchMicManifestAction);

  try {
    const response = await fetch(manifestUrl);
    const manifest = await response.json() as MicStackManifest;
    if (!isHostnameRequested(hostname, getGlobalState)) {
      return undefined;
    }
    const receiveMicManifestAction: MicHostinfoReceiveMicManifestAction = {
      type: Constants.RECEIVE_MIC_MANIFEST,
      meta: { manifest }
    };
    dispatch(receiveMicManifestAction);
    return manifest;
  } catch (e) {
    const hostnameChangeFailedAction: MicHostinfoHostnameChangeFailedAction = {
      type: Constants.HOSTNAME_CHANGE_FAILED,
      payload: e as Error,
      meta: { hostname },
      error: true
    };
    dispatch(hostnameChangeFailedAction);
    return undefined;
  }
};

const fetchApiManifest = async (hostname: string, apiRootUrl: string, dispatch: Dispatch<MicHostinfoAnyAction>, getGlobalState: () => GlobalState): Promise<MicApiManifest | undefined> => {
  if (!isHostnameRequested(hostname, getGlobalState)) {
    return undefined;
  }

  const manifestUrl = `${apiRootUrl}/metadata/manifest`;
  const fetchApiManifestAction: MicHostinfoFetchApiManifestAction = {
    type: Constants.FETCH_API_MANIFEST,
    meta: { manifestUrl }
  };
  dispatch(fetchApiManifestAction);

  try {
    const response = await fetch(manifestUrl);
    const manifest = await response.json() as MicApiManifest;
    if (!isHostnameRequested(hostname, getGlobalState)) {
      return undefined;
    }
    const receiveMicManifestAction: MicHostinfoReceiveApiManifestAction = {
      type: Constants.RECEIVE_API_MANIFEST,
      meta: { manifest }
    };
    dispatch(receiveMicManifestAction);
    return manifest;
  } catch (error) {
    const hostnameChangeFailedAction: MicHostinfoHostnameChangeFailedAction = {
      type: Constants.HOSTNAME_CHANGE_FAILED,
      payload: error as Error,
      meta: { hostname },
      error: true
    };
    dispatch(hostnameChangeFailedAction);
    return undefined;
  }
};

const hostnameOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
  const hostname = event.target.value;
  return async (dispatch: Dispatch<MicHostinfoAnyAction>, getGlobalState: () => GlobalState) => {
    if (!isHostnameRequested(hostname, getGlobalState)) {
      return;
    }
    const onBlurAction: MicHostinfoHostnameOnBlurAction = {
      type: Constants.HOSTNAME_ONBLUR_EVENT,
      payload: { hostname }
    };
    dispatch(onBlurAction);

    const micManifest = await fetchMicManifest(hostname, dispatch, getGlobalState);
    if (typeof micManifest === 'undefined') {
      return;
    }

    const apiRootUrl = `${micManifest.ApiGatewayRootUrl}/${micManifest.StackName}`;
    const apiManifest = await fetchApiManifest(hostname, apiRootUrl, dispatch, getGlobalState);
    if (typeof apiManifest === 'undefined') {
      return;
    }
    const apiKey = apiManifest.ApiKey;
    const hostnameChangeSucceededAction: MicHostinfoHostnameChangeSucceededAction = {
      type: Constants.HOSTNAME_CHANGE_SUCCEEDED,
      payload: {
        hostname,
        apiRootUrl,
        apiKey
      }
    };
    dispatch(hostnameChangeSucceededAction);
  };
};

export const MicHostinfoActionCreators = {
  hostnameOnChange,
  hostnameOnBlur
};
