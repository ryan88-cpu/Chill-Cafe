import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Header from '../../components/molecules/Header';
import Button from '../../components/atoms/Button';
import { Gap } from '../../components/atoms';

const Checkout = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = (route.params as any) || {};
  const items: any[] = params.items || [];
  const type: string = params.type || 'food';

  const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);
  const shipping = items.length ? 0 : 0; // sesuai gambar: Free
  const taxes = subtotal ? Math.round(subtotal * 0.07) : 0; // contoh tax 7%
  const total = subtotal + shipping + taxes;

  const renderItem = ({ item }: any) => (
    <View style={styles.rowItem}>
      <Image source={item.image} style={styles.thumb} />
      <View style={styles.desc}>
        <Text style={styles.brand}>Brand</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.qty}>Quantity: {item.quantity || 1}</Text>
      </View>
      <Text style={styles.price}>Rp. {item.price.toLocaleString('id-ID')}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Header type="back" title="Checkout" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        <Gap height={12} />

        {/* Payment & Promos (static layout mirip gambar) */}
        <View style={styles.row}>
          <Text style={styles.label}>PAYMENT</Text>
          <Text style={styles.value}>BCA *1234</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>PROMOS</Text>
          <Text style={styles.value}>Apply promo code</Text>
        </View>

        <Gap height={12} />
        <Text style={styles.itemsTitle}>ITEMS</Text>

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(it) => String(it.id) + (it.name || '')}
          scrollEnabled={false}
        />

        <Gap height={12} />

        <View style={styles.summaryRow}>
          <Text>Subtotal ({items.length})</Text>
          <Text>Rp. {subtotal.toLocaleString('id-ID')}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Shipping total</Text>
          <Text>Free</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Taxes</Text>
          <Text>Rp. {taxes.toLocaleString('id-ID')}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>Rp. {total.toLocaleString('id-ID')}</Text>
        </View>

        <Gap height={12} />

        <Button
          label="Place order"
          backgroundColor="#FFC107"
          textColor="#000"
          onPress={() => {
            // behavior: jika type == 'drink' bisa navigasi ke checkout drink spesifik, dsb.
            // Untuk sekarang tampil alert / navigate ke payment page (implementasi nanti)
            // contoh: navigation.navigate('Payment', { items, type } as never)
            navigation.navigate('Payment' as never);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  container: { paddingHorizontal: 24, paddingBottom: 32 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEE',
  },
  label: { color: '#9E9E9E', fontSize: 12 },
  value: { color: '#000' },
  itemsTitle: { marginTop: 12, marginBottom: 8, fontWeight: '600' },
  rowItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  thumb: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  desc: { flex: 1 },
  brand: { fontSize: 12, color: '#9E9E9E' },
  name: { fontSize: 14, fontWeight: '600' },
  qty: { fontSize: 12, color: '#9E9E9E' },
  price: { width: 80, textAlign: 'right' },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEE',
  },
  totalRow: { borderBottomWidth: 0, marginTop: 8 },
  totalText: { fontWeight: '700' },
});