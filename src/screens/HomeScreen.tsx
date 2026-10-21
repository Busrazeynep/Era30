import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';

const { width, height } = Dimensions.get('window');

type FeatureCardProps = {
  title: string;
  route: string;
  delay: number;
  image: any;
};

const FeatureCard = ({ title, route, delay, image }: FeatureCardProps) => {
  const navigation = useNavigation<any>();
  const anim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 600,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, { toValue: 0.97, duration: 100, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{
      opacity: anim,
      transform: [
        { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) },
        { scale: scaleAnim },
      ],
    }}>
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate(route)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.cardImageWrapper}>
          <Image source={image} style={styles.cardImage} resizeMode="cover" />
          <View style={styles.cardImageOverlay} />
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <View style={styles.cardArrowWrapper}>
          <Text style={styles.cardArrow}>→</Text>
        </View>
        <View style={styles.cardAccentLine} />
      </Pressable>
    </Animated.View>
  );
};

const GlowRing = ({
  size,
  top,
  left,
  bottom,
  right,
  layers,
}: {
  size: number;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  layers: { offset: number; opacity: number; borderWidth: number }[];
}) => (
  <>
    {layers.map((layer, i) => (
      <View
        key={i}
        style={{
          position: 'absolute',
          width: size + layer.offset * 2,
          height: size + layer.offset * 2,
          borderRadius: (size + layer.offset * 2) / 2,
          borderWidth: layer.borderWidth,
          borderColor: `rgba(255,255,255,${layer.opacity})`,
          backgroundColor: 'transparent',
          top: top !== undefined ? top - layer.offset : undefined,
          left: left !== undefined ? left - layer.offset : undefined,
          bottom: bottom !== undefined ? bottom - layer.offset : undefined,
          right: right !== undefined ? right - layer.offset : undefined,
        }}
      />
    ))}
  </>
);

export const HomeScreen = () => {
  const logoAnim = useRef(new Animated.Value(0)).current;
  const kapakAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');

    Animated.sequence([
      Animated.timing(logoAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(kapakAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const features: FeatureCardProps[] = [
    {
      title: 'Tasarım',
      route: 'Design',
      delay: 800,
      image: require('../../assets/Frame_2_1.png'),
    },
    {
      title: 'Kamera',
      route: 'Camera',
      delay: 1000,
      image: require('../../assets/Frame_5.png'),
    },
    {
      title: 'Performans',
      route: 'Performance',
      delay: 1200,
      image: require('../../assets/Frame_4.png'),
    },
  ];

  const moonTopSize = width * 1.1;

  const glowLayers = [
    { offset: 0, opacity: 0.85, borderWidth: 1.5 },
    { offset: 4, opacity: 0.25, borderWidth: 3 },
    { offset: 9, opacity: 0.12, borderWidth: 5 },
    { offset: 16, opacity: 0.07, borderWidth: 8 },
    { offset: 26, opacity: 0.04, borderWidth: 12 },
    { offset: 40, opacity: 0.02, borderWidth: 16 },
  ];

  return (
    <View style={styles.container}>

      <GlowRing
        size={moonTopSize}
        top={-width * 0.4}
        left={-width * 0.2}
        layers={glowLayers}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { minHeight: height }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>

          <Animated.View style={[
            styles.logoContainer,
            {
              opacity: logoAnim,
              transform: [{ translateY: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }],
            }
          ]}>
            <Image
              source={require('../../assets/logo_home.png')}
              style={styles.logo}
              resizeMode="contain"
              tintColor="#ffffff"
            />
          </Animated.View>

          <Animated.View style={[
            styles.kapakContainer,
            {
              opacity: kapakAnim,
              transform: [{ scale: kapakAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }],
            }
          ]}>
            <Image
              source={require('../../assets/kapak.png')}
              style={styles.kapak}
              resizeMode="contain"
            />
          </Animated.View>

          <View style={styles.cardsBackground}>
            <View style={styles.cardsContainer}>
              {features.map((f) => (
                <FeatureCard key={f.title} {...f} />
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: { flexGrow: 1 },
  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    gap: 12,
  },
  logoContainer: { alignItems: 'center' },
  logo: { width: 200, height: 55 },
  kapakContainer: { alignItems: 'center' },
  kapak: {
    width: width - 40,
    height: (width - 40) * 1.0,
    borderRadius: 24,
    backgroundColor: '#000',
  },
  cardsBackground: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderRadius: 20,
    padding: 4,
  },
  cardsContainer: { gap: 8 },
  card: {
    borderRadius: 16,
    borderWidth: 0.5,
    borderLeftWidth: 1.5,
    borderLeftColor: 'rgba(255,255,255,0.7)',
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImageWrapper: {
    width: 52,
    height: 52,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cardImage: { width: '100%', height: '100%' },
  cardImageOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  cardText: { flex: 1 },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  cardArrowWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardArrow: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff',
  },
  cardAccentLine: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 0.5,
    backgroundColor: '#ffffff',
    opacity: 0.3,
  },
});