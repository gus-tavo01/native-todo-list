import { SET_SUCCESS } from '../actions-types/list-action-types';

export const setLists = (lists) => ({ type: SET_SUCCESS, payload: lists });

export default { setLists };
