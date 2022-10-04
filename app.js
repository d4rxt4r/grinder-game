import * as $ from './modules/constants.js';
import * as core from './modules/core.js';
import * as helpers from './modules/helpers.js';

const width = $.WIDTH;
const height = $.HEIGHT;
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events,
    Composites = Matter.Composites,
    Vertices = Matter.Vertices,
    Body = Matter.Body;

const { engine, render } = core.init();

// run the renderer
Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);
