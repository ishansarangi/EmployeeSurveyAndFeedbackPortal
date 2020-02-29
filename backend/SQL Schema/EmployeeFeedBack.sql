CREATE TABLE Employee
(
    employeeId INT IDENTITY(1,1) PRIMARY KEY,
	managerId INT REFERENCES Employee (employeeId),
    firstName NVARCHAR(128) NOT NULL,
    lastName NVARCHAR(128) NOT NULL,
	 email NVARCHAR(128) NOT NULL,
    createdAt DATETIME NOT NULL,
	userTypeId INT REFERENCES UserType (userTypeId)
	
);


CREATE TABLE UserType (
    userTypeId INT PRIMARY KEY,
    userType NVARCHAR(128) NOT NULL
);

CREATE TABLE Tag (
    tagId integer IDENTITY(1,1) PRIMARY KEY ,
    name NVARCHAR(28) NOT NULL,
    color NVARCHAR(28),
    totalMessages INT,
    createdById INT REFERENCES Employee (employeeId)
);

CREATE TABLE MessageThread (
    threadId INT IDENTITY(1,1) PRIMARY KEY,
    sentTo INT REFERENCES Employee(employeeId),
    tagId INT REFERENCES Tag(tagId),
    subject NVARCHAR(MAX) NOT NULL,
    createdAt DATETIME NOT NULL,
    modifiedAt DATETIME NOT NULL,
    createdBy INT REFERENCES Employee(employeeId),
	 
);
CREATE TABLE Message (
    messageId INT IDENTITY(1,1) PRIMARY KEY,
    text NVARCHAR(MAX) NOT NULL,
    createdAt DATETIME NOT NULL,
    threadId INT REFERENCES MessageThread(threadId),
    createdBy INT REFERENCES Employee(employeeId)
);




































