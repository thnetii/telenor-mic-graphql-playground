import * as React from "react";
import {
  Language as GlobeIcon
} from "@material-ui/icons";

import { MicApiProps } from "../types/micapi.types";

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
      <GlobeIcon />
    );
  }

  private hostnameOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    const hostname = event.target.value;
    const { fetchApiKey } = this.props;
    fetchApiKey(hostname);
  }

  private hostnameOnChange(event: React.FocusEvent<HTMLInputElement>) {
    const hostname = event.target.value;
    const { requestedHostname, abortApiKey } = this.props;
    if (hostname !== requestedHostname) {
      abortApiKey(requestedHostname);
    }
  }
}
