import {StyleSheet, Text, View, TextInput as Input, TextInputProps} from 'react-native';
import React from 'react';

interface Props extends TextInputProps {
  label: string;
  placeholder?: string;
}

const TextInput = ({label, placeholder, ...rest}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        placeholder={placeholder}
        placeholderTextColor="#9E9E9E"
        style={styles.input}
        {...rest}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#3E2723', // coklat gelap lembut
    marginBottom: 8,
  },
  input: {
    borderColor: '#8D6E63', // coklat medium
    borderRadius: 10,
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#3E2723',
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#ffffffff', // tone krem lembut
  },
});
