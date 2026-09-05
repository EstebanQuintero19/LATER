import { StyleSheet } from 'react-native';

import { Row, spacing } from '@/design-system';

import { ProfileButton } from './ProfileButton';
import { SignOutButton } from './SignOutButton';

/** Acciones comunes en la cabecera de las pantallas principales. */
export function HeaderActions() {
  return (
    <Row gap="lg" style={styles.container}>
      <ProfileButton />
      <SignOutButton />
    </Row>
  );
}

const styles = StyleSheet.create({
  // El header nativo en web no reserva margen propio: sin esto los íconos
  // quedan pegados al borde de la ventana.
  container: { paddingRight: spacing.lg },
});
