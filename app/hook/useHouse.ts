import { useQuery } from '@tanstack/react-query';
import * as houseApi from '@/api/house';

export const useHouseMembers = () => {
  return useQuery({
    queryKey: ['houseMembers'],
    queryFn: async () => {
      const data = await houseApi.getHouseMembers();
      return data;
    },
  });
};
