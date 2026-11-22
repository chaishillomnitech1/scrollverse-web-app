# Omniland capability track: Input and accessibility

**Scope:** gamepad, touch, keyboard, pointer, mobile/desktop input, accessibility, and reduced-motion support.

## Findings

### 1. Keyboard is a baseline interaction path, not an optional enhancement

**Fact (WCAG 2.2, Level A):** All content functionality must be operable through a keyboard interface without requiring specific timing for individual keystrokes, subject to the narrow exception for functions whose underlying result depends on the path of movement. Keyboard focus must also be able to leave every component; components must not create keyboard traps. [1]

**Implication:** Any Omniland navigation, selection, dialog, inventory/action menu, or game-like control that works with pointer or touch needs an equivalent keyboard path. Use native HTML controls where possible, keep focus order logical, expose a visible focus indicator, and document non-standard exits or shortcuts.

### 2. Pointer Events provide one hardware-agnostic model for mouse, pen, and touchscreen input

**Fact (W3C Pointer Events Level 3):** Pointer Events define interfaces for hardware-agnostic input from a mouse, pen, or touchscreen, with `pointerType` and related event data. The specification also defines `touch-action` behavior for direct manipulation and explains compatibility mapping to mouse events. [2]

**Recommendation:** Build pointer interactions around Pointer Events rather than separate mouse and touch implementations. Use `pointerType` only when behavior genuinely differs. Set `touch-action` narrowly on custom direct-manipulation surfaces so the browser can retain normal panning/zooming elsewhere; avoid globally disabling native gestures.

### 3. Gestures and dragging require simpler alternatives

**Fact (WCAG 2.2, Level A/AA):** Multipoint or path-based pointer gestures must have a single-pointer alternative unless the gesture is essential. Functionality that uses dragging must also be achievable with a single pointer without dragging, unless dragging is essential. W3C examples include buttons for moving a map, previous/next controls for a carousel, and menu-based alternatives for drag-and-drop. [1] [3]

**Implication:** Do not make swipe, pinch, precise drag, or hold-and-drag the only way to move through an Omniland space or manipulate an object. Pair gesture-first interactions with tap/click controls, stepper buttons, menus, direct value entry, or select-then-place flows.

### 4. Touch and pointer targets should be forgiving on both mobile and desktop

**Fact (WCAG 2.2, Level AA):** Pointer-input targets are at least 24 by 24 CSS pixels, or meet one of the defined spacing/equivalent/inline/user-agent/essential exceptions. W3C notes that this applies to mouse, trackpad, stylus, and touch, not only phones. [4]

**Recommendation:** Treat 24×24 CSS px as a conformance floor and use larger, well-spaced controls for primary actions. Avoid dense icon-only clusters. Preserve browser zoom and reflow; do not depend on precision pointer placement.

### 5. Gamepad support is feasible as progressive enhancement, but cannot replace keyboard/pointer access

**Fact (MDN, based on the W3C Gamepad specification):** The Gamepad API exposes connected controllers through `navigator.getGamepads()`, `gamepadconnected`, and `gamepaddisconnected`; gamepads expose buttons and axes. MDN describes the API as widely available across browsers since March 2017, while noting that some parts vary in support. [5]

**Recommendation:** Add gamepad detection and a small input adapter as an enhancement for desktop/living-room use. Poll axes/buttons in an animation loop only while a gamepad is active, debounce button transitions, show an in-product control legend, and support reconnect/disconnect. Keep the same command layer usable from keyboard, pointer, and touch so gamepad support does not multiply feature logic.

### 6. Reduced motion must affect interaction-triggered animation

**Fact (WCAG 2.2, Level AAA; MDN implementation reference):** Interaction-triggered motion animation must be disable-able unless essential. The `prefers-reduced-motion: reduce` media query reflects an operating-system/device preference, and can be used to replace or remove vestibular-risky effects such as large scaling and panning. [6] [7]

**Recommendation:** Make reduced motion a first-class setting. In reduced mode, remove parallax, camera swoops, screen shake, rapid zooms, auto-advancing transitions, and decorative motion; use instant state changes or low-motion fades where appropriate. Also provide an explicit in-app toggle for users who need the setting regardless of browser/OS detection.

