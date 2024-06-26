import clsx from "clsx";
import { ComponentProps } from "react";

interface TagProps extends ComponentProps<"p"> {
  text: string;
}

function Tag({ text, className, ...props }: TagProps) {
  return (
    <p
      {...props}
      className={clsx(
        "flex items-center justify-center rounded-full px-2 text-sm text-center ring-1 ring-slate-400 bg-slate-50",
        className,
      )}
    >
      {text}
    </p>
  );
}

export default Tag;
