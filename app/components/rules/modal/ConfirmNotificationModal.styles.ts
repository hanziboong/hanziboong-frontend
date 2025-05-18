import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 6,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default styles;
