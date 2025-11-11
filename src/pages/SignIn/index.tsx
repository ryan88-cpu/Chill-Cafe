import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import TextInput from '../../components/molecules/TextInput';
import Button from '../../components/atoms/Button';
import { Gap } from '../../components/atoms';
import { useNavigation } from '@react-navigation/native';
import { GoogleBG, AppleBG } from '../../assets/images';

export default function SignIn() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.card}>
            <Text style={styles.subTitle}>Welcome back!</Text>
            <Text style={styles.title}>Sign In</Text>

            <Gap height={20} />

            <TextInput label="Username" placeholder="Insert Username" />
            <Gap height={1} />
            <TextInput label="Password" placeholder="Insert Password" secureTextEntry />

            <Gap height={18} />
            <Button
              label="Sign In"
              backgroundColor="#FFC107"
              textColor="#000"
              onPress={() => navigation.navigate('Home' as never)}
            />

            <Gap height={18} />

            <View style={styles.orRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>

            <Gap height={16} />
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <View />
               <Image source={GoogleBG} style={styles.socialLogo} />
              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>

            <Gap height={12} />

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <View/>
              <Image source={AppleBG} style={styles.socialLogo} />
              <Text style={styles.socialText}>Continue with Apple</Text>
            </TouchableOpacity>

            <Gap height={18} />

            <TouchableOpacity
              onPress={() => {
                
              }}
            >
              <Text style={styles.forgot}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <Gap height={24} />

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp' as never)}>
              <Text style={styles.signUp}> Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF' },
  flex: { flex: 1 },
  container: {
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 32,
    alignItems: 'center',
  },
  socialLogo: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginRight: 12,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  subTitle: {
    textAlign: 'center',
    color: '#424242',
    fontSize: 14,
    marginBottom: 6,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    marginHorizontal: 12,
    color: '#9E9E9E',
    fontSize: 13,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  socialText: {
    color: '#424242',
    fontSize: 14,
  },
  forgot: {
    marginTop: 6,
    textAlign: 'center',
    color: '#1976D2',
    textDecorationLine: 'underline',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomText: {
    color: '#000',
  },
  signUp: {
    color: '#D08B2D',
    fontFamily: 'Poppins-Medium',
  },
});