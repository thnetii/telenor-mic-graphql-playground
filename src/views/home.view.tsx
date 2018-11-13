import * as React from "react";
import {
  Alert
} from "reactstrap";

import AppPage from "../components/apppage.component";

export const HomeView = () =>
  <AppPage>
    <Alert color="danger" fade={false}>
      <h4>BETA functionality!</h4>
      <p>GraphQL support is currently still in development and not supported for production by Telenor Connexion!</p>
    </Alert>
    <p>
      Welcome to the Managed IoT GraphQL Playground!
      </p>
    <p>
      On top of the <a href="https://docs.telenorconnexion.com/mic/rest-api/" target="_blank" rel="noopener noreferrer">Cloud REST API</a> Managed IoT Cloud can also be accessed through GraphQL.
      </p>
    <hr className="my-4" />
    <blockquote className="blockquote">
      <p>GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.</p>
      <footer className="blockquote-footer">From the <cite><a href="https://graphql.org/" target="_blank" rel="noopener noreferrer">GraphQL website</a></cite></footer>
    </blockquote>
    <hr className="my-4" />
    <p>
      The Managed IoT Cloud REST API exposes GraphQL endpoints that can be used by any GraphQL client. Queries submitted to the GraphQL endpoint have to be authenticated by the same way any as any other call to an authenticated Cload REST API endpoint.
      </p>
    <p>
      This web application provides a means to interactively develop, execute and test GraphQL queries for your Managed IoT Cloud stack.
      </p>
    <Alert color="info" fade={false}>
      <h4>Disclaimer</h4>
      <p>
        <a href="https://www.telenorconnexion.com/managed-iot-cloud/" target="_blank" rel="noopener noreferrer">Managed IoT Cloud</a> is a product offered by Telenor Connexion.
          <br />
        The developer of this application, TH-NETII Rasch Solutions, is not a part of or in any way affiliated to Telenor Connexion.
        </p>
    </Alert>
  </AppPage>;

export default HomeView;
