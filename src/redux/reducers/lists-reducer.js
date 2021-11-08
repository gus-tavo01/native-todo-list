import listActionTypes from '../actions-types/list-action-types';

const initialState = {
  items: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case listActionTypes.SET_SUCCESS:
      return { ...state, items: action.payload };
    case listActionTypes.SET_FAILURE:
      return state;

    default:
      return state;
  }
};
