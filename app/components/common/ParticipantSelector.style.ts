import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingVertical: 12,
  },
  circle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    backgroundColor: '#fff',
    position: 'relative',
  },
  selectedCircle: {
    borderColor: '#FFB338',
    backgroundColor: '#FFFAE5',
  },
  disabledCircle: {
    borderColor: '#eee',
    backgroundColor: '#f3f3f3',
  },
  name: {
    fontSize: 14,
    marginTop: 4,
    color: '#000',
  },
  disabledText: {
    color: '#bbb',
  },
  checkbox: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFB338',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
