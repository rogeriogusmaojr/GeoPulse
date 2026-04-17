export interface GeolocationData {
  id: string;
  lat: number;
  lng: number;
  accuracy?: number;
  timestamp: string;
  clientId: string;
  status: 'active' | 'inactive' | 'warning';
  deviceName: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  lastLocation?: {
    lat: number;
    lng: number;
  };
  status: 'online' | 'offline';
  joinedDate: string;
  category: 'logistics' | 'retail' | 'tech' | 'services';
}

export interface Insight {
  id: string;
  type: 'growth' | 'alert' | 'info';
  message: string;
  timestamp: string;
}
