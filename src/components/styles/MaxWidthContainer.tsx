import { PropsWithChildren } from "react";

export default function MaxWidthContainer(props: PropsWithChildren) {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex justify-between">
      {props.children}
    </div>
  )
}