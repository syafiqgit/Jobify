import { ReactElement } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface Props {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  icon?: ReactElement;
  value?: string;
  onChange: (ChangeEvent: any) => void;
  onClick?: () => void;
  errorMessage: string | false | undefined;
}

export default function AuthForm(props: Props) {
  const {
    label,
    name,
    icon,
    onChange,
    placeholder,
    type,
    value,
    onClick,
    errorMessage,
  } = props;
  return (
    <div>
      <Label
        htmlFor={name}
        className={errorMessage ? "text-red-500" : "text-black dark:text-white"}
      >
        {label}
      </Label>
      <div className="relative mt-2">
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full text-black dark:text-white"
          placeholder={placeholder}
        />
        <span
          className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-500 dark:text-white"
          onClick={onClick}
        >
          {icon}
        </span>
      </div>
      <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
    </div>
  );
}
