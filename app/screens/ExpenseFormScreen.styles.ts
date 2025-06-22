import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: '#fff',
    flex: 1,
    gap: 12,
  },
  label: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  input: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memoInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  expenditureInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'right',
    width: 100,
  },
  headerRightText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  headerRightButton: {
    width: 60,
    height: 30,
    backgroundColor: '#FFB338',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  memberText: {
    fontSize: 16,
  },
  settlementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  section: {
    gap: 12,
    paddingVertical: 12,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
  },
  memoLabel: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
