/**
 * A tiny mutable store shared between DOM (GSAP ScrollTrigger, pointer events)
 * and the render loop. Keeping this outside React prevents a re-render on every
 * scroll frame.
 */
export const sceneState = {
  progress: 0, // 0 → 1 across the hero + story
  pointerX: 0, // -1 → 1
  pointerY: 0, // -1 → 1
  scrollVelocity: 0,
  visible: true,
};

export const setSceneProgress = (value) => {
  sceneState.progress = Math.min(1, Math.max(0, value));
};

export const setPointer = (x, y) => {
  sceneState.pointerX = x;
  sceneState.pointerY = y;
};
