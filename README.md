# LATER — App móvil (frontend)

App móvil de LATER construida con **Expo + React Native + TypeScript**. Gestiona
proyectos de reforma/interiorismo: catálogo de productos, carrito, agenda de
citas y notificaciones, con vista previa nativa en **3D / Realidad Aumentada**
(módulos del equipo iOS).

> Proyecto de portafolio. El backend está simulado en memoria; la arquitectura
> está preparada para conectar la API real y AWS Amplify sin reescribir features.

---

## Stack

| Área | Tecnología |
| --- | --- |
| Runtime | Expo SDK 57, React Native 0.86, React 19 |
| Lenguaje | TypeScript (strict) |
| Navegación | React Navigation 7 (native stack + bottom tabs) |
| Estado de cliente | Redux Toolkit (`session`, `cart`) |
| Estado de servidor | TanStack Query / React Query |
| Sesión persistida | `expo-secure-store` (cifrado) — ver [Seguridad](#seguridad) |
| Auth | Servicio con interfaz estilo Amplify (`AuthService`) |
| Iconos | `@expo/vector-icons` (Ionicons) |
| Tests | Jest + `jest-expo` + Testing Library |
| Calidad | ESLint (`eslint-config-expo`) + Prettier |

---

## Puesta en marcha

```bash
npm install
npm start            # Metro / Expo Dev Server
npm run android      # o: npm run ios / npm run web
```

Scripts:

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm test             # jest
npm run format       # prettier --write
```

### Credenciales de demo

Cualquier correo con formato válido + contraseña **`later1234`**.
(p. ej. `alba@later.example` / `later1234`).

---

## Arquitectura

Organización **por capas y por features**. Regla general: las features dependen
de `services/` y `design-system/`, nunca al revés.

```
src/
├── app/                      Composición de la app (no lógica de negocio)
│   ├── App.tsx               Punto de entrada: providers + navegación
│   ├── bootstrap/            Enlaza la capa HTTP con el store (token, 401)
│   ├── providers/            Redux + React Query + SafeArea + GestureHandler
│   └── navigation/           RootNavigator, MainTabs, tipos y opciones
│
├── config/                   Configuración de entorno (env.ts)
│
├── design-system/            Sistema de diseño (agnóstico de dominio)
│   ├── tokens.ts             Color, espaciado, tipografía, radios
│   └── components/           Text, Button, Input, Card, Screen, Badge, Row…
│
├── i18n/                     Catálogo de textos (español)
│
├── services/                 Infraestructura transversal
│   ├── http/                 Cliente HTTP único + normalización de errores
│   ├── query/                QueryClient + claves de React Query
│   ├── auth/                 AuthService (contrato + implementación REST)
│   ├── storage/              secureSession.ts  ← sesión cifrada
│   └── native/               Contratos de los módulos nativos 3D / AR (+ stub)
│
├── features/                 Un módulo por dominio
│   ├── auth/                 { model (slice), hooks, screens }
│   ├── projects/             { api, hooks, components, screens, types, Stack }
│   ├── catalog/              { api, hooks, components, screens, types, Stack }
│   ├── cart/                 { model (slice), hooks, screens }
│   ├── appointments/         { api, hooks, screens, types }
│   └── notifications/        { api, hooks, screens, types }
│
├── mock/                     Backend simulado (fixtures + DB en memoria)
├── utils/                    Formateadores (moneda, fechas)
└── test/                     setup de Jest
```

### Estado: ¿Redux o React Query?

- **Redux Toolkit** → estado *de cliente* compartido entre pantallas:
  `session` (usuario + token en memoria) y `cart` (carrito efímero).
- **React Query** → estado *de servidor*: proyectos, catálogo, citas y
  notificaciones. Cachea, revalida y gestiona `loading` / `error`.

No se duplica el estado del servidor en Redux.

### Capa de red

Todo pasa por `services/http/client.ts`:

- Inyecta `Authorization: Bearer <token>` desde el store.
- Normaliza cualquier fallo a `ApiError` (`status`, `code`, `message`).
- Ante un `401`, marca la sesión como expirada y la UI vuelve al login.
- Si `env.useMockApi` está activo, delega en `mockServer.ts` en vez de `fetch`.

Para apuntar a un backend real: `app.json` → `expo.extra.useMockApi = false` y
`expo.extra.apiBaseUrl = "https://…"` (o `EXPO_PUBLIC_API_BASE_URL`).

---

## Seguridad

**Vulnerabilidad corregida: datos de sesión sin cifrar.**

La sesión del usuario (access token, refresh token y perfil) se persistía en
`AsyncStorage`, que guarda **texto plano** en el sandbox de la app — expuesto en
dispositivos con root/jailbreak o en backups sin cifrar.

Corrección (`src/services/storage/secureSession.ts`):

- Único punto autorizado para leer/escribir la sesión.
- Usa **`expo-secure-store`**: Keychain en iOS, Keystore + almacenamiento
  cifrado en Android.
- Accesibilidad restringida: `WHEN_UNLOCKED_THIS_DEVICE_ONLY` (no migra a otro
  dispositivo vía backups).
- `RestAuthService` es el único consumidor; ningún otro módulo importa
  `expo-secure-store` ni `AsyncStorage` para la sesión.

Cubierto por `secureSession.test.ts` y `authService.test.ts`.

---

## Módulos nativos (3D / AR)

El equipo iOS desarrolla los módulos nativos de **escaneo 3D** (LiDAR / ARKit
Object Capture) y **realidad aumentada** (RealityKit). El frontend define los
contratos en `src/services/native/` y provee una **implementación simulada**
para Expo Go y tests.

Integración real: sustituir `simulatedScanner3d` / `simulatedAr` por el binding
del módulo nativo. Las pantallas del catálogo no cambian.

---

## Migración a AWS Amplify

`src/services/auth/authService.ts` define la interfaz `AuthService`
(`signIn` / `signOut` / `restore`). Hoy la implementa `RestAuthService`.

Para Amplify: crear `AmplifyAuthService` que envuelva `signIn` /
`signOut` / `fetchAuthSession` de `aws-amplify/auth`, seguir persistiendo la
sesión mediante `secureSessionStorage`, y exportarla como `authService`. El
resto de la app no se entera.

---

## Estado de la implementación

| Pantalla | Estado |
| --- | --- |
| Login | ✅ Funcional (validación, errores, sesión segura) |
| Proyectos (lista + detalle) | ✅ Funcional (React Query, pull-to-refresh) |
| Catálogo (lista + detalle + búsqueda) | ✅ Funcional |
| Carrito | ✅ Funcional (Redux, cantidades, checkout demo) |
| Citas | ✅ Funcional (listar, cancelar) |
| Notificaciones | ✅ Funcional (marcar leída / todas) |
| Escaneo 3D / AR | 🟡 Contrato + simulación (pendiente módulo nativo iOS) |
| Backend | 🟡 Simulado en memoria |
| AWS Amplify | 🟡 Interfaz lista, sin implementar |
