// 사야 할 물건
import instance from './instance';

// 사야 할 물건 조회
export const getToBuy = async () => {
  // TODO : 추후 houseId로 수정 필요
  const response = await instance.get('/api/toBuy/house/1');
  return response.data;
};

// 사야 할 물건 등록
export const createToBuy = async (item: string) => {
  // TODO : 추후 houseId로 수정 필요
  const response = await instance.post('/api/toBuy/house/1', { item });
  return response.data;
};

// 사야 할 물건 완료 체크
export const checkToBuy = async (id: number) => {
  const response = await instance.patch(`/api/toBuy/${id}/check`);
  return response.data;
};

// 사야 할 물건 삭제
export const deleteToBuy = async (id: number) => {
  const response = await instance.delete(`/api/toBuy/${id}`);
  return response.data;
};
