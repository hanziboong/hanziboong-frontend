// screens/ExpenseDetailScreen.styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    paddingTop: 18,
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
    fontWeight: 600,
    marginVertical: 16,
  },
  section: {
    marginVertical: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: 400,
    color: '#A3A3A3',
  },
  amount: {
    fontSize: 16,
    fontWeight: 600,
    color: 'black',
    textAlign: 'right',
  },
  boldLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: 'black',
    textAlign: 'right',
    flex: 1,
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
    marginBottom: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 6,
  },
  name: {
    fontSize: 14,
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
    fontWeight: 600,
    marginVertical: 16,
  },
  participantRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  value: {
    fontSize: 16,
    color: '#222',
    flex: 1,
    textAlign: 'right',
  },
});
