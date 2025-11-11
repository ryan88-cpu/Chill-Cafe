import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/molecules/Header';
import Button from '../../components/atoms/Button';
import { Gap } from '../../components/atoms';
import { FoodBG, DrinkBG } from '../../assets/images';
import { HeaderTitle } from '@react-navigation/elements';

const Home = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<'food' | 'drink' | null>(null);

  const handleFoodPress = () => {
    setSelected('food');
    navigation.navigate('Menu' as never, { type: 'food' } as never);
  };

  const handleDrinkPress = () => {
    setSelected('drink');
    navigation.navigate('Menu' as never, { type: 'drink' } as never);
  };

  const handleContinue = () => {
    navigation.navigate('Menu' as never);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
     

        <Gap height={32} />

        <Text style={styles.title}>Food or Drink?</Text>

        <Gap height={24} />

        {/* Food Card */}
        <TouchableOpacity
          style={[
            styles.card,
            selected === 'food' && styles.cardSelected,
          ]}
          onPress={handleFoodPress}
          activeOpacity={0.7}
        >
          <Image
            source={FoodBG}
            style={styles.cardImage}
          />
          <Text style={styles.cardLabel}>Food</Text>
        </TouchableOpacity>

        <Gap height={20} />

        {/* Drink Card */}
        <TouchableOpacity
          style={[
            styles.card,
            selected === 'drink' && styles.cardSelected,
          ]}
          onPress={handleDrinkPress}
          activeOpacity={0.7}
        >
          <Image
            source={DrinkBG}
            style={styles.cardImage}
          />
          <Text style={styles.cardLabel}>Drink</Text>
        </TouchableOpacity>

        <Gap height={32} />

        <Button
          label="Continue"
          backgroundColor="#E0E0E0"
          textColor="#424242"
          onPress={handleContinue}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  HeaderTitle:{
      fontSize: 24,
      alignItems : 'center',
      justifyContent : 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardSelected: {
    borderWidth: 3,
    borderColor: '#FFC107',
  },
  cardImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    textAlign: 'center',
    paddingVertical: 12,
  },
});