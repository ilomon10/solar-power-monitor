// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase-admin';
import { handler as addDataHandler } from './addData';
import { handler as addDeviceHandler } from './addDevice';
import { handler as updateDevicePowerHandler } from './updateDevice';

initializeApp();

export const addDevice = functions.https.onRequest(addDeviceHandler);
export const addData = functions.https.onRequest(addDataHandler);
export const updateDevice = functions.database.ref('/data-lake/{pushId}').onCreate(updateDevicePowerHandler);
