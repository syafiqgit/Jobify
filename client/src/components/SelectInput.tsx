import { Label } from "./ui/label";

interface Props {
  label: string;
  name: string;
  defaultValue: string | "";
  options: string[];
  onChange: (ChangeEvent: any) => void;
  value: string;
}

export default function SelectInput({
  label,
  name,
  defaultValue,
  options,
  onChange,
  value,
}: Props) {
  return (
    <div className="mb-3 border rounded-md shadow p-3">
      <Label htmlFor={name}>{label}</Label>
      <select
        className="w-full rounded-md border bg-white dark:bg-black p-2 text-black dark:text-white text-sm mt-1 mb-1"
        name={name}
        id={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
