import "./Input.css";

type InputProps = {
  label: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  min?: number;
  max?: number;
  onChange?: (value: string) => void;
};

function Input({
  label,
  type = "text",
  value,
  placeholder,
  min,
  max,
  onChange,
}: InputProps) {
  return (
    <div className="input-group">
      <label className="input-label">
        {label}
      </label>

      <input
        className="input"
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={(e) =>
          onChange?.(e.target.value)
        }
      />
    </div>
  );
}

export default Input;