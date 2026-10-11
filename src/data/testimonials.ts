/**
 * Testimonials use first name only and never include a photograph.
 * Several clients asked for privacy, so no surnames, roles or employers appear.
 */
export type Testimonial = {
  id: string;
  firstName: string;
  service: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    firstName: 'Wanjiru',
    service: 'Individual Therapy',
    quote:
      'I put off booking for almost a year. What surprised me was how ordinary it felt — no judgement, no clipboard, just someone who listened properly. I wish I had come sooner.',
  },
  {
    id: 't2',
    firstName: 'Kevin',
    service: 'Workplace Burnout Recovery',
    quote:
      'I thought I just needed a holiday. It turned out I needed to understand why I could not stop working. Six sessions later I finally sleep through the night.',
  },
  {
    id: 't3',
    firstName: 'Aisha',
    service: 'Grief and Loss Support',
    quote:
      'Nobody tried to fix it or tell me it was time to move on. Grace let me talk about my mother for as long as I needed. That was the whole thing, really.',
  },
  {
    id: 't4',
    firstName: 'Brian',
    service: 'Individual Therapy',
    quote:
      'I had never said any of it out loud to anyone. The first session was the hardest and after that it got easier. I did not expect that.',
  },
  {
    id: 't5',
    firstName: 'Njeri',
    service: 'Couples Therapy',
    quote:
      'We had the same argument for four years. Faith helped us see we were both scared of the same thing. We still argue, but differently now.',
  },
  {
    id: 't6',
    firstName: 'Otieno',
    service: 'Group Therapy',
    quote:
      'Sitting in a room with people who described exactly what I had been feeling, in their own words — that did more for me than months of reading about anxiety.',
  },
];
