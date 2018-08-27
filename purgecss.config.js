class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}

module.exports = {
  content: ['_site/**/*.html'],
  css: ['_site/styles.css'],
  whitelist: [],
  extractors: [
    {
      extractor: TailwindExtractor,
      extensions: ['html']
    }
  ]
}
