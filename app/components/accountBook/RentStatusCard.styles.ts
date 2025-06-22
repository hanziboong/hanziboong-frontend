import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#F9A825',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  progress: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffe0b2',
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  amount: {
    color: '#fff',
    fontSize: 14,
  },
});
