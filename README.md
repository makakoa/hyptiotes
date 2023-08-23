# Hyptiotes.js

Hyptiotes ("HIP-tee-oh-tees"), aka the triangle weaver, is [known for using a spring loaded triangular web.](https://www.theatlantic.com/science/archive/2019/05/hyptiotes-a-spider-that-makes-a-spring-loaded-web/589303/)

Like the weaver, Hyptiotes.js is an *exploratory* **web building framework** aiming to spring load the web trinity (HTML + CSS + JS) by pulling everything into JS.

Doing this has several key benefits:
- Increased cohesion and consistency between HTML / CSS / JS (in patterns and practice)
- Extend functional / dynamic behavior to HTML and CSS
- Reduction in semantic and syntactic complexity

Hyptiotes is intended to be a *Web **Building** Framework*, not necessarily an Application Framework. It can be used to make an application, but it doesn't have to be. Just like any of the basic web stack. With a little extension there's no reason it couldn't be used on top of an application framework like React to replace JSX.

## Rationale:

Imagine you were to reinvent the web today knowing how it would take shape. Would you split the web stack into HTML, CSS and JS? Probably not*.
While their applications may vary, at the end of the day HTML (a decorated tree) and CSS (a list of rulesets) are just data. Simple data.
There is no reason we can't represent our markup tree and rulesets list data in JS primitives from the start. In most cases JS ends up managing the two anyhow.

> *Not the point, but I think I'd imagine a metadata object (SEO, policies, resources, etc) which might define a preload.js (intiate some amount of page, dynamic loading) and a list of page resources to kick off

### Where hyptiotes differs:

Many frameworks try a similar tactic. However often times in an effort to bring two things together, these frameworks end up creating a third. JSX for example is neither JS or HTML, requires compiling for use, and introduces new syntax for bridging JS and markup.

## Driving Concepts

Goal: Rework building web with minimal magic and little inconvenience

Means: Leverage the best of vanilla, bridging only the least smooth interfaces.

Particularly:
 - the separation of view, logic, and style
 - the lack of dynamic / functional html and css
 - abstract apis: managing dom, adding event listeners

Framework Design Principles:
 - Don't add magic, enable magic. Keep as much logic above board as possible.
 - Web has quirks, don't hide them with more quirks. Keep it simple. Keep it vanilla.
 - This is a web framework, not an application framework. It should not be "smart" or stateful in itself.
