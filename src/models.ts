import { WritableSignal } from '@angular/core';

export interface SymptomQuestion {
  id: number;
  text: string;
  options: string[];
  selection: WritableSignal<string | null>;
}

export interface ResearchFile {
  id: string;
  type: 'file';
  title: string;
  content: string;
}

export interface ResearchFolder {
  id: string;
  type: 'folder';
  title: string;
  isOpen: WritableSignal<boolean>;
  children: (ResearchFolder | ResearchFile)[];
}

export type ResearchDocument = ResearchFolder | ResearchFile;


export interface ChatMessage {
    id: number;
    role: 'user' | 'model' | 'error';
    text: string;
}
