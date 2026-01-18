
export interface UserAccount {
  username: string;
  name: string;
  password?: string;
  role: 'admin' | 'user';
}

export interface DiagnosisResult {
  diseaseName: string;
  confidence: number;
  description: string;
  symptoms: string[];
  preventions: string[];
  treatments: string[];
}

export interface WeatherData {
  temp: number;
  humidity: number;
  light: number;
  timestamp: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  image?: string;
}

export interface RecommendationItem {
  id: string;
  type: 'seed' | 'fertilizer' | 'pesticide';
  name: string;
  description: string;
  tags: string[];
  benefit: string;
}

export interface WateringAlarm {
  id: string;
  time: string;
  days: string[];
  isActive: boolean;
  label: string;
}
