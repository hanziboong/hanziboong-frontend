// screens/ExpenseDetailScreen.styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0,
  },
  backButton: {
    marginTop: 16,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 12,
  },
  section: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'flex-end',
  },
  grayText: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 4,
  },
  text: {
    fontSize: 15,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 6,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 6,
  },
  name: {
    fontSize: 14,
    flex: 1,
  },
  amountText: {
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#FFB338',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
  },
  memoSection: {
    marginTop: 20,
  },
  memoInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  participantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  status: {
    fontSize: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  settled: {
    backgroundColor: '#FFB338',
    color: 'white',
  },
  unsettled: {
    backgroundColor: '#ccc',
    color: 'white',
  },
  memoBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  value: {
    fontSize: 15,
    color: '#222',
    flex: 1,
    textAlign: 'right',
    marginRight: 20,
  },
});
