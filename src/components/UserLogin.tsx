import * as React from 'react';
import { Container, Form, Col, InputGroup, Button, FormGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { AccountCircle as UserIcon, Lock as PasswordIcon } from '@material-ui/icons';

import AppPageHeader from './AppPageHeader';
import { ConnectedMicHostinfoFormGroup } from './MicHostinfo';

const UserLoginComponent = () =>
  <div>
    <AppPageHeader />
    <Container>
      <Col sm={{ size: 6, offset: 3 }}>
        <Form>
          <ConnectedMicHostinfoFormGroup />
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
              <Button color="primary" className="mr-auto ml-auto" type={'submit'}>Login</Button>
            </InputGroup>
          </FormGroup>
        </Form>
      </Col>
    </Container>
  </div>;

export default UserLoginComponent;
