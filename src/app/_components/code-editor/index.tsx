"use client";
import { Sandpack, SandpackProps } from "@codesandbox/sandpack-react";

export const CodeEditorLive = (props: SandpackProps) => {
  return (
    <Sandpack
      options={{
        showNavigator: true,
        showLineNumbers: true,
        showTabs: true,
        closableTabs: true,
        wrapContent: true,
        autorun: false,
        autoReload: false,
      }}
      {...props}
    />
  );
};
