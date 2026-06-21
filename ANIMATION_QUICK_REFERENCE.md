# Animation Quick Reference

Fast lookup for common animation patterns used across the site.

## Import Statement
```jsx
import { motion } from 'motion/react';
import { animationDurations, easingCurves, variants } from '@/lib/animations';
```

---

## Common Patterns

### Fade In
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
```

### Slide Up + Fade
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
```

### Scale + Fade
```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>
```

### Button Hover + Click
```jsx
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
```

### List with Stagger
```jsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }}
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

### Scroll Reveal
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-10%" }}
  transition={{ duration: 0.6 }}
>
```

### Tab/Toggle Animation
```jsx
<motion.div
  animate={{ color: isActive ? '#c8ff00' : '#888' }}
  transition={{ duration: 0.2 }}
>
```

### Exit Animation
```jsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

### Hover Slide
```jsx
<motion.div whileHover={{ x: 8 }} transition={{ duration: 0.2 }}>
```

### Spin Animation
```jsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
>
```

---

## Duration Presets

| Name | Value | Use Case |
|------|-------|----------|
| fast | 0.2s | Quick feedback |
| normal | 0.3s | Standard transitions |
| medium | 0.5s | Page elements |
| slow | 0.8s | Hero sections |
| verySlow | 1.2s | Long animations |

---

## Easing Presets

| Name | Easing | Feel |
|------|--------|------|
| smooth | [0.16, 1, 0.3, 1] | Natural |
| easeOutCubic | [0.33, 1, 0.68, 1] | Snappy |
| easeOutExpo | [0.16, 1, 0.3, 1] | Smooth |
| easeInOutCubic | [0.645, 0.045, 0.355, 1] | Complex |
| bounce | spring | Bouncy |
| elastic | spring | Elastic |

---

## CSS Classes

Add to any element for quick animations:

```jsx
className="smooth-transition"   // 0.3s cubic-bezier
className="smooth-fast"         // 0.2s smooth
className="smooth-slow"         // 0.5s smooth
className="bounce-in"           // Keyframe bounce
className="fade-in"             // Keyframe fade
className="slide-up"            // Keyframe slide
className="scale-in"            // Keyframe scale
```

---

## Accessibility

Always include `prefers-reduced-motion` for users:

```jsx
// Users with prefers-reduced-motion: reduce will not see animation
// All motion components automatically respect this in CSS
```

---

## Performance Tips

✅ **Good**
- Use `transform` for position changes
- Use `opacity` for fading
- Stagger with 40-50ms delays
- Keep animations <1.2s

❌ **Bad**
- Animating `left`, `top`, `width`, `height`
- Animating every keystroke
- Multiple simultaneous animations
- Animations >2s (unless special case)

---

## Common Easing Curves

```
Smooth:        ████████░░░░░░░░░  (ease out, natural)
Snappy:        ██████░░░░░░░████░  (cubic, responsive)
Bounce:        ███████░░░░░░░░████  (spring, playful)
Smooth-slow:   ███░░░░░░░░░░░░░░░░ (long fade)
```

---

## Animation Checklist

Before using animations:
- [ ] Is it 0.2s - 1.2s? (Longer = bad UX)
- [ ] Using `transform`/`opacity`? (Not position)
- [ ] Max 2-3 simultaneous animations?
- [ ] Staggered lists?
- [ ] `prefers-reduced-motion` respected?
- [ ] 60fps on mobile?

---

## Remotion Video Example

```jsx
import { Composition } from 'remotion';
import { VideoThumbnail } from '@/components/remotion/VideoThumbnail';

<Composition
  id="thumbnail-video-1"
  component={VideoThumbnail}
  durationInFrames={30 * 60}  // 30 seconds
  fps={60}
  width={1920}
  height={1080}
/>
```

---

## Debugging

### Check FPS
- Open DevTools Performance tab
- Record animation
- Look for green 60fps bars

### Check Motion
- Toggle `prefers-reduced-motion` in Chrome DevTools
- All animations should disable

### Verify Easing
- Use `ease: 'linear'` to see raw duration
- Then swap to proper easing

---

## Resources

- Docs: `DESIGN_POLISH_GUIDE.md`
- Source: `src/lib/animations.ts`
- Examples: `src/routes/cockroach/index.tsx`
- Remotion: `src/components/remotion/`

---

## Real-World Examples from Site

### Feed Item Stagger
```jsx
<AnimatePresence>
  {allVideos.map((video, idx) => (
    <motion.div
      delay={idx * 0.05}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    />
  ))}
</AnimatePresence>
```

### Navigation Hover
```jsx
<motion.div whileHover={{ x: 8 }} transition={{ duration: 0.2 }}>
  <Link>Home</Link>
</motion.div>
```

### Button Interaction
```jsx
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="hover:text-[#c8ff00]"
/>
```

### Page Transition
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
/>
```

---

Happy animating! 🎬
