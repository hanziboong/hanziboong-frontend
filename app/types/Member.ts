export interface Member {
  id: number;
  nickName: string;
  houseId: number;
}

export interface MemberWithUI extends Member {
  disabled?: boolean;
}
