import clsx from "clsx";
import { ComponentProps } from "react";
import { TbLoader2 } from "react-icons/tb";

interface LoaderProps extends ComponentProps<"div"> {}

function Loader({ className, ...props }: LoaderProps) {
  return (
    <div {...props} className={clsx("animate-spin text-red-500", className)}>
      <TbLoader2 className="size-16" />
    </div>
  );
}

export default Loader;
