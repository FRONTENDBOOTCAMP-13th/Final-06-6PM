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

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: ButtonProps & { className?: string }) {
  const btnType = {
    info: "bg-travel-info100 text-white hover:bg-travel-info200",
    warn: "bg-travel-warn100 text-white hover:bg-travel-warn200",
    fail: "bg-travel-fail100 text-white hover:bg-travel-fail200",
    success: "bg-travel-success100 text-white hover:bg-travel-success200",
    outline:
      "bg-white color-text border border-travel-gray300 hover:bg-travel-gray100",
    fill: "bg-travel-text100 text-white hover:bg-travel-text200",
    primary: "bg-travel-primary100 text-white hover:bg-travel-primary200",
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
