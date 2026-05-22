import { Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../styles';

interface ActiveUsersBarChartItem {
  label: string;
  value: number;
}

interface ActiveUsersBarChartProps {
  data: ActiveUsersBarChartItem[];
  maxValue: number;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export function ActiveUsersBarChart({
  data,
  maxValue,
  selectedIndex,
  onSelect,
}: ActiveUsersBarChartProps) {
  return (
    <View style={styles.activeUsersChart}>
      {data.map((item, index) => {
        const barHeight = Math.max(18, (item.value / maxValue) * 72);

        return (
          <Pressable
            key={item.label}
            onPress={() => onSelect(index)}
            style={styles.activeUsersBarGroup}
          >
            <View style={styles.activeUsersValueSlot}>
              {selectedIndex === index ? (
                <Text style={styles.chartValue}>{item.value}</Text>
              ) : null}
            </View>

            <View style={styles.activeUsersBarTrack}>
              <View
                style={[
                  styles.activeUsersBar,
                  {
                    height: barHeight,
                    opacity: selectedIndex === index ? 1 : 0.9,
                  },
                ]}
              />
            </View>

            <Text style={styles.chartLabel}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
