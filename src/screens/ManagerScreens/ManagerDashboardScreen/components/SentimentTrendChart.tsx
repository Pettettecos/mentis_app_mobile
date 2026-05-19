import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '../styles';

interface SentimentBarItem {
  frontColor: string;
  value: number;
}

interface SentimentLegendItem {
  color: string;
  label: string;
}

interface SentimentTrendChartProps {
  data: SentimentBarItem[];
  legend: SentimentLegendItem[];
  maxValue: number;
  weeks: Array<{ label: string }>;
}

export function SentimentTrendChart({
  data,
  legend,
  maxValue,
  weeks,
}: SentimentTrendChartProps) {
  return (
    <>
      <View style={styles.sentimentChartCard}>
        <View style={styles.sentimentGrid}>
          <View style={styles.sentimentGridLine} />
          <View style={styles.sentimentGridLine} />
          <View style={styles.sentimentGridLine} />
          <View style={styles.sentimentGridLine} />
        </View>

        <View style={styles.sentimentChartInner}>
          {Array.from({ length: 4 }).map((_, weekIndex) => {
            const weekBars = data.slice(weekIndex * 4, weekIndex * 4 + 4);

            return (
              <View
                key={weeks[weekIndex].label}
                style={styles.sentimentWeekGroup}
              >
                <View style={styles.sentimentBarsGroup}>
                  {weekBars.map((bar, barIndex) => (
                    <View
                      key={`${weeks[weekIndex].label}-${barIndex}`}
                      style={[
                        styles.sentimentBar,
                        {
                          backgroundColor: `${bar.frontColor}`,
                          height: Math.max(10, (bar.value / maxValue) * 176),
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.sentimentWeeksRow}>
          {weeks.map((week) => (
            <Text key={week.label} style={styles.sentimentWeekLabel}>
              {week.label}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.sentimentLegendRow}>
        {legend.map((item) => (
          <View key={item.label} style={styles.sentimentLegendItem}>
            <View
              style={[
                styles.sentimentLegendDot,
                { backgroundColor: item.color },
              ]}
            />
            <Text style={styles.sentimentLegendLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </>
  );
}
