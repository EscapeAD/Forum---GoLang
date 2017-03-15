# Go Web Forum


## Installation


## Developer
Adam Tse


## DB Models

### Messages
```
CREATE TABLE messages (
 ID                 SERIAL      PRIMARY KEY         NOT NULL,
 USERNAME           TEXT                            NOT NULL,
 MESSAGE            VARCHAR(250)                    NOT NULL,
 CREATED_AT         TIMESTAMP                       DEFAULT NOW()
);
```
### Comments
```
CREATE TABLE comments (
 ID                 SERIAL      PRIMARY KEY         NOT NULL,
 MESSAGE_ID         INT                             references messages(ID),
 USERNAME           TEXT                            NOT NULL,
 MESSAGE            VARCHAR(250)                    NOT NULL,
 CREATED_AT         TIMESTAMP                       DEFAULT NOW()
);
```

### Replies
```
CREATE TABLE replies (
 ID                 SERIAL      PRIMARY KEY         NOT NULL,
 MESSAGE_ID         INT                             references messages(ID),
 COMMENT_ID         INT                             references comments(ID),
 USERNAME           TEXT                            NOT NULL,
 MESSAGE            VARCHAR(250)                    NOT NULL,
 CREATED_AT         TIMESTAMP                       DEFAULT NOW()
);
```

Minor notes:
```
GRANT ALL PRIVILEGES ON replies TO fowner;
GRANT ALL ON SEQUENCE comments_id_seq TO fowner;
```
