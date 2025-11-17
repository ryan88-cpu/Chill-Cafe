import React, {useState} from 'react';
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
import { Avatar } from '../../assets/images';
import {launchImageLibrary} from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
export default function SignUp() {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(Avatar)
  const [photoForDB, setPhotoForDB] = useState('')
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypepassword, setRetypePassword] = useState('');

  const getImage = async() => {
    const result = await launchImageLibrary({
      imageHeight: 80,
      imageWidth: 80,
      quality:0.5,
      includeBase64:true,
    })
    if(result.didCancel){
      showMessage({
        message: 'You did not select any image',
        type: 'danger',
      });
      

    }else{
      const assets = result.assets [0];
      const base64 = `data:${assets.type};base64,${assets.base64}`;
      setPhoto({uri:base64});
      setPhotoForDB(base64);

    }
  };
    const onSubmit = () => {
      const data = { 
        email: email,
        username: username,
        password: password,
        retypepassword: retypepassword,
        photo: photoForDB,
    };
    const auth = getAuth();
     const db = getDatabase();
    createUserWithEmailAndPassword(auth, email, password )
    .then(userCredential => {
      const user = userCredential.user;
      set(ref(db, 'users/' + user.uid), data);
       showMessage({
        message: 'Account created successfully',
        type: 'success',
      });
      navigation.navigate('SignIn' as never);
    })
    .catch(error => {
      const errorMessage = error.message;
      showMessage({
        message: errorMessage,
        type: 'danger',
      });
    });
  };
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
             <View style={styles.addPhoto}>
              <TouchableOpacity  activeOpacity={0.5} onPress={getImage}>
                  <Image source={photo} style={styles.avatarPhoto}/>
              </TouchableOpacity>
             </View>

            <Gap height={24} />

            <TextInput label="Email address" placeholder="Insert email...." value={email} onChangeText={value=>setEmail(value)} />
            <Gap height={12} />
            <TextInput label="Username" placeholder="Insert username...." value={username} onChangeText={value=> setUsername(value)} />
            <Gap height={12} />
            <TextInput label="Password" placeholder="Insert password...." secureTextEntry={true} value={password} onChangeText={value => setPassword(value)}/>
            <Gap height={12} />
            <TextInput label="Re-type password" placeholder="Insert password...." secureTextEntry={true} value={retypepassword} onChangeText={value => setRetypePassword(value)}/>

            <Gap height={24} />
            <Button
              label="Submit"
              backgroundColor="#FFC107"
              textColor="#000"
              onPress={onSubmit}
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
  avatarPhoto: {
    borderRadius:90/2,
    width:60,
    height:60,
  },
  addPhoto: { 
    alignItems: 'center',
  },
});