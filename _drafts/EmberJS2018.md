---
title: "#EmberJS2018: Improve the interoperability of the community and the framework"
category: dev
---
This article is in response to the Ember core team's “Call for blog posts” to propose goals and direction for framework and community in the remainder of 2018. Before I get started, Its seems useful to give a bit of context about my relationship to Ember, which instructs how I came to the points below. I’m a user interface designer and full stack developer (with an unrepentant bent towards the front end). I’ve been developing apps with ember, full time, since version 1.11 (released early 2015). I came to it after several years of developing backbone & react. I was drawn to the ergonomics of it’s component api and the promise of having models/routing/building that just worked. What I care most about is building things that people will use, not really the specifics of what rendering engine, build tool, etc.

My hope for Ember for 2018 (and the future) is improving it’s interoperability as a community and as a framework.

## Improving our interoperability as a community

It’s no secret, from the outside, ember is viewed as a declining framework and an insular community. When you honestly evaluate the signals people would use to make this judgement (stackoverflow, our forum, conference talks, etc), it’s not a surprise. Since EmberConf in March, I’ve seen the community start the process of grappling this in a concerted way and I’ve been very encouraged by the results. Jen Weber and NAME work around StackOverflow, the discussion to address our use of slack and a community driven effort around submitting talks to general JS conferences to name just a few. 

I think one of the most unintentionally detrimental things the ember community has done is making slack it’s primary tool for communication. 

* Slack is a propriety walled garden that you need to create an account for to even read
* The signal to noise ratio in slack, like any chat room, is entirely inefficient. Simultaneous conversations, inconsistent use of threads
* Once you do get in, how do you find answers? There is no history and so questions need to be asked over and over again
* Slack can be intimidating for new users without any social capital in the community. 

*Meanwhile, all of our talent, knowledge and experience is not present in public, searchable channels.* That does not serve existing or potential ember developers.

My hope for the rest of 2018 is to see a continued embrace of truly public channels for communication. I think the discourse forum is an excellent choice for that. It’s open source, completely public, encourages good community, and it has many features to increase signal (top posts, post summarization, useful activity emails). Making that shift will require intentional actions on behalf of the leaders of the community and a while lot of inertia.

* Most questions asked in slack should be redirected to the discourse. The core team members especially should be leading this push
* I think the core teams moving their discussions, meetings notes and plans into discourse will increase the perception of it’s usefulness
* I think one of the reasons slack is so popular (while discourse and StackOverflow aren’t) is it’s not merely a support tool. Discussion, planning and announcements make it feel more like a community place. The structure of discourse should be setup to encourage those things as well. To that end, I’ve proposed a restructuring of the categories

## Improving the interoperability of ember’s technology

The complete, all or nothing buy in required to use Ember, while a necessary component of the strength and longevity of the framework, is also the biggest roadblock to people using it. While I am excited about the “build your way to ember” path discussed in the EmberConf 2017 keynote, I do not see that as a solution to the issues around perception. 

I think we need to increase the surface area of shared knowledge with the larger JS community. This will increase potential inroads and reduce friction for people experimenting with the framework. For example:

* This has been mentioned in several other posts, but making use of npm modules as easy as “ember installing” would be amazing
* Increasing “official” awareness and support of other data layers like Redux, Orbit, Apollo. This reduces the perception of “risk” related to total buy in. It also provides developers experienced in those tools a sense of grounding while the learn other parts of the framework
* Proper WebComponent could also open the door to a larger community
* Support for widely used tools like Storybook.js could provide a less intimidating way for folks to explore component APIs while maintaining workflow continuity for parts of their team

There have been many great posts circling around and I hope my thoughts contribute productively to the conversation. 
