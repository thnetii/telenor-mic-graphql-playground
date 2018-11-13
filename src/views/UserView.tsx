import * as React from 'react';
import {
  Col,
} from 'reactstrap';

import AppPage from '../components/AppPage';
import MicHostConnectionForm from '../components/MicHostConnectionForm';

const UserView = () =>
  <AppPage>
    <Col sm={{ size: 6, offset: 3 }}>
      <MicHostConnectionForm />
    </Col>
  </AppPage>;

export default UserView;
