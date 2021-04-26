const ContentsParser = class {
  extractKeyword(content: string): string[] {
    return [];
  }
  getPreview(content: string): string {
    return content.slice(0, 40);
  }
};

export default new ContentsParser();
