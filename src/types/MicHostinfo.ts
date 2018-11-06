import { MicHostinfoActionCreators } from '../actions/MicHostinfo';

// tslint:disable-next-line:no-empty-interface
export interface MicHostinfoState {

};

export const initialState: MicHostinfoState = {

};

export type MicHostinfoProps = MicHostinfoState & typeof MicHostinfoActionCreators;
