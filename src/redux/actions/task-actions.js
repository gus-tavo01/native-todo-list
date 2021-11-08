import { SET_SUCCESS } from '../actions-types/task-action-types';

export const setTasks = (tasks) => ({ type: SET_SUCCESS, payload: tasks });

export default { setTasks };
