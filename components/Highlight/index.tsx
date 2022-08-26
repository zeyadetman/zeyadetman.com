import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";
import { Box, Text } from "@chakra-ui/react";

function HighlightCode({ children }: any) {
  const code = children.props.children;
  const language = children.props.className?.replace("language-", "").trim();

  return (
    <Box
      textAlign="center"
      width="calc(100vw - 50px)"
      maxWidth="800px"
      margin="0 auto"
      minWidth="240px"
      dir="ltr"
    >
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Box
            as="pre"
            fontFamily="monospace"
            textAlign="left"
            margin="1em 0"
            padding="0.5em"
            overflow="scroll"
            className={`pre-code ${className}`}
            style={style}
          >
            {tokens.map((line, i) => (
              <Box
                as="div"
                display="table-row"
                key={i}
                {...getLineProps({ line, key: i })}
              >
                <Text
                  as="span"
                  display="table-cell"
                  textAlign="right"
                  pr="1em"
                  userSelect="none"
                  opacity="0.5"
                >
                  {i + 1}
                </Text>
                <Box as="span" display="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Highlight>
    </Box>
  );
}

export default HighlightCode;
