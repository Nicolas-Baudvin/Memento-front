import { NEW_TASK, MY_TASKS, DELETE_TASK, UPDATE_FRIEND_TASKS, UPDATE_TASK_NAME, UPDATE_TASK_LABEL } from "./actions";

const initialState = {
  tasks: [],
  friendTasks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
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