### 7. Accessibility semantics and feedback belong in the interaction architecture

**Fact:** WCAG’s keyboard and robust-interface requirements mean that controls need programmatic names, roles, states, and values, not only visual affordances. A canvas/WebGL/game scene should be paired with accessible HTML controls or an equivalent semantic command surface for menus, status, settings, and important actions. [1]

**Recommendation:** Keep the low-overhead renderer responsible for visuals and input capture, but expose UI state through ordinary DOM controls, labels, live-region announcements where needed, and a predictable focus model. Do not assume that a visual scene alone is perceivable or operable by assistive technology.

## Practical recommendations for a console-less, low-overhead product

1. **Use a shared command layer.** Map keyboard keys, Pointer Events, touch taps, and optional Gamepad buttons/axes into the same commands (for example: move, select, confirm, cancel, next, previous). This reduces duplicated logic and makes parity testable.
2. **Make tap/click and keyboard the primary path.** Design core navigation and object actions around discrete selection and activation. Offer swipe/drag/pinch only as accelerators, never as the sole route.
3. **Prefer semantic HTML overlays for controls.** Use native buttons, links, form controls, dialogs, labels, and status text over or beside the rendered scene. Maintain visible `:focus-visible`, logical tab order, and keyboard escape paths.
4. **Adopt a touch-safe geometry budget.** Make important targets at least 44×44 CSS px where practical, keep the WCAG 24×24 minimum and spacing rules as the floor, and test at narrow mobile widths and desktop zoom levels.
5. **Implement reduced motion as a rendering mode.** Read `prefers-reduced-motion`, provide an explicit toggle, and route camera/transition effects through one motion policy so the setting reliably disables non-essential movement.
6. **Treat gamepad as optional enhancement.** Detect it only when present, show discoverable controls, handle disconnects, and never block users who have no console or controller.

## Source records

1. **W3C, Web Content Accessibility Guidelines (WCAG) 2.2** — https://www.w3.org/TR/WCAG22/
   - Supports the normative requirements for keyboard access and no keyboard traps (SC 2.1.1 and 2.1.2), pointer gestures (SC 2.5.1), and the input-modality framework. It also defines keyboard-interface terminology and clarifies that keyboard support does not forbid additional input methods.
2. **W3C, Pointer Events Level 3** — https://www.w3.org/TR/pointerevents3/
   - Defines hardware-agnostic pointer input for mouse, pen, and touchscreen; documents `pointerType`, direct-manipulation behavior, `touch-action`, pointer-event suppression during browser panning/zooming, and compatibility mapping to mouse events.
3. **W3C WAI, Understanding SC 2.5.7 Dragging Movements** — https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html
   - States that dragging functionality must have a single-pointer, non-dragging alternative unless dragging is essential; explains why press-hold-move-release is inaccessible to some users and gives button/menu alternatives.
4. **W3C WAI, Understanding SC 2.5.8 Target Size (Minimum)** — https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
   - Defines the 24×24 CSS pixel target-size requirement and exceptions, and explicitly explains that the criterion covers touch, mouse, trackpad, stylus, and other pointer modalities.
5. **MDN Web Docs, Gamepad API** — https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API
   - Documents `navigator.getGamepads()`, connection/disconnection events, button/axis access, broad browser availability, and the Gamepad API’s relationship to the W3C Gamepad specification.
6. **W3C WAI, Understanding SC 2.3.3 Animation from Interactions** — https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
   - States that interaction-triggered motion must be disable-able unless essential; identifies vestibular risk and recommends removing unnecessary animation or using a reduced-motion preference/control.
7. **MDN Web Docs, `prefers-reduced-motion`** — https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
   - Defines `no-preference` and `reduce`, describes OS/browser settings that feed the preference, and shows how CSS can replace scaling animation with a less motion-intensive effect.

## Boundary

This report describes standards, browser APIs, and product recommendations only. It does not claim that any ScrollVerse or Omniland external integration, activation, deployment, or platform support has been completed.
