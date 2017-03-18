# Go Web Forum
## Developer
Adam Tse
March 17,2017
mr.adam.tse@gmail.com

## FORUM URL
host: amazon web services
 ```
 http://54.191.71.181/
 ```
 # Journey
 fun project - entered alot of new territory, only things I knew was a little golang and used a little react. Tried to finish before friday, but my docker broke on my computer. docker was stuck in container. reinstalled multiple times, ended up making a new user profile to build.

 The tricky: aws / secruity groups, docker.

## Installation and Run

### Running from main.go
DB - aws
git: production
````
- Place in GO workspace
- $go get github.com/lib/pq
- $cd /frontend/npm install  
- $cd /frontend/npm build
# if build doesn't work install create-react-app scripts
# https://github.com/facebookincubator/create-react-app
- main directory - $go run main.go

// via local db
- DB models are below
````
### Docker
DB - aws
git: production
```
 - CMD
 - cd to docker folder
 - docker build -t forum .
 - docker run-d -p 80:80 forum
 -  ip in browser ($docker-machine ip)
```



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
must grant user PRIVILEGES.
```
GRANT ALL PRIVILEGES ON DATABASE <dbname> TO <user>;
GRANT ALL PRIVILEGES ON TABLE <tablename> TO <user>;
GRANT ALL ON SEQUENCE <table_id_seq> TO <user>;
grant all on sequence <table_id_seq> to <user>;
ex)
grant all on sequence user_id_seq to myuser
```
