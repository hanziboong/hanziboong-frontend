import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
    gap: 16,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 40,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    flex: 1,
  },
  participants: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  participant: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginRight: 8,
  },
  participantName: {
    fontSize: 12,
    color: '#666',
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});
