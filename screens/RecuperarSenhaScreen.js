// screens/RecuperarSenhaScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../firebase';
import { estilosComuns } from '../constants/styles';

export default function RecuperarSenhaScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const enviarEmailRecuperacao = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira o seu email.');
      return;
    }

    auth.sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Sucesso', 'Email de recuperação enviado! Verifique a sua caixa de entrada.');
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Erro', error.message);
      });
  };

  return (
    <View style={estilosComuns.container}>
      <Text style={estilosComuns.titulo}>Recuperar Password</Text>

      <TextInput
        style={estilosComuns.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />

      <TouchableOpacity style={estilosComuns.botao} onPress={enviarEmailRecuperacao}>
        <Text style={estilosComuns.botaoTexto}>Enviar Email</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#4B86B4', marginTop: 20 }}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}
