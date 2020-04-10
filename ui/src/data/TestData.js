export const all_thread_data = [
  {
    threadId: 1,
    sentBy: 'You',
    latestText: 'This is a test message2',
    latestDate: '2020-01-24 10:34 AM',
    readFlag: true,
    subject: 'Lacinia at quis risus sed vulputate odio ut enim',
    manager: 'Jim Attwood',
    messages: [
      {
        sentBy: 'You',
        createdAt: '2020-01-24 10:34 AM',
        text: 'This is the first message',
      },
    ],
  },
  {
    threadId: 2,
    sentBy: 'Kelly Williams',
    latestText: 'This is a test message2',
    latestDate: '2020-01-21 10:20 AM',
    readFlag: false,
    subject: 'Lacinia at quis risus sed vulputate odio ut enim',
    manager: 'Kelly Williams',
    messages: [
      {
        sentBy: 'You',
        createdAt: '2020-01-21 10:20 AM',
        text:
          'Lacinia at quis risus sed vulputate odio ut enim. Urna neque viverra justo nec ultrices. Proin sed libero enim sed faucibus turpis in eu mi. Tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed. Suspendisse potenti nullam ac tortor vitae. Diam sit amet nisl suscipit adipiscing bibendum est ultricies integer.',
      },
      {
        sentBy: 'Manager2',
        createdAt: '2020-01-22 10:20 AM',
        text:
          'Tristique magna sit amet purus gravida. Ultricies integer quis auctor elit sed vulputate mi sit. Et pharetra etra massa massa ultricies mi quis hendrerit.',
      },
      {
        sentBy: 'You',
        createdAt: '2020-01-21 10:20 AM',
        text: 'This is the third message',
      },
    ],
  },
  {
    threadId: 3,
    sentBy: 'You',
    latestText: 'This is a test message2',
    latestDate: '2020-01-24 10:34 AM',
    readFlag: true,
    subject: 'thread subject1',
    manager: 'Jim Attwood',
    messages: [
      {
        sentBy: 'You',
        createdAt: '2020-01-24 10:34 AM',
        text: 'This is the first message',
      },
    ],
  },
];

export const employee_manager_heirarchy = [
  {
    label: 'Jim Attwood',
    value: 1,
  },
  {
    label: 'Kelly Williams',
    value: 2,
  },
  {
    label: 'Jessica Franklin',
    value: 3,
  },
];

export const findAllSentThreads = [
  {
    threadId: '1',
    sentTo: {
      employeeId: '1',
      firstName: 'Sunny',
      lastName: 'Mohanty',
    },
    subject: 'test thread',
    createdAt: '2020-03-25 01:47:38.828',
    modifiedAt: '2020-03-25 01:52:38.87',
    createdBy: {
      employeeId: '2',
      firstName: 'Sabya',
      lastName: 'Mohanty',
    },
    messages: [
      {
        messageId: '1',
        text: 'I have concerns about XYZ...',
        createdAt: '2020-03-25 01:47:38.869',
        messageSender: 1,
      },
      {
        messageId: '2',
        text: 'I can resolve your issues!',
        createdAt: '2020-03-25 01:52:38.87',
        messageSender: 2,
      },
    ],
  },
];

export const findAllReceivedThreads = [
  {
    threadId: '1',
    sentTo: {
      employeeId: '1',
      firstName: 'Sunny',
      lastName: 'Mohanty',
    },
    subject: 'test thread',
    createdAt: '2020-03-25 12:29:04.832',
    modifiedAt: '2020-03-25 12:34:04.858',
    messages: [
      {
        messageId: '1',
        text: 'Employee-I have concerns about XYZ...',
        createdAt: '2020-03-25 12:29:04.858',
        messageSender: 1,
      },
      {
        messageId: '2',
        text: 'Manager-I can resolve your issues!',
        createdAt: '2020-03-25 12:34:04.858',
        messageSender: 2,
      },
    ],
  },
];
