import {action, thunk, computed} from 'easy-peasy';
import update from 'immutability-helper';

const managerModel = {
  managers: [],
  setManagers: action((state, managers) => {
    state.managers = managers;
  }),
  count: computed(state => Object.values(state.managers).length),
};

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
  count: computed(state => Object.values(state.threads).length),
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
  readMessageThread: thunk((actions, thread, {getState}) => {
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
          readByManagers: {
            $push: [thread.employeeId],
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
  filterThreads: computed(state => (tags, searchText) => {
    let filteredThreads = state.threads;
    if (tags && tags.length) {
      filteredThreads = state.threads.filter(thread => {
        const containsAllTags = (selectedTags, threadTags) => {
          return selectedTags.every(tag =>
            threadTags.some(threadTag => threadTag.tagId === tag.tagId)
          );
        };
        if (tags && thread.tags && containsAllTags(tags, thread.tags)) {
          return thread;
        }
      });
    }

    if (searchText) {
      return filteredThreads.filter(thread =>
        thread.messages.some(message => message.text.match(searchText))
      );
    }
    return filteredThreads;
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
  count: computed(state => Object.values(state.threads).length),
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
  readMessageThread: thunk((actions, thread, {getState}) => {
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
          readByEmployee: {
            $set: thread.employeeId,
          },
        },
      },
    });
    actions.setThreads(new_state.threads);
  }),

  filterThreads: computed(state => searchText => {
    let filteredThreads = state.threads;

    if (searchText) {
      return filteredThreads.filter(thread =>
        thread.messages.some(message => message.text.match(searchText))
      );
    }

    return filteredThreads;
  }),
};

export const storeModel = {
  managerList: managerModel,
  tagList: tagModel,
  employeeThreadList: employeeThreadModel,
  personalThreadList: personalThreadModel,
};
