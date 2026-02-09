
export interface Zikr {
  id: number;
  text: string;
  count: number;
  benefit: string;
  category: 'morning' | 'evening';
}

export interface ProgressState {
  [key: string]: number; // key: category-id
}

export enum AzkarCategory {
  MORNING = 'morning',
  EVENING = 'evening'
}
