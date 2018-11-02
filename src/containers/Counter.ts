import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { GlobalState } from '../types/index';
import { CounterAction, counterActionCreators } from '../actions/Counter';
import Counter from '../components/Counter';

export default connect(
  (state: GlobalState) => state.counter,
  (dispatch: Dispatch<CounterAction>) => bindActionCreators(counterActionCreators, dispatch)
)(Counter);
