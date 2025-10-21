import { ReactNode } from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import type { Plugin } from 'unified';

type MarkdownProps = {
  children: ReactNode;
  components?: unknown;
} & React.ComponentProps<typeof ReactMarkdown>;

const Markdown: FC<MarkdownProps> = (props) => {
  const { children, components, ...restProps } = props;

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw as unknown as Plugin]}
      components={
        {
          h1: ({ children }: { children: ReactNode }) => <div className="py-2 text-2xl font-bold">{children}</div>,
          h2: ({ children }: { children: ReactNode }) => <div className="py-2 text-xl font-bold">{children}</div>,
          h3: ({ children }: { children: ReactNode }) => <div className="py-2 text-lg font-bold">{children}</div>,
          h4: ({ children }: { children: ReactNode }) => <div className="py-2 text-base font-bold">{children}</div>,
          h5: ({ children }: { children: ReactNode }) => <div className="py-2 text-sm font-bold">{children}</div>,
          h6: ({ children }: { children: ReactNode }) => <div className="py-2 text-xs font-bold">{children}</div>,
          p: ({ children }: { children: ReactNode }) => (
            <div className="text-xs font-normal leading-relaxed">{children}</div>
          ),
          ol: ({ children }: { children: ReactNode }) => (
            <ol className="list-decimal py-1 pl-4 [&_ol]:list-[lower-alpha]">{children}</ol>
          ),
          ul: ({ children }: { children: ReactNode }) => <ul className="list-disc py-1 pl-4">{children}</ul>,
          li: ({ children }: { children: ReactNode }) => <li className="py-[2px] text-xs">{children}</li>,
          a: ({ children, href }: { children: ReactNode; href: string }) => (
            <Link
              href={href}
              target="_blank"
              className="underline"
            >
              {children}
            </Link>
          ),
          ...components,
        } as unknown as Components
      }
      {...restProps}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
