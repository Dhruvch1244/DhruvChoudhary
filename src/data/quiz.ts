export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correct: string;
  spoiler?: boolean;
};

export const quiz: QuizQuestion[] = [
  {
    id: 'language',
    question: 'Favorite programming language?',
    options: ['Python', 'Java', 'JavaScript', 'C++'],
    correct: 'Java',
  },
  {
    id: 'food',
    question: 'Favorite food?',
    options: ['Biryani', 'Butter Chicken', 'Pav Bhaji', 'Masala Dosa'],
    correct: 'Pav Bhaji',
  },
  {
    id: 'movie',
    question: 'Favorite movie / show?',
    options: ['Dhamaal', 'Welcome', 'Hera Pheri', 'Golmaal'],
    correct: 'Welcome',
  },
  {
    id: 'genre',
    question: 'Favorite music genre?',
    options: ['Lo-fi Hip Hop', 'Progressive House', 'Drum and Bass', 'Classic Rock'],
    correct: 'Drum and Bass',
  },
  {
    id: 'game',
    question: 'Favorite game?',
    options: ['Pokémon Emerald', 'The Legend of Zelda: Breath of the Wild', 'Pokémon Black 2 & White 2', 'Minecraft'],
    correct: 'Pokémon Black 2 & White 2',
  },
  {
    id: 'hobby',
    question: 'Weekend hobby?',
    options: ['Hiking', 'Creating random songs', 'Watching anime', 'Playing chess'],
    correct: 'Creating random songs',
  },
  {
    id: 'stack',
    question: 'Tech stack he’d pick if starting a project today?',
    options: ['Go', 'Node.js + Express', 'Rust', 'Python + Django'],
    correct: 'Rust',
  },
  {
    id: 'destination',
    question: 'Dream travel destination?',
    options: ['Japan', 'Iceland', 'Switzerland', 'New Zealand'],
    correct: 'Switzerland',
  },
  {
    id: 'artist',
    question: 'Most-played artist(s) right now?',
    options: ['Skrillex', 'Deadmau5 & John Summit', 'Fred again..', 'Martin Garrix'],
    correct: 'Deadmau5 & John Summit',
    spoiler: true,
  },
  {
    id: 'season',
    question: 'Favorite season?',
    options: ['Monsoon', 'Winter', 'Summer', 'Spring'],
    correct: 'Summer',
  },
];

export function tierFor(score: number, total: number) {
  const pct = score / total;
  if (pct >= 0.9) return "You know Dhruv scarily well.";
  if (pct >= 0.7) return "Solid -- you've clearly been paying attention.";
  if (pct >= 0.4) return "Decent guesses, but there's more to learn.";
  return 'Total stranger vibes -- go read the About section.';
}
