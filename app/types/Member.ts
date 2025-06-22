export interface Member {
  id: number;
  nickname: string;
  houseId: number;
}

export interface MemberWithUI extends Member {
  disabled?: boolean;
}
