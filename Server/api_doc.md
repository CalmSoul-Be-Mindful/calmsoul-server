# CalmSoul API Documentation

### 1. POST Login (/login)

Request:

- body

```js
{
  "email": "string",
  "password": "string"
}
```

Response (Status 200 - OK)

```js
{
  "access_token": "string"
}
```

Response (Status 400 - Bad Request)

```js
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Password cannot be empty"
}
```

Response (Status 401 - Bad Request)

```js
{
    "message": "error invalid email or password"
}
```

### 2. POST Auth-Google (/auth-google)

Request:

- headers

```js
{
  "token": "string",
}
```

Response (Status 200 - OK)

```js
{
  "access_token": "string"
}
```

### 3. POST Register (/register)

Request:

- body

```js
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

Response (Status 201 - Created)

```js
{
  "foundUser": {
        "id": 'integer',
        "username": "string",
        "email": "string",
        "role": "string",
    }
}
```

Response (Status 400 - Bad Request)

```js
{
  "username": "Username cannot be empty"
}
OR
{
  "message": "Email cannot be empty"
}
OR
{
  "message": "Password cannot be empty"
}
OR
{
  "message": "Input must be email"
}

```

### 4. GET Videos (/)

Fetch all videos from database

Request:

- headers

```js
{
  "token": "string",
}
```

Response (Status 200 - OK)

```js
{
    "message": "Successfully find videos",
    "videos": [
        {
            "id": 1,
            "videoName": "1-Minute Meditation",
            "videoLink": "https://i.imgur.com/gC4cvrc.mp4",
            "videoCategory": "Meditation",
        }
    ]
}
```

### 5. GET Video by Id (/:videoId)

Request:

- headers

```js
{
  "token": "string",
}
```

- params

```js
{
    "videoId": "integer"
}
```

Response (Status 200 - OK)

```js
{
    "message": "Successfully find video by videoId",
    "video": {
        "id": 1,
        "videoName": "1-Minute Meditation",
        "videoLink": "https://i.imgur.com/gC4cvrc.mp4",
        "videoCategory": "Meditation",
    },
}
```

### 6. POST Add Video (/add)

add a new video

Request:

- headers

```js
{
  "token": "string",
}
```

- body

```js
{
    "videoName": "string",
    "videoLink": "string",
    "videoCategory": "string",
}
```

Response (201 - Created)

```js
{
    "message": "Successfully added new video",
    "video": {
        "id": "integer",
        "videoName": "string",
        "videoLink": "string",
        "videoCategory": "string",
    }
}
```

### 7. PUT Edit Video (/:videoId)

edit video by id

Request:

- headers

```js
{
  "token": "string",
}
```

- params

```js
{
    "videoId": "integer"
}
```

- body

```js
{
    "videoName": "string",
    "videoLink": "string",
    "videoCategory": "string",
}
```

Response (Status 200 - OK)

```js
{
    "message": "Successfully edit video by videoId",
    "updated": {
        "id": "integer",
        "videoName": "string",
        "videoLink": "string",
        "videoCategory": "string",
    },
}
```

### 8. DELETE Video (/videoId)

Request:

- headers

```js
{
  "token": "string",
}
```

- params

```js
{
    "videoId": "integer"
}
```

Response (Status 200 - OK)

```js
{
    "message": `${videoName} successfully deleted`,
}
```

# Global Error

Response (Status 401 - Unauthorized):

```js
{
    "message": "Unautheticated"
}
OR
{
    "message": "Token Error"
}
```

Response (Status 403 - Forbidden)

```js
{
    "message": "Forbidden"
}
```

Response (Status 404 - Not Found)

```js
{
    "message": "Error not found"
}
```

Response (Status 500 - Internal Server Error)

```js
{
    "message": "Internal Server Error"
}
```
