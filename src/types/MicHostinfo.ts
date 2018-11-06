import { MicHostinfoActionCreators } from '../actions/MicHostinfo';

export type MicHostinfoStatusType = ('success' | 'warning' | 'error');

export interface MicHostinfoStatus {
  type?: MicHostinfoStatusType;
  text?: string;
}

export type MicHostinfoStatusProps = MicHostinfoStatus;

export interface MicHostinfoState {
  hostname?: string;
  requestedHostname?: string;
  status?: MicHostinfoStatus;
  apiRootUrl?: string;
  apiKey?: string
};

export const initialState: MicHostinfoState = {
};

export type MicHostinfoProps = MicHostinfoState & typeof MicHostinfoActionCreators;
