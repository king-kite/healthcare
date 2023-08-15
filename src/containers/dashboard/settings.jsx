import { Switch } from 'antd';
import React from 'react';

import Container from '../../components/container';
import { Select } from '../../components/controls';
import { getSettings, changeSetting } from '../../config/settings';

function Settings() {
	const [settings, setSettings] = React.useState(getSettings);

	const handleSettingsChange = React.useCallback((name, value) => {
		const newSettings = changeSetting(name, value);
		setSettings(newSettings);
	}, []);

	return (
		<Container title="Settings">
			<div className="grid gap-6 grid-cols-1 my-3 md:grid-cols-2 md:grid-rows-2">
				{/* Measurement Units */}
				<div className="bg-white rounded-lg shadow-lg md:row-span-2">
					<h3 className="bg-gray-200 px-3 py-1 font-semibold uppercase rounded-t-lg text-gray-700 text-sm md:text-base">
						Measurement Units
					</h3>
					<p className="bg-gray-100 px-3 py-1 text-gray-600 text-sm">
						Select the unit of measurement of each medical parameter
					</p>
					<div className="grid grid-cols-1 gap-4 px-3 py-5">
						<div>
							<Select
								label="Height"
								value={settings.unit_height}
								onSelect={(value) => {
									handleSettingsChange('unit_height', value);
								}}
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
								onSelect={(value) => {
									handleSettingsChange('unit_weight', value);
								}}
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
								onSelect={(value) => {
									handleSettingsChange('unit_temperature', value);
								}}
								options={[
									{
										label: 'Celcius (C)',
										value: 'C',
									},
									{
										label: 'Fahrenheit (F)',
										value: 'F',
									},
									{
										label: 'Kelvin (K)',
										value: 'K',
									},
								]}
							/>
						</div>
						{settings.show_bmr === 1 && (
							<div>
								<Select
									label="Basal Metabolic Rate"
									value={settings.unit_bmr}
									onSelect={(value) => {
										handleSettingsChange('unit_bmr', value);
									}}
									options={[
										{
											label: 'Calories (kcal)',
											value: 'kcal',
										},
										{
											label: 'Joules (J)',
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
					<h3 className="bg-gray-200 px-3 py-1 font-semibold uppercase rounded-t-lg text-gray-700 text-sm md:text-base">
						Other Medical Parameters
					</h3>
					<p className="bg-gray-100 px-3 py-1 text-gray-600 text-sm md:text-base">
						Show other patient parameters generated from the primary ones.
					</p>
					<div className="p-3">
						<div className="flex items-center my-3">
							<Switch
								checked={settings.show_bmi === 1}
								onChange={(checked) => handleSettingsChange('show_bmi', checked ? 1 : 0)}
							/>
							<p className="font-medium ml-1 px-3 py-1 text-gray-600 text-sm md:text-base">
								Body Mass Index(BMI)
							</p>
						</div>
						<div className="flex items-center my-3">
							<Switch
								checked={settings.show_bmr === 1}
								onChange={(checked) => handleSettingsChange('show_bmr', checked ? 1 : 0)}
							/>
							<p className="font-medium ml-1 px-3 py-1 text-gray-600 text-sm md:text-base">
								Basal Metabolic Rate(BMR)
							</p>
						</div>
					</div>
				</div>

				{/* Records */}
				<div className="bg-white rounded-lg shadow-lg md:row-span-1">
					<h3 className="bg-gray-200 px-3 py-1 font-semibold rounded-t-lg uppercase text-gray-700 text-sm md:text-base">
						Records
					</h3>
					<p className="bg-gray-100 px-3 py-1 text-gray-600 text-sm">
						Change settings that effect record keeping logic.
					</p>
					<div className="p-3">
						<div className="flex items-center my-3">
							<Switch
								checked={settings.delete_tests_on_patient_delete === 1}
								onChange={(checked) =>
									handleSettingsChange('delete_tests_on_patient_delete', checked ? 1 : 0)
								}
							/>
							<p className="font-medium ml-1 px-3 py-1 text-gray-600 text-sm">
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
