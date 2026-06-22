# Central Link Toastmasters Visual Style Guide

This guide documents the visual language established by the landing page. Use it when updating the dashboard, admin portal, tables, forms, modals, and future pages so the entire website feels like one product.

## Design Direction

The interface should feel cinematic, premium, welcoming, and distinctly Toastmasters-branded.

Core principles:

- Let authentic club photography carry the emotional impact.
- Protect readability with targeted, scroll-aware overlays instead of permanently obscuring the full image.
- Use navy as the structural color, maroon sparingly, and light gold for emphasis.
- Keep layouts spacious and deliberate.
- Use Gotham Condensed only for high-impact brand moments.
- Use Myriad Pro Light for normal interface and supporting text.
- Prefer subtle borders, translucent surfaces, and restrained motion over heavy decoration.
- Keep cinematic effects performant: transform and opacity are preferred over continuously animated filters.

## Brand Palette

### Core Colors

| Token | Value | Usage |
| --- | --- | --- |
| Navy Dark | `#0f1d38` | Primary dark background, overlays, high-contrast text surfaces |
| Navy | `#1a2f5a` | Structural surfaces, primary actions, icons |
| Navy Light | `#2d4a7c` | Hover states and secondary navy accents |
| Maroon | `#800020` | Selective Toastmasters accent and important destructive actions |
| Maroon Dark | `#5c0017` | Maroon hover states |
| Light Gold | `#f4dc8a` | Premium highlights, emphasized words, icons, focus accents |
| Gold | `#e8c867` | Active indicators, hover accents, decorative lines |
| White | `#ffffff` | Primary text on dark surfaces |

### Supporting Neutrals

- Main light-page background: `#f5f6f8`
- Warm pale highlight: `#fff8e1`
- Dark text: `#111827`
- Muted dark-surface text: `rgba(255, 255, 255, 0.58)` to `rgba(255, 255, 255, 0.78)`
- Subtle dark-surface border: `rgba(255, 255, 255, 0.12)` to `rgba(255, 255, 255, 0.22)`

### Color Rules

- Use gold for emphasis, not as a large background color.
- Use maroon as a selective accent; avoid pairing maroon and gold everywhere.
- On photographic backgrounds, use white text with a localized navy overlay.
- Maintain WCAG-readable contrast for all labels, buttons, and body copy.

## Typography

### Font Faces

```css
/* High-impact landing-page brand text only */
font-family: 'GothamCondensed-Bold', sans-serif;
font-family: 'GothamCondensed-Light', sans-serif;

/* Normal interface and supporting text */
font-family: 'MyriadPro-Light', Arial, Helvetica, sans-serif;
```

### Gotham Condensed Usage

Use Gotham Condensed only for:

- Main landing hero title
- Highlighted landing title line
- “Where Leaders Are Made” slogan
- Landing wordmark
- Closing landing statement: “Every meeting moves the story forward.”

Do not use Gotham Condensed for:

- Dashboard body copy
- Tables
- Forms
- Admin controls
- Descriptions
- Modal content
- Standard buttons

### Hero Title Treatment

- “Welcome to the”: Gotham Condensed Light, weight `300`
- “Central Link Toastmasters”: Gotham Condensed Bold, italic, light gold
- “Member Dashboard”: Gotham Condensed Bold
- Desktop size: `clamp(3.25rem, 5.5vw, 5.75rem)`
- Mobile size: `clamp(3rem, 13vw, 4.35rem)`
- Line height: `0.96`
- Letter spacing: approximately `0.015em`

### Normal Text Treatment

- Myriad Pro Light, weight `300`
- Body line height: `1.5` to `1.65`
- Avoid overly small supporting copy; keep meaningful content around `0.9rem` or larger.
- Small uppercase metadata may use `0.08em` to `0.12em` tracking.
- Do not apply wide tracking to paragraphs or form values.

### Suggested Product Hierarchy

