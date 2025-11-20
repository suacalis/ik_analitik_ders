export interface WeekData {
  weekNumber: number;
  title: string;
  category: 'Teori' | 'Uygulama' | 'Araçlar' | 'Etik';
  description: string;
  learningObjectives: string[];
  practicalTask: string;
  recommendedReading: string;
}

export interface ToolData {
  name: string;
  description: string;
  category: string;
}

export interface SyllabusData {
  courseTitle: string;
  courseDescription: string;
  tools: ToolData[];
  weeks: WeekData[];
}