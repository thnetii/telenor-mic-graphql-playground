import * as React from 'react';
import { Grid, Alert } from 'react-bootstrap';
import AppPageHeader from './AppPageHeader';

const Home = () =>
  <div>
    <AppPageHeader/>
    <Grid className={'text-center'}>
      <Alert bsStyle={'warning'}>
        <strong>BETA functionality!</strong> GraphQL support is currently still in development and not supported for production by Telenor Connexion!
      </Alert>
      <p>
        Welcome to the Managed IoT GraphQL Playground!
      </p>
      <p>
        On top of the <a href="https://docs.telenorconnexion.com/mic/rest-api/" target="_blank" rel="noopener noreferrer">Cloud REST API</a> Managed IoT Cloud can also be accessed through GraphQL.
      </p>
      <p>
        From the <a href="https://graphql.org/" target="_blank" rel="noopener noreferrer">GraphQL website</a>:
        <blockquote>
          <p>GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.</p>
        </blockquote>
      </p>
      <p>
        The Managed IoT Cloud REST API exposes GraphQL endpoints that can be used by any GraphQL client. Queries submitted to the GraphQL endpoint have to be authenticated by the same way any as any other call to an authenticated Cload REST API endpoint.
      </p>
      <p>
        This web application provides a means to interactively develop, execute and test GraphQL queries for your Managed IoT Cloud stack.
      </p>
      <Alert bsStyle={'info'}>
        <strong>Note:</strong> <a href="https://www.telenorconnexion.com/managed-iot-cloud/" target="_blank" rel="noopener noreferrer">Managed IoT Cloud</a> is a product offered by Telenor Connexion.
        <br/>
        The developer of this application, TH-NETII Rasch Solutions, is not a part of or in any way affiliated to Telenor Connexion.
      </Alert>
    </Grid>
  </div>;

export default Home;
