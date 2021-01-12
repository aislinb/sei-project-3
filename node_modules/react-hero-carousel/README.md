# React Hero Carousel

![Example](./demo.gif)

## Features

Inspired by [Supersized][supersized] jQuery slideshow plugin, the React Hero Carousel aims to be a bold, no-config hero banner carousel for landing pages implemented without external dependencies in React.

- Cross-fade between slides
- CSS-only transitions
- No keyboard controls
- Zero-config

## Getting Started

### Prerequisites

Besides requiring React, this build also expects support for [CSS Modules][css-modules].

It's also recommended to include a [CSS Reset][reset-css] to avoid positioning issues.

### Installation

#### Using NPM

```bash
npm install react-hero-carousel
```

#### Using Yarn

```bash
yarn add react-hero-carousel
```

### Usage

For all examples with source, see the [demo][examples].

#### Zero-config

```jsx
import React from "react";
import HeroCarousel from "react-hero-carousel";

export default () => (
  <HeroCarousel>
    <img
      src="https://placem.at/places?w=1920&h=1080&seed=1&txt=1"
      width="100%"
      height="100%"
    />
    <img
      src="https://placem.at/places?w=1920&h=1080&seed=2&txt=2"
      width="100%"
      height="100%"
    />
    <img
      src="https://placem.at/places?w=1920&h=1080&seed=2&txt=2"
      width="100%"
      height="100%"
    />
  </HeroCarousel>
);
```

#### Custom Interval (milliseconds)

Must be at least 1200 ms

```jsx
<HeroCarousel interval={8000}>{/* slides */}</HeroCarousel>
```

[supersized]: https://github.com/buildinternet/supersized
[css-modules]: https://css-tricks.com/css-modules-part-1-need/
[reset-css]: https://www.npmjs.com/package/reset-css
[examples]: https://yanneves.github.io/react-hero-carousel
