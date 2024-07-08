import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange: (ChangeEvent: any) => void;
  errorMessage: string | false | undefined;
}

export default function JobForm({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  errorMessage,
}: Props) {
  return (
    <div className="mb-5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-1 mb-1 shadow"
      />
      {errorMessage && (
        <span className="text-sm text-red-500">* {errorMessage}</span>
      )}
    </div>
  );
}
