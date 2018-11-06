import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { InputGroup, InputGroupAddon, Input, FormFeedback, InputGroupText, FormGroup, FormText } from 'reactstrap';
import { Language as GlobeIcon, Done as SuccessIcon, Warning as WarningIcon, Report as ErrorIcon } from '@material-ui/icons';

import { GlobalState } from '../types';
import { MicHostinfoProps, MicHostinfoStatus } from '../types/MicHostinfo';
import { MicHostinfoAnyAction, MicHostinfoActionCreators } from '../actions/MicHostinfo';

const MicHostinfoStatusInputGroupAddon = ({ type }: MicHostinfoStatus) => {
  switch (type) {
    case 'success':
      return <InputGroupAddon addonType={'append'}><InputGroupText><SuccessIcon /></InputGroupText></InputGroupAddon>
    case 'warning':
      return <InputGroupAddon addonType={'append'}><InputGroupText><WarningIcon /></InputGroupText></InputGroupAddon>
    case 'error':
      return <InputGroupAddon addonType={'append'}><InputGroupText><ErrorIcon /></InputGroupText></InputGroupAddon>
    default:
      return null;
  }
};

const MicHostinfoStatusFormFeedback = ({ text, type }: MicHostinfoStatus) => {
  if (typeof text === 'undefined' || !text) {
    return null;
  }
  let valid: boolean | undefined;
  switch (type) {
    case 'success':
      valid = true;
      break;
    case 'error':
      valid = false;
      break;
    default:
      return null;
  }
  return <FormFeedback className="text-center" valid={valid}>{text}</FormFeedback>;
};

const MicHostinfoStatusFormText = ({ text, type }: MicHostinfoStatus) => {
  if (typeof text === 'undefined' || !text) {
    return null;
  }
  switch (type) {
    case 'success':
    case 'error':
      return null;
    default:
      break;
  }
  return <FormText className="text-center">{text}</FormText>;
};

export const MicHostinfoFormGroup = ({ status = {}, hostnameOnBlur, hostnameOnChange }: MicHostinfoProps) =>
  <FormGroup>
    <InputGroup>
      <InputGroupAddon addonType={'prepend'}><InputGroupText><GlobeIcon titleAccess="Hostname" /></InputGroupText></InputGroupAddon>
      <Input type={'text'} placeholder={'Hostname'} required={true} onBlur={hostnameOnBlur} onChange={hostnameOnChange} valid={status.type === 'success' ? true : undefined} invalid={status.type === 'error' ? true : undefined} />
      <MicHostinfoStatusInputGroupAddon type={status.type} />
      <MicHostinfoStatusFormFeedback text={status.text} type={status.type} />
    </InputGroup>
    <MicHostinfoStatusFormText text={status.text} type={status.type} />
  </FormGroup>

export const ConnectedMicHostinfoFormGroup = connect(
  (state: GlobalState) => state.hostinfo,
  (dispatch: Dispatch<MicHostinfoAnyAction>) => bindActionCreators(MicHostinfoActionCreators, dispatch)
)(MicHostinfoFormGroup);
