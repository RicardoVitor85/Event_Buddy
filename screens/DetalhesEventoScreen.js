import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { auth, firestore } from '../firebase';
import { estilosComuns } from '../constants/styles';

export default function DetalhesEventoScreen({ route }) {
  const { evento } = route.params;
  const [userId, setUserId] = useState(null);
  const [participando, setParticipando] = useState(false);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);

      firestore
        .collection('participantes')
        .doc(user.uid)
        .collection('meusEventos')
        .doc(evento.id)
        .get()
        .then(doc => setParticipando(doc.exists))
        .catch(() => setParticipando(false));

      firestore
        .collection('favoritos')
        .doc(user.uid)
        .collection('meusFavoritos')
        .doc(evento.id)
        .get()
        .then(doc => setFavorito(doc.exists))
        .catch(() => setFavorito(false));
    }
  }, [evento.id]);

  const participarEvento = () => {
    if (!userId) {
      Alert.alert('Erro', 'Precisas de estar autenticado para participar.');
      return;
    }
    firestore
      .collection('participantes')
      .doc(userId)
      .collection('meusEventos')
      .doc(evento.id)
      .set({ titulo: evento.titulo, data: evento.data })
      .then(() => {
        setParticipando(true);
        Alert.alert('Sucesso', 'Estás inscrito neste evento!');
      })
      .catch(error => Alert.alert('Erro', error.message));
  };

  const desfazerParticipacao = () => {
    firestore
      .collection('participantes')
      .doc(userId)
      .collection('meusEventos')
      .doc(evento.id)
      .delete()
      .then(() => {
        setParticipando(false);
        Alert.alert('Sucesso', 'Inscrição cancelada.');
      })
      .catch(error => Alert.alert('Erro', error.message));
  };

  const adicionarFavorito = () => {
    firestore
      .collection('favoritos')
      .doc(userId)
      .collection('meusFavoritos')
      .doc(evento.id)
      .set({ titulo: evento.titulo, data: evento.data })
      .then(() => {
        setFavorito(true);
        Alert.alert('Sucesso', 'Evento adicionado aos favoritos!');
      })
      .catch(error => Alert.alert('Erro', error.message));
  };

  const removerFavorito = () => {
    firestore
      .collection('favoritos')
      .doc(userId)
      .collection('meusFavoritos')
      .doc(evento.id)
      .delete()
      .then(() => {
        setFavorito(false);
        Alert.alert('Sucesso', 'Evento removido dos favoritos.');
      })
      .catch(error => Alert.alert('Erro', error.message));
  };

  return (
    <View style={estilosComuns.container}>
      <Text style={estilosComuns.titulo}>{evento.titulo}</Text>
      <Text style={estilosComuns.texto}>Data: {evento.data}</Text>
      <Text style={estilosComuns.texto}>{evento.descricao}</Text>

      {participando ? (
        <Button title="Cancelar Participação" onPress={desfazerParticipacao} color="#D9534F" />
      ) : (
        <Button title="Participar" onPress={participarEvento} color="#5CB85C" />
      )}

      {favorito ? (
        <Button title="Remover dos Favoritos" onPress={removerFavorito} color="#F0AD4E" />
      ) : (
        <Button title="Adicionar aos Favoritos" onPress={adicionarFavorito} color="#F0AD4E" />
      )}
    </View>
  );
}