| Role | Suggested Size | Treatment |
| --- | --- | --- |
| Page title | `2rem` to `3rem` | Myriad Pro Light, strong contrast |
| Section title | `1.5rem` to `2rem` | Myriad Pro Light |
| Card title | `1.1rem` to `1.35rem` | Semibold visual weight |
| Body | `0.95rem` to `1.05rem` | Line height `1.5` to `1.65` |
| Label / eyebrow | `0.7rem` to `0.8rem` | Uppercase, tracked |
| Table text | `0.84rem` to `0.95rem` | Compact but readable |

## Layout And Spacing

### Page Container

```css
width: min(100% - 4rem, 90rem);
margin-inline: auto;
```

Mobile:

```css
width: min(100% - 1.5rem, 90rem);
```

### Spacing Rhythm

Use a consistent spacing scale:

- `0.5rem`: tightly related elements
- `0.75rem`: icon-to-label and compact control gaps
- `1rem`: standard internal spacing
- `1.5rem`: card padding and grouped content
- `2rem`: section padding
- `3rem` to `5rem`: major content separation
- `4rem` to `8rem`: desktop column gaps and hero breathing room

### Alignment

- Prefer clean left alignment for information-heavy views.
- Center alignment is reserved for ceremonial or empty states.
- Keep labels close to their associated fields.
- Use vertical hierarchy for selectable dashboard years and major navigation choices.

## Photography And Overlays

Use authentic club photography as a full-bleed background when creating high-emotion pages.

Current landing image:

```text
/pictures/PXL_20241229_143423600-2.jpg
```

Photo treatment:

```css
background-size: cover;
background-position: center;
transform: scale(var(--landing-background-scale));
```

Overlay strategy:

- The hero uses a navy gradient overlay for text contrast.
- The hero overlay fades away on scroll to reveal the photograph clearly.
- The closing state uses a separate pre-blurred background image layer that fades in with opacity.
- Avoid animating large `backdrop-filter` values on scroll; it causes visible slowdown.
- Avoid uniform opaque navy overlays over the entire page for the full experience.

### Scroll-Linked Background

The landing background is fixed and scales as the user scrolls.

```css
.landing-background {
  position: fixed;
  inset: 0;
  background-image: url('/pictures/PXL_20241229_143423600-2.jpg');
  background-size: cover;
  background-position: center;
  transform: scale(var(--landing-background-scale));
}
```

Current zoom range:

```ts
1.015 + progress * 0.16
```

Use `requestAnimationFrame` for scroll updates and cache layout measurements. Recalculate section positions on resize rather than querying layout on every scroll frame.

### Photo Ribbon

The landing page includes a horizontal photo ribbon after the hero.

Rules:

- Use square `1 / 1` image cards.
- No rounded corners and no frames.
- Use real club photos from `/public/pictures`.
- Randomize the image order once per page visit.
- Keep the order stable during the visit; do not reshuffle while scrolling.
- Start ribbon movement before the ribbon enters the viewport.
- Move the ribbon with `transform: translate3d(...)`.
- Add strong floating shadows so cards separate from the photographic background.

```css
.landing-ribbon-track {
  display: flex;
  gap: clamp(1rem, 2vw, 2rem);
  transform: translate3d(var(--landing-ribbon-offset), 0, 0);
}

.landing-ribbon-track img {
  aspect-ratio: 1;
  object-fit: cover;
  box-shadow:
    0 1.5rem 3.5rem rgba(0, 0, 0, 0.68),
    0 0.35rem 1rem rgba(0, 0, 0, 0.5);
}
```

### Closing Slideshow

The final landing section uses a full-bleed right-side slideshow.

Rules:

