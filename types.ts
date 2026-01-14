
export interface Message {
  role: 'user' | 'model';
  content: string;
  image?: string;
}

export interface Pillar {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface ScheduleOption {
  id: string;
  tag: string;
  icon: string;
  title: string;
  days: string;
  time: string;
  isPopular?: boolean;
  description: string;
}
