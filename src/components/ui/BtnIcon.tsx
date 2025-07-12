interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "info"
    | "warn"
    | "fail"
    | "success"
    | "outline"
    | "fill"
    | "primary";
  size?: "sm" | "md" | "lg";
}

export default function ButtonIcon({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: ButtonProps & { className?: string }) {
  const btnType = {
    info: "bg-info text-white hover:bg-info-hover",
    warn: "bg-warn text-white hover:bg-warn-hover",
    fail: "bg-fail text-white hover:bg-fail-hover",
    success: "bg-success text-white hover:bg-success-hover",
    outline: "bg-white color-text border border-disabled hover:bg-white-hover",
    fill: "bg-text text-white hover:bg-text-hover",
    primary: "bg-primary text-white hover:bg-primary-hover",
  };

  const btnSize = {
    sm: "py-1 px-2.5 text-12 rounded-sm min-w-10",
    md: "py-2 px-3 text-14 rounded-md min-w-12",
    lg: "py-2 px-5 text-16 rounded-lg min-w-14",
  };

  return (
    <>
      <button
        className={`${btnType[variant]} ${btnSize[size]} ${className} cursor-pointer transition-colors duration-200 font-sans`}
        {...rest}
      >
        {children}
      </button>
    </>
  );
}
