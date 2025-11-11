
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/molecules/Header';
import Button from '../../components/atoms/Button';
import {Gap} from '../../components/atoms';
import { Cashier, Transaction, Qrcode } from '../../assets/icon';

const Payment = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<'cashier'|'transfer'|'qris' | null>(null);

  const Option = ({ icon, label, value }:{ icon:any, label:string, value:'cashier'|'transfer'|'qris' }) => (
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

        {/* footer */}
        <View style={styles.footer}>
          <Button
            label="Continue"
            backgroundColor="#FFC107"
            textColor="#000"
            onPress={() => {
              // lanjutkan ke proses payment / konfirmasi
              // contoh: navigation.navigate('Checkout' as never, { paymentMethod: selected } as never)
            }}
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