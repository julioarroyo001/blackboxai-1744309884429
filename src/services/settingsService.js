// Default settings
const defaultSettings = {
  businessName: '',
  email: '',
  darkMode: false,
  language: 'es',
  notifications: {
    email: true,
    push: true
  },
  theme: {
    primaryColor: '#3B82F6',
    accentColor: '#10B981'
  }
};

// Get settings from localStorage or return defaults
export const getSettings = () => {
  try {
    const savedSettings = localStorage.getItem('settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  } catch (error) {
    console.error('Error loading settings:', error);
    return defaultSettings;
  }
};

// Save settings to localStorage
export const saveSettings = (settings) => {
  try {
    localStorage.setItem('settings', JSON.stringify({
      ...defaultSettings,
      ...settings
    }));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
};

// Update specific settings
export const updateSettings = (newSettings) => {
  const currentSettings = getSettings();
  return saveSettings({
    ...currentSettings,
    ...newSettings
  });
};

// Initialize settings with business info during registration
export const initializeSettings = (businessName, email) => {
  return saveSettings({
    ...defaultSettings,
    businessName,
    email
  });
};
