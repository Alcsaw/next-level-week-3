import React from 'react';
import { Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showCancel?: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, showCancel = true }) => {
  const navigation = useNavigation();

  function handleGoBackToHomepage() {
    navigation.navigate('OrphanageMap');
  }

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15B6D6" />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      { showCancel ? (
        <BorderlessButton onPress={handleGoBackToHomepage}>
          <Feather name="x" size={24} color="#FF669D" />
        </BorderlessButton>
      ) : (
          <View />
        )
      }
    </View>
  );
}

export default Header;