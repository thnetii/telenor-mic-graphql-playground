import { manifestServiceUrl } from "../constants/micapi.constants";

import {
  MicManifest,
  MicMetadataManifest,
  MicAuthLoginRequest,
  MicAuthLoginResponse,
  MicAuthLoginCredentials,
  MicUserFullDetails,
  MicUserDomainDetails
} from "../types/micapi.types";

export const micApiService = {
  fetchManifest,
  getApiGatewayBaseUrl,
  fetchMetadataManifest,
  fetchAuthLogin,
  fetchAuthRefresh,
  fetchUserGetDefault,
  fetchUserGetAttributes
};

type MicApiPreFetchCallback = (url: RequestInfo, params: RequestInit) => (void | string | { url: RequestInfo, params: RequestInit });

export interface MicApiFetchCallback {
  onPreFetch?: MicApiPreFetchCallback,
  onResponse?: (response: Response, body: any) => void,
  onFailed?: (error: Error) => void
}

function fetchPreInvoke(url: RequestInfo, params: RequestInit, callbacks?: MicApiFetchCallback) {
  const onPreFetch = typeof callbacks !== "undefined" ? callbacks.onPreFetch : undefined;
  if (typeof onPreFetch === "undefined") {
    return { url, params };
  }
  const fetchOverride = onPreFetch(url, params);
  switch (typeof fetchOverride) {
    case "string":
      return { url: fetchOverride, params };
    case "object":
      return fetchOverride;
    default:
      return { url, params };
  }
}

async function fetchInvoke<T extends any>(url: RequestInfo, params: RequestInit, callbacks?: MicApiFetchCallback) {
  try {
    const fetchOverride = fetchPreInvoke(url, params, callbacks);
    url = fetchOverride.url;
    params = fetchOverride.params;
    const response = await fetch(url, params);
    const body = await response.json();
    if (typeof callbacks !== "undefined" && typeof callbacks.onResponse !== "undefined") {
      callbacks.onResponse(response, body);
    }
    return body as T;
  } catch (error) {
    if (typeof callbacks !== "undefined" && typeof callbacks.onFailed !== "undefined") {
      callbacks.onFailed(error);
    }
    throw error;
  }
}

function fetchManifest(hostname: string, callbacks?: MicApiFetchCallback) {
  const qHostname = encodeURIComponent(hostname);
  const url: RequestInfo = `${manifestServiceUrl}?hostname=${qHostname}`;
  const params: RequestInit = {
    method: "get",
    headers: { "Accept": "application/json" }
  };
  return fetchInvoke<MicManifest>(url, params, callbacks);
}

function getApiGatewayBaseUrl(manifest: MicManifest) {
  const { ApiGatewayRootUrl, StackName } = manifest;
  let baseUrl = `${ApiGatewayRootUrl}`;
  if (typeof StackName === "undefined" || !StackName) {
    return baseUrl;
  }
  baseUrl += `/${StackName}`;
  return baseUrl;
}

function fetchMetadataManifest(baseUrl: string, callbacks?: MicApiFetchCallback) {
  const url: RequestInfo = `${baseUrl}/metadata/manifest`;
  const params: RequestInit = {
    method: "get",
    headers: { "Accept": "application/json" }
  };
  return fetchInvoke<MicMetadataManifest>(url, params, callbacks);
}

function fetchAuthLogin(baseUrl: string, apiKey: string | undefined, request?: MicAuthLoginRequest, callbacks?: MicApiFetchCallback) {
  const url: RequestInfo = `${baseUrl}/auth/login`;
  const params: RequestInit = {
    method: "post",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json; charset=utf-8",
      "x-api-key": apiKey || ""
    },
    body: JSON.stringify(request)
  };
  return fetchInvoke<MicAuthLoginResponse>(url, params, callbacks);
}

function fetchAuthRefresh(baseUrl: string, apiKey: string | undefined, credentials: MicAuthLoginCredentials, callbacks?: MicApiFetchCallback) {
  const url: RequestInfo = `${baseUrl}/auth/refresh`;
  const params: RequestInit = {
    method: "post",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json; charset=utf-8",
      "x-api-key": apiKey || ""
    },
    body: JSON.stringify({ refreshToken: credentials.refreshToken })
  };
  return fetchInvoke<MicAuthLoginResponse>(url, params, callbacks);
}

function fetchUserGetAttributes<A extends keyof MicUserFullDetails>(
  baseUrl: string, apiKey: string | undefined,
  credentials: MicAuthLoginCredentials, userName: string,
  attributes: { [K in keyof A]: null } | undefined,
  callbacks?: MicApiFetchCallback) {
  const urlwithoutAttributes: RequestInfo = `${baseUrl}/users/${userName}`;
  const attributeNames = Object.keys(attributes || {});
  const url = attributeNames.length > 0
    ? `${urlwithoutAttributes}?attributes=${attributeNames.join(",")}`
    : urlwithoutAttributes;
  const params: RequestInit = {
    method: "get",
    headers: {
      "Accept": "application/json",
      "identityId": credentials.identityId,
      "Authorization": credentials.token,
      "x-api-key": apiKey || ""
    }
  };
  return fetchInvoke<Pick<MicUserFullDetails, A>>(url, params, callbacks);
}

function fetchUserGetDefault(baseUrl: string, apiKey: string | undefined,
  credentials: MicAuthLoginCredentials, userName: string,
  callbacks?: MicApiFetchCallback) {
  return fetchUserGetAttributes<keyof MicUserDomainDetails>(baseUrl, apiKey, credentials,
    userName, undefined, callbacks);
}
