import { Heart, Users, Home, MessagesSquare, Flower2, Briefcase, Sprout } from 'lucide-react';

export type Service = {
  slug: string;
  name: string;
  /** Optional photograph. While absent, a calm gradient + icon renders. */
  image?: string;
  icon: typeof Heart;
  short: string;
  forWho: string;
  /** Longer copy used on the service detail page. */
  detail: string[];
  whatToExpect: string[];
  duration: string;
  therapistSlugs: string[];
};

export const services: Service[] = [
  {
    slug: 'individual-therapy',
    name: 'Individual Therapy',
    icon: Heart,
    short:
      'One-to-one sessions with a therapist who takes the time to understand your situation, not just your symptoms.',
    forWho:
      'Adults experiencing stress, anxiety, low mood, burnout, grief, or a sense that something needs to change.',
    detail: [
      'Individual therapy is a private, confidential hour that belongs entirely to you. There is no agenda you have to arrive with and no expectation that you explain yourself perfectly on the first try.',
      'Your therapist will help you notice patterns, understand where they came from, and find steadier ways of responding. Some people come for a handful of sessions around a specific difficulty; others stay for longer and deeper work. Both are fine.',
    ],
    whatToExpect: [
      'A first session focused on understanding what brings you here',
      'A pace set entirely by you — nothing is rushed or forced',
      'Practical tools alongside deeper exploration, as you want them',
      'Sessions in English or Kiswahili, in Kilimani or online',
    ],
    duration: '50 minutes',
    therapistSlugs: ['amina-otieno', 'brian-kamau', 'peter-ochieng', 'grace-wanjiru'],
  },
  {
    slug: 'couples-therapy',
    name: 'Couples Therapy',
    icon: Users,
    short:
      'A steady, balanced space for two people who want to understand each other again — not to decide who is right.',
    forWho:
      'Couples navigating recurring conflict, distance, betrayal, parenting disagreements, or a decision about the future.',
    detail: [
      'Couples therapy is not about refereeing arguments. Your therapist looks at the cycle you get caught in together — the pursuit and withdrawal, the criticism and the silence — and helps both of you see it clearly enough to step out of it.',
      'Sessions are paced so that both partners feel genuinely heard. This work is possible even when only one of you is certain about continuing.',
    ],
    whatToExpect: [
      'A first joint session, then one individual session each',
      'Focus on the pattern between you, not on blame',
      'Practical ways to interrupt conflict at home',
      'A clear, honest space to talk about the future',
    ],
    duration: '75 minutes',
    therapistSlugs: ['faith-nderitu', 'grace-wanjiru'],
  },
  {
    slug: 'family-counselling',
    name: 'Family Counselling',
    icon: Home,
    short:
      'Support for families who are struggling to communicate, or navigating a change that has affected everyone.',
    forWho:
      'Families facing ongoing tension, separation, bereavement, blended-family transitions, or concern about a member.',
    detail: [
      'Families rarely arrive because of one event. Usually there is a longer story, and different members hold different versions of it. Family counselling makes room for all of them.',
      'Sessions can include whoever is willing to attend. The aim is not agreement on everything, but a household where people can speak without bracing themselves.',
    ],
    whatToExpect: [
      'Flexible attendance — whoever is able to come',
      'Attention to the whole family system, not one person',
      'Clear, kind boundaries held by the therapist throughout',
      'Work at a pace that keeps everyone safe',
    ],
    duration: '75 minutes',
    therapistSlugs: ['faith-nderitu', 'grace-wanjiru'],
  },
  {
    slug: 'group-therapy',
    name: 'Group Therapy',
    icon: MessagesSquare,
    short:
      'Small, facilitated groups where you discover that the thing you thought was only yours is shared by others.',
    forWho:
      'Adults who would value peer support alongside professional guidance, and who are comfortable in a small group setting.',
    detail: [
      'Groups are kept small — usually six to eight people — and facilitated by a therapist throughout. Many people find that hearing someone else describe their own experience is more relieving than anything said directly to them.',
      'Current groups run on anxiety and stress management, grief, and burnout recovery. You are never required to speak before you are ready.',
    ],
    whatToExpect: [
      'Six to eight participants, professionally facilitated',
      'Clear confidentiality agreements from the first session',
      'No pressure to share before you feel able to',
      'An eight-week commitment, with options to continue',
    ],
    duration: '90 minutes',
    therapistSlugs: ['amina-otieno', 'brian-kamau', 'peter-ochieng'],
  },
  {
    slug: 'grief-and-loss-support',
    name: 'Grief and Loss Support',
    icon: Flower2,
    short:
      'Companionship through bereavement and loss, at whatever pace grief actually takes — not the pace the world expects.',
    forWho:
      'Anyone who has lost someone, a relationship, a pregnancy, a home, or a version of their life that is no longer available.',
    detail: [
      'Grief is not a problem to be solved and it does not follow a schedule. This work is not about moving through stages or reaching acceptance by a certain date.',
      'It is about having somewhere to put what you are carrying, and someone alongside you who is not uncomfortable with it. Loss of any kind belongs here — not only bereavement.',
    ],
    whatToExpect: [
      'No timeline and no expectation about how grief should look',
      'Space for the whole story of who or what was lost',
      'Support around anniversaries, milestones and difficult dates',
      'Optional pairing with our grief group',
    ],
    duration: '50 minutes',
    therapistSlugs: ['grace-wanjiru', 'faith-nderitu'],
  },
  {
    slug: 'workplace-burnout-recovery',
    name: 'Workplace Burnout Recovery',
    icon: Briefcase,
    short:
      'Focused support for the particular exhaustion that a weekend off does not touch, and that rest alone will not reverse.',
    forWho:
      'Professionals, founders, caregivers and anyone whose work has emptied them faster than they can refill.',
    detail: [
      'Burnout is not simply tiredness. It is a state of deep depletion — emotional, physical and mental — that usually continues long after the workload that caused it has gone.',
      'This work looks honestly at the conditions that produced it, including the ones you may not be able to change, and builds a realistic way back that does not depend on leaving your job or becoming a different person.',
    ],
    whatToExpect: [
      'A clear picture of what is actually depleting you',
      'Work on boundaries that survive contact with real workplaces',
      'Somatic tools for a nervous system stuck in overdrive',
      'A relapse plan for the pressures you know will return',
    ],
    duration: '50 minutes',
    therapistSlugs: ['peter-ochieng', 'brian-kamau', 'amina-otieno'],
  },
  {
    slug: 'teen-and-young-adult-therapy',
    name: 'Teen and Young Adult Therapy',
    icon: Sprout,
    short:
      'A space for sixteen- to twenty-five-year-olds to talk without being assessed, lectured, or reported back on.',
    forWho:
      'Young people navigating exams, university, first jobs, identity, family expectation, or low mood and anxiety.',
    detail: [
      'This stage carries a specific kind of pressure — to perform, to choose correctly, to have a plan. It is a lot, and it is rarely said out loud.',
      'Sessions are confidential, and we are clear with young clients from the start about the narrow limits of that confidentiality. Parents are supported separately where helpful, so the young person has a space that is genuinely their own.',
    ],
    whatToExpect: [
      'Confidentiality explained clearly, including its limits',
      'A therapist who does not talk down to you',
      'Practical support around exams, decisions and pressure',
      'Optional separate sessions for parents or guardians',
    ],
    duration: '50 minutes',
    therapistSlugs: ['david-mwangi', 'amina-otieno'],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
