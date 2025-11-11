import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/atoms/Button';
import { Gap } from '../../components/atoms';
import { Done } from '../../assets/icon';

const Confirm = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image source={Done} style={styles.icon} />
        <Gap height={24} />
        <Text style={styles.title}>Order Confirmed</Text>
        <Gap height={12} />
        <Text style={styles.subtitle}>
          Thank you for your order.
          {'\n'}You will receive an email confirmation shortly.
        </Text>
        <Gap height={12} />
        <Text style={styles.note}>Hang on tight! Your order is coming in.</Text>
      </View>

      <View style={styles.footer}>
        <Button
          label="Exit/Continue Shopping"
          backgroundColor="#FFC107"
          textColor="#000"
          onPress={() => navigation.navigate('Home' as never)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    tintColor: '#18B39D',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    lineHeight: 20,
    marginHorizontal: 16,
  },
  note: {
    fontSize: 12,
    color: '#BDBDBD',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 24 : 18,
  },
});