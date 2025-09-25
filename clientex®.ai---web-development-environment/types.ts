// Fix: Create types.ts to define shared interfaces
import type React from 'react';

export interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
  tooltipText?: string;
}

export interface Tab {
  id: string;
  title: string;
  content: {
    heading: string;
    text: string;
    image: string;
  };
}

export interface AISuggestion {
  file: string;
  suggestion: string;
  explanation: string;
  suggestedCode?: string;
}

export interface Template {
  id: string;
  name: string;
  html: string;
  css: string;
  js: string;
}