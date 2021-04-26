export default interface RssFeedType {
  rssProviderId: string;
  rssFeedId: string;
  title: string;
  preview: string;
  thumbnail: string;
  insertDate: Date;
  providerName: string;
  providerAvatar: string;
  keywords: string[];
}
