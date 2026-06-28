import Image from "next/image";

type TableImageProps = {
  src?: string | null;
  alt: string;
};

export default function TableImage({ src, alt }: TableImageProps) {
  if (!src) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">
        N/A
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      className="h-12 w-12 rounded-md object-cover"
      unoptimized
    />
  );
}
