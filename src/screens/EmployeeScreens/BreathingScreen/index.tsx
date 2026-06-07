import { useState, useEffect, useRef, useCallback } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Icon, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { breathingColors, roundOptions, technique478 } from './constants';

type Screen = 'setup' | 'session';

export function BreathingScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [screen, setScreen] = useState<Screen>('setup');
  const [selectedRound, setSelectedRound] = useState<
    (typeof roundOptions)[number]
  >(roundOptions[1]);
  const [timeLeft, setTimeLeft] = useState(95);
  const [isPaused, setIsPaused] = useState(false);
  const [breathPhase, setBreathPhase] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);

  const circleScale = useRef(new Animated.Value(1)).current;
  const circleOpacity = useRef(new Animated.Value(0.6)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const breathTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const endSession = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (breathTimeoutRef.current) clearTimeout(breathTimeoutRef.current);
    router.back();
  }, [router]);

  const startSession = useCallback(() => {
    setTimeLeft(selectedRound.seconds);
    setIsPaused(false);
    setBreathPhase(0);
    setCurrentRound(1);
    setScreen('session');
  }, [selectedRound]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  useEffect(() => {
    if (screen !== 'session' || isPaused) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [screen, isPaused, endSession]);

  useEffect(() => {
    if (screen !== 'session' || isPaused) return;

    const phase = technique478.phases[breathPhase];

    const scaleTo = breathPhase === 2 ? 0.6 : 1.15;
    const opacityTo = breathPhase === 2 ? 0.3 : 0.8;

    Animated.parallel([
      Animated.timing(circleScale, {
        toValue: scaleTo,
        duration: phase.duration,
        useNativeDriver: true,
      }),
      Animated.timing(circleOpacity, {
        toValue: opacityTo,
        duration: phase.duration,
        useNativeDriver: true,
      }),
    ]).start();

    breathTimeoutRef.current = setTimeout(() => {
      setBreathPhase((prev) => {
        const next = (prev + 1) % technique478.phases.length;
        if (next === 0) {
          setCurrentRound((r) => r + 1);
        }
        return next;
      });
    }, phase.duration);

    return () => {
      if (breathTimeoutRef.current) clearTimeout(breathTimeoutRef.current);
    };
  }, [breathPhase, screen, isPaused, circleScale, circleOpacity]);

  if (screen === 'session') {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.sessionContainer}>
          <Text style={styles.roundCounter}>
            {currentRound} / {selectedRound.label.split(' ')[0]}
          </Text>

          <View style={styles.circleContainer}>
            <Animated.View
              style={[styles.circleGlow, { opacity: circleOpacity }]}
            />
            <Animated.View
              style={[styles.circle, { transform: [{ scale: circleScale }] }]}
            >
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              <Text style={styles.phaseText}>
                {t(technique478.phases[breathPhase].label)}
              </Text>
            </Animated.View>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={endSession}>
              <Icon source="close" size={28} color={breathingColors.text} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.controlButtonPrimary]}
              onPress={togglePause}
            >
              <Icon
                source={isPaused ? 'play' : 'pause'}
                size={32}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton} onPress={endSession}>
              <Icon
                source="skip-forward"
                size={28}
                color={breathingColors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.setupContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('breathing.title')}</Text>
          <Text style={styles.subtitle}>{t('breathing.subtitle')}</Text>
        </View>

        <View style={styles.techniqueCard}>
          <Text style={styles.techniqueLabel}>{t('breathing.technique')}</Text>
          <View style={styles.techniqueSteps}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepValue}>4</Text>
              </View>
              <Text style={styles.stepLabel}>{t('breathing.breatheIn')}</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepValue}>7</Text>
              </View>
              <Text style={styles.stepLabel}>{t('breathing.hold')}</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepValue}>8</Text>
              </View>
              <Text style={styles.stepLabel}>{t('breathing.breatheOut')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('breathing.rounds')}</Text>
          <View style={styles.roundRow}>
            {roundOptions.map((round) => (
              <TouchableOpacity
                key={round.id}
                style={[
                  styles.roundButton,
                  selectedRound.id === round.id && styles.roundButtonSelected,
                ]}
                onPress={() => setSelectedRound(round)}
              >
                <Text
                  style={[
                    styles.roundText,
                    selectedRound.id === round.id && styles.roundTextSelected,
                  ]}
                >
                  {round.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={startSession}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>{t('breathing.start')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
