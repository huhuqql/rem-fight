"use strict";
cc._RF.push(module, '5b110SG0G1OForU9nED70KW', 'Bomb');
// scripts/Bomb.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        blastPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    explode: function explode() {
        var enlarge = cc.scaleBy(0.5, 1.3);
        return cc.sequence(enlarge, enlarge, enlarge);
    },
    produceBlast: function produceBlast() {
        var fireBlast = cc.instantiate(this.blastPrefab);
        this.parent.addChild(fireBlast);
        fireBlast.setPosition(this.node.getPosition());
        this.node.destroy();
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.timer = 0;
        this.end = 1.5;
        this.node.runAction(this.explode());
    },
    start: function start() {
        this.parent = this.node.parent;
    },
    update: function update(dt) {
        if (this.timer >= this.end) {
            this.timer = 0;
            this.produceBlast();
        }

        this.timer += dt;
    }
});

cc._RF.pop();