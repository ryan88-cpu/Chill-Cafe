import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../../components/molecules/Header';
import Button from '../../components/atoms/Button';
import { Gap } from '../../components/atoms';
import {
  MenuBG,
  NasgorBG,
  HumbergerBG,
  CafeLatteBG,
} from '../../assets/images';
import { SearchIcon } from '../../assets/icon';

const Menu = () => {
  const route = useRoute();
  const type = (route.params as any)?.type || 'food';
  const [cart, setCart] = useState<any[]>([]);

  const foodItems = [
    { id: 1, name: 'Hamburger', price: 25000, image: HumbergerBG, category: 'Fast Food' },
    { id: 2, name: 'Fried Rice with Egg', price: 25000, image: NasgorBG, category: 'Local Food' },
  ];

  const drinkItems = [
    { id: 3, name: 'Espresso Coffee', price: 25000, image: CafeLatteBG },
    { id: 4, name: 'Coffee Latte', price: 25000, image: CafeLatteBG },
  ];

  const items = type === 'drink' ? drinkItems : foodItems;

  const addToCart = (item: any) => {
    const existingItem = cart.find(i => i.id === item.id);
    if (existingItem) {
      setCart(cart.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const renderMenuItem = ({ item }: any) => (
    <View style={styles.menuItemContainer}>
      <Image source={item.image} style={styles.menuItemImage} />
      <Text style={styles.menuItemName}>{item.name}</Text>
      <View style={styles.menuItemFooter}>
        <Text style={styles.menuItemPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => addToCart(item)}
        >
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const categories = type === 'food'
    ? ['Fast Food', 'Local Food', 'International Food']
    : ['Espresso', 'Latte', 'Cappuccino', 'Cafe Latte'];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header type="profile" title="Chill Cafe" />

        <Gap height={20} />

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image source={SearchIcon} style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9E9E9E"
            style={styles.searchInput}
          />
        </View>

        <Gap height={20} />

        {/* Special Offer */}
        <Text style={styles.sectionTitle}>Special Offer</Text>
        <Image source={MenuBG} style={styles.offerImage} />

        <Gap height={16} />

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryTag}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Gap height={20} />

        {/* Menu Items Grid */}
        <FlatList
          data={items}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
        />

        <Gap height={24} />

        {/* Check Out Button */}
        <Button
          label="Check Out"
          backgroundColor="#FFC107"
          textColor="#000"
          onPress={() => {
            /* navigate to payment */
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginBottom: 12,
  },
  offerImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  categoryScroll: {
    marginVertical: 16,
  },
  categoryTag: {
    backgroundColor: '#2C2C2C',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  menuItemContainer: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItemImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  menuItemName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  menuItemPrice: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  cartButton: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: 12,
  },
});