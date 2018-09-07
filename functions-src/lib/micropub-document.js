import dateformat from 'dateformat';
import matter from 'gray-matter';
import _ from 'lodash';
import slugify from 'slugify';

const MAX_SLUG_LENGTH = 20;
const VALID_KEYS = ['name', 'mp-slug', 'category', 'location', 'in-reply-to', 'repost-of', 'syndication', 'mp-syndicate-to', 'bookmark-of'];
const KEY_TRANSLATION = {
  category: 'tags'
}

export default class MicropubDocument {
  constructor(object) {
    this.rawObject = object;
    this.content = object.content;
    this.type = !object.name ? 'note' : 'post';
    this.createdAt = new Date();
    this.setupFrontmatter();
  }

  setupFrontmatter() {
    this.frontmatter = _.chain(this.rawObject)
                        .pick(VALID_KEYS)
                        .pickBy(_.identity)
                        .mapKeys((value, key) => KEY_TRANSLATION[key] || key)
                        .value();
  }

  async toYAML() {
    this.frontmatter.date = dateformat(this.createdAt,'yyyy-mm-dd HH:MM:ss');

    return matter.stringify(this.content, this.frontmatter);
  }

  path() {
    return `_${this.type}s/${dateformat(this.createdAt,'yyyy-mm-dd')}-${this.slug()}.md`;
  }

  slug() {
    let firstSentenceArray = this.content.split('\n')[0].split(' ');
    let trimmedSentence = _.take(firstSentenceArray, MAX_SLUG_LENGTH).join(' ');
    return slugify(this.frontmatter['mp-slug'] || this.frontmatter.name || trimmedSentence).toLowerCase();
  }
}