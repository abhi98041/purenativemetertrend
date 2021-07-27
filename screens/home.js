import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, FlatList } from 'react-native';
import { queryAllMeterName } from '../model/schema';
import realm from '../model/schema'
import { FAB, Card, Title, Paragraph,Button, IconButton, Colors, Provider,Portal,Dialog,Modal } from 'react-native-paper';

export default function Home() {
  const [data, setData] = useState([]);
reloadData = ()=>{
  queryAllMeterName().then((MeterName)=>{
    setData(MeterName);
  }).catch((error)=>{
    setData([]);
    console.error(error);
  })
}

    return (
      <Text>Home</Text>
    );
  }
  
  