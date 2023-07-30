import { Input } from 'antd';
import React from 'react';
import { useAsyncDebounce } from 'react-table';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export function Button({ children, className, disabled, ...rest }) {
	return (
		<button
			className={classNames(
				`${
					disabled ? 'cursor-not-allowed' : 'cursor-pointer'
				} bg-white border border-gray-300 font-medium inline-flex items-center px-4 py-2 relative rounded-md text-gray-700 text-sm hover:bg-gray-50`,
				className
			)}
			type="button"
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	);
}

export function PageButton({ children, className, disabled, ...rest }) {
	return (
		<button
			type="button"
			className={classNames(
				`border border-gray-300 ${
					disabled
						? 'bg-gray-200 cursor-not-allowed'
						: 'bg-white cursor-pointer hover:bg-gray-100'
				} font-medium inline-flex items-center p-2 relative text-gray-500 text-sm`,
				className
			)}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	);
}

export function GlobalFilter({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
}) {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = React.useState(globalFilter);

	// useAsyncDebounce to add a delay to prevent too many re-renders
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<div className="w-full md:col-span-2">
			<label
				className="block font-medium my-1 text-sm text-gray-700 md:text-base"
				htmlFor="search"
			>
				Search for Patients
			</label>
			<Input
				value={value || ''}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				placeholder={`${count} records...`}
				allowClear
				className="text-sm lg:text-base"
				id="search"
				name="search"
				// disabled={loading}
				size="large"
				type="search"
			/>
		</div>
	);
}

export function SortIcon({ className }) {
	return (
		<svg
			className={className}
			stroke="currentColor"
			fill="currentColor"
			strokeWidth="0"
			viewBox="0 0 320 512"
			height="1em"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"></path>
		</svg>
	);
}

export function SortUpIcon({ className = 'cursor-pointer' }) {
	return (
		<svg
			className={className}
			stroke="currentColor"
			fill="currentColor"
			strokeWidth="0"
			viewBox="0 0 320 512"
			height="1em"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
		</svg>
	);
}

export function SortDownIcon({ className }) {
	return (
		<svg
			className={className}
			stroke="currentColor"
			fill="currentColor"
			strokeWidth="0"
			viewBox="0 0 320 512"
			height="1em"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
		</svg>
	);
}
