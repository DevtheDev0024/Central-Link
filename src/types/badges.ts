import type { ElementType } from 'react';
import type { Member } from './member';

export type BadgeTone = 'navy' | 'gold' | 'maroon' | 'blue' | 'gray';

export type BadgeDefinition = {
  id: string;
  name: string;
  benchmark: number;
  description: string;
  message: string;
  imageSrc: string;
  icon: ElementType;
  tone: BadgeTone;
  getScore: (member: Member) => number;
};

export type PointsModalTab = 'scoring' | 'calculator';

export type ScoringRule = {
  title: string;
  icon: ElementType;
  tone: BadgeTone;
  points: string[];
};

export type BadgeCalculatorRule = {
  id: string;
  name: string;
  requiredPoints: string;
  pointsPerAction: string;
  estimatedActions: string;
  examplePathway: string;
  message: string;
  icon: ElementType;
  tone: BadgeTone;
};
