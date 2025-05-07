// 일정 추가 버튼

import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#f0ad4e',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  plus: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

interface FloatingAddButtonProps {
  onPress: () => void;
}

export default function FloatingAddButton({ onPress }: FloatingAddButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.plus}>＋</Text>
    </TouchableOpacity>
  );
}
