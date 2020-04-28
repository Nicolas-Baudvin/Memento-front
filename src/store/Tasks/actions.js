export const NEW_TASK = "action/NEW_TASK";
export const MY_TASKS = "action/MY_TASKS";
export const DELETE_TASK = "action/DELETE_TASK";
export const UPDATE_TASK = "action/UPDATE_TASK";

export const newTask = (taskData) => ({
  type: NEW_TASK,
  taskData
});

export const myTasks = (listId) => ({
  type: MY_TASKS,
  listId
});

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  taskId
});

export const updateTask = (taskData) => ({
  type: UPDATE_TASK,
  taskData
});
