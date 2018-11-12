import { Dispatch } from 'react-redux';

// https://1u31fuekv5.execute-api.eu-west-1.amazonaws.com/prod/manifest/?hostname=startiot.mic.telenorconnexion.com
const micManifestExample = {
  "ManifestLambda": "prod-ManifestLambda-1FFLZ0XU7GLEI",
  "Rev": "2.33.2-startiot",
  "ResponseLambda": "prod-ResponseLambda-80MUHMHPXSX0",
  "PermissionsLambda": "prod-PermissionsLambda-1Y1B4P4DFRILT",
  "IdentityPool": "eu-west-1:360ad910-a783-4887-8607-6495e2c2031c",
  "LogLevel": "1",
  "IotEndpoint": "a3k7odshaiipe8.iot.eu-west-1.amazonaws.com",
  "ThingBatchLambda": "prod-ThingBatchLambda-13PDZH1X7NF2V",
  "AuthLambda": "prod-AuthLambda-14W20MERP6ETW",
  "UserPoolClient": "4ff11oo3ehurg6s6sq00jtrune",
  "UserLambda": "prod-UserLambda-1W0E2GZR404AO",
  "ObservationLambda": "prod-ObservationLambda-1AMN49WK3EH8H",
  "GraphQLLambda": "prod-GraphQLLambda-5C8LQV96YR6I",
  "EventLambda": "prod-EventLambda-J1EZK8ZS4RVF",
  "ApiGatewayRootUrl": "https://qvx6ay1eog.execute-api.eu-west-1.amazonaws.com",
  "Es5Endpoint": "search-prod-v5-yqulbd455yeidvfipd7odgyawu.eu-west-1.es.amazonaws.com",
  "FileLambda": "prod-FileLambda-QY04WB1BHXLQ",
  "ManagementLambda": "prod-ManagementLambda-O24L38FFR3FD",
  "Region": "eu-west-1",
  "ThingLambda": "prod-ThingLambda-HUJ6DDAB8W4X",
  "ThingTypeLambda": "prod-ThingTypeLambda-WGK47BLLMR51",
  "IotEndpointATS": "a3k7odshaiipe8-ats.iot.eu-west-1.amazonaws.com",
  "DashboardLambda": "prod-DashboardLambda-SG0053W9SS9V",
  "DomainLambda": "prod-DomainLambda-116BVV337XDGC",
  "ObservationsBucket": "prod-observationsbucket-16l3t3h0ear90",
  "SignUpVerificationMedium": "email",
  "ThingGroupsLambda": "prod-ThingGroupsLambda-1C6OLS3JMSLBW",
  "LoraLambda": "prod-LoraStack-4ZMRKC16J1K4-LoraLambda-1STMZZOB4WD0X",
  "UserPool": "eu-west-1_jKaY6EGjT",
  "ConsentRequired": "false",
  "ThingFilesBucket": "prod-thingfilesbucket-1xw02g9qvqmqp",
  "ThingCertsBucket": "prod-thingcertsbucket-8izl7ihx8f3",
  "SmsLambda": "arn:aws:lambda:eu-west-1:080628446433:function:sms-service-prod-send_sms",
  "RuleLambda": "prod-RuleLambda-84X5BSS6D8U8",
  "SearchLambda": "prod-SearchLambda-O8LSJX5OHUWP",
  "FileLambdaV2": "prod-FileLambdaV2-7CQDK9Y9LMSC",
  "ThingJobsLambda": "prod-ThingJobsLambda-1O5KKOH23ADH4",
  "Protocol": "lora",
  "SupportedThingProtocols": "lora,mqtt,nbiot",
  "ApiKeyId": "8wp5vt3apg",
  "EsVersion": "5.5",
  "AccountNumber": "064445364562",
  "ResourceLambda": "prod-ResourceLambda-4M392UWY6EJR",
  "PublicBucket": "prod-publicbucket-vv0gbeldz2tt",
  "GraphIQLLambda": "prod-GraphIQLLambda-OY1N5K6BDPHN",
  "ApiId": "qvx6ay1eog",
  "StackName": "prod",
  "MqttFn": "prod-MqttFn-A7LON6DF9CTT",
  "NbIotLambda": "prod-NbIotStack-1N07KJAPSN88L-NbIotLambda-1L9X8ZS6OAJGL"
};

export type MicManifest = typeof micManifestExample;

// https://qvx6ay1eog.execute-api.eu-west-1.amazonaws.com/prod/metadata/manifest
const micMetadataManifestExample = {
  "ApiKey": "oy0yDJfZdQkQ52LLCugD6IQNiC8l1Xcacm89kg44",
  "IotEndpoint": "a3k7odshaiipe8.iot.eu-west-1.amazonaws.com",
  "IdentityPool": "eu-west-1:360ad910-a783-4887-8607-6495e2c2031c",
  "UserPool": "eu-west-1_jKaY6EGjT",
  "Region": "eu-west-1"
};

export type MicMetadataManifest = typeof micMetadataManifestExample;

interface MicUserBasicInfo {
  /** The username of the user */
  userName: string;
}

interface MicUserDomainInfo extends MicUserBasicInfo {
  domainName: string;
}

interface MicUserBasicDetails extends MicUserBasicInfo {
  /** The name of the role that the user has. */
  roleName: ("Read" | "ReadWrite");
  /** The first name of the user. */
  firstName: string;
  /** The last name of the user. */
  lastName: string;
  /** The e-mail address of the user. */
  email: string;
}

export type MicUserDomainDetails = MicUserBasicDetails & MicUserDomainInfo;

export interface MicUserFullDetails extends MicUserDomainDetails {
  locale: string;
  phone: string;
  company: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  notes1: string;
  notes2: string;
  notes3: string;
  data: any;
}

export interface MicAuthLoginRequest extends MicUserBasicInfo {
  password: string;
}

export type MicAuthLoginUser = MicUserBasicDetails;

export interface MicAuthLoginCredentials {
  /** A Cognito IdentityId to use when communicating with AWS. */
  identityId: string;
  /** A OpenID Connect token to use when communicating with AWS. */
  token: string;
  /** A refresh token to use for getting a new access token. */
  refreshToken: string;
}

export interface MicAuthLoginResponse {
  user: MicAuthLoginUser;
  credentials: MicAuthLoginCredentials;
}

export interface MicApiState {
  hostname?: string;
  apiBaseUrl?: string;
  apiKey?: string;

  requestedHostname?: string;
}
export interface MicApiProps extends MicApiState {
  dispatch: Dispatch<any>;
}
