// Guests

export const UPDATE_FRIEND_TASKS = "action/UPDATE_FRIEND_TASKS";

export const updateFriendTasks = (tasks) => ({
  type: UPDATE_FRIEND_TASKS,
  tasks
});

// Both
export const TASK_ASSIGNED = "action/TASK_ASSIGNED";
export const UPDATE_ORDER = "action/UPDATE-ORDER";

export const taskAssigned = (data, isSelfAssign) => ({
  type: TASK_ASSIGNED,
  data,
  isSelfAssign // bool
});

export const updateOrder = (tasks) => ({
  type: UPDATE_ORDER,
  tasks
});

// Owner

export const NEW_TASK = "action/NEW_TASK";
export const MY_TASKS = "action/MY_TASKS";
export const DELETE_TASK = "action/DELETE_TASK";
export const UPDATE_TASK_NAME = "action/UPDATE_TASK_NAME";
export const UPDATE_TASK_ORDER = "action/UPDATE_TASK_ORDER";
export const UPDATE_TASK_LABEL = "action/UPDATE_TASK_LABEL";
export const TASKS_REORDERED_BY_GUEST = "TASKS_REORDERED_BY_GUEST";

export const taskReorderedByFriend = (tasks) => ({
  type: TASKS_REORDERED_BY_GUEST,
  tasks
});

export const newTask = (taskData) => ({
  type: NEW_TASK,
  taskData
});

export const myTasks = (listId) => ({
  type: MY_TASKS,
  listId
});

export const deleteTask = (taskId, listName) => ({
  type: DELETE_TASK,
  taskId,
  listName
});

export const updateTaskName = (taskData) => ({
  type: UPDATE_TASK_NAME,
  taskData
});

export const updateTaskOrder = (taskData) => ({
  type: UPDATE_TASK_ORDER,
  taskData
});

export const updateTaskLabel = (taskData) => ({
  type: UPDATE_TASK_LABEL,
  taskData
});