- Use a two-column split on desktop.
- Keep text padded in the left column.
- Remove slideshow padding on the top, right, and bottom.
- Let the slideshow touch the glass panel edge.
- Use a long left-edge mask so the image melts into the text area.
- Randomize slideshow order once per page visit.
- Cycle through every selected ribbon image.
- Each image gets a two-second slot.
- Decorative slideshow images use empty `alt`, `aria-hidden="true"`, `loading="lazy"`, and `decoding="async"`.

```css
.landing-story {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(24rem, 1.1fr);
  overflow: hidden;
}

.landing-story-content {
  padding: clamp(3rem, 5vw, 5rem);
}

.landing-story-slideshow {
  align-self: stretch;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 12%,
    rgba(0, 0, 0, 0.48) 35%,
    black 62%
  );
}
```

Mobile slideshow:

- Stack below the text.
- Use a vertical mask from top to bottom.
- Show only the first image when `prefers-reduced-motion: reduce`.

## Surfaces

### Glass Panel

Use for dashboard selectors, modal headers, and high-priority floating panels.

```css
background: rgba(8, 17, 34, 0.76);
border: 1px solid rgba(255, 255, 255, 0.22);
backdrop-filter: blur(24px);
box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42);
border-radius: 1.5rem;
```

For scroll-heavy sections, prefer a translucent fill plus a separately composited blurred layer behind it. Do not animate panel `backdrop-filter` during scroll.

### Closing Story Panel

The final landing statement uses a wide, compact glass panel rather than a square card.

```css
background: rgba(8, 17, 34, 0.62);
border: 1px solid rgba(255, 255, 255, 0.2);
border-radius: clamp(1.75rem, 4vw, 3.5rem);
box-shadow: 0 2.5rem 7rem rgba(0, 0, 0, 0.35);
```

The panel should have clear breathing space from the viewport edges:

```css
width: min(calc(100% - 8rem), 82rem);
margin: clamp(4rem, 10vh, 8rem) auto;
```

### Light Product Card

Use for dashboard statistics, forms, and content blocks.

```css
background: #ffffff;
border: 1px solid #e5e7eb;
border-radius: 1rem to 1.5rem;
box-shadow: 0 18px 45px rgba(15, 29, 56, 0.08);
```

### Borders

- Use subtle borders to define hierarchy.
- Dark surfaces: white at `0.12` to `0.22` opacity.
- Light surfaces: gray `#e5e7eb` or gold at low opacity.
- Avoid thick decorative borders.

## Buttons And Interactions

### Primary Action

- Navy or gold background depending on context.
- Clear readable label.
- Rounded corners between `0.75rem` and `1rem`.
- Visible focus ring using light gold.

### Secondary Action

- Transparent or light background.
- Border-led design.
- Lower visual prominence than the main task.

### Tertiary/Admin Action

- Keep administrative access visually subdued.
- Use transparent background and an understated underline/border.
- Do not compete with member-facing dashboard selection.

### Hover Behavior

Use restrained motion:

- Translate upward by `1px` to `4px`.
- Reveal a gold active line.
- Shift an arrow icon slightly or rotate it.
- Increase surface contrast subtly.

Avoid:

- Large scaling
- Continuous animation
- Excessive glow
- Multiple simultaneous motion effects

### Focus States

```css
outline: 3px solid rgba(244, 220, 138, 0.9);
outline-offset: 4px;
```

Never remove focus visibility without replacing it.

## Dashboard Selection Pattern

Dashboard-year choices use a clear vertical hierarchy:

1. Small sequence number
2. Uppercase “Programme year” label
3. Prominent dashboard year
4. Supporting full dashboard title
5. Circular directional arrow

Interaction:

- Entire row is clickable.
- Gold active line appears on hover.
- Background contrast increases on hover.
- Arrow rotates to indicate forward movement.

Use this pattern for other high-level navigation choices.

## Forms And Admin Views

