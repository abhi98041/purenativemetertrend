import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, FlatList } from 'react-native';
import { queryAllMeterName } from '../model/schema';
import realm from '../model/schema'
import { FAB, Card, Title, Paragraph, Button, IconButton, Colors, Provider, Portal, Dialog, Modal } from 'react-native-paper';

export default function Home({ route, navigation }) {
  const [data, setData] = useState([]);
  reloadData = () => {
    queryAllMeterName().then((MeterName) => {
      setData(MeterName);
    }).catch((error) => {
      setData([]);
      console.error(error);
    })
  }

  return (
    <Provider>
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id.toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>{item.costperunit}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('MeterReadingChart', item)}>View</Button>
              <Button onPress={() => navigation.push('AddMeterReadingForm', item)}>Add Reading</Button>
              <IconButton
                icon="delete"
                color={Colors.red500}
                size={20}
                onPress={() => {
                  setmeterid(item.id);
                  showDialog();
                }}
              />
            </Card.Actions>
          </Card>
        )}
      />

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={()=>console.log("Pressed!")}
      />



    </Provider>

  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});