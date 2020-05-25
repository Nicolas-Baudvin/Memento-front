import { NEW_TASK, MY_TASKS, DELETE_TASK, UPDATE_FRIEND_TASKS, UPDATE_TASK_NAME, UPDATE_TASK_LABEL, TASK_ASSIGNED, UPDATE_ORDER } from "./actions";

const initialState = {
  tasks: [],
  friendTasks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TASK_ASSIGNED: {
      return {
        ...state,
        tasks: action.tasks
      };
    }
    case UPDATE_ORDER: {
      return state;
    }
    case UPDATE_FRIEND_TASKS: {
      return state;
    }
    case NEW_TASK: {
      return {
        ...state,
        tasks: action.tasks
      };
    }
    case MY_TASKS: {
      return {
        ...state,
        tasks: action.tasks
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        tasks: action.tasks
      };
    }
    case UPDATE_TASK_NAME: {
      return {
        ...state,
        tasks: action.tasks
      };
    }
    case UPDATE_TASK_LABEL: {
      return {
        ...state,
        tasks: action.tasks
      };
    }
    default: {
      return state;
    }
  }
}
