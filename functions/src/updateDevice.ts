import db from './db';
import { IData } from './addData';

export const handler = (snapshot: db.DataSnapshot) => {
  const snap: IData = snapshot.val();
  const deviceKey: string = snap.device;
  return snapshot.ref.parent?.parent?.child(`/devices/${deviceKey}`).once('value', deviceSnap => {
    const device = deviceSnap.val();
    const period = device.last_receive_data_at - snap.timestamp;
    const last_receive_data_at: number = snap.timestamp;
    const produce: number = (snap.powerIn + device.produce) / 1000 * period / 3600;
    const consump: number = (snap.powerOut + device.consump) / 1000 * period / 3600;
    return deviceSnap.ref.update({ last_receive_data_at, produce, consump });
  });
};