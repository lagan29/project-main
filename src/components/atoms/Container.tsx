import clsx from "clsx";
import React from "react";
type Props = {
    children: React.ReactNode;
  };
  
  export default function Container({ children }: Props) {
    return (
      <div className={clsx("mx-auto px-6 ")}>
        {children}
      </div>
    );
  }