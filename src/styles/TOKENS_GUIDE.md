# SCSS Token System Reference

## Quick Reference

### Colors
```scss
$color-primary         // #1a1a1a - Main text/borders
$color-secondary       // #ebebeb - Background/surface
$color-bg              // Alias for primary
$color-surface         // Alias for secondary
$color-text            // Alias for primary
$color-text-inv        // Inverse text (light on dark)
$color-border          // Transparent border color
```

### Spacing (Base: 0.25rem = 4px)
```scss
$space-0    // 0
$space-1    // 0.25rem (4px)
$space-2    // 0.5rem (8px)
$space-3    // 1rem (16px)
$space-4    // 1.5rem (24px)
$space-5    // 2rem (32px)
$space-6    // 3rem (48px)
$space-7    // 4rem (64px)

// Semantic aliases
$space-xs   // = $space-1
$space-sm   // = $space-2
$space-md   // = $space-3
$space-lg   // = $space-4
$space-xl   // = $space-5
$space-2xl  // = $space-6
$space-3xl  // = $space-7
```

### Typography
```scss
// Sizes
$text-xs    // 0.75rem
$text-sm    // 0.875rem
$text-base  // 1rem
$text-lg    // 1.25rem
$text-h3    // 1.75rem
$text-h1    // 4.1875rem

// Weights
$weight-light   // 200
$weight-normal  // 400
$weight-bold    // 700

// Line heights
$leading-none   // 1
$leading-tight  // 1.25
$leading-normal // 1.5
$leading-loose  // 2
```

### Transitions
```scss
// Durations
$duration-fast  // 150ms
$duration-base  // 200ms
$duration-slow  // 500ms

// Easing
$ease-default   // ease
$ease-snappy    // cubic-bezier(0.4, 0, 0.2, 1)
$ease-bouncy    // cubic-bezier(0.68, -0.55, 0.265, 1.55)

// Combined (use these!)
$transition-fast    // 150ms ease
$transition-base    // 200ms cubic-bezier(0.4, 0, 0.2, 1)
$transition-slow    // 500ms ease-in-out
$transition-bouncy  // 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Borders & Radius
```scss
// Widths
$border-none    // 0
$border-thin    // 1px
$border-medium  // 2px
$border-thick   // 4px

// Radius
$radius-none   // 0
$radius-sm     // 4px
$radius-md     // 8px
$radius-lg     // 12px
$radius-xl     // 16px
$radius-2xl    // 24px
$radius-full   // 9999px
```

### Icons
```scss
$icon-xs   // 0.75rem
$icon-sm   // 1rem
$icon-md   // 1.25rem
$icon-lg   // 1.5rem
$icon-xl   // 2rem
```

## Mixins

### `@include transition()`
Shorthand for transitions
```scss
.element {
  @include transition; // all, 200ms, snappy
  @include transition(transform); // specific property
  @include transition(opacity, $ease-default, $duration-fast);
}
```

### `@include border-alpha()`
Transparent borders
```scss
.element {
  @include border-alpha($color-primary, 0.2);
  @include border-alpha($color-primary, 0.2, $border-medium);
}
```

### `@include hit-area()`
Extended click area
```scss
.link {
  @include hit-area($space-lg);
}
```

### `@include mobile()` / `@include desktop()`
Responsive breakpoints
```scss
@include mobile {
  // Styles for < 1152px
}

@include desktop {
  // Styles for >= 1152px
}
```

### `@include center()`
Flexbox centering
```scss
.element {
  @include center;
}
```

### `@include truncate()`
Text ellipsis
```scss
.element {
  @include truncate(1); // Single line
  @include truncate(3); // Multi-line
}
```

## Examples

### Card Component
```scss
@use 'tokens' as *;

.card {
  background: $color-surface;
  border-radius: $radius-card;
  padding: $space-lg;
  @include transition;

  &:hover {
    transform: translateY(-2px);
  }
}
```

### Link with Hover
```scss
@use 'tokens' as *;

.link {
  color: $color-text;
  @include border-alpha($color-primary, 0.2);
  @include hit-area($space-xl);

  &:hover {
    background: $color-primary;
    color: $color-surface;
  }
}
```

### Responsive Layout
```scss
@use 'tokens' as *;

.container {
  padding: $space-md;
  gap: $space-lg;

  @include mobile {
    padding: $space-sm;
    gap: $space-md;
  }
}
```

## Migration Guide

### Old → New
```scss
// OLD
@use 'variables' as *;
.card { padding: $sp-lg; }

// NEW
@use 'tokens' as *;
.card { padding: $space-lg; }

// OLD
transition: transform 0.2s ease;

// NEW
@include transition(transform);
// or
transition: transform $transition-base;

// OLD
border: 1px solid rgba($color-primary, 0.2);

// NEW
@include border-alpha($color-primary, 0.2);
```

## File Structure
```
src/styles/
├── tokens.scss        # Master token file (import this!)
├── _variables.scss    # Backward compat aliases (deprecated)
├── main.scss          # Imports all partials
├── _reset.scss        # CSS reset
├── _body.scss         # Body styles
├── _typography.scss   # Type styles + utilities
├── _card.scss         # Card component
├── _header.scss       # Header component
├── _footer.scss       # Footer component
├── _links.scss        # Link component
├── _category.scss     # Category component
├── _prices.scss       # Prices component
├── _utilities.scss    # Utility classes
├── _layout.scss       # Responsive layout
└── _cursor.scss       # Custom cursor
```
