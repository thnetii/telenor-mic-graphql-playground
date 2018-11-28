import * as React from 'react';

export class PageHeader extends React.PureComponent {
  public render() {
    return (
      <React.Fragment>
        <h1 className='display-4'>
          Telenor Connexion Managed IoT Cloud
          <br />
          <small className='text-muted'>Interactive GraphQL Playground</small>
        </h1>
      </React.Fragment>
    );
  }
}

export default PageHeader;
