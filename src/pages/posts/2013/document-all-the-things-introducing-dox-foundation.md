---
layout: ../../../layouts/post.astro
title: "Document all the things! Introducing dox-foundation"
subtitle: "Auto-generate API documentation for fun and profit"
date: 2013-01-09 19:56
comments: true
categories: [dev]


---
<img src="/images/posts/dox-foundation.png" class="full" />

I've tried, very hard, to read many different types of auto-generated documentation. With the exception of a few tools, I've  always found them to be very unintuitive and unhelpful. So like any nerd who is slightly dissatisfied with something, I set out to build my own. Spurred on by a rather large software project we're about to embark on at [P'unk Ave](http://punkave.com), I quickly put together [dox-foundation](http://github.com/punkave/dox-foundation). Not only was it an oppurtunity to scratch my own itch, this seemed to be that one good way we could help ourselves keep tabs on the quality of the code.

At it's core, it uses [visionmedia/dox](https://github.com/visionmedia/dox) to parse the source code and generate intelligent data. The final HTML output uses [Zurbs's Foundation](http://foundation.zurb.com/) for its look and layout and the glorious [Prism.js](http://prismjs.com/) for it's syntax highlighting.

### How it Install

    npm install -g dox-foundation

There are two ways you can use the tool. To document a single file or have it go over a generate docs for every file in a folder, like `lib`.

### Generate documentation for a single file

If your library is just a single file, you're probably better off with a simple readme. Using dox-foundation is easy enough to use though, so who cares!

    dox-foundation < myfile.js > myfile.html

### Generate documentation for a whole folder

This is were things get fancy. All you need to do is tell dox-foundation where the folder you want it to parse is (`--source`) and what folder you want all the generated files to go in (`--target`)

    dox-foundation --source lib --target docs

This will generate an html file for each javascript source file in the folder and provide a simple navigation between them all.

### Going forward

This is still pretty early code and there is a lot of edge cases left to consider. There is also a lot I would like to see implemented to make the interface as clean and useful as possible. I'll try to keep the [issues](http://github.com/punkave/dox-foundation/issues) as up to date as possible so you can see what I'm thinking. Feel free to send a pull request!
