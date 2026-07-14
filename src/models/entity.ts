// src/models/entity.ts
export interface Entity {
  id: string; // A unique Atlas-generated ID
  name: string;
  type: string;
  identifiers: string[];
  sources: string[];
  originalResults: any[]; // Keep a reference to the raw payloads for UI/debugging
}