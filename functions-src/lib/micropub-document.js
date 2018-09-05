import dateformat from 'dateformat';
import matter from 'gray-matter';
import _ from 'lodash';
import slugify from 'slugify';

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
                        .omit('content')
                        .omit('h')
                        .pickBy(_.identity)
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
    return this.frontmatter.name || slugify(this.content.split('\n')[0]).toLowerCase();
  }
}