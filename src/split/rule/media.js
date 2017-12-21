'use strict';

import Rule from '../class/rule';

const priority = 2;

function test() {

}

function handle() {

}

const rule = new Rule(test, handle, priority);
rule.push();