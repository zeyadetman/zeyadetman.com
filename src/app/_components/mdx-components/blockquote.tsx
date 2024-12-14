"use client";
import { CheckCircle, Info, Warning, XCircle } from "@phosphor-icons/react";

const blockQuoteMapper = {
  "[alert]": {
    icon: Info,
    className: "alert",
  },
  "[error]": {
    icon: XCircle,
    className: "alert alert-error",
  },
  "[info]": {
    icon: XCircle,
    className: "alert alert-info",
  },
  "[success]": {
    icon: CheckCircle,
    className: "alert alert-success",
  },
  "[warning]": {
    icon: Warning,
    className: "alert alert-warning",
  },
};

export const MdxBlockquote = (props: any) => {
  const [startsWith, ...rest] = (props.children as any)?.[1]?.props.children
    ?.toString()
    .split(" ");

  if (
    startsWith &&
    blockQuoteMapper[startsWith as keyof typeof blockQuoteMapper]
  ) {
    const { icon: Icon, className } =
      blockQuoteMapper[startsWith as keyof typeof blockQuoteMapper];
    return (
      <div role="alert" className={className}>
        <Icon size={20} />
        <span>{rest.join(" ")}</span>
      </div>
    );
  }

  return (
    <blockquote className="blockquote" {...props}>
      {props.children}
    </blockquote>
  );
};
