import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Button,
  ImageTheme,
  Row,
  Text,
  colors,
  contentMaxWidth,
  dummyImage,
  fonts,
  gridMaxWidth,
  pageGutter,
  radii,
  spacing,
  useResponsive,
} from '@/design-system';
import { strings } from '@/i18n';
import type { RootStackScreenProps } from '@/app/navigation/types';

const HERO_HEIGHT = 460;

const FEATURES: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  body: string;
}[] = [
  {
    icon: 'cube-outline',
    title: strings.welcome.feature1Title,
    body: strings.welcome.feature1Body,
  },
  {
    icon: 'calendar-outline',
    title: strings.welcome.feature2Title,
    body: strings.welcome.feature2Body,
  },
  {
    icon: 'trail-sign-outline',
    title: strings.welcome.feature3Title,
    body: strings.welcome.feature3Body,
  },
];

/**
 * Muestra pública de resultados (marketing), independiente de los proyectos
 * privados de clientes (`features/projects`) — no requiere sesión.
 */
const SHOWCASE_RESULTS: {
  seed: string;
  theme: ImageTheme;
  name: string;
  category: string;
}[] = [
  {
    seed: 'showcase-kitchen',
    theme: 'interior',
    name: 'Cocina abierta, Chapinero',
    category: 'Cocina integral',
  },
  {
    seed: 'showcase-commercial',
    theme: 'renovation',
    name: 'Café Norte, Zona T',
    category: 'Local comercial',
  },
  {
    seed: 'showcase-bathroom',
    theme: 'fixtures',
    name: 'Baño principal, Cedritos',
    category: 'Baño completo',
  },
  {
    seed: 'showcase-living',
    theme: 'furniture',
    name: 'Sala y comedor, Usaquén',
    category: 'Vivienda completa',
    
  },
];

