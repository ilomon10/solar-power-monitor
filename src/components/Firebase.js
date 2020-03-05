import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

class Firebase {
  constructor() {
    if (app.apps.length === 0) app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }
  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  doSignOut() {
    return this.auth.signOut();
  }
  doAddDevice(location) {
    const data = {
      create_at: app.database.ServerValue.TIMESTAMP,
      location,
      last_receive_data_at: app.database.ServerValue.TIMESTAMP,
      produce: 0,
      consump: 0
    }
    return this.db.ref('/devices').push(data);
  }
  device = key => this.db.ref(`/devices/${key}`);
  devices = () => this.db.ref('/devices');
  dataLake = () => this.db.ref(`/data-lake`);
}

export const FirebaseContext = React.createContext(null);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default Firebase;