- Keep Myriad Pro Light for form labels, values, helper text, and buttons.
- Labels may be uppercase with restrained tracking.
- Fields should use white backgrounds, soft gray borders, and gold focus rings.
- Group related fields inside subtle light-gray or warm-gold-tinted panels.
- Error messages use maroon text and low-opacity maroon backgrounds.
- Success messages use green text with pale green backgrounds.
- Preserve large touch targets on mobile.

## Tables And Data-Dense Views

- Use Myriad Pro Light for all table content.
- Keep table labels readable; avoid text below `0.84rem`.
- Sticky headers and columns should retain clear background separation.
- Use pill-shaped metrics sparingly to aid scanning.
- Keep hover rows subtle and warm: `#faf7ef`.
- Use navy, maroon, gold, and gray consistently to distinguish metric categories.

## Modals

- Use navy radial-gradient headers with gold accent details.
- Use white modal bodies with clear content grouping.
- Keep close buttons visible and keyboard accessible.
- Use strong heading hierarchy and restrained supporting copy.
- Mobile modals may anchor to the bottom with rounded top corners.

## Motion

Entrance motion:

```css
from {
  opacity: 0;
  transform: translateY(20px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
```

Timing:

- Standard duration: `0.8s`
- Stagger delays: `0.2s`, then `0.4s`
- Easing: `ease-out`

Always respect `prefers-reduced-motion`.

### Scroll Motion

Use scroll-linked effects sparingly:

- Background zoom: transform only.
- Hero overlay fade: opacity only.
- Photo ribbon: transform only.
- Closing dark/blurred state: fade a pre-blurred layer with opacity.

Avoid:

- Repeated `querySelector` calls inside scroll frames.
- `getBoundingClientRect()` inside every animation frame.
- Animating large `filter` or `backdrop-filter` values on scroll.
- Loading full-resolution source photos into small decorative cards.

### Slideshow Motion

The closing slideshow uses CSS opacity animation. Timing is assigned per image in React:

```tsx
style={{
  animationDelay: `${index * 2}s`,
  animationDuration: `${randomizedSlideshowImages.length * 2}s`,
}}
```

The keyframe should keep each image visible for roughly one slot and fade cleanly before the next image.

## Responsive Rules

### Desktop

- Two-column hero layout.
- Large spacing between narrative content and action panel.
- Show the Toastmasters slogan in navigation.
- Keep the final story panel as a wide two-column split with full-bleed imagery on the right.

### Tablet

- Stack primary columns.
- Keep the dashboard panel no wider than approximately `35rem`.
- Preserve generous spacing between sections.
- Keep the slideshow visible, but reduce minimum width constraints as needed.

### Mobile

- Hide the navigation slogan to protect space.
- Stack all content.
- Reduce outer margins to `0.75rem`.
- Keep buttons full-width and touch-friendly.
- Preserve the vertical dashboard selection hierarchy.
- Keep the background image visible with a stronger localized overlay behind text.
- Stack the closing story text above the slideshow.
- Use a vertical slideshow mask instead of a left-edge horizontal mask.

## Accessibility

- Use semantic headings and buttons.
- Ensure the full dashboard option row is keyboard interactive.
- Maintain visible focus rings.
- Add useful alt text to meaningful images.
- Mark decorative layers with `aria-hidden="true"`.
- Decorative photo ribbon and slideshow images should have empty `alt` text.
- Respect reduced-motion preferences.
- Preserve readable contrast over photography.

## Implementation Reference

Primary files:

- `src/components/LandingPage.tsx`
- `src/styles/landing.css`
- `src/styles/fonts.css`
- `tailwind.config.js`

Current landing assets:

- Main hero background: `/pictures/PXL_20241229_143423600-2.jpg`
- Optimized closing blur layer: `/pictures/PXL_20241229_143423600-2-web.jpg`
- Ribbon and slideshow images: selected `.jpg` files in `/public/pictures`
- Toastmasters logo: `/toastmasters-logo.png`

When extending this system, reuse the established tokens and interaction patterns before adding new colors, font families, border radii, shadows, or animation styles.
