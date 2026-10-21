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

function ScrollImageCard({
  scrollY,
  image,
  desc,
  immediate = false,
}: {
  scrollY: Animated.Value;
  image: any;
  desc: string;
  immediate?: boolean;
}) {
  const imageAnim = useRef(new Animated.Value(0)).current;
  const descAnim = useRef(new Animated.Value(0)).current;
  const descTranslate = useRef(new Animated.Value(20)).current;
  const [triggered, setTriggered] = useState(false);
  const viewRef = useRef<View>(null);
  const [offsetY, setOffsetY] = useState<number | null>(null);

  const startAnim = () => {
    Animated.sequence([
      Animated.timing(imageAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(descAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(descTranslate, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
    ]).start();
  };

  useEffect(() => {
    if (immediate) {
      startAnim();
      return;
    }
    const id = scrollY.addListener(({ value }) => {
      if (offsetY !== null && !triggered && value + screenHeight > offsetY + 80) {
        setTriggered(true);
        startAnim();
      }
    });
    return () => scrollY.removeListener(id);
  }, [offsetY, triggered]);

  return (
    <View
      ref={viewRef}
      onLayout={() => viewRef.current?.measureInWindow((x, y) => setOffsetY(y))}
      style={styles.section}
    >
      <Animated.Image
        source={image}
        style={[styles.fullImage, { opacity: imageAnim }]}
        resizeMode="cover"
      />
      <Animated.Text style={[
        styles.descText,
        { opacity: descAnim, transform: [{ translateY: descTranslate }] }
      ]}>
        {desc}
      </Animated.Text>
    </View>
  );
}

function StorageCard({ scrollY }: { scrollY: Animated.Value }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const descAnim = useRef(new Animated.Value(0)).current;
  const descTranslate = useRef(new Animated.Value(20)).current;
  const [triggered, setTriggered] = useState(false);
  const viewRef = useRef<View>(null);
  const [offsetY, setOffsetY] = useState<number | null>(null);

  useEffect(() => {
    const id = scrollY.addListener(({ value }) => {
      if (offsetY !== null && !triggered && value + screenHeight > offsetY + 80) {
        setTriggered(true);
        Animated.parallel([
          Animated.timing(opacityAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1.06, duration: 4000, useNativeDriver: true }),
        ]).start();
        Animated.sequence([
          Animated.delay(600),
          Animated.parallel([
            Animated.timing(descAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
            Animated.timing(descTranslate, { toValue: 0, duration: 600, useNativeDriver: true }),
          ]),
        ]).start();
      }
    });
    return () => scrollY.removeListener(id);
  }, [offsetY, triggered]);

  return (
    <View
      ref={viewRef}
      onLayout={() => viewRef.current?.measureInWindow((x, y) => setOffsetY(y))}
      style={styles.section}
    >
      <Animated.Image
        source={require('../../assets/Frame_13.png')}
        style={[styles.fullImage, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}
        resizeMode="cover"
      />
      <Animated.Text style={[
        styles.descText,
        { opacity: descAnim, transform: [{ translateY: descTranslate }] }
      ]}>
        Era 30'un 128GB depolama alanı ile hayatınızın her anını kaydedin, anılarınızı ölümsüzleştirin.
      </Animated.Text>
    </View>
  );
}

function ScreenCard({ scrollY }: { scrollY: Animated.Value }) {
  const brightnessAnim = useRef(new Animated.Value(0)).current;
  const [triggered, setTriggered] = useState(false);
  const viewRef = useRef<View>(null);
  const [offsetY, setOffsetY] = useState<number | null>(null);

  useEffect(() => {
    const id = scrollY.addListener(({ value }) => {
      if (offsetY !== null && !triggered && value + screenHeight > offsetY + 80) {
        setTriggered(true);
        Animated.timing(brightnessAnim, { toValue: 1, duration: 1500, useNativeDriver: true }).start();
      }
    });
    return () => scrollY.removeListener(id);
  }, [offsetY, triggered]);

  return (
    <View
      ref={viewRef}
      onLayout={() => viewRef.current?.measureInWindow((x, y) => setOffsetY(y))}
      style={styles.section}
    >
      <View style={styles.frameWrapper}>
        <Image
          source={require('../../assets/Frame_4.png')}
          style={styles.fullImage}
          resizeMode="cover"
        />
        <Animated.View style={[
          styles.frameOverlay,
          {
            opacity: brightnessAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }
        ]} />
      </View>
    </View>
  );
}

function HzCard() {
  const cardAnim = useRef(new Animated.Value(0)).current;
  const hzAnim = useRef(new Animated.Value(0)).current;
  const hzScale = useRef(new Animated.Value(0.8)).current;
  const descAnim = useRef(new Animated.Value(0)).current;

  const hzPlayer = useVideoPlayer(
    require('../../assets/ERA30__Hz.mp4'),
    (p) => { p.loop = true; p.muted = true; p.play(); }
  );

  useEffect(() => {
    Animated.sequence([
      Animated.timing(cardAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.parallel([
        Animated.timing(hzAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(hzScale, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.timing(descAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const frameW = width - 40;
  const frameH = frameW * 0.55;

  return (
    <Animated.View style={[styles.section, { opacity: cardAnim }]}>
      <Animated.Text style={[
        styles.hzTitle,
        { opacity: hzAnim, transform: [{ scale: hzScale }] }
      ]}>
        90Hz
      </Animated.Text>
      <View style={[styles.phoneFrame, { width: frameW, height: frameH }]}>
        <View style={styles.phoneCameraLeft} />
        <VideoView
          player={hzPlayer}
          style={styles.phoneScreen}
          contentFit="cover"
          nativeControls={false}
        />
      </View>
      <Animated.Text style={[styles.descText, { opacity: descAnim, textAlign: 'center' }]}>
        Akıcı Deneyim, Güçlü Performans.
      </Animated.Text>
    </Animated.View>
  );
}

function NfcCard({ scrollY }: { scrollY: Animated.Value }) {
  const cardAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const titleTranslate = useRef(new Animated.Value(20)).current;
  const descAnim = useRef(new Animated.Value(0)).current;
  const descTranslate = useRef(new Animated.Value(20)).current;

  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;
  const pulse3 = useRef(new Animated.Value(0)).current;

  const [triggered, setTriggered] = useState(false);
  const viewRef = useRef<View>(null);
  const [offsetY, setOffsetY] = useState<number | null>(null);

  const startPulse = () => {
    const createPulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1, duration: 1000, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    createPulse(pulse1, 0);
    createPulse(pulse2, 400);
    createPulse(pulse3, 800);
  };

  useEffect(() => {
    const id = scrollY.addListener(({ value }) => {
      if (offsetY !== null && !triggered && value + screenHeight > offsetY + 80) {
        setTriggered(true);
        Animated.sequence([
          Animated.timing(cardAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
          Animated.parallel([
            Animated.timing(titleAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.timing(titleTranslate, { toValue: 0, duration: 500, useNativeDriver: true }),
          ]),
          Animated.parallel([
            Animated.timing(descAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.timing(descTranslate, { toValue: 0, duration: 500, useNativeDriver: true }),
          ]),
        ]).start();
        setTimeout(startPulse, 600);
      }
    });
    return () => scrollY.removeListener(id);
  }, [offsetY, triggered]);

  const imgSize = width - 40;
  const nfcCenterX = imgSize * 0.71;
  const nfcCenterY = imgSize * 0.50;
  const pulseSize = imgSize * 0.16;

  return (
    <View
      ref={viewRef}
      onLayout={() => viewRef.current?.measureInWindow((x, y) => setOffsetY(y))}
      style={styles.section}
    >
      <Animated.View style={[styles.nfcImageWrapper, { opacity: cardAnim }]}>
        <Image
          source={require('../../assets/Frame_15.png')}
          style={styles.fullImage}
          resizeMode="cover"
        />
        {[pulse1, pulse2, pulse3].map((pulse, i) => (
          <Animated.View
            key={i}
            style={[
              styles.pulseCircle,
              {
                width: pulseSize,
                height: pulseSize,
                borderRadius: pulseSize / 2,
                left: nfcCenterX - pulseSize / 2,
                top: nfcCenterY - pulseSize / 2,
                opacity: pulse,
                transform: [{
                  scale: pulse.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 2.2],
                  })
                }],
              }
            ]}
          />
        ))}
      </Animated.View>

      <Animated.Text style={[
        styles.sectionTitle,
        { opacity: titleAnim, transform: [{ translateY: titleTranslate }] }
      ]}>
        NFC ile Anında Bağlantı,{'\n'}Anında Kolaylık
      </Animated.Text>

      <Animated.Text style={[
        styles.descText,
        { opacity: descAnim, transform: [{ translateY: descTranslate }] }
      ]}>
        Era 30'un NFC teknolojisi, yapacağınız tüm ödemelerden dosya transferine kadar hızlı ve güvenli bağlantılar sağlar, kolaylığı her anınızda hissettirir.
      </Animated.Text>
    </View>
  );
}

export const PerformanceScreen = () => {
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
        <Text style={styles.headerTitle}>PERFORMANS</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* 1. İŞLEMCİ */}
        <FadeSection delay={100}>
          <SectionHeader label="İŞLEMCİ" />
        </FadeSection>
        <ScrollImageCard
          scrollY={scrollY}
          image={require('../../assets/Frame_14.png')}
          desc="Era 30'un, 8 çekirdekli MediaTek Helio G36 2.2Ghz işlemcisiyle en verimli performansın tadını çıkarın."
          immediate={true}
        />

        {/* 2. HAFIZA */}
        <FadeSection delay={100}>
          <SectionHeader label="HAFIZA" />
        </FadeSection>
        <StorageCard scrollY={scrollY} />

        {/* 3. BATARYA */}
        <FadeSection delay={100}>
          <SectionHeader label="BATARYA" />
        </FadeSection>
        <ScrollImageCard
          scrollY={scrollY}
          image={require('../../assets/Frame_16.png')}
          desc="5000mAh bataryalı Era 30 ile tek şarjla kullanım sınırlarını zorlar ve sizi yarı yolda bırakmaz."
        />

        {/* 4. EKRAN ÖZELLİKLERİ */}
        <FadeSection delay={100}>
          <SectionHeader label="EKRAN ÖZELLİKLERİ" />
        </FadeSection>
        <ScreenCard scrollY={scrollY} />

        {/* 5. EKRAN YENİLEME HIZI */}
        <FadeSection delay={100}>
          <SectionHeader label="EKRAN YENİLEME HIZI" />
        </FadeSection>
        <HzCard />

        {/* 6. NFC */}
        <FadeSection delay={100}>
          <SectionHeader label="NFC" />
        </FadeSection>
        <NfcCard scrollY={scrollY} />

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

  // BAŞLIK KARTI — kamera ekranıyla aynı
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
  sectionTitle: { fontSize: 22, fontWeight: '300', color: '#ffffff' },
  descText: { fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 20 },
  fullImage: { width: '100%', height: width - 40, borderRadius: 20 },

  frameWrapper: { position: 'relative', borderRadius: 20, overflow: 'hidden' },
  frameOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#000000', borderRadius: 20,
  },

  hzTitle: {
    fontSize: 72, fontWeight: '800', color: '#ffffff',
    textAlign: 'center', letterSpacing: -2,
    textShadowColor: 'rgba(255,255,255,1)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  phoneFrame: {
    borderRadius: 24, borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: '#000', overflow: 'hidden',
    position: 'relative', alignSelf: 'center',
  },
  phoneCameraLeft: {
    position: 'absolute', left: 10, top: '45%',
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)', zIndex: 2,
  },
  phoneScreen: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },

  nfcImageWrapper: {
    position: 'relative',
    width: '100%',
    height: width - 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  pulseCircle: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.65)',
    backgroundColor: 'transparent',
  },
});