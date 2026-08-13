import { memo, useMemo } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import type { Line } from '../commands/registry';

function LineText({ line }: { line: Line }) {
  if (line.variant === 'link' && line.href) {
    return (
      <a href={line.href} target={line.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" className="term-link">
        {line.text}
      </a>
    );
  }
  return <span className={line.variant ? `term-${line.variant}` : undefined}>{line.text}</span>;
}

function TerminalOutput({ lines, animate }: { lines: Line[]; animate: boolean }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const plain = useMemo(() => lines.map((l) => l.text), [lines]);
  const { visibleLines, done } = useTypewriter(plain, { skip: !animate });

  const shown = animate ? visibleLines : plain;

  return (
    <div className="term-output">
      {shown.map((text, i) => {
        const original = lines[i];
        return (
          <div key={i} className="term-line">
            <LineText line={{ ...original, text }} />
            {animate && !done && i === shown.length - 1 && <span className="term-caret" />}
          </div>
        );
      })}
    </div>
  );
}

export default memo(TerminalOutput);
