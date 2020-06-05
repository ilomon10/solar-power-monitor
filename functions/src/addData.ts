import { https, Response, config } from 'firebase-functions';
import db from './db';

export interface IData {
  device: string;
  powerIn: number;
  powerOut: number;
  voltageIn: number;
  voltageOut: number;
  currentIn: number;
  currentOut: number;
  temperature: number;
  timestamp: number;
}

export const handler = (req: https.Request, res: Response) => {
  if (req.get('content-type') !== 'application/json') {
    res.status(400).send('Bad request');
    return;
  }
  if (req.get('x-very-secret') !== config().very.secret) {
    console.log("Bad");
    res.status(400).send('Bad key');
    return;
  }
  const body = req.body;
  const data: IData = {
    ...body,
    powerIn: body.currentIn * body.voltageIn,
    powerOut: body.currentOut * body.voltageOut,
    timestamp: db.ServerValue.TIMESTAMP
  };
  const key = db().ref('/data-lake').push(data).key;
  res.status(200).send(key);
}