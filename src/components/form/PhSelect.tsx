import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPhSelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
};
const PhSelect = ({ name, label, options }: TPhSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field} //in the field there is obChange and onBlur
            style={{ width: "100%" }}
            options={options}
            size="large"
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PhSelect;
