import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginBottom: 12,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  sheet: {
    backgroundColor: '#fff',
    width: '85%',
    height: '50%',
    borderRadius: 12,
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  addButton: {
    marginTop: 12,
  },
  addText: {
    color: '#FFB338',
    textAlign: 'center',
    fontSize: 16,
  },
  closeText: {
    color: '#888',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  scheduleTextBox: {
    flexDirection: 'column',
  },
  scheduleTitle: {
    fontSize: 16,
    color: '#111',
    fontWeight: '500',
  },
  scheduleDate: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
});

export default styles;
