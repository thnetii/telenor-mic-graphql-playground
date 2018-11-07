import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Container, Form, Col, InputGroup, Button, FormGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { AccountCircle as UserIcon, Lock as PasswordIcon } from '@material-ui/icons';

import AppPageHeader from './AppPageHeader';
import { ConnectedMicHostinfoFormGroup } from './MicHostinfo';
import { GlobalState, GlobalAction } from '../types';
import { UserLoginProps } from '../types/UserLogin';
import { UserLoginActionCreators } from '../actions/UserLogin';

const UserLoginComponent = (props: UserLoginProps) =>
  <div>
    <AppPageHeader />
    <Container>
      <Col sm={{ size: 6, offset: 3 }}>
        <Form action="javascript:void(0)" onSubmit={props.onSubmit}>
          <ConnectedMicHostinfoFormGroup />
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend"><InputGroupText><UserIcon titleAccess="Username" /></InputGroupText></InputGroupAddon>
              <Input type="text" placeholder="Username" required={true} onBlur={props.usernameOnBlur} />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend"><InputGroupText><PasswordIcon titleAccess="Password" /></InputGroupText></InputGroupAddon>
              <Input type="password" placeholder="Password" required={true} onBlur={props.passwordOnBlur} />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <Button color="primary" className="mr-auto ml-auto" type={'submit'}>Login</Button>
            </InputGroup>
          </FormGroup>
        </Form>
      </Col>
    </Container>
  </div>;

export default connect(
  (state: GlobalState) => state.userLogin,
  (dispatch: Dispatch<GlobalAction>) => bindActionCreators(UserLoginActionCreators, dispatch)
)(UserLoginComponent);
