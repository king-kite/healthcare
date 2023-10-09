import { getSettings } from '../config/settings';

function approximate(value, limit = 2) {
	let data = +value; // convert to number
	if (data % 2 === 0) return data;
	return +data.toFixed(limit);
}

// A function to convert cm to feet..inches
function cmToFeetAndInches(cm) {
	if (isNaN(+cm) || +cm < 0) return cm;

	const inchesPerFoot = 12;
	const cmPerInch = 2.54;

	// Get the total inches
	const totalInches = +cm / cmPerInch;

	// Get the feet from the inches
	const feet = Math.floor(totalInches / inchesPerFoot);

	// Get the remaining inches
	const inches = Math.round(totalInches % inchesPerFoot);

	return {
		feet,
		inches,
		result: `${feet}ft ${inches}in`,
	};
}

// The height parameter to be passed in cm
export function getHeight(height, unit) {
	const settings = getSettings();

	let ftin = cmToFeetAndInches(+height);
	let original = +height;
	let value;
	let component;

	// If celcius was not provided || If celcius is not a number;
	if (!height || isNaN(+height)) {
		value = height;
		component = (
			<>
				{height} <small>{unit || 'cm'}</small>
			</>
		);
	}

	switch (unit || settings.unit_height) {
		case 'm':
			original = +height / 100;
			value = approximate(original);
			component = (
				<>
					{value}
					<small>m</small>
				</>
			);
			break;
		case 'ft':
			// 1cm === 0.03281ft. 1ft === 30.48cm
			original = +height / 30.48;
			value = approximate(original);
			component = (
				<>
					{value}
					<small>ft</small>
				</>
			);
			break;
		case 'in':
			original = +height / 2.54;
			value = approximate(original);
			component = (
				<>
					{value}
					<small>in</small>
				</>
			);
			break;
		case 'ftin':
			// original should be in feet
			original = +height / 30.48;
			value = ftin.result;
			component = (
				<>
					{ftin.feet}
					<small>ft</small> {ftin.inches}
					<small>in</small>
				</>
			);
			break;
		default:
			original = +height;
			value = approximate(original);
			component = (
				<>
					{value}
					<small>cm</small>
				</>
			);
	}

	return {
		component,
		original,
		value,
	};
}

// The SI unit of temperature is Kelvin
// The celcius parameter to be passed in degree celcius
export function getTemperature(celcius, unit) {
	const settings = getSettings();

	let original = +celcius;
	let component;
	let value;

	// If celcius was not provided || If celcius is not a number;
	if (!celcius || isNaN(+celcius)) {
		(value = celcius),
			(component = (
				<>
					{celcius}{' '}
					<small>
						<sup>o</sup>C
					</small>
				</>
			));
	}

	switch (unit || settings.unit_temperature) {
		// Fahrenheit
		case 'F':
			// formula = (celcius / (5 / 9)) + 32;
			original = +celcius / (5 / 9) + 32;
			value = approximate(original);
			component = (
				<>
					{value}
					<small>
						<sup>o</sup>F
					</small>
				</>
			);
			break;
		// Kelvin
		case 'K':
			// K = C + 273.15
			original = +celcius + 273.15;
			value = approximate(original);
			component = (
				<>
					{value}
					<small>
						<sup>o</sup>K
					</small>
				</>
			);
			break;
		default:
			original = +celcius;
			value = approximate(+celcius);
			component = (
				<>
					{value}
					<small>
						<sup>o</sup>C
					</small>
				</>
			);
	}

	return {
		original,
		component,
		value,
	};
}

export function getWeight(weight, unit) {
	const settings = getSettings();

	let component;
	let original = +weight;
	let value;

	// If weight was not provided || If weight is not a number;
	if (!weight || isNaN(+weight)) {
		value = weight;
		component = (
			<>
				{weight}
				<small>kg</small>
			</>
		);
	}

	switch (unit || settings.unit_weight) {
		// grams
		case 'g':
			original = +weight / 1000;
			value = approximate(original);
			component = (
				<>
					{value}
					<small>g</small>
				</>
			);
			break;
		// pounds = 1 kg === 2.20462 lbs
		case 'lbs':
			original = +weight * 2.20462;
			value = approximate(original);
			component = (
				<>
					{value}
					<small>lbs</small>
				</>
			);
			break;
		default:
			original = +weight;
			value = approximate(+weight);
			component = (
				<>
					{value}
					<small>kg</small>
				</>
			);
	}

	return {
		component,
		original,
		value,
	};
}

