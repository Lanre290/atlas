// src/models/mission.ts
export interface Mission {
  id: string;
  name: string;
  description?: string;
  agency?: string;
  leadOrganization?: string;
  target?: string;
  status?: string;
  launchDate?: string;
  endDate?: string;
  website?: string;
  principalInvestigators?: string[];
  sources: string[];
}