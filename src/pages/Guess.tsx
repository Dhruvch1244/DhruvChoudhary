import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { quiz, tierFor } from '../data/quiz';

export default function Guess() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(() => quiz.map(() => null));
  const [spoilerRevealed, setSpoilerRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = quiz[index];
  const answered = answers[index] !== null;
  const isLast = index === quiz.length - 1;

  function selectOption(option: string) {
    if (answered) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = option;
      return next;
    });
  }

  function goNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSpoilerRevealed(false);
  }

  function playAgain() {
    setIndex(0);
    setAnswers(quiz.map(() => null));
    setSpoilerRevealed(false);
    setFinished(false);
  }

  if (finished) {
    const score = answers.reduce((total, a, i) => total + (a === quiz[i].correct ? 1 : 0), 0);
    return (
      <>
        <PageHeader
          eyebrow="Just for fun"
          title={
            <>
              How well do you <span className="gradient-text">know Dhruv?</span>
            </>
          }
        />
        <Reveal className="quiz__result">
          <p className="quiz__score">
            {score} / {quiz.length}
          </p>
          <p className="quiz__tier">{tierFor(score, quiz.length)}</p>
          <div className="quiz__result-actions">
            <button type="button" className="btn-outline" onClick={playAgain}>
              Play again
            </button>
            <Link to="/" className="text-link">
              Back to the site
            </Link>
          </div>
        </Reveal>
      </>
    );
  }

  const showSpoilerGate = question.spoiler && answered && !spoilerRevealed;
  const showColoring = answered && (!question.spoiler || spoilerRevealed);

  return (
    <>
      <PageHeader
        eyebrow="Just for fun"
        title={
          <>
            How well do you <span className="gradient-text">know Dhruv?</span>
          </>
        }
      >
        <p className="quiz__intro">Ten questions, no pressure. Guess before you scroll to the About page for hints.</p>
      </PageHeader>

      <div className="quiz__progress">
        <div className="quiz__progress-bar" style={{ width: `${((index + 1) / quiz.length) * 100}%` }} />
      </div>
      <p className="quiz__step">
        Question {index + 1} of {quiz.length}
      </p>

      <Reveal key={question.id} className="quiz__question">
        <h2 className="section-title">{question.question}</h2>
        <div className="quiz__options">
          {question.options.map((option) => {
            const isSelected = answers[index] === option;
            const isCorrect = option === question.correct;
            let stateClass = '';
            if (showColoring) {
              if (isCorrect) stateClass = 'quiz__option--correct';
              else if (isSelected) stateClass = 'quiz__option--wrong';
            } else if (isSelected) {
              stateClass = 'quiz__option--selected';
            }
            return (
              <button
                key={option}
                type="button"
                className={`quiz__option ${stateClass}`}
                onClick={() => selectOption(option)}
                disabled={answered}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showSpoilerGate && (
          <button type="button" className="quiz__spoiler" onClick={() => setSpoilerRevealed(true)}>
            <span className="quiz__spoiler-blur">{question.correct}</span>
            <span className="quiz__spoiler-label">Tap to reveal</span>
          </button>
        )}

        {showColoring && (
          <button type="button" className="btn-outline quiz__next" onClick={goNext}>
            {isLast ? 'See results' : 'Next question'}
          </button>
        )}
      </Reveal>
    </>
  );
}
