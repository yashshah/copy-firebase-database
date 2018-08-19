# firebase-database-copy

A command line tool to copy the data from the source firebase database to target firebase database.

## Running

- You'll need to have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed in your system.

- Clone the project:

```
git clone https://github.com/yashshah/firebase-database-copy.git
```

- Go inside the project

```
cd firebase-database-copy/
```

- Install the depedencies

```
npm install
```

- Update the .env file with your source database and the target database

```
FIREBASE_URL_SOURCE=
FIREBASE_KEY_SOURCE=
FIREBASE_URL_TARGET=
FIREBASE_KEY_TARGET=
```

- Run the script

```
node app.js
```
