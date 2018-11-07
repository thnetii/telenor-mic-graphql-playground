export interface MicStackManifest {
  ApiGatewayRootUrl: string;
  StackName: string;
}

export interface MicApiManifest {
  ApiKey: string;
}

export interface MicAuthLoginUser {
  userName: string;
  roleName: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface MicAuthLoginCredentials {
  identityId: string;
  token: string;
  refreshToken: string;
}

export interface MicAuthLoginRequest {
  userName: string;
  password: string;
}

export interface MicAuthLoginResponse {
  user: MicAuthLoginUser;
  credentials: MicAuthLoginCredentials;
}

export interface MicErrorMessage extends Error {
  name: string;
  message: string;
  messageKey: string;
  messageParams?: any;
  property?: string;
}

export interface MicErrorResponse {
  message: MicErrorMessage;
}
