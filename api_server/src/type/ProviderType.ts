export interface ProviderType {
  providerId: string;
  name: string;
  email: string;
  avatar: string;
  rssLink?: string;
  likes?: string[];
  lastModifiedTime?: Date;
}
