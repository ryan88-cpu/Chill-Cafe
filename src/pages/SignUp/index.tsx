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
} from 'react-native';
import Header from '../../components/molecules/Header';
import TextInput from '../../components/molecules/TextInput';
import Button from '../../components/atoms/Button';
import { Gap } from '../../components/atoms';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
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
            <Text style={styles.title}>Create an Account</Text>

            <Gap height={24} />

            <TextInput label="Email address" placeholder="Insert email...." />
            <Gap height={12} />
            <TextInput label="Username" placeholder="Insert username...." />
            <Gap height={12} />
            <TextInput label="Password" placeholder="Insert password...." secureTextEntry />
            <Gap height={12} />
            <TextInput label="Re-type password" placeholder="Insert password...." secureTextEntry />

            <Gap height={24} />
            <Button
              label="Submit"
              backgroundColor="#FFC107"
              textColor="#000"
              onPress={() => navigation.navigate('SignIn' as never)}
            />
          </View>

          <Gap height={24} />

          <View style={styles.bottomRow}>
            <Text style={styles.bottomText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn' as never)}>
              <Text style={styles.signIn}> Sign in</Text>
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
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    color: '#000',
  },
  signIn: {
    color: '#D08B2D',
    fontFamily: 'Poppins-Medium',
  },
});