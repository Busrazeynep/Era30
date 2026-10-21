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
import { useVideoPlayer, VideoView } from 'expo-video';
import * as NavigationBar from 'expo-navigation-bar';

const { width, height: screenHeight } = Dimensions.get('window');

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

function SectionHeader({ label }: { label: string }) {
  return (
    <View style={styles.sectionHeaderCard}>
      <Text style={styles.sectionLabel}>{label}</Text>
    </View>
  );
}

function PortreSection({ scrollY }: { scrollY: Animated.Value }) {
  const scaleAnim = useRef(new Animated.Value(1.15)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [triggered, setTriggered] = useState(false);
  const viewRef = useRef<View>(null);
  const [offsetY, setOffsetY] = useState<number | null>(null);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      if (offsetY !== null && !triggered && value + screenHeight > offsetY + 100) {
        setTriggered(true);
        Animated.parallel([
          Animated.timing(opacityAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1, duration: 2500, useNativeDriver: true }),
        ]).start();
      }
    });
    return () => scrollY.removeListener(listenerId);
  }, [offsetY, triggered]);

  return (
    <View
      ref={viewRef}
      style={styles.section}
      onLayout={() => viewRef.current?.measureInWindow((x, y) => setOffsetY(y))}
    >
      <Animated.Image
        source={require('../../assets/Frame_7.png')}
        style={[styles.fullImage, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}
        resizeMode="cover"
      />
    </View>
  );
}

function HizliCekimSection() {
  const cardAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.8)).current;
  const descAnim = useRef(new Animated.Value(0)).current;

  const timelapsPlayer = useVideoPlayer(
    require('../../assets/Time-Lapse.mp4'),
    (p) => { p.loop = true; p.muted = true; p.play(); }
  );

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(titleScale, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.timing(cardAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(descAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const frameW = width - 40;
  const frameH = frameW * 0.65;

  return (
    <View style={styles.section}>
      <Animated.Text style={[
        styles.hizliTitle,
        {
          opacity: titleAnim,
          transform: [{ scale: titleScale }],
        }
      ]}>
        Hızlı Çekim
      </Animated.Text>

      <Animated.View style={[
        styles.hizliVideoBox,
        { width: frameW, height: frameH, opacity: cardAnim }
      ]}>
        <VideoView
          player={timelapsPlayer}
          style={styles.hizliVideo}
          contentFit="cover"
          nativeControls={false}
        />
      </Animated.View>

      <Animated.Text style={[styles.hizliDesc, { opacity: descAnim }]}>
        Anları hızlandırın.
      </Animated.Text>
    </View>
  );
}

export const CameraScreen = () => {
  const navigation = useNavigation<any>();
  const scrollY = useRef(new Animated.Value(0)).current;

  const imageTranslateY = useRef(new Animated.Value(300)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;
  const descTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');

    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(imageOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(imageTranslateY, { toValue: 0, duration: 800, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(descOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(descTranslateY, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
    ]).start();
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
        <Text style={styles.headerTitle}>KAMERA</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* 1. ANA KAMERA */}
        <FadeSection delay={100}>
          <SectionHeader label="ANA KAMERA" />
        </FadeSection>
        <View style={styles.section}>
          <View style={styles.heroClip}>
            <Animated.Image
              source={require('../../assets/Frame_5.png')}
              style={[
                styles.heroImage,
                {
                  opacity: imageOpacity,
                  transform: [{ translateY: imageTranslateY }],
                }
              ]}
              resizeMode="cover"
            />
          </View>
          <Animated.Text style={[
            styles.sectionDesc,
            {
              opacity: descOpacity,
              transform: [{ translateY: descTranslateY }],
            }
          ]}>
            Era 30'un 50MP AI arka kamerası ile en ufak ayrıntıları bile kaçırmadan hayatın her anını ölümsüzleştirin, her detayı kaydedin.
          </Animated.Text>
        </View>

        {/* 2. SELFİE KAMERA */}
        <FadeSection delay={200}>
          <View style={styles.section}>
            <Image source={require('../../assets/Frame_11.png')} style={styles.fullImage} resizeMode="cover" />
            <Text style={styles.sectionDesc}>
              Era 30'un yapay zeka destekli selfie kamerası, yüz hatlarınızı ve ışık koşullarını analiz ederek doğal güzelliğinizi en çarpıcı şekilde ortaya çıkarır.
            </Text>
          </View>
        </FadeSection>

        {/* FOTOĞRAF MODLARI BAŞLIĞI */}
        <FadeSection delay={200}>
          <View style={styles.modeTitleSection}>
            <View style={styles.modeTitleRow}>
              <View style={styles.modeDivider} />
              <Text style={styles.modeSectionTitle}>FOTOĞRAF MODLARI</Text>
              <View style={styles.modeDivider} />
            </View>
          </View>
        </FadeSection>

        {/* 3. PORTRE */}
        <PortreSection scrollY={scrollY} />

        {/* 4. GECE MODU */}
        <FadeSection delay={200}>
          <View style={styles.section}>
            <Image source={require('../../assets/Frame_8.png')} style={styles.fullImage} resizeMode="cover" />
          </View>
        </FadeSection>

        {/* 5. AI SAHNE */}
        <FadeSection delay={200}>
          <View style={styles.section}>
            <Image source={require('../../assets/Frame_9.png')} style={styles.fullImage} resizeMode="cover" />
          </View>
        </FadeSection>

        {/* 6. HIZLI ÇEKİM */}
        <HizliCekimSection />

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

  sectionHeaderCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  sectionLabel: {
    fontSize: 15,
    color: '#ffffff',
    letterSpacing: 2,
    fontWeight: '600',
  },
  sectionDesc: { fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 20 },

  modeTitleSection: {
    marginHorizontal: 20,
    marginBottom: 28,
    marginTop: 8,
  },
  modeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modeDivider: {
    flex: 1,
    height: 0.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  modeSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 3,
  },

  heroClip: {
    width: '100%',
    height: width,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  fullImage: {
    width: '100%', height: width - 40, borderRadius: 20, overflow: 'hidden',
  },

  hizliTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -1,
  },
  hizliVideoBox: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  hizliVideo: {
    width: '100%',
    height: '100%',
  },
  hizliDesc: {
    fontSize: 18,
    fontWeight: '300',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});