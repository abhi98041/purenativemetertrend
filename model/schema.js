import { reject } from 'async';
import Realm, { schemaVersion } from 'realm';
export const METER_NAME_SCHEMA = 'MeterName';
export const METER_READING_SCHEMA = 'MeterReading';

export const MeterNameSchema = {
  name: METER_NAME_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    meternumber: 'string',
    costperunit: 'float'
  }
}

export const MeterReadingSchema = {
  name: METER_READING_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    meterid: 'int',
    reading: 'float',
    createdat: 'date'
  }
}

const databaseoption={
  path: 'meterApp.realm',
  schema: [MeterNameSchema, MeterReadingSchema],
  schemaVersion: 0
}

export const insertNewMeter= newMeter => new Promise((resolve, reject) => {
  Realm.open(databaseoption).then(realm =>{
    realm.write(()=>{
      realm.create(METER_NAME_SCHEMA, newMeter);;
      resolve(newMeter);
    })
  }).catch((error)=> reject(error));
});


export const insertNewMeterReading= newMeterReading => new Promise((resolve, reject) => {
  Realm.open(databaseoption).then(realm =>{
    realm.write(()=>{
      realm.create(METER_READING_SCHEMA, newMeterReading);;
      resolve(newMeterReading);
    })
  }).catch((error)=> reject(error));
});


export const updateMeterName= MeterName => new Promise((resolve, reject) => {
  Realm.open(databaseoption).then(realm =>{
    realm.write(()=>{
      let updateMeterName=realm.objectForPrimaryKey(METER_NAME_SCHEMA, MeterName.id);
      updateMeterName.name=MeterName.name;
      resolve();
    })
  }).catch((error)=> reject(error));
});

// export const insertNewMeterReading= newMeterReading => new Promise((resolve, reject) => {
//   Realm.open(databaseoption).then(realm =>{
//     realm.write(()=>{
//       realm.create(METER_READING_SCHEMA, newMeterReading);;
//       resolve(newMeterReading);
//     })
//   }).catch((error)=> reject(error));
// });



export default new Realm(databaseoption);