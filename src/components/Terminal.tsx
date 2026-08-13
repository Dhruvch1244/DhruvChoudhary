import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BootSequence from './BootSequence';
import TerminalOutput from './TerminalOutput';
import { runCommand, KNOWN_COMMANDS, FILE_NAMES, PROJECT_SLUGS, type Line } from '../commands/registry';
import { profile } from '../data/content';

type Block =
  | { id: string; kind: 'input'; text: string }
  | { id: string; kind: 'output'; lines: Line[]; animate: boolean };

const CHIPS = ['help', 'whoami', 'projects', 'experience', 'skills', 'contact', 'resume', 'clear'];

let uid = 0;
const nextId = () => `b${uid++}`;

export default function Terminal({ initialCommand }: { initialCommand?: string }) {
  const [booted, setBooted] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const ranInitial = useRef(false);
  const navigate = useNavigate();

  function execute(raw: string) {
    const trimmed = raw.trim();
    const outcome = runCommand(trimmed, { history: cmdHistory, navigate });

    if (outcome.clear) {
      setBlocks([]);
    } else if (trimmed) {
      setBlocks((prev) => [
        ...prev.map((b) => (b.kind === 'output' ? { ...b, animate: false } : b)),
        { id: nextId(), kind: 'input', text: trimmed },
        { id: nextId(), kind: 'output', lines: outcome.lines, animate: true },
      ]);
    }

    if (trimmed) setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(null);
    setInput('');
  }

  useEffect(() => {
    if (booted && !ranInitial.current) {
      ranInitial.current = true;
      execute(initialCommand && initialCommand.trim() ? initialCommand : 'help');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [blocks, input]);

  function completionPool(): string[] {
    const parts = input.split(' ');
    if (parts.length <= 1) return KNOWN_COMMANDS;
    const cmd = parts[0];
    if (cmd === 'cat') return [...FILE_NAMES, ...PROJECT_SLUGS.map((s) => `projects/${s}`)];
    if (cmd === 'open') return PROJECT_SLUGS;
    if (cmd === 'ls') return ['projects/'];
    return [];
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      execute(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const idx = historyIndex === null ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(idx);
      setInput(cmdHistory[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === null) return;
      const idx = historyIndex + 1;
      if (idx >= cmdHistory.length) {
        setHistoryIndex(null);
        setInput('');
      } else {
        setHistoryIndex(idx);
        setInput(cmdHistory[idx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const parts = input.split(' ');
      const prefix = parts[parts.length - 1];
      const matches = completionPool().filter((p) => p.startsWith(prefix));
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        setInput(parts.join(' '));
      }
    }
  }

  function focusInput() {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  }

  if (!booted) {
    return (
      <div className="terminal-shell" onClick={focusInput}>
        <BootSequence onDone={() => setBooted(true)} />
      </div>
    );
  }

  return (
    <div className="terminal-shell" onClick={focusInput}>
      <div className="terminal-scroll" ref={scrollRef}>
        {blocks.map((b) =>
          b.kind === 'input' ? (
            <div key={b.id} className="term-line term-input-echo">
              <span className="term-prompt">
                {profile.handle}@{profile.host}:~$
              </span>
              {b.text}
            </div>
          ) : (
            <TerminalOutput key={b.id} lines={b.lines} animate={b.animate} />
          ),
        )}

        <div className="term-line term-prompt-line">
          <span className="term-prompt">
            {profile.handle}@{profile.host}:~$
          </span>
          <input
            ref={inputRef}
            className="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="terminal command input"
          />
        </div>
      </div>

      <div className="term-chips">
        {CHIPS.map((c) => (
          <button key={c} className="term-chip" onClick={() => execute(c)}>
            [{c}]
          </button>
        ))}
      </div>
    </div>
  );
}
