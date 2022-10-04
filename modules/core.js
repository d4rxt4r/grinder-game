import * as $ from './constants.js';
import * as helpers from './helpers.js';

const Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Events = Matter.Events,
    Render = Matter.Render,
    Vertices = Matter.Vertices,
    Engine = Matter.Engine,
    Vector = Matter.Vector;

/**
 * inits the game
 */
const init = () => {
    const engine = Engine.create();

    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: $.WIDTH,
            height: $.HEIGHT,
            wireframes: false,
            showAngleIndicator: $.DEBUG
            // showBounds: $.DEBUG
        }
    });

    const gridBackground = Bodies.rectangle(0, 0, $.WIDTH * 2, $.HEIGHT * 2, {
        isStatic: true,
        isSensor: true,
        render: {
            fillStyle: '#C8B7A6',
            // sprite: {
            //     texture: $.BG_IMG,
            //     yOffset: -0.4,
            //     xOffset: -0.5
            // }
        }
    });

    Composite.add(engine.world, [gridBackground]);

    initGrinders(engine);
    createBounds(engine);
    createFloor(engine);
    createCollider(engine);

    initHeadsFlow(engine);

    return { engine, render };
};

/**
 * adds grinders with spikes to scene
 * @param {*} engine
 * @returns
 */
const initGrinders = (engine) => {
    const grinderWidth = $.GRINDER_SIZE;

    const createGrinder = (left = true) => {
        const cx = left ? grinderWidth - $.HEADS_SIZE.SMALL - 5 : $.WIDTH - grinderWidth + $.HEADS_SIZE.SMALL + 5;
        const cy = $.HEIGHT / 2;
        const body = Bodies.circle(cx, cy, grinderWidth, {
            render: {
                sprite: {
                    texture: $.GRINDER_IMG,
                    xScale: 0.79,
                    yScale: 0.79
                }
            }
        });

        const polysCount = 8;
        const polys = [];
        let angleAccumulator = 0;

        for (let i = 0; i < polysCount; i++) {
            const angle = 360 / polysCount;
            const x = cx + (grinderWidth + 5) * Math.cos((angleAccumulator * Math.PI) / 180);
            const y = cy + (grinderWidth + 5) * Math.sin((angleAccumulator * Math.PI) / 180);
            angleAccumulator += angle;

            const poly = Bodies.fromVertices(x, y, Vertices.fromPath('M 20 20 L 40 40 L 0 40 z'), {
                angle: ((angle * Math.PI) / 180) * i + (90 * Math.PI) / 180,
                render: {
                    fillStyle: '#303234',
                }
            });

            polys.push(poly);
        }

        return Body.create({
            isStatic: true,
            parts: [body, ...polys]
        });
    };

    const left = createGrinder();
    const right = createGrinder(false);

    Body.rotate(right, -0.3);

    Composite.add(engine.world, [left, right]);

    Events.on(engine, 'beforeUpdate', () => {
        Body.rotate(left, 0.04);
        Body.rotate(right, -0.04);
    });

    return { left, right };
};

/**
 * create wall boundaries for stage
 * @param {*} engine
 */
const createBounds = (engine) => {
    const offset = 10;
    const options = {
        isStatic: true
    };

    const bounds = [
        Bodies.rectangle($.WIDTH + offset, $.HEIGHT / 2, offset, $.HEIGHT * 10, options),
        Bodies.rectangle(0 - offset, $.HEIGHT / 2, offset, $.HEIGHT * 10, options)
    ];

    Composite.add(engine.world, bounds);
};

/**
 * adds simple stage ground
 * @param {*} engine
 */
const createFloor = (engine) => {
    const groundSensor = Bodies.rectangle($.WIDTH / 2, $.HEIGHT - 50, $.WIDTH, 10, {
        isSensor: true,
        isStatic: true,
        label: $.GROUND_LABEL.SENSOR,
        render: {
            fillStyle: 'transparent',
            lineWidth: $.DEBUG ? 1 : 0
        }
    });

    const ground = Bodies.rectangle($.WIDTH / 2, $.HEIGHT, $.WIDTH * 10, 100, {
        isStatic: true,
        label: $.GROUND_LABEL.STAGE,
        render: {
            fillStyle: '#B6C199',
            lineWidth: 1
        }
    });

    Composite.add(engine.world, [ground, groundSensor]);

    Events.on(engine, 'collisionActive', (event) => {
        const pairs = event.pairs;

        for (let i = 0, j = pairs.length; i != j; ++i) {
            const pair = pairs[i];
            const head = helpers.returnBodyIfCollides(groundSensor, pair, $.HEADS_LABELS.SMALL);

            if (head) {
                if (head.position.x >= $.WIDTH - $.HEADS_SIZE.SMALL) {
                    head.remove(engine);
                }

                Body.setVelocity(head, Vector.create(1 * head.mass, 0));
            }
        }
    });
};

/**
 * adds collision detection
 * @param {*} engine
 */
const createCollider = (engine) => {
    const collider = Bodies.rectangle($.WIDTH / 2, $.HEIGHT / 2 - 20, 100, 50, {
        isSensor: true,
        isStatic: true,
        label: 'COLLIDER',
        render: {
            fillStyle: 'transparent',
            lineWidth: $.DEBUG ? 1 : 0
        }
    });

    Composite.add(engine.world, [collider]);

    Events.on(engine, 'collisionStart', (event) => {
        const pairs = event.pairs;

        for (let i = 0, j = pairs.length; i != j; ++i) {
            const pair = pairs[i];
            const head = helpers.returnBodyIfCollides(collider, pair, [$.HEADS_LABELS.BIG, $.HEADS_LABELS.MEDIUM]);

            if (head) {
                head.break(engine);
            }
        }
    });
};

const initHeadsFlow = (engine) => {
    let flowTimer = setTimeout(function spawn() {
        helpers.spawnTestBoxes(engine);

        flowTimer = setTimeout(spawn, 3000);
    });
};

export { init };
