import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreator} from '../state';

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actionCreator, dispatch);
};

// bindActionCreators is going to give us back an object that contains all the different
// action creators that we provided in the first argument, but now when we call this bindActionCreators the return
// value is automatically taken and provided to dispatch function
