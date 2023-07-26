import { ColumnHeightOutlined } from "@ant-design/icons";
import { Button, Modal, Select } from "antd";
import React from "react";

import { HeartRateIcon, TemperatureIcon, WeightIcon } from "./icons";

const parameters = [
	{
		colors: getColors("blue"),
		description: "Patient's Height Information",
		name: "height",
		icon: ColumnHeightOutlined,
		value: "156cm",
	},
	{
		colors: getColors("green"),
		description: "Patient's Weight Information",
		name: "weight",
		icon: WeightIcon,
		value: "70kg",
	},
	{
		colors: getColors("red"),
		description: "Patient's Pulse Rate Information",
		name: "pulse/heart rate",
		icon: HeartRateIcon,
		value: "55BPM",
	},
	{
		colors: getColors("yellow"),
		description: "Patient's Temperature Information",
		name: "temperature",
		icon: TemperatureIcon,
		iconProps: {
			fill: '#f5930a'
		},
		value: "33C",
	},
];

function getColors(color) {
	switch (color) {
		case "blue":
			return {
				border: "border-blue-700",
				text: "text-blue-700",
			};
		case "green":
			return {
				border: "border-green-600",
				text: "text-green-600",
			};
		case "red":
			return {
				border: "border-red-700",
				text: "text-red-700",
			};
		case "yellow":
			return {
				border: "border-yellow-700",
				text: "text-yellow-700",
			};
		default:
			return {
				border: "border-gray-700",
				text: "text-gray-700",
			};
	}
}

function SelectedPatient({ first_name, last_name, email, image }) {
	return (
		<div className="bg-gray-200 border border-dashed border-gray-600 flex items-center p-4 rounded-md">
			{image ? (
				<section className="flex-shrink-0 h-10 w-10">
					<div className="h-10 relative rounded-full w-10">
						<img alt={first_name[0]} className="rounded-full" src={image} />
					</div>
				</section>
			) : (
				<span className="bg-primary-500 h-10 inline-flex items-center justify-center rounded-full text-gray-50 w-10">
					<span className="left-[0.05rem] relative top-[0.075rem]">
						{first_name[0]}
					</span>
				</span>
			)}
			<section className="ml-4 text-left">
				<div className="text-sm font-medium text-gray-700 md:text-base">
					{`${first_name} ${last_name}`}
				</div>
				<div className="normal-case font-normal text-sm text-gray-500">
					{email}
				</div>
			</section>
		</div>
	);
}

function FormComponent(props, ref) {
	// track the modal state
	const [open, setOpen] = React.useState(false);

	// store the value of the select input
	const [value, setValue] = React.useState(null);

	// store the data of the selected patient
	const [patient, setPatient] = React.useState(null);

	// track the loading state
	const [loading, setLoading] = React.useState(false);

	const resetModal = React.useCallback(() => {
		setOpen(false);
		setValue(null);
		setLoading(false);
		setPatient(null);
	}, []);

	const footerButtons = React.useMemo(() => {
		const buttons = [
			<Button key="cencel" type="ghost" onClick={resetModal}>
				Cancel
			</Button>,
		];
		if (patient)
			buttons.push(
				<Button
					key="begin"
					type="default"
					loading={false}
					size="large"
					onClick={() => setPatient(null)}
				>
					Retake Test
				</Button>,
				<Button key="begin" size="large" type="primary" loading={false} onClick={resetModal}>
					Continue
				</Button>
			);
		else
			buttons.push(
				<Button
					key="begin"
					type="primary"
					size="large"
					loading={false}
					onClick={() => setPatient(true)}
				>
					Begin
				</Button>
			);
		return buttons
	}, [patient, resetModal]);

	React.useImperativeHandle(
		ref,
		() => {
			return {
				closeModal: () => setOpen(false),
				openModal: () => setOpen(true),
			};
		},
		[]
	);

	return (
		<Modal
			onCancel={resetModal}
			title="Conduct Test/Diagnosis."
			open={open}
			footer={footerButtons}
		>
			<p className="my-3 py-1 text-gray-700 text-sm md:text-base">
				{patient
					? "Patient should proceed to health monitoring device to measure health parameters"
					: "Select a patient below and click on the begin button to start to test."}
			</p>
			<div className="mt-4 mb-12">
				<div className="my-2">
					<div className="w-full sm:col-span-3">
						{patient ? (
							<>
								<h4 className="font-semibold mb-2 text-gray-700 text-sm md:text-base">
									Patient Selected
								</h4>
								<SelectedPatient
									first_name="John"
									last_name="Doe"
									email="johndoe@gmail.com"
								/>
								<div className="bg-gray-200 mb-2 mt-6 p-3 rounded-md w-full sm:p-4 md:p-5 lg:p-6">
									{parameters.map(
										(
											{ colors, description, icon: Icon, iconProps, name, value },
											index
										) => (
											<div
												key={index}
												className="bg-white grid grid-cols-2 items-center mb-4 p-4 rounded-md w-full md:p-5 lg:p-6"
											>
												<div className="flex xs:justify-center">
													<span
														className={`${colors.border} border-4 border-solid flex items-center justify-center rounded-full h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32`}
													>
														<span
															className={`${colors.text} relative top-[2px] text-3xl sm:text-4xl md:text-5xl`}
														>
															<Icon {...iconProps} />
														</span>
													</span>
												</div>
												<div className="text-center w-full">
													<p className="capitalize font-bold mb-2 text-center text-gray-800 text-sm tracking-wide md:text-base">
														{name}
													</p>
													<h1
														className={`${colors.text} my-2 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl`}
													>
														{value}
													</h1>
													<p className="mt-2 text-center text-gray-600 text-xs md:text-sm">
														{description}
													</p>
												</div>
											</div>
										)
									)}
								</div>
							</>
						) : (
							<>
								<label
									className="block font-medium my-1 text-sm text-gray-700 md:text-base"
									htmlFor="Patient"
								>
									Patient
								</label>
								<Select
									showSearch
									style={{ width: "100%" }}
									id="Patient"
									name="Patient"
									loading={loading}
									disabled={loading}
									size="large"
									placeholder={<>Select Patient</>}
									optionFilterProp="children"
									filterOption={(input, option) =>
										(option?.label ?? "").includes(input)
									}
									filterSort={(optionA, optionB) =>
										(optionA?.label ?? "")
											.toLowerCase()
											.localeCompare((optionB?.label ?? "").toLowerCase())
									}
									onChange={(value) => setValue(value)}
									value={value}
									options={[
										{
											value: "Male",
											label: "Male",
										},
										{
											value: "Female",
											label: "Female",
										},
									]}
								/>
							</>
						)}
					</div>
				</div>
			</div>
		</Modal>
	);
}

const TestsForm = React.forwardRef(FormComponent);

export default TestsForm;
