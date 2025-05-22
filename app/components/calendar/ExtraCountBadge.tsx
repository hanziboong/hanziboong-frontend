import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ExtraCountBadgeProps {
  count: number;
}

const styles = StyleSheet.create({
  badgeContainer: {
    marginTop: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#FFB338',
    borderRadius: 8,
    alignSelf: 'center',
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default function ExtraCountBadge({ count }: ExtraCountBadgeProps) {
  if (count <= 0) return null;

  return (
    <View style={styles.badgeContainer}>
      <Text style={styles.badgeText}>+{count}</Text>
    </View>
  );
}
