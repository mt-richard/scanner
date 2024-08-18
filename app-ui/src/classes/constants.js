const Constants = {
  Version: __PACKAGE_VERSION__,
  
  DateTimeFormat: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23'
    }
  },
  
  Locales: [
    'en',
    'en-US',
    'fr'
  ],

  RtlLocales: [
    'ar'
  ],

  Keys: {
    enter: 13,
    escape: 27
  },
  
  Themes: {
    Dark: 'dark',
    Light: 'light',
    System: 'system'
  },

  Colors: [
    'accent-4',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
  ]
};

export default Constants;
