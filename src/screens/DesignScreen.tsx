import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';

const { width } = Dimensions.get('window');

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(anim, { toValue: 1, duration: 800, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 800, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: anim, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

function ColorSection() {
  const [selected, setSelected] = useState<'white' | 'black'>('white');
  const whiteOpacity = useRef(new Animated.Value(1)).current;
  const blackOpacity = useRef(new Animated.Value(0)).current;
  const imageAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(imageAnim, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, []);

  const selectColor = (color: 'white' | 'black') => {
    if (color === selected) return;
    setSelected(color);

    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.97, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1.02, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();

    if (color === 'white') {
      Animated.parallel([
        Animated.timing(whiteOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(blackOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(whiteOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(blackOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]).start();
    }
  };

  return (
    <View style={styles.section}>
      <Animated.View style={[
        styles.colorImageWrapper,
        {
          opacity: imageAnim,
          transform: [{ scale: scaleAnim }],
        }
      ]}>
        <Animated.Image
          source={require('../../assets/Frame_2_1.png')}
          style={[styles.fullImage, { opacity: whiteOpacity, position: 'absolute', top: 0, left: 0 }]}
          resizeMode="cover"
        />
        <Animated.Image
          source={require('../../assets/Frame_2_2.png')}
          style={[styles.fullImage, { opacity: blackOpacity, position: 'absolute', top: 0, left: 0 }]}
          resizeMode="cover"
        />
      </Animated.View>

      <View style={styles.colorButtons}>
        <Pressable style={styles.colorBtn} onPress={() => selectColor('white')}>
          <View style={[
            styles.colorDot,
            { backgroundColor: '#dedaca' },
            selected === 'white' && styles.colorDotSelected,
          ]} />
          <Text style={[
            styles.colorLabel,
            selected === 'white' && styles.colorLabelSelected,
          ]}>
            Yıldız Beyazı
          </Text>
          {selected === 'white' && <View style={styles.colorUnderline} />}
        </Pressable>

        <View style={styles.colorDivider} />

        <Pressable style={styles.colorBtn} onPress={() => selectColor('black')}>
          <View style={[
            styles.colorDot,
            { backgroundColor: '#111115' },
            selected === 'black' && styles.colorDotSelected,
          ]} />
          <Text style={[
            styles.colorLabel,
            selected === 'black' && styles.colorLabelSelected,
          ]}>
            Kozmik Siyah
          </Text>
          {selected === 'black' && <View style={styles.colorUnderline} />}
        </Pressable>
      </View>
    </View>
  );
}

function ScreenSection() {
  const imageAnim = useRef(new Animated.Value(0)).current;
  const descAnim = useRef(new Animated.Value(0)).current;
  const descTranslate = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(imageAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(descAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(descTranslate, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <View style={styles.section}>
      <Animated.Image
        source={require('../../assets/Frame_3.png')}
        style={[styles.fullImage, { opacity: imageAnim }]}
        resizeMode="cover"
      />
      <Animated.Text style={[
        styles.descText,
        { opacity: descAnim, transform: [{ translateY: descTranslate }] }
      ]}>
      </Animated.Text>
    </View>
  );
}

export const DesignScreen = () => {
  const navigation = useNavigation<any>();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>TASARIM</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <FadeSection delay={100}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Renk Seçenekleri</Text>
          </View>
        </FadeSection>

        <ColorSection />

        <FadeSection delay={100}>
          <View style={[styles.sectionHeader, { marginTop: 8 }]}>
            <Text style={styles.sectionTitle}>Özellikler</Text>
          </View>
        </FadeSection>

        <ScreenSection />

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 56, paddingHorizontal: 20, paddingBottom: 12,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center', marginRight: 16,
  },
  backArrow: { fontSize: 18, color: '#ffffff' },
  headerTitle: { fontSize: 12, fontWeight: '700', color: '#ffffff', letterSpacing: 4 },
  scroll: { paddingBottom: 40 },
  section: { marginHorizontal: 20, marginBottom: 32, gap: 12 },
  sectionHeader: { marginHorizontal: 20, marginBottom: 12, gap: 4 },
  sectionLabel: { fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 4 },
  sectionTitle: { fontSize: 22, fontWeight: '300', color: '#ffffff' },
  descText: { fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 20 },
  fullImage: { width: '100%', height: width - 40, borderRadius: 20 },

  colorImageWrapper: {
    width: '100%',
    height: width - 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#111',
    position: 'relative',
  },
  colorButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorBtn: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    position: 'relative',
    gap: 6,
  },
  colorDot: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)',
  },
  colorDotSelected: {
    borderColor: 'rgba(255,255,255,0.8)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  colorLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 0.5,
  },
  colorLabelSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  colorUnderline: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 1.5,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  colorDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});