# Specification

## Summary
**Goal:** Build a browser-based retro-funk beat sequencer where users can create, play, and manage drum/groove patterns, and save/load them when signed in.

**Planned changes:**
- Create a step-sequencer grid UI with at least 4 instrument tracks, play/stop controls, and BPM control.
- Implement in-browser audio playback using Web Audio, with stable loop timing plus per-track mute and volume controls.
- Add in-session pattern management: create new patterns, rename them, and switch between multiple patterns (each with its own grid state and BPM).
- Add authenticated backend persistence to create/update/list/get/delete patterns per user; gate saving when signed out.
- Apply a consistent retro-funk visual theme across layout and components.
- Add a simple Help/How it works panel with concise English instructions matching the UI.
- Add and reference generated static branding/decor assets from `frontend/public/assets/generated` (logo + background/texture + icons).

**User-visible outcome:** Users can program a short funk loop in a multi-track grid, adjust BPM, play/stop it with Web Audio playback, mute/adjust volume per track, manage multiple patterns, and (when signed in) save and load patterns across sessions in a retro-funk themed UI with a help panel and branding visuals.
