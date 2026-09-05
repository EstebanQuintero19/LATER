import { fireEvent, waitFor } from '@testing-library/react-native';

import { renderWithProviders } from '@/test/renderWithProviders';
import { strings } from '@/i18n';
import type { RootStackScreenProps } from '@/app/navigation/types';

import { LoginScreen } from './LoginScreen';

// La pantalla sólo usa `navigation.navigate` (enlace a "Regístrate"); el
// resto de la navegación no participa en estos tests.
const navigation = {
  navigate: jest.fn(),
} as unknown as RootStackScreenProps<'Login'>['navigation'];
const route = {} as RootStackScreenProps<'Login'>['route'];

describe('LoginScreen', () => {
  it('valida el correo antes de permitir el envío', async () => {
    const view = await renderWithProviders(
      <LoginScreen navigation={navigation} route={route} />,
    );

    const emailInput = view.getByLabelText(strings.auth.email);
    await fireEvent.changeText(emailInput, 'no-es-un-correo');
    await fireEvent(emailInput, 'blur');

    expect(view.getByText(strings.auth.invalidEmail)).toBeOnTheScreen();
    expect(view.store.getState().session.status).not.toBe('authenticated');
  });

  it('autentica con credenciales demo y actualiza la sesión', async () => {
    const view = await renderWithProviders(
      <LoginScreen navigation={navigation} route={route} />,
    );

    await fireEvent.changeText(
      view.getByLabelText(strings.auth.email),
      'alba@later.example',
    );
    await fireEvent.changeText(
      view.getByLabelText(strings.auth.password),
      'later1234',
    );
    await fireEvent.press(view.getByText(strings.auth.submit));

    await waitFor(() => {
      expect(view.store.getState().session.status).toBe('authenticated');
    });
    expect(view.store.getState().session.user?.email).toBe(
      'alba@later.example',
    );
  });
});
