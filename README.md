
# Notes Management

A Nest js simple application for managing notes . the notes may be public and private.
public notes is accessible for all users and private notes can see only the author


## Features

- user can create account
- login 
- user can create , update , delele notes
- public notes is accessble for all public
- note creation is protected by auth guard
- nest js basic crud and authentication


## Run Locally

Clone the project

```bash
  git clone https://github.com/jubairJnu/notes-server.git
```

Go to the project directory

```bash
  cd notes-server
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm start:dev
```


## Tech Stack


**Server:** Node, nest, mongodb, mogoose, jwt


## Demo



https://note-server-gamma.vercel.app/
## API Reference

#### Get all nots

```http
  GET /notes
```



#### Get auhtor private notes

```http
  GET /notes
```
 Description                |
:------------------------- |
 **Required**. token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YmFpcjI4MTBAZ21haWwuY29tIiwiaWQiOiI2OTI5YjMzMTU0N2RmOTQ5YTdjNzk3ZGIiLCJpYXQiOjE3NjQzNDYxOTMsImV4cCI6MTc2NDQzMjU5M30.qSgHmh3roRKAa1N2jHpvDSuzX_geRGJc371kbIQ_GvQ

#### create

```http
  POST /notes
```
#### Update

```http
  PATCH /notes/{id}
```
#### Delete

```http
  DELETE /notes/{id}
```
