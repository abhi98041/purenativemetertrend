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
    createdate: 'date'
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

export const updateMeterReading= MeterReading => new Promise((resolve, reject) => {
  Realm.open(databaseoption).then(realm =>{
    realm.write(()=>{
      let updateMeterReading=realm.objectForPrimaryKey(METER_READING_SCHEMA, MeterReading.id);
      updateMeterReading.reading=MeterReading.reading;
      resolve();
    })
  }).catch((error)=> reject(error));
});


export const queryAllMeterReading= () => new Promise((resolve, reject) => {
  Realm.open(databaseoption).then(realm =>{
      let allMeterReading=realm.objects(METER_READING_SCHEMA);
      resolve(allMeterReading);
  }).catch((error)=> reject(error));
});


export const queryAllMeterName= () => new Promise((resolve, reject) => {
  Realm.open(databaseoption).then(realm =>{
      let allMeterName=realm.objects(METER_NAME_SCHEMA);
      resolve(allMeterName);
  }).catch((error)=> reject(error));
});


export const deleteMeterName= MeterNameID => new Promise((resolve, reject) => {
  Realm.open(databaseoption).then(realm =>{
    realm.write(()=>{
      let deleteMeterName=realm.objectForPrimaryKey(METER_NAME_SCHEMA, MeterNameID);
      realm.delete(deleteMeterName)
      resolve();
    })
  }).catch((error)=> reject(error));
});

export const deleteMeterReading= MeterReadingID => new Promise((resolve, reject) => {
  Realm.open(databaseoption).then(realm =>{
    realm.write(()=>{
      let deleteMeterReading=realm.objectForPrimaryKey(METER_READING_SCHEMA, MeterReadingID);
      realm.delete(deleteMeterReading)
      resolve();
    })
  }).catch((error)=> reject(error));
});


export default new Realm(databaseoption);