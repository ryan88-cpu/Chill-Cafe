import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, set } from 'firebase/database';
import Button from '../../components/atoms/Button';
import { Gap } from '../../components/atoms';
import { Done } from '../../assets/icon';
import { showMessage } from 'react-native-flash-message';

const Confirm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = (route.params as any) || {};
  const items = params.items || [];
  const paymentMethod = params.paymentMethod || 'cashier';

  useEffect(() => {
    saveOrderToDatabase();
  }, []);

  const saveOrderToDatabase = async () => {
    try {
      const auth = getAuth();
      const db = getDatabase();
      const user = auth.currentUser;

      if (!user) {
        showMessage({ message: 'User not authenticated', type: 'danger' });
        return;
      }

      // calculate totals
      const subtotal = items.reduce((s: number, it: any) => s + (it.price || 0) * (it.quantity || 1), 0);
      const taxes = subtotal ? Math.round(subtotal * 0.07) : 0;
      const total = subtotal + taxes;

      // prepare order data
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        items: items.map((it: any) => ({
          id: it.id,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
          category: it.category || 'unknown',
        })),
        subtotal: subtotal,
        taxes: taxes,
        total: total,
        paymentMethod: paymentMethod,
        orderDate: new Date().toISOString(),
        status: 'completed',
      };

      // save to Firebase
      const ordersRef = ref(db, `orders/${user.uid}`);
      const newOrderRef = push(ordersRef);
      await set(newOrderRef, orderData);

      showMessage({
        message: 'Order saved successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Error saving order:', error);
      showMessage({
        message: 'Failed to save order',
        type: 'danger',
      });
    }
  };

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
  safe: { flex: 1, backgroundColor: '#FFF' },
  container: { flex: 1, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center' },
  icon: { width: 180, height: 180, resizeMode: 'contain', tintColor: '#18B39D' },
  title: { fontSize: 22, fontFamily: 'Poppins-Bold', color: '#000', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#9E9E9E', textAlign: 'center', lineHeight: 20, marginHorizontal: 16 },
  note: { fontSize: 12, color: '#BDBDBD', textAlign: 'center' },
  footer: { paddingHorizontal: 24, paddingBottom: Platform.OS === 'ios' ? 24 : 18 },
});