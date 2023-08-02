const SETTINGS_KEY = 'settings';

const defaultSettings = {
	unit_height: 'm', // 'm | ft | cm | ftin, in'
	unit_temperature: 'C', // 'C | 'F' | 'K'
	unit_weight: 'kg', // 'kg | g | lbs',
	unit_bmr: 'kcal', // 'kcal | J'
};

export function getSettings() {
	// Get the settings data from the localStorage;
	let settings = localStorage.getItem(SETTINGS_KEY);

	if (!settings) {
		// If no settings found, use the default as store it
		settings = defaultSettings;
		localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
	} else settings = JSON.parse(settings); // Use the settings found;

	// return the default settings, overwritten by the settings stored in storage
	return {
		...defaultSettings,
		...settings,
	};
}

export function changeSetting(key, value) {
	// Get the settings
	let settings = getSettings();

	// change the settings value
	settings[key] = value;

	// store in the storage
	localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

	// return the new settings
	return settings;
}
