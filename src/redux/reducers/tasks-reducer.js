import taskActionTypes from '../actions-types/task-action-types';

export default (state = [], action) => {
  switch (action.type) {
    case taskActionTypes.SET_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};
