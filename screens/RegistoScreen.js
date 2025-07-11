import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../firebase';
import { estilosComuns } from '../constants/styles';

export default function RegistoScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registar = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .catch(error => Alert.alert('Erro ao registar', error.message));
  };

  return (
    <View style={estilosComuns.container}>
      <Text style={estilosComuns.titulo}>Registo</Text>
      <TextInput
        placeholder="Email"
        style={estilosComuns.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={estilosComuns.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={estilosComuns.botao} onPress={registar}>
        <Text style={estilosComuns.botaoTexto}>Registar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 15 }}>
        <Text style={{ color: '#2A4D69' }}>Já tenho conta</Text>
      </TouchableOpacity>
    </View>
  );
}
