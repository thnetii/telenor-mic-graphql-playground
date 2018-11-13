import * as React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  Input,
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
} from 'reactstrap';
import UserIcon from '@material-ui/icons/AccountCircle';
import PasswordIcon from '@material-ui/icons/Lock';

import { GlobalState } from '../types';
import { MicApiProps, MicApiComponentState } from '../types/micapi.types';

import { micapiActions } from '../actions/micapi.actions';

import { MicManifestFormGroup } from './MicManifestFormGroup';

export class MicApiLoginForm extends React.Component<MicApiProps, MicApiComponentState> {
  constructor(props: MicApiProps) {
    super(props);

    this.state = {};

    this.usernameOnBlur = this.usernameOnBlur.bind(this);
    this.passwordOnBlur = this.passwordOnBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <MicManifestFormGroup {...this.props} />
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <UserIcon titleAccess='Username' />
              </InputGroupText>
            </InputGroupAddon>
            <Input placeholder='Username' name='username'
              type='text' required={true}
              onBlur={this.usernameOnBlur}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <PasswordIcon titleAccess='Password' />
              </InputGroupText>
            </InputGroupAddon>
            <Input placeholder='Password' name='password'
              type='password' required={true}
              onBlur={this.passwordOnBlur}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Button color='primary' className='mr-auto ml-auto' type='submit'>
              Login
            </Button>
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }

  private usernameOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    const username = event.target.value;
    this.setState({ username });
  }

  private passwordOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    const password = event.target.value;
    this.setState({ password });
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { apiBaseUrl, apiKey, dispatch } = this.props;
    const { username, password } = this.state;
    const authLoginAction = micapiActions.fetchAuthLogin(apiBaseUrl as string, apiKey, {
      userName: username as string, password: password as string
    });
    if (typeof authLoginAction !== 'undefined') {
      authLoginAction(dispatch);
    }
  }
}

export const ConnectedMicApiLoginForm = connect(
  (state: GlobalState) => state.micapi
)(MicApiLoginForm);

export default ConnectedMicApiLoginForm;
