import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import Button from '../../components/atoms/Button';
import { Gap } from '../../components/atoms';
import { FoodBG, DrinkBG } from '../../assets/images';

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selected, setSelected] = useState<'food' | 'drink' | null>(null);

  // restore selection from route params every time screen focuses
  useFocusEffect(
    useCallback(() => {
      const params = (route.params as any) || {};
      if (params.selected === 'food' || params.selected === 'drink') {
        setSelected(params.selected);
      }
    }, [route.params])
  );

  const persistToParams = (value: 'food' | 'drink') => {
    // keep selection in route params so it survives navigation to Menu and back
    try {
      (navigation as any).setParams?.({ selected: value });
    } catch (e) {
      // ignore if not available
    }
  };

  const handleFoodPress = () => {
    setSelected('food');
    persistToParams('food');
  };

  const handleDrinkPress = () => {
    setSelected('drink');
    persistToParams('drink');
  };

  const handleContinue = () => {
    const type = selected || 'food';
    navigation.navigate('Menu' as never, { type } as never);
  };

  const continueBg = selected ? '#FFC107' : '#E0E0E0';
  const continueText = selected ? '#000' : '#424242';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Gap height={32} />

        <Text style={styles.title}>Food or Drink?</Text>

        <Gap height={24} />

        <TouchableOpacity
          style={[styles.card, selected === 'food' && styles.cardSelected]}
          onPress={handleFoodPress}
          activeOpacity={0.8}
        >
          <Image source={FoodBG} style={styles.cardImage} />
          <Text style={styles.cardLabel}>Food</Text>
        </TouchableOpacity>

        <Gap height={20} />

        <TouchableOpacity
          style={[styles.card, selected === 'drink' && styles.cardSelected]}
          onPress={handleDrinkPress}
          activeOpacity={0.8}
        >
          <Image source={DrinkBG} style={styles.cardImage} />
          <Text style={styles.cardLabel}>Drink</Text>
        </TouchableOpacity>

        <Gap height={32} />

        <Button
          label="Continue"
          backgroundColor={continueBg}
          textColor={continueText}
          onPress={handleContinue}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  container: { paddingTop: 48, paddingHorizontal: 24, paddingBottom: 32 },
  title: { fontSize: 24, fontFamily: 'Poppins-Bold', color: '#000', textAlign: 'center' },
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
  cardSelected: { backgroundColor: '#FFF3D6' },
  cardImage: { width: '100%', height: 180, resizeMode: 'cover' },
  cardLabel: { fontSize: 16, fontFamily: 'Poppins-Medium', color: '#000', textAlign: 'center', paddingVertical: 12 },
});