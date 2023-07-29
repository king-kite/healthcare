import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';

dayjs.extend(customParseFormat);

function getDateString(date) {
	let month = date.getMonth() + 1;
	month = month > 9 ? month : month.toString().padStart(2, '0');
	return `${date.getFullYear()}-${month}-${date.getDate()}`;
}

function ControlDatePicker({
	label,
	error,
	id,
	onChange,
	defaultValue,
	name,
	value,
	...props
}) {
	const [inputValue, setValue] = React.useState();

	const controlDefaultValue = React.useMemo(() => {
		if (!defaultValue) return undefined;

		if (typeof defaultValue === 'string') {
			const date = new Date(defaultValue);
			const dateValue = getDateString(date);
			setValue(dateValue);
			return dayjs(dateValue, 'YYYY-MM-DD');
		}
		let month = defaultValue().month() + 1;
		month = month > 9 ? month : month.toString().padStart(2, '0');
		const dateValue = `${defaultValue().year()}-${month}-${defaultValue().date()}`;
		setValue(dateValue);
		return defaultValue;
	}, [defaultValue]);

	const controlValue = React.useMemo(() => {
		if (!value) return undefined;

		if (typeof value === 'string') {
			const date = new Date(value);
			const dateValue = getDateString(date);
			setValue(dateValue);
			return dayjs(dateValue, 'YYYY-MM-DD');
		}
		let month = value().month() + 1;
		month = month > 9 ? month : month.toString().padStart(2, '0');
		const dateValue = `${value().year()}-${month}-${value().date()}`;
		setValue(dateValue);
		return value;
	}, [value]);

	return (
		<>
			{label && (
				<label
					className="block font-medium my-1 text-sm text-gray-700 md:text-base"
					htmlFor={id}
				>
					{label}
				</label>
			)}
			<DatePicker
				className="text-sm w-full lg:text-base"
				status={error ? 'error' : undefined}
				size="large"
				onChange={(date, dateString) => {
					if (onChange) onChange(date, dateString);
					setValue(dateString);
				}}
				{...props}
				defaultValue={controlDefaultValue}
				value={controlValue}
			/>
			<input type="hidden" name={name} id={id} readOnly value={inputValue} />
		</>
	);
}

export default ControlDatePicker;
