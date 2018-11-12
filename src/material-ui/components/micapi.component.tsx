import * as React from "react";
import {
  TextField, InputAdornment
} from "@material-ui/core";
import {
  Language as GlobeIcon
} from "@material-ui/icons";

import { MicApiProps } from "../../types/micapi.types";

import { MicManifestFormGroup as BootstrapMicManifestFormGroup } from "../../components/micapi.component";

export class MicManifestFormGroup extends BootstrapMicManifestFormGroup {
  constructor(props: MicApiProps) {
    super(props);
  }

  public render() {
    return (
      <TextField type="text" placeholder="Hostname" required={true}
        onBlur={this.hostnameOnBlur} onChange={this.hostnameOnChange}
        InputProps={{
          startAdornment: <InputAdornment position="start"><GlobeIcon /></InputAdornment>
        }}
        helperText={undefined}
      />
    );
  }
}
