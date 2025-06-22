import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'column',
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
    height: 180,
  },
  cardWrapper: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 8,
  },
  floatingBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFB338',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
