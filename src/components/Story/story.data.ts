// Copy lists the scenes render, in one place so the story, the How It Works
// page and the tests stay consistent. The story is told from the operator's
// side: someone who needs to get something done, pass something, implement
// something, or solve a real problem.

import workImages from './work-images.json'

/** What we learn from operators once something is in their hands (10). */
export const DEVELOP = [
  'What operators actually struggle with',
  'Which steps people get stuck on',
  'What gets used again and again',
  'Which questions keep coming back',
  'Where a tool beats a lesson',
  'Where expert help is essential',
  'What to build next',
].map((t, i) => ({ n: String(i + 1).padStart(2, '0'), t }))

export type WorkImageName = keyof typeof workImages

export type Work = {
  id: string
  n: string
  kind: string
  t: string
  d: string
  /** Name of a source image in assets/work (see scripts/images.mjs). */
  image: WorkImageName
  alt: string
  /** Stagger and frame height, as the design lays the three out. */
  offsetClass: string
  frameClass: string
}

/** What you get (03): three levels of help, also on the How It Works page. */
export const LEVELS = [
  {
    tag: 'Self-serve',
    level: 'Level 01',
    n: '01',
    title: 'Tools',
    body: 'Practical tools you can put to work the same day.',
    examples: 'Templates · checklists · playbooks · guides',
    offset: '',
  },
  {
    tag: 'Focused',
    level: 'Level 02',
    n: '02',
    title: 'Programs',
    body: 'Short programs that build the one skill you need, and nothing else.',
    examples: 'Short courses · workshops · training',
    offset: 'mt-16',
  },
  {
    tag: 'Expert-led',
    level: 'Level 03',
    n: '03',
    title: 'Guidance',
    body: 'Hands-on help to implement it, pass it, or solve it.',
    examples: 'Advisory · implementation · one-to-one',
    offset: 'mt-32',
  },
]

/** What operators use (12). The kinds match the three levels in 03. */
export const WORK: Work[] = [
  {
    id: 'work-1',
    n: 'Work 01',
    kind: 'Tool',
    t: 'Investor-Ready Deck System',
    d: 'A step-by-step system founders use to build a pitch deck investors take seriously, without hiring a fundraising specialist.',
    image: 'investor-deck',
    alt: 'Investor-Ready Deck System workbook and pitch deck on a desk',
    offsetClass: 'mt-0',
    frameClass: 'h-[440px]',
  },
  {
    id: 'work-2',
    n: 'Work 02',
    kind: 'Program',
    t: 'HR Boolean Search',
    d: 'A short program that teaches recruiters to find hard-to-reach candidates in days, not months.',
    image: 'hr-boolean',
    alt: 'HR Boolean Search program: a recruiter building a candidate search',
    offsetClass: 'mt-[120px]',
    frameClass: 'h-[340px]',
  },
  {
    id: 'work-3',
    n: 'Work 03',
    kind: 'Guidance',
    t: 'ISO 45001 Certification Readiness',
    d: 'A structured path that takes you from first gap check to certification ready without guessing at the standard.',
    image: 'iso45001',
    alt: 'ISO 45001 Certification Readiness review meeting inside an industrial facility',
    offsetClass: 'mt-12',
    frameClass: 'h-[400px]',
  },
]

/** How it works (13), also the steps on the How It Works page. */
export const PARTNER = [
  {
    n: '01',
    dotClass: 'bg-[var(--accent)]',
    t: 'Tell us what you need to get done',
    d: 'A short conversation about your outcome, your deadline, and what is in the way.',
  },
  {
    n: '02',
    dotClass: 'bg-[var(--c-ink)]',
    t: 'We match you with proven expertise',
    d: 'From people who have done exactly this, distilled to the part you need.',
  },
  {
    n: '03',
    dotClass: 'bg-[var(--c-ink)]',
    t: 'You get the right form of help',
    d: 'A tool, a short program, or hands-on guidance — whichever gets you there fastest.',
  },
  {
    n: '04',
    dotClass: 'bg-[var(--c-vio)]',
    t: 'You get the result',
    d: 'And what worked for you makes the next operator’s path shorter.',
  },
]

