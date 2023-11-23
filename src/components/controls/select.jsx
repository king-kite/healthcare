import { Select } from 'antd';
import React from 'react';

function ControlSelect({ label, error, name, id, onSelect, ...props }) {
	const [value, setValue] = React.useState(
		props.value || props.defaultValue || undefined
	);

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
			<Select
				label={label}
				status={error ? 'error' : undefined}
				style={{ width: '100%' }}
				size="large"
				{...props}
				onSelect={(value, option) => {
					if (onSelect) onSelect(value, option);
					setValue(value);
				}}
			/>
			<input type="hidden" name={name} id={id} readOnly value={value} />
		</>
	);
}

export default ControlSelect;
