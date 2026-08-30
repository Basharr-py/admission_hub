import "./Button.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className="button"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;