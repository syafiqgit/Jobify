import { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

interface Props {
  file: Blob | string;
  avatar: string;
}

export default function PreviewAvatar(props: Props) {
  const { avatar, file } = props;
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const supportedFormats = ["image/jpg", "image/jpeg", "image/png"];
  if (file instanceof File) {
    if (supportedFormats.includes(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  }
  return (
    <Avatar className="size-32 mb-4">
      <AvatarImage src={preview?.toString() || avatar} />
    </Avatar>
  );
}
