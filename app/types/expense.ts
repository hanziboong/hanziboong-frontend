export interface Expense {
  houseId: number;
  paidMemberId: number;
  participantMemberId: number[];
  title: string;
  expenditure: number;
  memo: string;
}

export interface ExpenseParticipant {
  id: number;
  memberId: number;
  nickName: string;
  settled: boolean;
  amountToPay: number;
}

export interface ExpenseItemDetail {
  id: number;
  title: string;
  expenditure: number;
  memo: string;
  spendAt: string;
  paidMember: {
    id: number;
    nickName: string;
  };
  expenseParticipants: ExpenseParticipant[];
}
