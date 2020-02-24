export const all_thread_data = [
  {
    'thread-1': {
      sentBy: 'Manager1',
      latestText: 'This is a test message2',
      latestDate: '2020-01-24 10:34 AM',
      readFlag: false,
      subject: 'thread subject1',
      manager: 'Jim Attwood',
      messages: [
        {
          sendBy: 'employee1',
          createdAt: '2020-01-24 10:34 AM',
          text: 'This is the first message',
        },
      ],
    },
  },
  {
    'thread-2': {
      sentBy: 'Manager2',
      latestText: 'This is a test message2',
      latestDate: '2020-01-21 10:20 AM',
      readFlag: true,
      subject: 'thread subject2',
      manager: 'Kelly Williams',
      messages: [
        {
          sentBy: 'employee2',
          createdAt: '2020-01-21 10:20 AM',
          text: 'This is the first message',
        },
        {
          sentBy: 'Manager2',
          createdAt: '2020-01-22 10:20 AM',
          text: 'This is the second message',
        },
      ],
    },
  },
];
