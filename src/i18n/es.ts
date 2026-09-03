/**
 * Catálogo de textos en español (idioma por defecto).
 *
 * Centralizar los strings aquí mantiene la UI consistente y deja el proyecto
 * listo para añadir `en.ts` y un selector de idioma sin tocar las pantallas.
 */
export const es = {
  common: {
    retry: 'Reintentar',
    cancel: 'Cancelar',
    save: 'Guardar',
    loading: 'Cargando…',
    genericError: 'Ocurrió un error. Inténtalo de nuevo.',
  },
  tabs: {
    projects: 'Proyectos',
    catalog: 'Catálogo',
    cart: 'Carrito',
    appointments: 'Citas',
    notifications: 'Notificaciones',
  },
  auth: {
    title: 'Iniciar sesión',
    subtitle: 'Accede con tu cuenta de River',
    email: 'Correo electrónico',
    password: 'Contraseña',
    submit: 'Entrar',
    signingIn: 'Verificando…',
    invalidEmail: 'Introduce un correo válido',
    requiredPassword: 'La contraseña es obligatoria',
    failed: 'Credenciales incorrectas',
    demoHint: 'Demo: cualquier correo válido + contraseña "river1234"',
    signOut: 'Cerrar sesión',
  },
  projects: {
    title: 'Mis proyectos',
    empty: 'Todavía no tienes proyectos',
    emptyHint: 'Cuando crees un proyecto aparecerá aquí.',
    members: 'integrantes',
    openCatalog: 'Ver catálogo',
  },
  catalog: {
    title: 'Catálogo',
    search: 'Buscar productos',
    addToCart: 'Añadir al carrito',
    added: 'Añadido',
    inStock: 'En stock',
    outOfStock: 'Sin stock',
    scan: 'Escanear en 3D',
    viewAr: 'Ver en RA',
  },
  cart: {
    title: 'Carrito',
    empty: 'Tu carrito está vacío',
    emptyHint: 'Añade productos desde el catálogo.',
    subtotal: 'Subtotal',
    checkout: 'Solicitar presupuesto',
    remove: 'Quitar',
    quantity: 'Cantidad',
    cleared: 'Carrito vaciado',
  },
  appointments: {
    title: 'Citas',
    empty: 'No tienes citas programadas',
    emptyHint: 'Agenda una visita técnica o de medición.',
    book: 'Agendar cita',
    statusConfirmed: 'Confirmada',
    statusPending: 'Pendiente',
    statusCancelled: 'Cancelada',
  },
  notifications: {
    title: 'Notificaciones',
    empty: 'Sin notificaciones',
    emptyHint: 'Aquí verás avisos de proyectos, citas y pedidos.',
    markAllRead: 'Marcar todas como leídas',
  },
  native: {
    scanUnavailableTitle: 'Escaneo 3D no disponible',
    scanUnavailableBody:
      'El módulo nativo de escaneo lo provee el equipo iOS. En Expo Go se muestra una simulación.',
    arUnavailableTitle: 'Realidad aumentada no disponible',
    arUnavailableBody:
      'La vista RA requiere el módulo nativo del equipo iOS. En Expo Go se muestra una simulación.',
  },
} as const;

export type Dictionary = typeof es;
