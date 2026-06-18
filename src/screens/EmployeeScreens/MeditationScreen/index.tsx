import { useState, useEffect, useRef, useCallback } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Icon, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { styles } from './styles';
import { colors } from '@/theme/colors';
import {
  audioOptions,
  breathingPhases,
  durationOptions,
  meditationColors,
} from '../constants';

type Screen = 'setup' | 'session';

export function MeditationScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [screen, setScreen] = useState<Screen>('setup');
  const [selectedDuration, setSelectedDuration] = useState<
    (typeof durationOptions)[number]
  >(durationOptions[1]);
  const [selectedAudio, setSelectedAudio] = useState<
    (typeof audioOptions)[number]
  >(audioOptions[0]);
  const [previewingAudio, setPreviewingAudio] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState(300);
  const [isPaused, setIsPaused] = useState(false);
  const [breathPhase, setBreathPhase] = useState(0);

  const soundRef = useRef<Audio.Sound | null>(null);
  const previewSoundRef = useRef<Audio.Sound | null>(null);
  const circleScale = useRef(new Animated.Value(1)).current;
  const circleOpacity = useRef(new Animated.Value(0.6)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const breathTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playPreview = useCallback(
    async (audio: (typeof audioOptions)[number]) => {
      if (previewSoundRef.current) {
        await previewSoundRef.current.stopAsync();
        await previewSoundRef.current.unloadAsync();
        previewSoundRef.current = null;
      }

      if (previewingAudio === audio.id) {
        setPreviewingAudio(null);
        return;
      }

      try {
        const { sound } = await Audio.Sound.createAsync(audio.source, {
          shouldPlay: true,
          isLooping: true,
        });
        previewSoundRef.current = sound;
        setPreviewingAudio(audio.id);
      } catch {
        setPreviewingAudio(null);
      }
    },
    [previewingAudio]
  );

  const handleSelectAudio = useCallback(
    async (audio: (typeof audioOptions)[number]) => {
      setSelectedAudio(audio);
      await playPreview(audio);
    },
    [playPreview]
  );

  const startSession = useCallback(async () => {
    try {
      if (previewSoundRef.current) {
        await previewSoundRef.current.stopAsync();
        await previewSoundRef.current.unloadAsync();
        previewSoundRef.current = null;
      }
      setPreviewingAudio(null);

      const { sound } = await Audio.Sound.createAsync(selectedAudio.source, {
        shouldPlay: true,
        isLooping: true,
        volume: 0.7,
      });
      soundRef.current = sound;

      setTimeLeft(selectedDuration.seconds);
      setIsPaused(false);
      setBreathPhase(0);
      setScreen('session');
    } catch {
      setTimeLeft(selectedDuration.seconds);
      setIsPaused(false);
      setBreathPhase(0);
      setScreen('session');
    }
  }, [selectedAudio, selectedDuration]);

  const togglePause = useCallback(async () => {
    if (!soundRef.current) return;

    try {
      if (isPaused) {
        await soundRef.current.playAsync();
      } else {
        await soundRef.current.pauseAsync();
      }
      setIsPaused(!isPaused);
    } catch {
      // ignore
    }
  }, [isPaused]);

  const endSession = useCallback(async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      } catch {
        // ignore
      }
      soundRef.current = null;
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (breathTimeoutRef.current) clearTimeout(breathTimeoutRef.current);
    router.back();
  }, [router]);

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

    const phase = breathingPhases[breathPhase];

    const scaleTo = breathPhase === 2 ? 0.7 : 1.1;
    const opacityTo = breathPhase === 2 ? 0.4 : 0.8;

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
      setBreathPhase((prev) => (prev + 1) % breathingPhases.length);
    }, phase.duration);

    return () => {
      if (breathTimeoutRef.current) clearTimeout(breathTimeoutRef.current);
    };
  }, [breathPhase, screen, isPaused, circleScale, circleOpacity]);

  useEffect(() => {
    return () => {
      soundRef.current?.stopAsync();
      soundRef.current?.unloadAsync();
      previewSoundRef.current?.stopAsync();
      previewSoundRef.current?.unloadAsync();
    };
  }, []);

  if (screen === 'session') {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.sessionContainer}>
          <View style={styles.circleContainer}>
            <Animated.View
              style={[styles.circleGlow, { opacity: circleOpacity }]}
            />
            <Animated.View
              style={[styles.circle, { transform: [{ scale: circleScale }] }]}
            >
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
              <Text style={styles.phaseText}>
                {t(breathingPhases[breathPhase].label)}
              </Text>
            </Animated.View>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.controlButton} onPress={endSession}>
              <Icon source="close" size={28} color={colors.textSecondary} />
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
                color={colors.textSecondary}
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
          <Text style={styles.title}>{t('meditation.title')}</Text>
          <Text style={styles.subtitle}>{t('meditation.subtitle')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('meditation.duration')}</Text>
          <View style={styles.durationRow}>
            {durationOptions.map((duration) => (
              <TouchableOpacity
                key={duration.id}
                style={[
                  styles.durationButton,
                  selectedDuration.id === duration.id &&
                    styles.durationButtonSelected,
                ]}
                onPress={() => setSelectedDuration(duration)}
              >
                <Text
                  style={[
                    styles.durationText,
                    selectedDuration.id === duration.id &&
                      styles.durationTextSelected,
                  ]}
                >
                  {duration.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('meditation.sound')}</Text>
          <View style={styles.audioList}>
            {audioOptions.map((audio) => (
              <TouchableOpacity
                key={audio.id}
                style={[
                  styles.audioCard,
                  selectedAudio.id === audio.id && styles.audioCardSelected,
                ]}
                onPress={() => handleSelectAudio(audio)}
              >
                <View
                  style={[
                    styles.audioIcon,
                    previewingAudio === audio.id && styles.audioIconPlaying,
                  ]}
                >
                  <Icon
                    source={
                      previewingAudio === audio.id ? 'equalizer' : 'headphones'
                    }
                    size={22}
                    color={
                      previewingAudio === audio.id
                        ? meditationColors.selected
                        : colors.textSecondary
                    }
                  />
                </View>

                <View style={styles.audioInfo}>
                  <Text style={styles.audioLabel}>{t(audio.label)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={startSession}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>{t('meditation.start')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
