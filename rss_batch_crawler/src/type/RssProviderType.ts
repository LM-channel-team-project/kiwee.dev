export type providerType = 'Medium' | 'TStory' | 'Velog' | 'Other';

export interface RssProviderRequest {
  
}
export interface RssProviderType {
  providerId: string;
  providerName: string;
  providerEmail: string;
  providerAvatar: string;
  providerType: providerType;
  rssLink: String;
  lastModifiedTime: Date;
  numOfArticles: number;
}
