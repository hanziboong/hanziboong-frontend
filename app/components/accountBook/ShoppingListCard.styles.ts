import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    height: '100%',
    borderWidth: 1,
    borderColor: '#FFB338',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  empty: {
    color: '#999',
    fontSize: 14,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  checkCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 8,
  },
  checkedCircle: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  checkedText: {
    fontSize: 14,
    color: '#aaa',
    textDecorationLine: 'line-through',
  },
});
