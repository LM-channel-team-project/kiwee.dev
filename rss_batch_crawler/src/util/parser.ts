// RSS Parser
import Parser from 'rss-parser';
type CustomFeed = {};
export type CustomItem = {
  'content:encoded': string;
  description: string;
};
export default new Parser<CustomFeed, CustomItem>({
  customFields: {
    item: ['content:encoded', 'description'],
  },
});
