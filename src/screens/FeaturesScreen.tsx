import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Brain, BatteryCharging, MonitorSmartphone, Cpu, ArrowLeft } from 'lucide-react-native';
import { GlassCard } from '../components/GlassCard';
import { typography } from '../theme/typography';
import { useTheme } from '../theme/ThemeContext';

const featuresList = [
  {
    id: 'ai',
    title: 'GM Yapay Zeka Asistanları',
    description: 'Telefon görüşmeleri, metin çevrileri ve fotoğraf düzenleme artık yapay zeka ile çok daha akıllı. "GM AI call assistant", "GM AI text assistant" ve "GM AI photo editor" ile sınırları aşın.',
    icon: Brain,
    image: require('../../GM 26 Pro/GM AI team.png')
  },
  {
    id: 'display',
    title: '6.67" AMOLED 120Hz Ekran',
    description: '1080x2400 FHD+, 1000 nit maksimum parlaklık ve 1 milyar renk ile kusursuz akıcılık ve canlılık. Panda MN228 cam koruması.',
    icon: MonitorSmartphone,
    image: require('../../GM 26 Pro/display.png')
  },
  {
    id: 'power',
    title: 'MediaTek D7060 5G & Bellek',
    description: '6nm mimarisi ile ultra yüksek hız. 24GB\'a varan RAM (12+12 Genişletilmiş) ve 512GB depolama alanı ile inanılmaz performans.',
    icon: Cpu,
    image: require('../../GM 26 Pro/storage & ram.png')
  },
  {
    id: 'battery',
    title: '5000 mAh & Güç Yönetimi',
    description: 'Tüm gün süren enerji. 10.5 saat video oynatma, 30 saat müzik keyfi ve hızlı şarj desteği.',
    icon: BatteryCharging,
    image: require('../../GM 26 Pro/battery.png')
  }
];

export const FeaturesScreen = () => {
  const navigation = useNavigation();
  const { colors, mode } = useTheme();

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, overflow: 'hidden' },
    glowBg: { position: 'absolute', borderRadius: 1000, zIndex: -1 },
    glowTop: {
      width: 400, height: 400, top: '-10%', left: '-20%',
      backgroundColor: colors.purple, opacity: mode === 'dark' ? 0.15 : 0.05, shadowColor: colors.purple, shadowRadius: 100, shadowOpacity: 0.8
    },
    glowBottom: {
      width: 400, height: 400, bottom: '-10%', right: '-20%',
      backgroundColor: colors.accent, opacity: mode === 'dark' ? 0.1 : 0.05, shadowColor: colors.accent, shadowRadius: 100, shadowOpacity: 0.6
    },
    header: { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingHorizontal: 24, marginBottom: 20 },
    backButton: {
      width: 44, height: 44, borderRadius: 22, backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      justifyContent: 'center', alignItems: 'center', marginRight: 16, borderWidth: 1, borderColor: colors.border
    },
    title: { letterSpacing: 2, flex: 1, color: colors.text, textTransform: 'uppercase', fontSize: 18 },
    scrollContent: { padding: 24, paddingBottom: 60 },
    cardContainer: { marginBottom: 32 },
    card: { padding: 10, overflow: 'hidden', borderRadius: 30, borderWidth: 1, borderColor: colors.border },
    cardHeader: { flexDirection: 'column', alignItems: 'flex-start', paddingTop: 24, paddingBottom: 24, paddingLeft: 5, paddingRight: 5 },
    iconContainer: {
      width: '100%', height: 40, borderRadius: 16, backgroundColor: colors.accent + '1a',
      flexDirection: 'row', paddingLeft: 20,
      alignItems: 'center', borderWidth: 1, borderColor: colors.accent + '33'
    },
    cardTitleContainer: { flex: 1, justifyContent: 'center' },
    cardTitle: { paddingLeft: 20, marginBottom: 8, color: colors.text, fontSize: 24, letterSpacing: -0.5 },
    cardDescription: { lineHeight: 26, fontSize: 15, color: colors.textSecondary, padding: 5, flexWrap: 'wrap' },
    imageContainer: { position: 'relative', borderRadius: 30, alignItems: 'center' },
    featureImage: { width: "98%", height: 250, opacity: mode === 'dark' ? 0.8 : 1, borderRadius: 30 },
    imageOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'transparent'
    }
  });

  return (
    <View style={styles.container}>
      <View style={[styles.glowBg, styles.glowTop]} />
      <View style={[styles.glowBg, styles.glowBottom]} />

      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </Pressable>
        <Text style={[typography.h3, styles.title]}>
          ÖNE ÇIKAN ÖZELLİKLER
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {featuresList.map((feature) => {
          const Icon = feature.icon;
          return (
            <View key={feature.id} style={styles.cardContainer}>
              <GlassCard style={styles.card} intensity={25}>
                <View style={styles.cardHeader}>
                  <View style={styles.iconContainer}>
                    <Icon size={28} color={colors.accent} strokeWidth={1.5} style={{ position: 'absolute', left: 5 }} />
                    <Text style={[typography.h3, styles.cardTitle]}>{feature.title}</Text>
                  </View>
                  <View style={styles.cardTitleContainer}>
                    <Text style={[typography.body1, styles.cardDescription]}>{feature.description}</Text>
                  </View>
                </View>

                {feature.image && (
                  <View style={styles.imageContainer}>
                    <Image source={feature.image} style={styles.featureImage} resizeMode="cover" />
                    <View style={styles.imageOverlay} />
                  </View>
                )}
              </GlassCard>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
