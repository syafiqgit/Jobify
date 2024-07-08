interface Props {
  name: string;
  options: string[];
  onChange: (ChangeEvent: any) => void;
  placeholder: string;
}

export default function SelectJobFilter({
  name,
  onChange,
  options,
  placeholder,
}: Props) {
  return (
    <select
      className="w-[200px] rounded-md border bg-white dark:bg-black h-10 p-1 shadow"
      name={name}
      id={name}
      onChange={onChange}
    >
      <option disabled selected>
        {placeholder}
      </option>
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
