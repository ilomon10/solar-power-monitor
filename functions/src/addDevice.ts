import { https, Response, config } from 'firebase-functions';
import db from './db';

export interface IDevice {
  location: string;
  create_at: number;
  produce: number;
  consump: number;
  last_receive_data_at: number;
}

export const handler = (req: https.Request, res: Response) => {
  if (req.get('x-very-secret') !== config().very.secret) {
    res.status(400).send('Bad key');
    return;
  }

  const location = req.body.location;
  if(!location) {
    res.status(400).send('location does not exist');
    return;
  }
  const device: IDevice = {
    create_at: db.ServerValue.TIMESTAMP,
    location: location,
    last_receive_data_at: db.ServerValue.TIMESTAMP,
    produce: 0,
    consump: 0
  };
  const key = db().ref('/devices').push(device).key;
  res.send(key);
};