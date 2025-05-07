import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { Rule } from '@/types/Rule';

interface RuleItemProps {
  index: number;
  rule: Rule;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 0.7,
    borderColor: '#eee',
  },
  textWrapper: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default function RuleItem({ index, rule }: RuleItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>
          {index}. {rule.title}
        </Text>
        <Text style={styles.description}>{rule.description}</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={20} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <Entypo name="dots-three-vertical" size={18} color="#444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
