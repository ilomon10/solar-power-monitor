This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Pre-request

- [x] Node 8
- [x] firebase-tools
- [x] Api key for `Local Development`


### Run Locally

Setup api key location
```bash
user@local ./
$ export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"
```

Exec emulator
```bash
user@local ./
$ firebase emulators:start
```

### Deploy

```bash
user@local ./
$ yarn build        # Build public app

user@local ./
$ firebase deploy                             # Deploy all
$ firebase deploy --only hosting              # Deploy hosting
$ firebase deploy --only functions            # Deploy functions
$ firebase deploy --only functions:addDevice  # Deploy functions to specify function (addDevice)
```