/** Field notes (14). */
export const NOTES = [
  {
    no: '001',
    tag: 'Expertise',
    t: 'Why information is not the same as knowing what to do',
    frag: '“You can read everything and still not know the next step.”',
  },
  {
    no: '002',
    tag: 'Tools',
    t: 'When a checklist beats a course',
    frag: '“The shape of the problem decides the shape of the help.”',
  },
  {
    no: '003',
    tag: 'Results',
    t: 'What operators actually need from experts',
    frag: '“Not everything they know. The part that gets you there.”',
  },
]

/** Who it is for (04): seven kinds of operator. */
export const PEOPLE = [
  {
    title: 'THE OPERATOR',
    desc: 'Runs the day-to-day and needs it to work, not just sound good.',
  },
  {
    title: 'THE TEAM LEAD',
    desc: 'Has a target to hit and a team to bring along.',
  },
  {
    title: 'THE FOUNDER',
    desc: 'Wears every hat and needs the right one, fast.',
  },
  {
    title: 'THE CANDIDATE',
    desc: 'Preparing to pass something that matters.',
  },
  {
    title: 'THE IMPLEMENTER',
    desc: 'Has the plan approved and now has to make it real.',
  },
  {
    title: 'THE PROBLEM-SOLVER',
    desc: 'Facing a problem nobody on the team has solved before.',
  },
  {
    title: 'THE SPECIALIST',
    desc: 'Expert in one thing, new to the next thing on the list.',
  },
]

/** The model (06): six steps from problem to result, as the operator sees them. */
export const MODEL_STEPS = [
  {
    name: 'Problem',
    eyebrow: 'Start with what you need to get done',
    line: 'You tell us the result you are working toward and what is in the way.',
  },
  {
    name: 'Expertise',
    eyebrow: 'Find who has actually done it',
    line: 'We find proven expertise from people who have done it before.',
  },
  {
    name: 'Distill',
    eyebrow: 'Keep what works',
    line: 'We strip it down to what you need to do, and how.',
  },
  {
    name: 'Shape',
    eyebrow: 'Choose the right form',
    line: 'A tool, a short program, or hands-on guidance: whatever gets you there fastest.',
  },
  {
    name: 'Apply',
    eyebrow: 'Put it to work',
    line: 'You use it on the real problem, with support when you need it.',
  },
  {
    name: 'Result',
    eyebrow: 'Get the outcome',
    line: 'You get the result, and we learn what to build next.',
  },
]

/** Shape (08): what you need, and the form of help it becomes. */
export const BRANCHES = [
  { need: 'A quick answer', get: 'Guide / checklist' },
  { need: 'A repeatable process', get: 'Playbook / template' },
  { need: 'A new skill', get: 'Short program' },
  { need: 'To pass something', get: 'Prep program / practice set' },
  { need: 'To implement something', get: 'Implementation guide + support' },
  { need: 'To solve a hard problem', get: 'Expert guidance' },
  { need: 'A whole team up to speed', get: 'Team program / toolkit' },
]

/** Apply (09): what surrounds you while you put it to work. */
export const CHANNELS = [
  'STEP-BY-STEP',
  'TEMPLATES',
  'CHECKLISTS',
  'EXAMPLES',
  'PRACTICE',
  'FEEDBACK',
  'OFFICE HOURS',
  'COMMUNITY',
  'EXPERT REVIEW',
  'UPDATES',
  'TEAM ACCESS',
  'SUPPORT',
]

/** Apply (09): the ways it is delivered. */
export const DELIVERY = [
  'Self-paced',
  'Live sessions',
  'One-to-one',
  'Team training',
  'Online',
  'On-site',
  'Downloadable',
  'Mobile-friendly',
  'Updated regularly',
  'Ask an expert',
]

/** The flywheel (11). */
export const FLYWHEEL = [
  {
    label: 'Expertise',
    desc: 'Proven know-how from people who have done it.',
  },
  {
    label: 'Tools & programs',
    desc: 'Shaped so you can act on it.',
  },
  { label: 'Operators', desc: 'People and teams put it to work.' },
  {
    label: 'Results',
    desc: 'Problems solved, things passed, ideas implemented.',
  },
  {
    label: 'Better tools',
    desc: 'What worked becomes the next thing we build.',
  },
]
