import { Input } from "antd";

function ControlInput({ error, label, id, ...props }) {
	return (
		<>
			{label && (
				<label
					className={`${
						error ? "text-red-500" : "text-gray-700"
					} block font-medium my-1 text-sm md:text-base`}
					htmlFor={id}
				>
					{label}
				</label>
			)}
			<Input
				allowClear
				className="text-sm lg:text-base"
				status={error ? "error" : undefined}
				size="large"
				type="text"
				id={id}
				{...props}
			/>
		</>
	);
}

const TextArea = ({ error, label, id, ...props }) => {
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
			<Input.TextArea
				allowClear
				className="text-sm lg:text-base"
				status={error ? "error" : undefined}
				id={id}
				autoSize={{
					minRows: 2,
					maxRows: 4,
				}}
				size="large"
				{...props}
			/>
		</>
	);
};

ControlInput.TextArea = TextArea;
export default ControlInput;
