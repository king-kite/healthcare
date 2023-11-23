import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';

dayjs.extend(customParseFormat);

function getDateString(value) {
	let date = value.getDate();
	let month = value.getMonth() + 1;
	let year = value.getFullYear();
	date = date > 9 ? date : date.toString().padStart(2, '0');
	month = month > 9 ? month : month.toString().padStart(2, '0');
	year = year > 999 ? year : year.toString().padStart(4, '0');
	return `${year}-${month}-${date}`;
}

function getDayJsString(value) {
	let date = value().date();
	let month = value().month() + 1;
	let year = value().year();
	date = date > 9 ? date : date.toString().padStart(2, '0');
	month = month > 9 ? month : month.toString().padStart(2, '0');
	year = year > 999 ? year : year.toString().padStart(4, '0');
	return `${year}-${month}-${date}`;
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
		const dateValue = getDayJsString(defaultValue);
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
		const dateValue = getDayJsString(value);
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
