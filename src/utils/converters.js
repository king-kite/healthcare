import { getSettings } from '../config/settings';

function approximate(value, limit = 2) {
	if (+value % 2 === 0) return +value;
	return +(+value.toFixed(limit));
}

// The height parameter to be passed in cm
export function getHeight(height) {
	const settings = getSettings();

	// If celcius was not provided;
	if (!height) return '';

	// If celcius is not a number;
	if (isNaN(+height)) return height;

	let result;

	switch (settings.unit_height) {
		case 'm':
			result = approximate(+height / 100) + 'm';
			break;
		case 'ft':
			// 1cm === 0.03281ft. 1ft === 30.48cm
			result = approximate(+height / 30.48) + 'ft';
			break;
		case 'in':
			result = approximate(+height / 2.54) + 'in';
			break;
		default:
			result = approximate(+height) + 'cm';
	}

	return {
		value: result,
	};
}

// The SI unit of temperature is Kelvin
// The celcius parameter to be passed in degree celcius
export function getTemperature(celcius) {
	const settings = getSettings();

	// If celcius was not provided;
	if (!celcius) return '';

	// If celcius is not a number;
	if (isNaN(+celcius)) return celcius;

	let result;

	switch (settings.unit_temperature) {
		// Fahrenheit
		case 'F':
			// formula = (celcius / (5 / 9)) + 32;
			result = approximate(+celcius / (5 / 9) + 32) + 'K';
			break;
		// Kelvin
		case 'K':
			// K = C + 273.15
			result = approximate(+celcius + 273.15) + 'K';
			break;
		default:
			result = approximate(+celcius) + 'C';
	}

	return {
		value: result,
	};
}
