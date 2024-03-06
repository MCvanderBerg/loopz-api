# README

## API
This is the api of the loopz application. It is a restful api that send data using json. Its build using javascript node.js and express. Its being hosted on Azure. It communicates with the application database by querying information.

// TODO's
* User Authorization
* Image storage
### Endpoints
**base url:** https://loopz-api-dev.azurewebsites.net/api
**NOTE**: Anything with a ${} is a variable

#### User:
**GET /user?id=${id}**
Gets the user's information that has a id of ${id}

**GET /user?username=${username}**
Gets the user's information that has a username of ${username}

**GET /user/users**
Gets all the users

**POST /user**
Posts a new user. Make sure to pass all the relevant field
**(DONT SEND ID, ID IS AUTO-INCREMENTED)**

// TODO Get all events created by user with id=${id} or username=${username}

#### Event:
**GET /event?id=${id}**
Gets the event's information that has a id of ${id}

**GET /event?name=${name}**
Gets the event's information that has a name of ${name}

**GET /event/events**
Gets all the events

**POST /event**
Posts a new event. Make sure to pass all the relevant field
**(DONT SEND ID, ID IS AUTO-INCREMENTED)**

//TODO get all events at a specific location

#### Watcher:
**GET /watcher?id=${id}**
Gets the watcher's information that has a id of ${id}

**GET /watcher?user_id=${user_id}&event_id=${event_id}**
Gets the watcher's information that has a user_id of ${user_id} and event_id of ${event_id}

**GET /watcher/watchers**
Gets all the watchers

**GET /watcher/forEvent?event_id=${event_id}**
Gets all the users watching event with a event_id of ${event_id}

**GET /watcher/forUser?user_id=${user_id}**
Gets all the events watched by user with a user_id of ${user_id}

**POST /watcher**
Posts a new watch relationship. Make sure to pass all the relevant field
**(DONT SEND ID, ID IS AUTO-INCREMENTED)**


#### Location:
**GET /location?id=${id}**
Gets the location's information that has a id of ${id}

**GET /location?name=${name}**
Gets the location's information that has a name of ${name}

**GET /location/locations**
Gets all available locations

**POST /location**
Posts a new location. Make sure to pass all the relevant field
**(DONT SEND ID, ID IS AUTO-INCREMENTED)**

## DATABASE
Mysql database hosted by Azure. This project has 5 Tables (users, events, locations, watchers and locations).

### TABLES




