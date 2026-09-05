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
    confirm: 'Confirmar',
    save: 'Guardar',
    loading: 'Cargando…',
    genericError: 'Ocurrió un error. Inténtalo de nuevo.',
    loadErrorTitle: 'No se pudo cargar la información',
    unknownError: 'Error desconocido',
  },
  tabs: {
    projects: 'Proyectos',
    catalog: 'Catálogo',
    cart: 'Carrito',
    appointments: 'Citas',
    notifications: 'Notificaciones',
  },
  welcome: {
    tagline: 'Estudio de interiorismo y reforma',
    headline: 'Tu reforma, de la idea a la entrega',
    subhead:
      'Catálogo, medición y seguimiento de obra en un mismo lugar.',
    primaryCta: 'Iniciar sesión',
    secondaryCta: 'Ver cómo funciona',
    featuresTitle: 'Qué encontrarás dentro',
    feature1Title: 'Catálogo con vista 3D y RA',
    feature1Body:
      'Prueba acabados y mobiliario en tu propio espacio antes de decidir.',
    feature2Title: 'Visitas y medición',
    feature2Body:
      'Agenda la toma de medidas y las revisiones de obra sin llamadas.',
    feature3Title: 'Seguimiento del proyecto',
    feature3Body:
      'Estado, presupuesto y avisos de tu reforma, siempre al día.',
    footer: 'Demo de portafolio · backend simulado en memoria',
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
    signOutPrompt: '¿Cerrar tu sesión?',
  },
  projects: {
    title: 'Mis proyectos',
    empty: 'Todavía no tienes proyectos',
    emptyHint: 'Cuando crees un proyecto aparecerá aquí.',
    members: 'integrantes',
    openCatalog: 'Ver catálogo',
    status: 'Estado',
    lastUpdate: 'Última actualización',
    detailTitle: 'Proyecto',
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
    nativePreview: 'Vista previa nativa · equipo iOS',
    noResults: 'Sin resultados',
    noResultsHint: 'Prueba con otro término de búsqueda.',
    detailTitle: 'Producto',
  },
  cart: {
    title: 'Carrito',
    empty: 'Tu carrito está vacío',
    emptyHint: 'Añade productos desde el catálogo.',
    subtotal: 'Subtotal',
    checkout: 'Solicitar presupuesto',
    checkoutConfirm: 'Confirmar solicitud',
    remove: 'Quitar',
    quantity: 'Cantidad',
    decrease: 'Restar',
    increase: 'Sumar',
    cleared: 'Carrito vaciado',
  },
  appointments: {
    title: 'Citas',
    empty: 'No tienes citas programadas',
    emptyHint: 'Agenda una visita técnica o de medición.',
    book: 'Agendar cita',
    cancel: 'Cancelar cita',
    cancelPrompt: '¿Seguro que quieres cancelar esta cita?',
    cancelConfirm: 'Sí, cancelar',
    keep: 'No',
    statusConfirmed: 'Confirmada',
    statusPending: 'Pendiente',
    statusCancelled: 'Cancelada',
  },
  notifications: {
    title: 'Notificaciones',
    empty: 'Sin notificaciones',
    emptyHint: 'Aquí verás avisos de proyectos, citas y pedidos.',
    markAllRead: 'Marcar todas como leídas',
    unreadSuffix: 'sin leer',
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
