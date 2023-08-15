import { Switch } from 'antd';

import Container from '../../components/container';
import { Select } from '../../components/controls';
import { getSettings } from '../../config/settings';

// // delete patient's tests when the patient is deleted
// delete_tests_on_patient_delete: 1,

// unit_bmr: 'kcal', // 'kcal | J'

function Settings() {
	const settings = getSettings();

	return (
		<Container title="Settings">
			<div className="grid gap-6 grid-cols-1 my-3 md:grid-cols-2 md:grid-rows-2">
				{/* Measurement Units */}
				<div className="bg-white rounded-lg shadow-lg md:row-span-2">
					<h3 className="bg-gray-300 px-3 py-1 rounded-t-lg text-gray-700 text-base md:text-lg">
						Measurement Units
					</h3>
					<p className="bg-gray-200 px-3 py-1 text-gray-600 text-sm md:text-base">
						Select the unit of measurement of each medical parameter
					</p>
					<div className="grid grid-cols-1 gap-4 px-3 py-5">
						<div>
							<Select
								label="Height"
								value={settings.unit_height}
								options={[
									{
										label: 'Centimeters',
										value: 'cm',
									},
									{
										label: 'Meters',
										value: 'm',
									},
									{
										label: 'Inches',
										value: 'in',
									},
									{
										label: 'Feet',
										value: 'ft',
									},
									{
										label: 'Feet & Inches',
										value: 'ftin',
									},
								]}
							/>
						</div>
						<div>
							<Select
								label="Weight"
								value={settings.unit_weight}
								options={[
									{
										label: 'Grams',
										value: 'g',
									},
									{
										label: 'Kilograms',
										value: 'kg',
									},
									{
										label: 'Pounds',
										value: 'lbs',
									},
								]}
							/>
						</div>
						<div>
							<Select
								label="Temperature"
								value={settings.unit_temperature}
								options={[
									{
										label: 'Celcius',
										value: 'C',
									},
									{
										label: 'Fahrenheit',
										value: 'F',
									},
									{
										label: 'Kelvin',
										value: 'K',
									},
								]}
							/>
						</div>
						{settings.show_bmr && (
							<div>
								<Select
									label="Basal Metabolic Rate"
									value={settings.unit_bmr}
									options={[
										{
											label: 'Calories',
											value: 'kcal',
										},
										{
											label: 'Joules',
											value: 'J',
										},
									]}
								/>
							</div>
						)}
					</div>
				</div>

				{/* Other Medical Parameters */}
				<div className="bg-white rounded-lg shadow-lg md:row-span-1">
					<h3 className="bg-gray-300 px-3 py-1 rounded-t-lg text-gray-700 text-base md:text-lg">
						Other Medical Parameters
					</h3>
					<p className="bg-gray-200 px-3 py-1 text-gray-600 text-sm md:text-base">
						Show other patient parameters generated fromthe primary ones.
					</p>
					<div className="p-3">
						<div className="flex items-center my-3">
							<Switch />
							<p className="font-medium ml-1 px-3 py-1 text-gray-600 text-sm md:text-base">
								Body Mass Index(BMI)
							</p>
						</div>
						<div className="flex items-center my-3">
							<Switch />
							<p className="font-medium ml-1 px-3 py-1 text-gray-600 text-sm md:text-base">
								Basal Metabolic Rate(BMR)
							</p>
						</div>
					</div>
				</div>

				{/* Records */}
				<div className="bg-white rounded-lg shadow-lg md:row-span-1">
					<h3 className="bg-gray-300 px-3 py-1 rounded-t-lg text-gray-700 text-base md:text-lg">
						Records
					</h3>
					<p className="bg-gray-200 px-3 py-1 text-gray-600 text-sm md:text-base">
						Change settings that effect record keeping logic.
					</p>
					<div className="p-3">
						<div className="flex items-center my-3">
							<Switch />
							<p className="font-medium ml-1 px-3 py-1 text-gray-600 text-sm md:text-base">
								Remove patient&rsquo;s test upon deletion
							</p>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}

export default Settings;
