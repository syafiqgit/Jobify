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
  accept?: string;
}

export default function InputForm(props: Props) {
  const {
    label,
    name,
    type,
    placeholder,
    value,
    onChange,
    errorMessage,
    accept,
  } = props;
  return (
    <div className="mb-3 border rounded-md shadow p-3">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        accept={accept}
        className="mt-1 mb-1 shadow"
      />
      {errorMessage && (
        <span className="text-sm text-red-500">* {errorMessage}</span>
      )}
    </div>
  );
}
