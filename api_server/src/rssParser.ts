import rssParser from 'rss-parser'

const Parser = class {
  public parser = new rssParser();
  async getFeed(url: string){
    const feed = await this.parser.parseURL(url);
    console.log(feed.items);
    
    feed.items.forEach(item => {
      console.log(item.title + ':' + item.link);
    });
  }
};
export default new Parser();