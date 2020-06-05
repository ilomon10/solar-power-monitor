import db from './db';
import { IData } from './addData';

export const handler = (snapshot: db.DataSnapshot) => {
  const snap: IData = snapshot.val();
  const deviceKey: string = snap.device;
  return snapshot.ref.parent?.parent?.child(`/devices/${deviceKey}`).once('value', deviceSnap => {
    const device = deviceSnap.val();
    const last_receive_data_at: number = snap.timestamp;
    const period = device.last_receive_data_at - last_receive_data_at;
    const produce: number = 1 / 2 * (snap.powerIn + device.produce) * period / 3600;
    const consump: number = 1 / 2 * (snap.powerOut + device.consump) * period / 3600;
    return deviceSnap.ref.update({ last_receive_data_at, produce, consump });
  });
};