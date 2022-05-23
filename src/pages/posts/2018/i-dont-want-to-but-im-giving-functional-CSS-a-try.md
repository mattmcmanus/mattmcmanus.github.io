---
title: I don't want to but I'm giving functional CSS a try
subtitle: I need to stop telling new CSS tech to get off my lawn...
date: 2018-08-26
layout: ../../../layouts/post.astro
categories: [dev]
published: true
---
I’ve been writing CSS for a long time. I like it and it makes sense to me. I’m often bewildered by folks who have such a hard time with it. I was raised on Eric Meyer's and Jeffery Zeldman’s Web standards and semantic html purity laws. Those ideas are buried deep in my psyche. However, you may not have noticed, but web development has changed a lot in the last 20 years! I’ve learned many new things over that time, but it’s been a long time since I’ve evaluated where I stand with CSS. For this post, I’m not going to do a detailed how-to or deep dive. I’m going to walk you through some thoughts and observations I’ve had as I take my first stab at functional css. Let’s begin!

## Unlearning

One of the primary tenets of the ol’ semantic HTML dogmas is the separation of content and presentation. What this means is your HTML should consist of simple, semantic descriptions of you content. If it’s properly done, it should be free from any information related to the visual display of that content. Your CSS should contain all visual information, organized with semantic class names. I love this pattern for developing websites and you should too. It’s powerful in its simplicity and elegance.

The question, as always with any technical pattern, is how far do you take it and what is “correct”. The heaven that this semantic markup approach preached was the ability to redesign your site without changing any markup. Swap out a css file to achieve zen!

After 15 years of writing css, had I ever achieved zen? Well...no. The reality is the second you add that extra div to aid in the styling of a certain set of elements, you've embedded visual dependencies into your markup. The more you do that, the likelihood of your markup surviving a redesign dwindles. It's only recently that tooling such as flexbox and css grid, have made this practically attainable.

Component focused development has helped to reduce duplication and provide clear guidance on how to organize your styles. But it can still be haphazard and messy work. It’s also impossible to deny the explicit and unambiguous productivity boost utility classes such as `.text-center` provide. These classes break the semantic contract, but do so with obvious benefits.

Writing this all out has been helpful. I still think semantic html is important, but if I’m honest with myself, I’m open to the idea of unsemantic css. I’m ready to take the next step.

## Enter tailwind

What I’m looking for is something simple and unobtrusive that lets me think in CSS without having to worry about organization or naming. This is where functional css enters the picture. Functional css says to-hell with semantic styles (mostly). Tools like tailwind generate thousands of css attribute specific utility classes. You then compose them in your html. You no longer create a `container` class. You apply `mx-auto max-w-lg`. Sounds promising!

But I need to be honest with you. The first 10 times I tried to consider tailwind, I was appalled. It seemed like a bait and switch. Sure, that looks fine for a hello world app, but how can that scale? What about responsive css? Animation? I shuddered to think of what a template would look like for any moderately complex design. However, enough people have strongly recommended this that I had to at least put it into practice before I completely wrote it off. So I set out to redo this website using tailwind. Here are some lessons now that I’ve finished:

## Lessons

* Tailwind generates a lot of css. I was really concerned about its file size when I started. I wasted a lot of time trying to tweak the config to generate a smaller payload. It wasn’t worth it. Figure out how to setup a tool like `purgecss` instead. It will automatically strip unused classes from you css payload and save you a lot of time and kilobytes
* Tailwind has the idea of composing its utility classes in css to generate component classes (think of bootstrap's `.btn`). This is super handy. I used this same pattern for styling raw HTML elements as well. I wasn’t about to add utility classes to all the `<h1>`’s in my markdown files! [This is what I came up with](https://github.com/mattmcmanus/mattmcmanus.github.io/blob/master/src/tailwind.css#L51-L102)
* Tailwinds classes are mobile first. Lean into this and don’t fight it (for whatever reason, I did). Start with a mobile preview and work your way up. I was surprised by how effective the utility classes were for this.
* If you find yourself duplicating a group of classes a lot, before considering creating a css component, explore templating options within your toolkit. Could that html be just as easily embedded through and partial or include rather than a dedicated component class name? Compositing the css classes is what makes tailwind quick and simple to use. Each new component slows you down a bit
* Tailwind is still a work in progress. There are still gaps in its flexbox support and animations are nonexistent. It’s plugin system works well to fill in some spots, [specifically for transitions](https://www.npmjs.com/package/glhd-tailwindcss-transitions). However, I found the quality isn’t quite as high as the standard library and having to find them less than straight-forward
* I found the quickest way to get used to the new classes is to keep it’s generated css open in separate a pane. Searching it for the css I wanted was the easiest way to figure out what the class names are. The numbering scheme, (`.mb-1` = `margin-bottom: .25rem` and `.mb-4` = `margin-bottom: 1rem`) took me a long time get used too. Why does 4 equal 1rem? It wasn't intuitive at first

All in all, I’m pleased with the outcome. I like how DRY and fast the CSS is. I LOVE how nicely it works with `purgecss`. I like how quickly I can sketch out designs. The big learning curve for me, and the thing that gives me the most pause, is [how gnarly the templates can get](https://github.com/mattmcmanus/mattmcmanus.github.io/blob/master/_layouts/book.html#L6).I think the framework’s component approach by using `@apply` is critical to address things. However, there is a subtlety to how and when to use it that’s still not completely clear to me.

Will I be switching any big apps to it anytime soon? No. Will I evaluate it on a new project? Definitely.

### Acknowledgments

Thanks to [Sam Selikoff](https://twitter.com/samselikoff) and [Luke Melia](https://twitter.com/lukemelia) for the feedback on this post.