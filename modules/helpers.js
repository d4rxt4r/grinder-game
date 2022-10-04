import * as $ from './constants.js';
import { BIG_HEAD, SMALL_HEAD } from './classes.js';

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Composites = Matter.Composites;

const loadImage = (url, callback) => {
    const img = new Image();
    img.onload = () => {
        callback(img.src);
    };
    img.src = url;
};

const spawnTestBoxes = (engine) => {
    const stack = Composites.stack($.HEADS_SIZE.BIG, $.HEADS_SIZE.BIG, 5, 1, 15, 0, (x, y) => {
        return new BIG_HEAD(x, -$.HEADS_SIZE.BIG, $.HEADS_SIZE.BIG).body;
    });

    Composite.add(engine.world, stack);
};

const returnBodyIfCollides = (collider, pair, collidesWith) => {
    let collisionChecks = collidesWith;

    if (!Array.isArray(collidesWith)) {
        collisionChecks = [collidesWith];
    }

    if (pair.bodyB === collider && collisionChecks.includes(pair.bodyA.label)) {
        return pair.bodyA;
    }

    if (pair.bodyA === collider && collisionChecks.includes(pair.bodyB.label)) {
        return pair.bodyB;
    }

    return null;
};

export { loadImage, spawnTestBoxes, returnBodyIfCollides };
