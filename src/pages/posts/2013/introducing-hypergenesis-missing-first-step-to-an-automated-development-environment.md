---
layout: ../../../layouts/post.astro
title: "Introducing Hypergenesis"
subtitle: "The missing first step to an automated development environment"
date: 2013-06-11 15:29
comments: true
categories: [dev]

---
I'm a big fan of devops. Using code to configure servers makes their setup predictable and infinitely repeatable. This makes setting up new servers fast, cheap (time = money) and ultimately results in *peace of mind*. So like many nerds, I was excited to see that Github released a tool, [boxen](https://github.com/boxen), that applies these principles to development machines. However, things weren't as beautiful and care-free as I was hoping. As their website itself says, Boxen is "a dangerously opinionated framework" and I ultimately gave up using it citing a clinically diagnosed case of framework fatigue.

To boxen's credit, their opinions are related to very specific goals, and the more I tried to use it, the clearer it became that I had fundamentally different goals. Once I had that "A ha!" moment, it was only a matter of asking myself a simple question:

### What are my goals for managing a development machine?

That's easy! **I never want to feel any anxiety about how long it will take me to be up and programming productively if my machine blows up**. Do I care about each small setting being kept in line over time? No. Dev machines are volatile and for that reason puppet (the software that boxen is built on) is overkill. All I want is a fresh install of OS X to be *usable* as fast as possible.

Usable means many things to many people. For me, a usable setup involves a couple things: As much configuration as possible is kept in [dotfiles](https://github.com/mattmcmanus/dotfiles). I also develop as much as I can in a [vagrant](http://vagrantup.com) controlled environment. There are many reasons why this a great setup but I won't dive into that now. Onward!

### Shazam! Introducing Hypergenesis

**[Hypergenesis](https://github.com/mattmcmanus/hypergenesis)** is my first attempt at solving this problem. It's a bash script that you can configure and run after you install the XCode command line tools.

Hypergenesis tries to be as simple as possible and only does a couple things. It:

1. Installs homebrew and a bunch of useful brew apps (like git, etc)
2. Clones your dotfiles repo and sources it
3. Installs [nvm](https://github.com/creationix/nvm) and RVM and the latest versions of node.js and ruby
4. (My favorite part) Installs all the mac apps I rely on daily (Chrome, vagrant, virtualbox, 1password, etc)

All of the apps and repos are configurable at the top of the script. It's my hope that this makes it easy for you to specify your own dotfiles or add/remove apps as you wish. [Check out the readme](https://github.com/mattmcmanus/hypergenesis#readme) for all the gory details. **I'd love feedback! Please send pull requests.**
