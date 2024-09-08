<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useWindowSize, useRafFn } from '@vueuse/core';

// Constants for angles in radians and default colors
const R180 = Math.PI; // 180 degrees in radians
const R90 = Math.PI / 2; // 90 degrees in radians
const R15 = Math.PI / 12; // 15 degrees in radians
const COLOR = '#ffffff30'; // Default stroke color
const MIN_BRANCH = 30; // Minimum branch depth before reducing probability
const INITIAL_LENGTH = 6; // Initial length of branches

// Reactive references for canvas and state
const canvasRef = ref<HTMLCanvasElement | null>(null);
const size = reactive(useWindowSize()); // Reactive window size
const isStopped = ref(false); // Boolean flag to indicate if drawing is stopped
const lineLength = ref(INITIAL_LENGTH); // Length of the lines/branches

/**
 * Initialize the canvas with proper dimensions and DPI scaling.
 * @param canvas - The canvas element to initialize.
 * @param width - The width of the canvas.
 * @param height - The height of the canvas.
 * @param dpi - Optional DPI scaling factor.
 * @returns An object containing the canvas context and the DPI scaling factor.
 */
function initializeCanvas(canvas: HTMLCanvasElement, width = 400, height = 400, dpi?: number) {
  const context = canvas.getContext('2d')!;

  // Device pixel ratio for high-DPI screens
  const devicePixelRatio = window.devicePixelRatio || 1;
  
  // Backing store pixel ratio for different browsers
  const backingStoreRatio = 
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  // Compute the scaling factor for the canvas
  const scalingFactor = dpi || devicePixelRatio / backingStoreRatio;

  // Set canvas style dimensions
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  
  // Set canvas internal dimensions based on DPI scaling
  canvas.width = scalingFactor * width;
  canvas.height = scalingFactor * height;
  context.scale(scalingFactor, scalingFactor);

  return { context, scalingFactor };
}

/**
 * Convert polar coordinates to Cartesian coordinates.
 * @param x - The x-coordinate of the origin.
 * @param y - The y-coordinate of the origin.
 * @param radius - The radius (distance from the origin).
 * @param angle - The angle in radians.
 * @returns The Cartesian coordinates [x, y] after conversion.
 */
function polarToCartesian(x = 0, y = 0, radius = 0, angle = 0): [number, number] {
  return [x + radius * Math.cos(angle), y + radius * Math.sin(angle)];
}

// Set up the drawing logic when the component is mounted
onMounted(() => {
  const canvas = canvasRef.value!;
  const { context } = initializeCanvas(canvas, size.width, size.height);
  const { width, height } = canvas;

  let currentSteps: (() => void)[] = []; // Steps to execute in the current frame
  let previousSteps: (() => void)[] = []; // Steps from the previous frame

  /**
   * Recursive function to draw a line and create branches.
   * @param x - The starting x-coordinate.
   * @param y - The starting y-coordinate.
   * @param angle - The angle of the line in radians.
   * @param counter - Object to keep track of the recursion depth.
   */
  const drawStep = (x: number, y: number, angle: number, counter: { value: number } = { value: 0 }) => {
    const length = Math.random() * lineLength.value; // Random length for the branch
    counter.value += 1;

    const [nextX, nextY] = polarToCartesian(x, y, length, angle); // Compute the end coordinates

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(nextX, nextY);
    context.stroke();

    // Determine the new angles for branching
    const angleVariation = Math.random() * R15;
    const newAngle1 = angle + angleVariation;
    const newAngle2 = angle - angleVariation;

    // Check if the new coordinates are out of bounds
    if (nextX < -100 || nextX > size.width + 100 || nextY < -100 || nextY > size.height + 100) {
      return;
    }

    // Determine the probability of creating branches
    const branchProbability = counter.value <= MIN_BRANCH ? 0.8 : 0.49;

    // Add new steps for branches if the probability condition is met
    if (Math.random() < branchProbability) {
      currentSteps.push(() => drawStep(nextX, nextY, newAngle1, counter));
    }

    if (Math.random() < branchProbability) {
      currentSteps.push(() => drawStep(nextX, nextY, newAngle2, counter));
    }
  };

  let lastTimestamp = performance.now();
  const frameInterval = 1000 / 40; // Target frame rate: 25fps

  /**
   * Function to update the drawing frame by frame.
   */
  const updateFrame = () => {
    if (performance.now() - lastTimestamp < frameInterval) {
      return;
    }

    previousSteps = currentSteps;
    currentSteps = [];
    lastTimestamp = performance.now();

    // Stop the animation if there are no steps left
    if (previousSteps.length === 0) {
      animationControls.pause();
      isStopped.value = true;
    }

    // Execute or re-add previous steps with a 50% chance
    previousSteps.forEach((step) => {
      if (Math.random() < 0.5) {
        currentSteps.push(step);
      } else {
        step();
      }
    });
  };

  const animationControls = useRafFn(updateFrame);

  /**
   * Generate a random value between 0.2 and 0.8.
   * @returns A random value in the specified range.
   */
  const randomValueInRange = () => Math.random() * 0.6 + 0.2;

  /**
   * Start the drawing process by initializing the steps.
   */
  const startDrawing = () => {
    animationControls.pause();
    context.clearRect(0, 0, width, height);
    context.lineWidth = 0.5;
    context.strokeStyle = COLOR;

    previousSteps = [];
    currentSteps = [
      () => drawStep(randomValueInRange() * size.width, -5, R90),
      () => drawStep(randomValueInRange() * size.width, size.height + 5, -R90),
      () => drawStep(-5, randomValueInRange() * size.height, 0),
      () => drawStep(size.width + 5, randomValueInRange() * size.height, R180),
    ];

    // If the canvas is too small, reduce the number of initial steps
    if (size.width < 500) {
      currentSteps = currentSteps.slice(0, 2);
    }

    animationControls.resume();
    isStopped.value = false;
  };

  startDrawing();
});

// Computed property for canvas masking (not used directly in this snippet)
const mask = computed(() => 'radial-gradient(circle, transparent, black);');
</script>

<template>
  <div
    class="fixed inset-0 pointer-events-none print:hidden"
    style="z-index: 10"
  >
    <canvas ref="canvasRef" width="400" height="400" />
  </div>
</template>
