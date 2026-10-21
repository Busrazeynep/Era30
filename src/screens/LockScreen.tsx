import React, { useRef, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useVideoPlayer, VideoView } from 'expo-video';

const { width, height } = Dimensions.get('window');

export const LockScreen = () => {
  const navigation = useNavigation<any>();
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;

  const videoPlayer = useVideoPlayer(
    require('../../assets/eravideo.mp4'),
    (p) => { p.loop = true; p.muted = true; p.play(); }
  );

  useEffect(() => {
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 1000,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const navigateHome = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -height,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => navigation.navigate('Home'));
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy < -10,
      onPanResponderMove: (_, g) => {
        if (g.dy < 0) {
          translateY.setValue(g.dy);
          opacity.setValue(1 + g.dy / height);
        }
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy < -80) {
          Animated.parallel([
            Animated.timing(translateY, {
              toValue: -height,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]).start(() => navigation.navigate('Home'));
        } else {
          Animated.parallel([
            Animated.spring(translateY, {
              toValue: 0,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY }], opacity }]}
      {...panResponder.panHandlers}
    >
      <StatusBar style="light" />

      {/* Arka plan video */}
      <VideoView
        player={videoPlayer}
        style={styles.video}
        contentFit="cover"
        nativeControls={false}
      />

      {/* Karartma overlay */}
      <View style={styles.overlay} />

      {/* Keşfet butonu */}
      <Animated.View style={[
        styles.buttonWrapper,
        {
          opacity: buttonAnim,
          transform: [{ translateY: buttonAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
        }
      ]}>
        <Pressable
          style={({ pressed }) => [
            styles.exploreButton,
            { opacity: pressed ? 0.8 : 1 }
          ]}
          onPress={navigateHome}
        >
          <Text style={styles.exploreText}>KEŞFEDİN</Text>
        </Pressable>
      </Animated.View>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 70,
    alignItems: 'center',
    zIndex: 2,
  },
  exploreButton: {
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  exploreText: {
    fontSize: 13,
    color: '#ffffff',
    letterSpacing: 4,
    fontWeight: '300',
  },
});