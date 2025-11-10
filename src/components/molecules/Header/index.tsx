import {StyleSheet, Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import React from 'react';
import { BackButton, SearchIcon, Profile } from '../../../assets/icon';

interface HeaderProps {
  title?: string;
  type?: 'back' | 'profile' | 'profile-search';
  onBackPress?: () => void;
  profileImage?: any;
  onNotificationPress?: () => void;
}

const Header = ({
  title = 'Chill Cafe',
  type = 'profile',
  onBackPress,
  profileImage,
  onNotificationPress,
}: HeaderProps) => {
  return (
    <View style={styles.container}>
      {/* Left Section */}
      {type === 'back' ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Image source={BackButton} style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
      {type === 'profile' && (
        <View style={styles.rightSection}>
          <TouchableOpacity onPress={onNotificationPress}>
            <Image source={SearchIcon} style={styles.icon} />
          </TouchableOpacity>
          <Image source={profileImage || Profile} style={styles.profileImage} />
        </View>
      )}

      {type === 'profile-search' && (
        <View style={{flex: 1}}>
          <View style={styles.topRow}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.rightSection}>
              <TouchableOpacity onPress={onNotificationPress}>
                <Image source={SearchIcon} style={styles.icon} />
              </TouchableOpacity>
              <Image source={profileImage || Profile} style={styles.profileImage} />
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Image source={SearchIcon} style={styles.searchIcon} />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#9E9E9E"
              style={styles.searchInput}
            />
            {/* Note: mic icon needs to be added to assets if needed */}
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingRight: 10,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#3E2723',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E0E0E0',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#3E2723',
    marginHorizontal: 8,
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#FFC107', // warna kuning lembut (optional)
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#9E9E9E',
    resizeMode: 'contain',
  },
});
