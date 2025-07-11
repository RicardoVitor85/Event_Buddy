// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../firebase';
import { estilosComuns } from '../constants/styles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .catch(error => Alert.alert('Erro', error.message));
  };

  return (
    <View style={estilosComuns.container}>
      <Text style={estilosComuns.titulo}>Entrar</Text>

      <TextInput
        style={estilosComuns.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={estilosComuns.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={estilosComuns.botao} onPress={login}>
        <Text style={estilosComuns.botaoTexto}>Entrar</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Registo')}>
          <Text style={{ color: '#4B86B4' }}>Criar Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RecuperarSenha')}>
          <Text style={{ color: '#4B86B4' }}>Recuperar Senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
