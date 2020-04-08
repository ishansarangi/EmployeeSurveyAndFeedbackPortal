import {action, thunk, computed} from 'easy-peasy';
import update from 'immutability-helper';

const tagModel = {
  tags: [],
  setTags: action((state, tags) => {
    state.tags = tags;
  }),
  add: action((state, tag) => {
    state.tags = [...state.tags, tag];
  }),
  remove: action((state, tagId) => {
    state.tags = state.tags.filter(tag => tag.tagId !== tagId);
  }),
};

const employeeThreadModel = {
  threads: [],
  setThreads: action((state, threads) => {
    state.threads = threads;
  }),

  addTagsToThread: thunk((actions, thread, {getState}) => {
    let temp = getState();
    let id;
    temp.threads.forEach((item, index) => {
      if (item.threadId === thread.threadId) {
        id = index;
      }
    });
    let new_state = update(temp, {
      threads: {
        [id]: {
          tags: {
            $set: thread.tags,
          },
        },
      },
    });
    actions.setThreads(new_state.threads);
  }),

  addMessageToThread: thunk((actions, thread, {getState}) => {
    let temp = getState();
    let id;
    temp.threads.forEach((item, index) => {
      if (item.threadId === thread.threadId) {
        id = index;
      }
    });
    let new_state = update(temp, {
      threads: {
        [id]: {
          messages: {
            $set: thread.messages,
          },
        },
      },
    });
    actions.setThreads(new_state.threads);
  }),
};

const personalThreadModel = {
  threads: [],
  setThreads: action((state, threads) => {
    state.threads = threads;
  }),
  addThread: action((state, thread) => {
    state.threads.push(thread);
  }),
  addMessageToThread: thunk((actions, thread, {getState}) => {
    let temp = getState();
    let id;
    temp.threads.forEach((item, index) => {
      console.log(index);
      if (item.threadId === thread.threadId) {
        id = index;
      }
    });
    let new_state = update(temp, {
      threads: {
        [id]: {
          messages: {
            $set: thread.messages,
          },
        },
      },
    });
    actions.setThreads(new_state.threads);
  }),
};

export const storeModel = {
  tagList: tagModel,
  employeeThreadList: employeeThreadModel,
  personalThreadList: personalThreadModel,
};
