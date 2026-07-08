export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  treatment: string;
  avatarUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl: string;
  bullets: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  treatment: string;
  message?: string;
  date?: string;
  time?: string;
  status: 'new' | 'contacted' | 'completed';
  timestamp: string;
  notificationsSent?: {
    email: boolean;
    sms: boolean;
    staff: boolean;
    timestamp: string;
  };
}
