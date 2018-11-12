import { connect } from "react-redux";

import { GlobalState } from "../types";
import { MicApiState } from "../types/micapi.types";

import { MicManifestFormGroup as MicManifestFormGroupUnconnected } from "../components/micapi.component";

export const MicManifestFormGroup = connect(
  (state: GlobalState): MicApiState => state.micapi
)(MicManifestFormGroupUnconnected);
