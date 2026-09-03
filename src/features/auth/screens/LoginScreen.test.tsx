import { fireEvent, waitFor } from '@testing-library/react-native';

import { renderWithProviders } from '@/test/renderWithProviders';
import { strings } from '@/i18n';

import { LoginScreen } from './LoginScreen';

describe('LoginScreen', () => {
  it('valida el correo antes de permitir el envío', async () => {
    const view = await renderWithProviders(<LoginScreen />);

    const emailInput = view.getByLabelText(strings.auth.email);
    await fireEvent.changeText(emailInput, 'no-es-un-correo');
    await fireEvent(emailInput, 'blur');

    expect(view.getByText(strings.auth.invalidEmail)).toBeOnTheScreen();
    expect(view.store.getState().session.status).not.toBe('authenticated');
  });

  it('autentica con credenciales demo y actualiza la sesión', async () => {
    const view = await renderWithProviders(<LoginScreen />);

    await fireEvent.changeText(
      view.getByLabelText(strings.auth.email),
      'alba@river.example',
    );
    await fireEvent.changeText(
      view.getByLabelText(strings.auth.password),
      'river1234',
    );
    await fireEvent.press(view.getByText(strings.auth.submit));

    await waitFor(() => {
      expect(view.store.getState().session.status).toBe('authenticated');
    });
    expect(view.store.getState().session.user?.email).toBe(
      'alba@river.example',
    );
  });
});
