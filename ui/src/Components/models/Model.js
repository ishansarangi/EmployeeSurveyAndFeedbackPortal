/**
 * Copyright 2020 Ishan Kumar Sarangi, Sabyasachi Mohanty, Kumar Prabhu Kalyan, Alsha Samantaray, Kirti Jha
 * Copyright 2020 Arizona State University
 * Copyright 2020 TalentMap
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import {action, thunk, computed} from 'easy-peasy';
import update from 'immutability-helper';

const dialogModel = {
  dialog: {
    open: false,
    message: '',
    id: '',
  },
  setDialog: action((state, newState) => {
    state.dialog = {
      open: newState.open,
      message: newState.message,
      id: newState.id,
    };
  }),
};

const snackBarModel = {
  snackbar: {
    open: false,
    message: '',
    severity: '',
  },
  showSnack: action((state, newState) => {
    state.snackbar = {
      open: true,
      message: newState.message,
      severity: newState.severity,
    };
  }),
  hideSnack: action((state) => {
    state.snackbar = {
      open: false,
      message: '',
      severity: '',
    };
  }),
};

const managerModel = {
  managers: [],
  setManagers: action((state, managers) => {
    state.managers = managers;
  }),
  count: computed((state) => Object.values(state.managers).length),
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
    state.tags = state.tags.filter((tag) => tag.tagId !== tagId);
  }),
  filterTags: computed((state) => (searchText) => {
    let filteredTags = state.tags;
    if (searchText) {
      return filteredTags.filter((tag) => tag.name.match(searchText));
    }
    return filteredTags;
  }),
};

const employeeThreadModel = {
  threads: [],
  setThreads: action((state, threads) => {
    state.threads = threads;
  }),
  count: computed((state) => Object.values(state.threads).length),
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
            $push: [thread.tag],
          },
        },
      },
    });
    actions.setThreads(new_state.threads);
  }),
  removeTagFromThread: thunk((actions, thread, {getState}) => {
    console.log(thread);
    let temp = getState();
    let id;
    let tags = [];
    temp.threads.forEach((item, index) => {
      if (item.threadId === thread.threadId) {
        id = index;
        item.tags.forEach((t) => {
          if (t.tagId !== thread.tagId) tags.push(t);
        });
      }
    });

    let new_state = update(temp, {
      threads: {
        [id]: {
          tags: {
            $set: tags,
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
  filterThreads: computed((state) => (tags, searchText) => {
    let filteredThreads = state.threads;
    if (tags && tags.length) {
      filteredThreads = state.threads.filter((thread) => {
        const containsAllTags = (selectedTags, threadTags) => {
          return selectedTags.every((tag) =>
            threadTags.some((threadTag) => threadTag.tagId === tag.tagId)
          );
        };
        if (tags && thread.tags && containsAllTags(tags, thread.tags)) {
          return thread;
        }
      });
    }
    if (searchText) {
      return filteredThreads.filter((thread) => {
        return (
          thread.messages.some((message) =>
            message.text.toLowerCase().match(searchText.toLowerCase())
          ) || thread.subject.toLowerCase().match(searchText.toLowerCase())
        );
      });
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
    state.threads = [thread, ...state.threads];
  }),
  count: computed((state) => Object.values(state.threads).length),
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

  filterThreads: computed((state) => (searchText) => {
    let filteredThreads = state.threads;

    if (searchText) {
      if (searchText) {
        return filteredThreads.filter((thread) => {
          return (
            thread.messages.some((message) =>
              message.text.toLowerCase().match(searchText.toLowerCase())
            ) || thread.subject.toLowerCase().match(searchText.toLowerCase())
          );
        });
      }
    }

    return filteredThreads;
  }),
};

export const storeModel = {
  dialogModel: dialogModel,
  snackBarModel: snackBarModel,
  managerList: managerModel,
  tagList: tagModel,
  employeeThreadList: employeeThreadModel,
  personalThreadList: personalThreadModel,
};
