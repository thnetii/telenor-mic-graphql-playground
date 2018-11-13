import * as React from "react";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from "reactstrap";
import UserIcon from "@material-ui/icons/AccountCircle";
import PasswordIcon from "@material-ui/icons/Lock";

import AppPage from "../components/apppage.component";
import {
  ConnectedMicManifestFormGroup as MicManifestFormGroup
} from '../components/micapi.component';

class LoginView extends React.Component {
  constructor(props: any) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    return (
      <AppPage>
        <Col sm={{ size: 6, offset: 3 }}>
          <Form onSubmit={this.onSubmit}>
            <MicManifestFormGroup />
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend"><InputGroupText><UserIcon titleAccess="Username" /></InputGroupText></InputGroupAddon>
                <Input type="text" placeholder="Username" required={true} onBlur={undefined} />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend"><InputGroupText><PasswordIcon titleAccess="Password" /></InputGroupText></InputGroupAddon>
                <Input type="password" placeholder="Password" required={true} onBlur={undefined} />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <Button color="primary" className="mr-auto ml-auto" type="submit">Login</Button>
              </InputGroup>
            </FormGroup>
          </Form>
        </Col>
      </AppPage>
    );
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
}

export default LoginView;
