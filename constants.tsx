
import { Pillar, ScheduleOption } from './types';

export const PILLARS: Pillar[] = [
  { icon: 'fa-microchip', title: 'Formato Glish', description: 'Entrenamiento táctico para el nuevo examen adaptativo.', color: 'blue' },
  { icon: 'fa-user-friends', title: 'Tribu de 8', description: 'El "Sweet Spot" de atención personalizada online.', color: 'indigo' },
  { icon: 'fa-stopwatch', title: '96h Glish', description: 'Inmersión profunda de 16 semanas académicas.', color: 'sky' },
  { icon: 'fa-compass', title: 'Disciplina', description: 'Horarios fijos para un compromiso real.', color: 'emerald' },
  { icon: 'fa-comment-dots', title: 'Coach Directo', description: 'Sesiones en vivo con un Coach experto Glish.', color: 'violet' },
  { icon: 'fa-bullseye', title: 'Anti-Traps', description: 'Identifica las 40+ trampas lógicas de ETS.', color: 'rose' },
  { icon: 'fa-desktop', title: 'Mocks Reales', description: 'Simulaciones de test oficiales Glish.', color: 'amber' },
  { icon: 'fa-spell-check', title: 'Léxico Glish', description: '1,500+ términos académicos dominados.', color: 'cyan' },
  { icon: 'fa-link', title: 'Online Follow-up', description: 'Acompañamiento digital durante todo el programa.', color: 'indigo' },
  { icon: 'fa-check-double', title: 'Honestidad', description: 'Garantía Glish basada en tu nivel real.', color: 'blue' },
];

export const SCHEDULES: ScheduleOption[] = [
  {
    id: '01',
    tag: 'Tribu Mañana',
    icon: '☀️',
    title: 'Morning Track',
    days: 'Lunes • Miércoles • Viernes',
    time: '07:00 – 09:00 HRS',
    description: 'Perfecto para comenzar el día con máxima energía académica.'
  },
  {
    id: '02',
    tag: '⭐ PREFERENCIA GLISH',
    icon: '💼',
    title: 'Professional Track',
    days: 'Lunes • Miércoles • Viernes',
    time: '19:00 – 21:00 HRS',
    isPopular: true,
    description: 'Diseñado para profesionales que buscan proyectarse globalmente.'
  },
  {
    id: '03',
    tag: 'Tribu Intensiva',
    icon: '⚡',
    title: 'Saturday Intensive',
    days: 'Sábados Únicamente',
    time: '08:00 – 14:00 HRS',
    description: 'Inmersión total de 6 horas en un solo día de alto rendimiento.'
  }
];