import "./Select.css";

type Option = {
  value: string | number;
  label: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  value?: string | number;
  onChange?: (value: string) => void;
};

function Select({
  label,
  options,
  value,
  onChange,
}: SelectProps) {
  return (
    <div className="select-group">
      <label className="select-label">
        {label}
      </label>

      <select
        className="select"
        value={value ?? ""}
        onChange={(e) =>
          onChange?.(e.target.value)
        }
      >
        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;