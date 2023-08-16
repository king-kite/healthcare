/* eslint-disable no-mixed-spaces-and-tabs */
import { ArrowRightOutlined, ColumnHeightOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import React from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import Container from '../../../components/container';
import {
	BodyMassIndexIcon,
	HeartRateIcon,
	TemperatureIcon,
	WeightIcon,
} from '../../../components/tests/icons';
import DeleteTest from '../../../components/tests/delete-test';
import { getColors } from '../../../components/tests/parameters';
import routes from '../../../config/routes';
import { getSettings } from '../../../config/settings';
import { useGetTestQuery } from '../../../store/features/api/tests';
import { getAge, getBMI, getHeight, getPulse, getTemperature, getWeight } from '../../../utils';

function Detail() {
	const { id } = useParams();

	const { data, isLoading } = useGetTestQuery(id, {
		skip: id === undefined,
	});

	const navigate = useNavigate();

	const parameters = React.useMemo(() => {
		if (!data) return [];
		const settings = getSettings();
		const info = [
			{
				colors: getColors('blue'),
				description: "Patient's Height Data",
				icon: ColumnHeightOutlined,
				title: 'Height',
				value: getHeight(data.height).component,
			},
			{
				colors: getColors('green'),
				description: "Patient's Weight Data",
				icon: WeightIcon,
				title: 'Weight',
				value: getWeight(data.weight).component,
			},
			{
				colors: getColors('yellow'),
				description: "Patient's Temperature Data",
				icon: TemperatureIcon,
				iconProps: {
					fill: '#f5930a',
				},
				title: 'Temperature',
				value: getTemperature(data.temperature).component,
			},
			{
				colors: getColors('red'),
				description: "Patient's Pulse Rate Data",
				icon: HeartRateIcon,
				title: 'Pulse',
				value: getPulse(data.pulse).component,
			},
		];
		if (settings.show_bmi === 1)
			info.push({
				colors: getColors('purple'),
				description: "Patient's Body Mass Index",
				icon: BodyMassIndexIcon,
				title: 'BMI',
				value: getBMI(data.height, data.weight).component,
			});
		return info;
	}, [data]);

	const info = React.useMemo(
		() =>
			data
				? [
						{
							title: "Patient's First Name",
							value: data.patient?.first_name || '-----------',
						},
						{
							title: "Patient's Last Name",
							value: data.patient?.last_name || '-------------',
						},
						{
							title: "Patient's Email Address",
							value: data.patient?.email || '----------------',
						},
						{
							title: "Patient's Age",
							value: data.patient ? getAge(data.patient.dob).component : '--------',
						},
						{
							title: 'Gender',
							value: data.patient ? (data.patient.gender === 'M' ? 'Male' : 'Female') : '-------',
						},
						{
							title: 'Phone number',
							value: data.patient?.phone || '-----------',
						},
						{
							title: 'Created At',
							value: data.created_at,
						},
				  ]
				: [],
		[data]
	);

	if (isLoading)
		return (
			<div className="flex items-center justify-center min-h-[50vh]">
				<Spin spinning size="large" />
			</div>
		);

	// No data found
	if (!data) return <Navigate to="/404" />;

	return (
		<Container
			image={{
				url: data.patient?.image,
				alt: data.patient
					? data.patient.first_name[0] + ' ' + data.patient.last_name[0]
					: undefined,
			}}
			title="Test Information"
		>
			<h1 className="font-bold my-2 text-gray-700 text-lg">{data.patient?.full_name}</h1>
			<div className="sm:flex sm:items-center">
				<div className="my-4 sm:my-0">
					<DeleteTest
						className="cursor-pointer"
						testId={id}
						shape="default"
						onSuccess={() => navigate(routes.TESTS_PAGE)}
						icon={
							<span className="mr-2 text-gray-700 text-sm md:text-base">
								<DeleteOutlined />
							</span>
						}
						size="large"
						type="default"
					>
						<span className="text-gray-700 text-sm md:text-base">Delete</span>
					</DeleteTest>
				</div>
			</div>
			<hr className="border-gray-100 my-4" />

			<div className="mb-4">
				<div>
					<h3 className="text-base font-semibold leading-7 text-gray-900">
						Test/Diagnosis Information
					</h3>
					<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
						View test/diagnosis data on this patient.
					</p>
				</div>
				<div className="gap-5 grid grid-cols-1 my-6 border-t border-gray-100 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
					{parameters.map(({ colors, description, icon: Icon, iconProps, title, value }, index) => (
						<div
							className={`bg-white border ${colors.border} border-dashed p-4 rounded-xl shadow-xl`}
							key={index}
						>
							<div className="flex items-center">
								{/* Icon */}
								<span
									className={`${colors.text} ${colors.border} border-2 border-solid flex items-center justify-center h-12 rounded-2xl text-2xl w-12`}
								>
									<Icon {...iconProps} />
								</span>
								<span className={`${colors.text} font-bold ml-4 text-2xl`}>{value}</span>
								{/* Value */}
							</div>
							<h3 className="font-bold mt-2 mb-1 text-gray-700 text-lg">{title}</h3>
							<p className="text-gray-700 text-sm">{description}</p>
						</div>
					))}
				</div>
			</div>

			{/* Test's Patient Info */}
			{data.patient && (
				<div className="mt-4">
					<div>
						<h3 className="text-base font-semibold leading-7 text-gray-900">
							Patient&rsquo;s Information
						</h3>
						<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
							View some information on this patient.
						</p>
					</div>
					<div className="mt-6 border-t border-gray-100">
						<dl className="divide-y divide-gray-100 lg:grid lg:grid-cols-2">
							{info.map((detail, index) => (
								<div key={index} className="px-4 py-6">
									<dt className="text-sm font-medium leading-6 text-gray-900 md:text-base md:font-semibold">
										{detail.title}
									</dt>
									<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 md:text-base md:font-medium">
										{detail.value}
									</dd>
								</div>
							))}
						</dl>
					</div>
					<div className="my-4">
						<Link to={routes.PATIENT_PAGE(data.patient.id)}>
							<Button
								icon={
									<span className="mr-2 text-gray-700 text-sm md:text-base">
										<ArrowRightOutlined />
									</span>
								}
								className="cursor-pointer"
								size="large"
								type="default"
							>
								<span className="text-gray-700 text-sm md:text-base">See More</span>
							</Button>
						</Link>
					</div>
				</div>
			)}
		</Container>
	);
}

export default Detail;
