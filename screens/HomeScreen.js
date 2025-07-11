import React, { useEffect, useState } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { firestore, auth } from '../firebase';  // ajusta caminho se precisares

export default function HomeScreen({ navigation }) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore.collection('eventos')
      .onSnapshot(snapshot => {
        const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEventos(lista);
        setLoading(false);
      }, error => {
        console.error(error);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#2E8B57" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={eventos}
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
        ListEmptyComponent={<Text>Nenhum evento encontrado.</Text>}
      />
    </View>
  );
}

// ✅ Apenas UM bloco de estilos!
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  eventoCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 4,
  },
});
