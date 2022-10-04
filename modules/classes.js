import * as $ from './constants.js';

const Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Events = Matter.Events,
    Render = Matter.Render,
    Vertices = Matter.Vertices,
    Engine = Matter.Engine,
    Common = Matter.Common;

class HEAD {
    #body;
    #size;

    constructor(x, y, size) {
        this.#body = Bodies.rectangle(x, y, size, size, {
            label: $.HEADS_SIZE_TO_LABEL[size],
            mass: 3,
            chamfer: {
                radius: 10
            },
            render: {
                strokeStyle: $.HEADS_COLOR[size],
                sprite: {
                    texture: Common.choose($.HEADS_TEXTURES[size]),
                    // xScale: 0.79,
                    // yScale: 0.79
                }
            }
        });

        this.#size = size;
    }

    get body() {
        return this.#body;
    }

    get size() {
        return this.#size;
    }
}

class SMALL_HEAD extends HEAD {
    constructor(x, y, size) {
        super(x, y, size);

        this.body.remove = this.remove.bind(this);
    }

    remove(engine) {
        Composite.remove(engine.world, this.body, true);

        $.counter.innerText = 'Grinded: ' + (parseInt($.counter.innerText.split(' ')[1]) + 1).toString()
    }
}

class MEDIUM_HEAD extends SMALL_HEAD {
    constructor(x, y, size) {
        super(x, y, size);

        this.body.break = this.break.bind(this);
    }

    break(engine) {
        const { x: headX, x: headY } = this.body.position;

        Composite.remove(engine.world, this.body, true);

        const stack = Composites.stack($.BREAK_SIZE[this.size], $.BREAK_SIZE[this.size], 1, 1, 0, 0, (x, y) => {
            return new BIG_HEAD(headX, headY + y / 2, $.BREAK_SIZE[this.size]).body;
        });

        Composite.add(engine.world, stack);
    }
}

class BIG_HEAD extends MEDIUM_HEAD {
    constructor(x, y, size) {
        super(x, y, size);
    }
}

export { BIG_HEAD, MEDIUM_HEAD, SMALL_HEAD };
