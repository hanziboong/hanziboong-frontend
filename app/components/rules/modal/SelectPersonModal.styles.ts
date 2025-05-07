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
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 20, textAlign: 'center' },
  avatars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  circle: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  initial: {
    backgroundColor: '#eee',
    width: 60,
    height: 60,
    borderRadius: 30,
    textAlign: 'center',
    lineHeight: 60,
    fontSize: 20,
  },
  name: { marginTop: 8, fontSize: 14 },
});

export default styles;
