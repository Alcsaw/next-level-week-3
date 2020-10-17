import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../../assets/MapMarker.png';
import styles from './styles';

import api from '../../services/api';

interface OrphanageItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanageItem[]>([]);

  const navigation = useNavigation();

  const getMoviesFromApi = () => {
    console.log("testing...")
    return fetch('http://172.23.0.27:3333/orphanages')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    console.log("Aqui...");
    //api.get('orphanages').then(response => {
    /*fetch("https://randomuser.me/api/").then(response => {
      console.log("Fazendo consulta à API");
      console.log(response);
      //setOrphanages(response.data);
    })
      .catch(error => {
        console.log("Deu ruim!");
        console.log(error);
      });*/
    const res = getMoviesFromApi();
    console.log(res);
  }, []);

  function handleNavigateToOrphanageDetails() {
    navigation.navigate('OrphanageDetails');
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -29.4475796,
          longitude: -51.9842456,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 3.2,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton
          style={styles.createOrphanagesButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}

export default OrphanagesMap;
