import { createEvent, createStore, sample } from "effector";

type Point = {
  x: number;
  y: number;
};

const resetElements = createEvent();

const selectElements = createEvent<[DOMRect, DOMRect]>();
const $elements = createStore<[DOMRect, DOMRect] | null>(null);

$elements.on(selectElements, (_, payload) => payload);
$elements.reset(resetElements);

const insertPoints = createEvent<[Point, Point] | null>();
const $points = createStore<[Point, Point] | null>(null);
$points.on(insertPoints, (_, payload) => payload);

sample({
  source: $elements,
  clock: selectElements,
  fn: (elements): [Point, Point] | null => {
    if (!elements) return null;
    const point1: Point = { x: elements[0].x, y: elements[0].y };
    const point2: Point = { x: elements[1].x, y: elements[1].y };
    return [point1, point2];
  },
  target: insertPoints,
});

export const stores = {};
export const actions = {};
