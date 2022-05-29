import dynamic from "next/dynamic";
import { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";

const Highlight = dynamic(
  () => import("prism-react-renderer").then((m) => m.default),
  {
    ssr: false,
  }
);

const CodeBlock = ({ className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return match ? (
    <Highlight
      {...defaultProps}
      code={children}
      language={match[1]}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "1em" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default CodeBlock;
