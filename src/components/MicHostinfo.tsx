import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, InputGroupAddon, Input, FormFeedback } from 'reactstrap';
import { Domain as DomainIcon } from '@material-ui/icons';

import { GlobalState } from '../types';
import { MicHostinfoProps } from '../types/MicHostinfo';
import { MicHostinfoAnyAction, MicHostinfoActionCreators } from '../actions/MicHostinfo';

const MicHostinfoFormGroupComponent = (props: MicHostinfoProps) =>
  <FormGroup>
    <InputGroupAddon addonType={'prepend'}><DomainIcon /></InputGroupAddon>
    <Input type={'url'} placeholder={'Hostname'} required={true} onBlur={props.onRequestHostnameChange} />
    <FormFeedback/>
  </FormGroup>;

export const MicHostinfoFormGroup = connect(
  (state: GlobalState) => ({}),
  (dispatch: Dispatch<MicHostinfoAnyAction>) => bindActionCreators(MicHostinfoActionCreators, dispatch)
)(MicHostinfoFormGroupComponent);
