import instance from './instance';

// 집 멤버 조회
export const getHouseMembers = async () => {
  const response = await instance.get(`/api/houses/house/1/members`);
  return response.data;
};
