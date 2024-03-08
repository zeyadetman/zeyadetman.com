"use client";
import { CheckCircle, Info, Warning, XCircle } from "@phosphor-icons/react";
import { MDXComponents } from "mdx/types";
import Image from "next/image";

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

export const components: MDXComponents = {
  Image: (props) => {
    const myLoader = () => {
      return props.src || "";
    };

    return (
      <Image
        alt={props.alt || " "}
        src={props.src || ""}
        loader={myLoader}
        className="w-full"
        {...props}
        width={400}
        height={20}
      />
    );
  },
  img: (props) => {
    const myLoader = () => {
      return props.src || "";
    };

    return (
      <Image
        alt={props.alt || " "}
        src={props.src || ""}
        loader={myLoader}
        className="w-full"
        {...props}
        width={400}
        height={20}
      />
    );
  },
  code: (props) => <code className="mockup-code">{props.children}</code>,
  pre: (props) => (
    <div className="mockup-code">
      <pre>
        <code>{props.children}</code>
      </pre>
    </div>
  ),
  a: (props) => (
    <a className="link" {...props}>
      {props.children}
    </a>
  ),
  blockquote: (props) => {
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
  },
};
