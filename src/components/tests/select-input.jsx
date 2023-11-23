import { Select } from "antd";

function SelectInput({ loading, onChange, onClear, value, options }) {
  return (
    <>
      <label
        className="block font-medium my-1 text-sm text-gray-700 md:text-base"
        htmlFor="Patient"
      >
        Patient
      </label>
      <Select
        allowClear
        onClear={onClear}
        showSearch
        style={{ width: "100%" }}
        id="Patient"
        name="Patient"
        loading={loading}
        disabled={loading}
        size="large"
        placeholder={<>Select Patient</>}
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        onChange={onChange}
        value={value}
        options={options}
      />
    </>
  );
}

export default SelectInput;
