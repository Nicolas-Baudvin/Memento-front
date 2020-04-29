export const NEW_TASK = "action/NEW_TASK";
export const MY_TASKS = "action/MY_TASKS";
export const DELETE_TASK = "action/DELETE_TASK";
export const UPDATE_TASK = "action/UPDATE_TASK";

// Guests
export const UPDATE_FRIEND_TASKS = "action/UPDATE_FRIEND_TASKS";

export const updateFriendTasks = (tasks) => ({
  type: UPDATE_FRIEND_TASKS,
  tasks
});

// Owner

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
