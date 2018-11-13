import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import {
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import GlobeIcon from "@material-ui/icons/Language";

import { GlobalState } from '../types';
import { MicApiState, MicApiProps } from "../types/micapi.types";
import { micapiActions, MicApiAnyAction } from '../actions/micapi.actions';

interface MicManifestComponentState {
  hostname?: string;
}

export class MicManifestFormGroup extends React.Component<MicApiProps, MicManifestComponentState> {
  constructor(props: MicApiProps) {
    super(props);

    this.hostnameOnChange = this.hostnameOnChange.bind(this);
    this.hostnameOnBlur = this.hostnameOnBlur.bind(this);
  }

  public render() {
    return (
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <GlobeIcon titleAccess="Hostname" />
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" placeholder="Hostname" required={true}
            onBlur={this.hostnameOnBlur} onChange={this.hostnameOnChange}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <GlobeIcon />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupAddon addonType="append">
            <Button color="secondary">
              Refresh
            </Button>
          </InputGroupAddon>
          <FormFeedback>Form Feedback</FormFeedback>
        </InputGroup>
        <FormText>Form Text</FormText>
      </FormGroup>
    );
  }

  protected dispatchFetchApiKey(hostname: string) {
    const { dispatch } = this.props;
    const { fetchApiKey } = micapiActions;
    const fecthApiKeyAction = fetchApiKey(hostname);
    if (typeof fecthApiKeyAction !== 'undefined') {
      (dispatch as ThunkDispatch<GlobalState, undefined, MicApiAnyAction>)(
        fecthApiKeyAction
      );
    }
  }

  protected hostnameOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    const hostname = event.target.value;
    if (hostname === this.props.hostname) {
      return;
    }
    this.dispatchFetchApiKey(hostname);
  }

  protected hostnameOnChange(event: React.FocusEvent<HTMLInputElement>) {
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
