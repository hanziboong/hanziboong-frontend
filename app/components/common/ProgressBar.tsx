import { View } from 'react-native';
import styles from './ProgressBar.style';

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <View style={styles.progressBackground}>
      <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
    </View>
  );
}
