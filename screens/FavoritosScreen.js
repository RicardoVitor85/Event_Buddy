import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { firestore, auth } from '../firebase';

export default function FavoritosScreen({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const unsubscribe = firestore.collection('usuarios')
      .doc(user.uid)
      .collection('favoritos')
      .onSnapshot(snapshot => {
        const favs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFavoritos(favs);
        setLoading(false);
      }, error => {
        console.error(error);
        setLoading(false);
      });

    return () => unsubscribe();
  }, [user]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2E8B57" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={favoritos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventoCard}
            onPress={() => navigation.navigate('DetalhesEvento', { eventoId: item.id })}
          >
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text>{item.local}</Text>
            <Text>{item.data}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>Não tens eventos favoritos.</Text>}
      />
    </View>
  );
}
