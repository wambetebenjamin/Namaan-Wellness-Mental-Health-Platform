export type SessionFormat = 'in-person' | 'online';

export type Therapist = {
  slug: string;
  name: string;
  role: string;
  image: string;
  /** Shown on the card at rest. */
  specialisations: string[];
  approaches: string[];
  languages: string[];
  formats: SessionFormat[];
  /** Revealed on hover / focus / tap (EFFECT-26). */
  bio: string;
  fullBio: string;
  credentials: string[];
  experience: string;
  sessionTypes: string[];
  /** Weekday indices (0 = Sunday) the therapist holds slots. */
  availableDays: number[];
};

export const therapists: Therapist[] = [
  {
    slug: 'amina-otieno',
    name: 'Amina Otieno',
    role: 'Clinical Psychologist',
    image: '/images/therapists/amina-otieno.jpg',
    specialisations: ['Anxiety', 'Stress', 'Panic'],
    approaches: ['CBT', 'Mindfulness-based'],
    languages: ['English', 'Kiswahili'],
    formats: ['in-person', 'online'],
    bio: 'Amina works gently with anxiety — helping you understand what your body is telling you, and building steadier days one small step at a time.',
    fullBio:
      'Amina has spent twelve years sitting with people whose anxiety has quietly taken over their days. Her work is practical and unhurried: together you notice the patterns, understand what your nervous system is responding to, and build a set of steady, repeatable tools. She has a particular interest in panic and in the physical symptoms of anxiety — the tight chest, the racing heart — and in helping clients feel safe in their own bodies again.',
    credentials: [
      'MSc Clinical Psychology, University of Nairobi',
      'Registered with the Kenya Counsellors and Psychologists Association',
      'Certified in Cognitive Behavioural Therapy',
      'Mindfulness-Based Cognitive Therapy (MBCT) trained',
    ],
    experience: '12 years',
    sessionTypes: ['individual', 'group'],
    availableDays: [1, 2, 3, 4],
  },
  {
    slug: 'brian-kamau',
    name: 'Brian Kamau',
    role: 'Counselling Psychologist',
    image: '/images/therapists/brian-kamau.jpg',
    specialisations: ['Depression', "Men's mental health", 'Work stress'],
    approaches: ['Psychodynamic', 'Talking therapy'],
    languages: ['English', 'Kiswahili'],
    formats: ['in-person', 'online'],
    bio: 'Brian offers a quiet, judgement-free room — especially for men who were taught to carry things alone and are ready to set them down.',
    fullBio:
      'Brian came to this work after a decade in corporate Nairobi, and he understands the particular weight of a life that looks successful from the outside. He works psychodynamically — exploring not only what is happening now, but the older stories underneath it. Much of his practice is with men who have never spoken to anyone before, and he is careful to make the first session feel like a conversation rather than an assessment.',
    credentials: [
      'MA Counselling Psychology, Kenyatta University',
      'Registered Counselling Psychologist',
      'Advanced Psychodynamic Practice certificate',
      'Trained in workplace mental health first response',
    ],
    experience: '9 years',
    sessionTypes: ['individual', 'group'],
    availableDays: [1, 3, 4, 5],
  },
  {
    slug: 'grace-wanjiru',
    name: 'Grace Wanjiru',
    role: 'Grief and Trauma Counsellor',
    image: '/images/therapists/grace-wanjiru.jpg',
    specialisations: ['Grief and loss', 'Trauma', 'Life transitions'],
    approaches: ['Narrative therapy', 'Person-centred'],
    languages: ['English', 'Kiswahili', 'Kikuyu'],
    formats: ['in-person', 'online'],
    bio: 'Grace sits with people through loss. There is no timeline here, and no expectation that grief should look a particular way.',
    fullBio:
      'Grace has walked alongside more than a thousand people through bereavement, and she is clear about one thing: grief is not a problem to be solved. Her narrative approach honours the story of who and what was lost, and helps clients carry that story rather than be buried by it. She also works with trauma, always at the pace the client sets, and never asks anyone to revisit something before they are ready.',
    credentials: [
      'MA Counselling, Daystar University',
      'Certified Grief Counsellor',
      'Trauma-Informed Care certification',
      'Narrative Therapy advanced training',
    ],
    experience: '16 years',
    sessionTypes: ['individual', 'family', 'group'],
    availableDays: [1, 2, 4, 5],
  },
  {
    slug: 'david-mwangi',
    name: 'David Mwangi',
    role: 'Youth and Student Counsellor',
    image: '/images/therapists/david-mwangi.jpg',
    specialisations: ['Teen and young adult', 'Student stress', 'Exam anxiety'],
    approaches: ['CBT', 'Solution-focused'],
    languages: ['English', 'Kiswahili'],
    formats: ['in-person', 'online'],
    bio: 'David works with students and young adults on the pressure to have it all figured out — and the relief of realising nobody does.',
    fullBio:
      'David supports young people between sixteen and twenty-five through a period that is genuinely demanding: exams, first jobs, family expectation, and the quiet loneliness that can sit underneath all of it. His style is warm, direct and practical. He works solution-focused, which means sessions tend to end with something concrete to carry into the week, and he is careful never to talk down to a client.',
    credentials: [
      'BA Psychology, University of Nairobi',
      'MSc Counselling Psychology (in progress)',
      'Certified Solution-Focused Brief Therapist',
      'Safeguarding and child protection trained',
    ],
    experience: '6 years',
    sessionTypes: ['individual', 'group'],
    availableDays: [2, 3, 5, 6],
  },
  {
    slug: 'faith-nderitu',
    name: 'Faith Nderitu',
    role: 'Couples and Family Therapist',
    image: '/images/therapists/faith-nderitu.jpg',
    specialisations: ['Relationships', 'Couples', 'Family dynamics'],
    approaches: ['Emotionally focused', 'Systemic'],
    languages: ['English', 'Kiswahili'],
    formats: ['in-person', 'online'],
    bio: 'Faith helps couples and families find their way back to each other — not by deciding who is right, but by understanding the pattern between you.',
    fullBio:
      'Faith works with the space between people. Rather than treating one person as the problem, she looks at the cycle a couple or family gets caught in — the pursuit and withdrawal, the criticism and silence — and helps everyone in the room see it differently. She is skilled at holding sessions where voices have been raised for years, and at making each person feel genuinely heard.',
    credentials: [
      'MA Marriage and Family Therapy',
      'Certified Emotionally Focused Therapist',
      'Systemic Family Practice training',
      'Registered member, Kenya Counsellors and Psychologists Association',
    ],
    experience: '11 years',
    sessionTypes: ['couples', 'family'],
    availableDays: [1, 2, 4, 6],
  },
  {
    slug: 'peter-ochieng',
    name: 'Peter Ochieng',
    role: 'Trauma and Burnout Specialist',
    image: '/images/therapists/peter-ochieng.jpg',
    specialisations: ['Trauma', 'Burnout', ' Workplace wellbeing'],
    approaches: ['EMDR-informed', 'Psychodynamic', 'Somatic'],
    languages: ['English', 'Kiswahili', 'Dholuo'],
    formats: ['in-person', 'online'],
    bio: 'Peter works with deep exhaustion and old wounds, at a pace that never asks you to go further than you are ready to go.',
    fullBio:
      'Peter specialises in two things that often arrive together: burnout that rest does not fix, and trauma that has been carried quietly for years. He works somatically as well as in conversation, attending to what the body has been holding. He is trained in EMDR-informed approaches and is careful to establish real safety and stability before any trauma processing begins. He also leads Naaman Wellness workplace programmes.',
    credentials: [
      'MSc Clinical Psychology',
      'EMDR-trained (Level II)',
      'Somatic Experiencing practitioner (SEP)',
      'Occupational burnout and resilience certification',
    ],
    experience: '14 years',
    sessionTypes: ['individual', 'group'],
    availableDays: [1, 3, 5],
  },
];

export function getTherapist(slug: string): Therapist | undefined {
  return therapists.find((t) => t.slug === slug);
}
