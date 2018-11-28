import * as React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import GlobeIcon from '@material-ui/icons/Language';
import ErrorIcon from '@material-ui/icons/ReportProblem';
import ConnectingIcon from '@material-ui/icons/CompareArrows';
import DoneIcon from '@material-ui/icons/Done';

import { GlobalState } from '../types';
import { MicStackProps } from '../types/micstack.types';
import { MicStackActions } from 'src/actions/micstack.actions';

interface MicHostConnectionFormState {
  hostname?: string;
}

export class MicHostConnectionForm extends React.Component<MicStackProps, MicHostConnectionFormState> {
  constructor(props: MicStackProps) {
    super(props);

    this.state = {};

    this.hostnameOnChange = this.hostnameOnChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  public render() {
    const { hostname, isError, isConnecting, statusText } = this.props;
    let valid: true | undefined;
    let invalid: true | undefined;
    let statusIcon: JSX.Element | undefined;
    let statusFeedback: JSX.Element | undefined;
    let statusFormText: JSX.Element | undefined;
    if (isConnecting) {
      statusIcon =
        <InputGroupAddon addonType='append'>
          <InputGroupText><ConnectingIcon /></InputGroupText>
        </InputGroupAddon>;
      if (statusText) {
        statusFormText = <FormText>{statusText}</FormText>;
      }
    } else if (isError) {
      invalid = true;
      statusIcon =
        <InputGroupAddon addonType='append'>
          <InputGroupText className='text-danger'><ErrorIcon /></InputGroupText>
        </InputGroupAddon>;
      if (statusText) {
        statusFeedback = <FormFeedback>{statusText}</FormFeedback>;
      }
    } else if (hostname && hostname === this.state.hostname) {
      valid = true;
      statusIcon =
        <InputGroupAddon addonType='append'>
          <InputGroupText className='text-success'><DoneIcon /></InputGroupText>
        </InputGroupAddon>;
      if (statusText) {
        statusFeedback = <FormFeedback valid={valid}>{statusText}</FormFeedback>;
      }
    }
    return (
      <Form onSubmit={this.onSubmit}>
        <InputGroup>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <GlobeIcon titleAccess='Hostname' />
            </InputGroupText>
          </InputGroupAddon>
          <Input name='hostname' placeholder='Hostname' defaultValue={hostname}
            valid={valid} invalid={invalid}
            type='text' required={true} autoFocus={true}
            onBlur={this.hostnameOnChange}
          />
          <InputGroupAddon addonType='append'>
            <Button disabled={isConnecting}>
              Connect
            </Button>
          </InputGroupAddon>
          {statusIcon}
          {statusFeedback}
        </InputGroup>
        {statusFormText}
        <Input disabled={isConnecting} type='submit' hidden={true} value='Connect' />
      </Form>
    );
  }

  private hostnameOnChange(event: React.FocusEvent<HTMLInputElement>) {
    const hostname = event.target.value;
    this.setState({ hostname });
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    MicStackActions.connectTo(this.state.hostname as string, this.props.dispatch);
  }
}

export const ConnectedMicHostConnectionForm = connect(
  (state: GlobalState) => state.micstack
)(MicHostConnectionForm);

export default ConnectedMicHostConnectionForm;
