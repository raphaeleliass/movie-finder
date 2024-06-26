import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";

interface TitleProps extends ComponentProps<"h2"> {
  children: ReactNode;
}

function Title({ className, children, ...props }: TitleProps) {
  return (
    <h2 {...props} className={clsx("font-Poppins text-slate-950 font-bold text-2xl", className)}>
      {children}
    </h2>
  );
}

export default Title;
