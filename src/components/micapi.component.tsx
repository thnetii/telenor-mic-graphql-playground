import * as React from "react";
import { ThunkDispatch } from 'redux-thunk';
import {
  // Language as GlobeIcon,
  // Refresh as RefreshIcon,
} from "@material-ui/icons";

import { GlobalState } from '../types';
import { MicApiProps } from "../types/micapi.types";
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
      null
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
