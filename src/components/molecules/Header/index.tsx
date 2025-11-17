import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { ArrowBack, DefaultProfile, Notifikasi } from '../../../assets/icon'; // adjust import paths as needed

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  type?: 'default' | 'profile';
  imageSource?: { uri: string } | number;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  type = 'default',
  imageSource,
}) => {
  return (
    <View style={styles.container}>
      {/* Left - Back Button */}
      <TouchableOpacity
        style={styles.leftContainer}
        activeOpacity={0.7}
        onPress={onBackPress}
      >
        <Image source={ArrowBack} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Middle - Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right - Profile Picture or Notification */}
      {type === 'profile' ? (
        <View style={styles.rightContainer}>
          <Image
            source={Notifikasi}
            style={[styles.notifIcon, { marginRight: 10 }]}
          />
          <Image
            source={imageSource || DefaultProfile}
            style={styles.profileImage}
          />
        </View>
      ) : (
        <View style={styles.rightContainer} />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: Platform.OS === 'ios' ? 12 : 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  leftContainer: {
    padding: 4,
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifIcon: {
    width: 22,
    height: 22,
    tintColor: '#FFC107',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEE',
  },
});