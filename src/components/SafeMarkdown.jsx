//SafeMarkdown.jsx

import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import {defaultSchema} from "hast-util-sanitize";

const schema = {
  ...defaultSchema,
  tagNames: [
    "b","i","em","strong","u","a","p","ul","ol","li","br","blockquote","code","pre","h1","h2"
  ],
  attributes: {
    ...defaultSchema.attributes,
    a: ["href", "title", "rel", "target"],
  },
  protocols: {
    ...defaultSchema.protocols,
    href: ["http", "https", "mailto"]
  }
};

export default function SafeMarkdown({content}) {
    return (
        <ReactMarkdown rehypePlugins={[[rehypeSanitize, schema]]}>
            {content}
        </ReactMarkdown>
    )
}