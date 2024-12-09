import { Form, Select } from "antd";
import { useEffect } from "react";

import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPhSelectProps = {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};
const PhSelectWithWatch = ({
  name,
  label,
  options,
  mode,
  onValueChange,
}: TPhSelectProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });
  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);
  console.log(inputValue);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
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

export default PhSelectWithWatch;
