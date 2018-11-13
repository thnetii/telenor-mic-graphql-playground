import * as React from 'react';
import {
  Col,
} from 'reactstrap';

import AppPage from '../components/AppPage';
import MicApiLoginForm from '../components/MicApiLoginForm';

const UserView = () =>
  <AppPage>
    <Col sm={{ size: 6, offset: 3 }}>
      <MicApiLoginForm />
    </Col>
  </AppPage>;

export default UserView;
