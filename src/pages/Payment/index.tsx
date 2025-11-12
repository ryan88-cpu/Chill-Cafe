import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push, set } from 'firebase/database';
import Header from '../../components/molecules/Header';
import Button from '../../components/atoms/Button';
import { Gap } from '../../components/atoms';
import { Cashier, Transaction, Qrcode } from '../../assets/icon';
import { showMessage } from 'react-native-flash-message';

const Payment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = (route.params as any) || {};
  const [selected, setSelected] = useState<'cashier' | 'transfer' | 'qris' | null>(null);
  const [loading, setLoading] = useState(false);

  const items = params.items || [];
  const type = params.type || 'food';

  // Memoize calculation untuk avoid re-compute
  const { finalSubtotal, finalTaxes, finalTotal } = useMemo(() => {
    const subtotal = params.subtotal || items.reduce((s: number, it: any) => s + ((it.price || 0) * (it.quantity || 1)), 0);
    const taxes = params.taxes || (subtotal ? Math.round(subtotal * 0.07) : 0);
    const total = params.total || (subtotal + taxes);
    
    return {
      finalSubtotal: subtotal,
      finalTaxes: taxes,
      finalTotal: total,
    };
  }, [params.subtotal, params.taxes, params.total, items]);

  const Option = ({ icon, label, value }: { icon: any; label: string; value: 'cashier' | 'transfer' | 'qris' }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.option, selected === value && styles.optionSelected]}
      onPress={() => setSelected(value)}
    >
      <View style={styles.left}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.optionLabel}>{label}</Text>
      </View>
      <Text style={styles.chev}>{'>'}</Text>
    </TouchableOpacity>
  );

  const savePaymentHistory = async () => {
    if (!selected) {
      showMessage({
        message: 'Please select a payment method',
        type: 'danger',
      });
      return;
    }

    setLoading(true);

    try {
      const auth = getAuth();
      const db = getDatabase();
      const user = auth.currentUser;

      if (!user) {
        showMessage({ message: 'User not authenticated', type: 'danger' });
        setLoading(false);
        return;
      }

      // Prepare payment data dengan struktur minimal
      const paymentData = {
        userId: user.uid,
        userEmail: user.email,
        paymentMethod: selected,
        items: items.map((it: any) => ({
          id: it.id,
          name: it.name,
          price: it.price || 0,
          quantity: it.quantity || 1,
        })),
        subtotal: finalSubtotal,
        taxes: finalTaxes,
        total: finalTotal,
        paymentDate: new Date().toISOString(),
        status: 'completed',
        type,
      };

      // Save ke Firebase (non-blocking)
      const paymentRef = ref(db, `paymentHistory/${user.uid}`);
      const newPaymentRef = push(paymentRef);
      await set(newPaymentRef, paymentData);

      // Show success message
      showMessage({
        message: 'Payment successful!',
        type: 'success',
        duration: 1500,
      });

      // Navigate setelah berhasil
      setLoading(false);
      setTimeout(() => {
        navigation.navigate('Confirm' as never, { 
          items, 
          paymentMethod: selected,
          subtotal: finalSubtotal,
          taxes: finalTaxes,
          total: finalTotal
        } as never);
      }, 800);
    } catch (error) {
      console.error('Payment Error:', error);
      setLoading(false);
      showMessage({
        message: 'Payment failed',
        type: 'danger',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header type="back" title="Payment Method" onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Gap height={8} />
        <Option icon={Cashier} label="Cashier" value="cashier" />
        <Gap height={12} />
        <Option icon={Transaction} label="Transfer" value="transfer" />
        <Gap height={12} />
        <Option icon={Qrcode} label="QRIS" value="qris" />

        <View style={styles.footer}>
          <Button
            label={loading ? 'Processing...' : 'Continue'}
            backgroundColor="#FFC107"
            textColor="#000"
            onPress={savePaymentHistory}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF3D6',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  optionSelected: {
    borderWidth: 2,
    borderColor: '#FFC107',
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 28, height: 28, resizeMode: 'contain', marginRight: 12 },
  optionLabel: { fontSize: 16, color: '#000', fontFamily: 'Poppins-Medium' },
  chev: { fontSize: 18, color: '#9E9E9E' },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: Platform.OS === 'ios' ? 24 : 18,
  },
});