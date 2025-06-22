import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './MemberSelectionSection.styles';
import { Member } from '@/types/Member';
import { useHouseMembers } from '@/hook/useHouse';

export default function MemberSelectionSection({
  selectedMemberIds,
  setSelectedMemberIds,
}: {
  selectedMemberIds: number[];
  setSelectedMemberIds: (ids: number[] | ((prev: number[]) => number[])) => void;
}) {
  const { data: members } = useHouseMembers();

  const toggleMemberSelection = (id: number) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id],
    );
  };

  return (
    <View style={styles.section}>
      <Text style={styles.label}>함께 지출한 메이트</Text>
      {members?.map((member: Member) => (
        <TouchableOpacity
          key={member.id}
          style={styles.row}
          onPress={() => toggleMemberSelection(member.id)}
        >
          <Text style={styles.memberText}>{member.nickname}</Text>
          <Ionicons
            name={selectedMemberIds.includes(member.id) ? 'checkbox' : 'square-outline'}
            size={24}
            color={selectedMemberIds.includes(member.id) ? '#FFB338' : '#ccc'}
          />
        </TouchableOpacity>
      )) || []}
    </View>
  );
}