// h = height; w = weight
export function getBMI(h, w) {
	// const settings = getSettings();

	const height = getHeight(h, 'm'); // BMI height in m
	const weight = getWeight(w, 'kg'); // BMI weight in kg

	let original;
	let value;
	let component;

	// let unit = (
	// 	<>
	// 		{/* {settings.unit_weight}/{settings.unit_height} */}
	// 		kg/m
	// 		<sup>
	// 			<small>2</small>
	// 		</sup>
	// 	</>
	// );

	if (
		isNaN(height.original) ||
		isNaN(weight.original) ||
		height.original <= 0 ||
		weight.original <= 0
	)
		return {
			original: 0,
			value: 0,
			component: <>0{/* 0<small>{unit}</small> */}</>,
		};

	original = weight.original / height.original ** 2;
	value = approximate(original);
	component = (
		<>
			{value}
			{/* <small>{unit}</small> */}
		</>
	);

	return {
		original,
		value,
		component,
	};
}

export function getPulse(pulse) {
	let value;
	let original;

	if (!pulse || isNaN(+pulse)) {
		original = 0;
		value = 0;
	}

	original = +pulse;
	value = approximate(original);
	let component = (
		<>
			{value}
			<small>bpm</small>
		</>
	);

	return {
		original,
		value,
		component,
	};
}

export function getAge(d) {
	const dob = new Date(d);
	const currentDate = new Date();
	const diffInMilliseconds = currentDate.getTime() - dob.getTime();
	const diff = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

	return {
		original: diff,
		value: Math.floor(diff),
		component: (
			<>
				{Math.floor(diff)} <small>years</small>
			</>
		),
	};
}

// BMR = Basal Metabolic Rate
// h = height (in cm); w = weight (in kg); d = date of birth (age in years); g = gender;
export function getBMR(h, w, d, g, unit) {
	const settings = getSettings();

	const height = getHeight(h, 'cm').original;
	const weight = getWeight(w, 'kg').original;
	const age = getAge(d).original;
	const gender = g.toLowerCase();

	const constants = {
		male: {
			k: 88.362,
			weight: 13.397,
			height: 4.799,
			age: 5.677,
		},
		female: {
			k: 447.593,
			weight: 9.247,
			height: 3.098,
			age: 4.33,
		},
	};

	let constant = constants[gender];
	if (!constant) constant = constants['male']; // default to male

	let original =
		constant.k + constant.weight * weight + constant.height * height - constant.age * age;
	let value = approximate(original);
	let component;

	switch (unit || settings.unit_bmr) {
		case 'J':
			// 1kcal = 4184 joules
			original = original * 4184;
			value = approximate(original);
			component = (
				<>
					{value}
					<small>kcal</small>
				</>
			);
			break;
		default:
			component = (
				<>
					{value}
					<small>kcal</small>
				</>
			);
	}

	return {
		original,
		value,
		component,
	};
}

// TDEE = Total Daily Energy Expenditure
// h = height (in cm); w = weight (in kg); d = date of birth (age in years); g = gender;
// a = activity level // 1, 2, 3, 4, 5

export function getTDEE(h, w, d, g, a, unit) {
	const settings = getSettings();

	const bmr = getBMR(h, w, d, g, 'kcal');

	const levels = [
		1.2, // Sedentary (little or no exercise)
		1.375, // Lightly active (exercise/sports 1-3 days a week)
		1.55, // Modertely active (moderate exercise/sports 3 - 5 days a week)
		1.725, // Very active (hard exercise/sports 6-7 days a week)
		1.9, // Extra active (very hard exercise/sports and a physically active job)
	];

	let level = levels[+a - 1];
	if (!level) level = level['level1']; // default to male

	let original = bmr.original * level;
	let value = approximate(original);
	let component;

	switch (unit || settings.unit_bmr) {
		case 'J':
			// 1kcal = 4184 joules
			original = original * 4184;
			value = approximate(original);
			component = (
				<>
					{value}
					<small>kcal</small>
				</>
			);
			break;
		default:
			component = (
				<>
					{value}
					<small>kcal</small>
				</>
			);
	}

	return {
		original,
		value,
		component,
	};
}
