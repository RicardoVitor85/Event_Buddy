import { StyleSheet } from 'react-native';

export const estilosComuns = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 12,
  },
  texto: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    color: '#2E7D32',
  },
  botao: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 8,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  tabBar: {
    backgroundColor: '#fff',
    borderTopColor: '#2E7D32',
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 5,
  },
  tabLabel: {
    fontSize: 12,
    color: '#2E7D32',
  },
});
