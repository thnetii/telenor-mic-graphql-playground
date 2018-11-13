import { Dispatch } from 'redux';

export interface MicStackState {
  hostname?: string;
  apiBaseUrl?: string;
  apiKey?: string;

  isError?: boolean;
  isConnecting?: boolean;
  statusText?: string;
}
export interface MicStackProps extends MicStackState {
  dispatch: Dispatch;
}
