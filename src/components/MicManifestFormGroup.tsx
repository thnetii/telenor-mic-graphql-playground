import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
} from 'reactstrap';
import GlobeIcon from '@material-ui/icons/Language';
import ErrorIcon from '@material-ui/icons/ReportProblem';
import ConnectingIcon from '@material-ui/icons/CompareArrows';
import DoneIcon from '@material-ui/icons/Done';

import { GlobalState } from '../types';
import {
  MicApiState,
  MicApiProps,
  MicApiComponentState
} from '../types/micapi.types';
import { micapiActions, MicApiAnyAction } from '../actions/micapi.actions';

export class MicManifestFormGroup extends React.Component<MicApiProps, MicApiComponentState> {
  constructor(props: MicApiProps) {
    super(props);

    this.state = {};

    this.hostnameOnRefresh = this.hostnameOnRefresh.bind(this);
    this.hostnameOnChange = this.hostnameOnChange.bind(this);
    this.hostnameOnBlur = this.hostnameOnBlur.bind(this);
  }

  public render() {

    let formFeedback: JSX.Element | undefined;
    let formText: JSX.Element | undefined;
    let statusIcon: JSX.Element | undefined;
    let refreshButton: JSX.Element | undefined;
    const {
      apiKeyError,
      apiKeyStatusText,
      requestedHostname
    } = this.props;
    const connectedHostname = this.props.hostname;

    if (apiKeyError) {
      statusIcon = (
        <InputGroupAddon addonType='append'>
          <InputGroupText><ErrorIcon color='error' /></InputGroupText>
        </InputGroupAddon>
      );
      if (apiKeyStatusText) {
        formFeedback = (<FormFeedback>{apiKeyStatusText}</FormFeedback>);
      }
    }

    if (requestedHostname) {
      statusIcon = statusIcon || (
        <InputGroupAddon addonType='append'>
          <InputGroupText><ConnectingIcon /></InputGroupText>
        </InputGroupAddon>
      );
    } else if (this.state.hostname) {
      refreshButton = (
        <InputGroupAddon addonType='append'>
          <Button color='secondary' onClick={this.hostnameOnRefresh} tabIndex={-1}>
            Connect
          </Button>
        </InputGroupAddon>
      );
    }

    if (connectedHostname) {
      statusIcon = statusIcon || (
        <InputGroupAddon addonType='append'>
          <InputGroupText><DoneIcon /></InputGroupText>
        </InputGroupAddon>
      );
      if (apiKeyStatusText) {
        formFeedback = formFeedback || (<FormFeedback valid={true}>{apiKeyStatusText}</FormFeedback>);
      }
    }

    if (!formFeedback && apiKeyStatusText) {
      formText = <FormText>{apiKeyStatusText}</FormText>
    }

    return (
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <GlobeIcon titleAccess='Hostname' />
            </InputGroupText>
          </InputGroupAddon>
          <Input name='hostname' placeholder='Hostname'
            valid={apiKeyError ? undefined : (connectedHostname ? true : undefined)}
            invalid={apiKeyError ? true : undefined}
            type='text' required={true} autoFocus={true}
            onBlur={this.hostnameOnBlur}
            onChange={this.hostnameOnChange}
          />
          {refreshButton}
          {statusIcon}
          {formFeedback}
        </InputGroup>
        {formText}
      </FormGroup>
    );
  }

  private dispatchFetchApiKey(hostname: string) {
    const { dispatch } = this.props;
    const { fetchApiKey } = micapiActions;
    const fecthApiKeyAction = fetchApiKey(hostname);
    if (typeof fecthApiKeyAction !== 'undefined') {
      (dispatch as ThunkDispatch<GlobalState, undefined, MicApiAnyAction>)(
        fecthApiKeyAction
      );
    }
  }

  private hostnameOnRefresh(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const { hostname } = this.state;
    if (hostname) {
      this.dispatchFetchApiKey(hostname);
    } else {
      this.props.dispatch(micapiActions.resetApiKey());
    }
  }

  private hostnameOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    const hostname = event.target.value;
    if (!hostname) {
      this.props.dispatch(micapiActions.resetApiKey());
    } else if (hostname === this.props.hostname) {
      return;
    }
    this.dispatchFetchApiKey(hostname);
  }

  private hostnameOnChange(event: React.FocusEvent<HTMLInputElement>) {
    const hostname = event.target.value;
    const { requestedHostname, dispatch } = this.props;
    const { abortApiKey } = micapiActions;
    if (hostname !== requestedHostname && requestedHostname) {
      dispatch(abortApiKey(requestedHostname));
    }
    this.setState({ hostname });
  }
}

export const ConnectedMicManifestFormGroup = connect(
  (state: GlobalState): MicApiState => state.micapi
)(MicManifestFormGroup);

export default ConnectedMicManifestFormGroup;
