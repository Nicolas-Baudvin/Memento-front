import { NEW_TASK, MY_TASKS, DELETE_TASK, UPDATE_TASK } from "./actions";

const initialState = {
  tasks: []
};

export default (state = initialState, action) => {
  switch (action.type) {

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
      return state;
    }
    case UPDATE_TASK: {
      return state;
    }
    default: {
      return state;
    }
  }
}