export function WelcomeScreen({ navigation }: RootStackScreenProps<'Welcome'>) {
  const insets = useSafeAreaInsets();
  const { isDesktop } = useResponsive();

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ---- Hero ---- */}
        <View style={styles.hero}>
          <Image
            source={{ uri: dummyImage('hero-interior', 1200, 1600, 'hero') }}
            style={styles.heroImage}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
          <View style={styles.heroTint} />
          <LinearGradient
            colors={[
              'rgba(38,34,30,0)',
              'rgba(38,34,30,0.35)',
              'rgba(38,34,30,0.86)',
            ]}
            locations={[0, 0.45, 1]}
            style={styles.heroScrim}
          />

          <View
            style={[
              styles.heroContent,
              { paddingTop: insets.top + spacing.lg },
            ]}
          >
            <Row gap="xs" style={styles.brand}>
              <Text style={styles.wordmark}>LATER</Text>
              <View style={styles.brandDot} />
            </Row>

            <View style={styles.heroCopy}>
              <View style={styles.taglineRow}>
                <View style={styles.taglineRule} />
                <Text style={styles.tagline}>{strings.welcome.tagline}</Text>
              </View>
              <Text style={styles.headline}>{strings.welcome.headline}</Text>
              <Text style={styles.subhead}>{strings.welcome.subhead}</Text>
            </View>
          </View>
        </View>

        {/* ---- Showcase de resultados: sólo escritorio, sin sesión ---- */}
        {isDesktop && (
          <View style={styles.showcase}>
            <View style={styles.showcaseInner}>
              <Text variant="label" color="accent">
                {strings.welcome.showcaseTitle}
              </Text>
              <Text variant="subtitle" style={styles.showcaseSubtitle}>
                {strings.welcome.showcaseSubtitle}
              </Text>
              <View style={styles.showcaseGrid}>
                {SHOWCASE_RESULTS.map((item) => (
                  <View key={item.seed} style={styles.showcaseCard}>
                    <Image
                      source={{
                        uri: dummyImage(item.seed, 640, 480, item.theme),
                      }}
                      style={styles.showcaseImage}
                      resizeMode="cover"
                      accessibilityIgnoresInvertColors
                    />
                    <LinearGradient
                      colors={['rgba(38,34,30,0)', 'rgba(38,34,30,0.82)']}
                      locations={[0.3, 1]}
                      style={styles.showcaseScrim}
                    />
                    <View style={styles.showcaseCaption}>
                      <Text variant="caption" style={styles.showcaseCategory}>
                        {item.category}
                      </Text>
                      <Text variant="bodyStrong" style={styles.showcaseName}>
                        {item.name}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        <View style={styles.below}>
          {/* ---- CTA ---- */}
          <View style={styles.ctaBlock}>
            <Button
              title={strings.welcome.primaryCta}
              size="lg"
              fullWidth
              onPress={() => navigation.navigate('Login')}
            />
            <Text variant="caption" color="textMuted" center>
              {strings.auth.demoHint}
            </Text>
          </View>

          {/* ---- Qué encontrarás dentro ---- */}
          <View style={styles.features}>
            <Text variant="label" color="accent" style={styles.featuresLabel}>
              {strings.welcome.featuresTitle}
            </Text>
            <View style={styles.featureList}>
              {FEATURES.map((f, i) => (
                <View
                  key={f.title}
                  style={[styles.featureRow, i > 0 && styles.featureDivider]}
                >
                  <View style={styles.featureIcon}>
                    <Ionicons name={f.icon} size={19} color={colors.accent} />
                  </View>
                  <View style={styles.featureText}>
                    <Text variant="bodyStrong">{f.title}</Text>
                    <Text variant="caption" color="textSecondary">
                      {f.body}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <Text
            variant="caption"
            color="textMuted"
            center
            style={[
              styles.footer,
              { marginBottom: insets.bottom + spacing.lg },
            ]}
          >
            {strings.welcome.footer}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1 },

  hero: {
    height: HERO_HEIGHT,
    backgroundColor: colors.textPrimary,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heroTint: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(168,137,94,0.14)',
  },
  heroScrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  heroContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: pageGutter,
    paddingBottom: spacing.xl,
  },
  brand: { alignSelf: 'flex-start' },
  wordmark: {
    fontFamily: fonts.serifBold,
    fontSize: 22,
    letterSpacing: -0.4,
    color: colors.onPrimary,
  },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.borderAccent,
    marginBottom: 5,
  },
  heroCopy: { gap: spacing.sm },
  taglineRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  taglineRule: { width: 28, height: 2, backgroundColor: colors.borderAccent },
  tagline: {
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(249,248,246,0.82)',
  },
  headline: {
    fontFamily: fonts.serifBold,
    fontSize: 38,
    lineHeight: 42,
    letterSpacing: -1.1,
    color: colors.onPrimary,
  },
  subhead: {
    fontFamily: fonts.sansRegular,
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(249,248,246,0.88)',
    maxWidth: 340,
  },

  showcase: {
    paddingHorizontal: pageGutter,
    paddingVertical: spacing.xxxl,
    backgroundColor: colors.backgroundRaised,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
  },
  showcaseInner: { width: '100%', maxWidth: gridMaxWidth, gap: spacing.xs },
  showcaseSubtitle: { color: colors.textSecondary, marginBottom: spacing.lg },
  showcaseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  showcaseCard: {
    flexBasis: 250,
    flexGrow: 1,
    height: 230,
    borderRadius: radii.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceMuted,
  },
  showcaseImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  showcaseScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  showcaseCaption: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.lg,
    gap: 2,
  },
  showcaseCategory: {
    color: 'rgba(249,248,246,0.82)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  showcaseName: { color: colors.onPrimary },

  below: { width: '100%', maxWidth: contentMaxWidth, alignSelf: 'center' },

  ctaBlock: {
    paddingHorizontal: pageGutter,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },

  features: {
    paddingHorizontal: pageGutter,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  featuresLabel: { marginLeft: spacing.xs },
  featureList: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 2,
    borderTopColor: colors.borderAccent,
    borderRadius: radii.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.lg,
  },
  featureDivider: { borderTopWidth: 1, borderTopColor: colors.border },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accentSoft,
  },
  featureText: { flex: 1, gap: 3 },

  footer: { paddingHorizontal: pageGutter, marginTop: spacing.xs },
});
