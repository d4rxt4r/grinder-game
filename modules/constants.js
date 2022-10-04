const DEBUG = false;

const WIDTH = 400;
const HEIGHT = 700;

const BG_IMG = './img/bg.jpg';

const GRINDER_IMG = './img/grinder.png';
const GRINDER_SIZE = 100;

const GROUND_LABEL = {
    STAGE: 'STAGE_GROUND',
    SENSOR: 'GROUND_SENSOR'
};

const HEADS_SIZE = {
    BIG: 50,
    MEDIUM: 25,
    SMALL: 10
};

const HEADS_TEXTURES = {
    [HEADS_SIZE.BIG]: ['./img/big_head/1.png', './img/big_head/2.png', './img/big_head/3.png'],
    [HEADS_SIZE.MEDIUM]: ['./img/medium_head/1.png', './img/medium_head/2.png', './img/medium_head/3.png'],
    [HEADS_SIZE.SMALL]: ['./img/small_head/1.png', './img/small_head/2.png', './img/small_head/3.png']
};

const HEADS_LABELS = {
    BIG: 'BIG_HEAD',
    MEDIUM: 'MEDIUM_HEAD',
    SMALL: 'SMALL_HEAD'
};

const HEADS_SIZE_TO_LABEL = {
    [HEADS_SIZE.BIG]: HEADS_LABELS.BIG,
    [HEADS_SIZE.MEDIUM]: HEADS_LABELS.MEDIUM,
    [HEADS_SIZE.SMALL]: HEADS_LABELS.SMALL
};

const HEADS_COLOR = {
    [HEADS_SIZE.BIG]: 'white',
    [HEADS_SIZE.MEDIUM]: 'white',
    [HEADS_SIZE.SMALL]: 'yellow'
};

const BREAK_SIZE = {
    [HEADS_SIZE.BIG]: HEADS_SIZE.MEDIUM,
    [HEADS_SIZE.MEDIUM]: HEADS_SIZE.SMALL
};

const counter = document.getElementById('counter');

export {
    DEBUG,
    WIDTH,
    HEIGHT,
    BG_IMG,
    GRINDER_IMG,
    GRINDER_SIZE,
    HEADS_SIZE,
    HEADS_LABELS,
    HEADS_SIZE_TO_LABEL,
    HEADS_COLOR,
    HEADS_TEXTURES,
    BREAK_SIZE,
    GROUND_LABEL,

    counter
};
