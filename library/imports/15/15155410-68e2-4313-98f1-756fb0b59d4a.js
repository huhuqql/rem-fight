"use strict";
cc._RF.push(module, '15155QQaOJDE5jxdW+wtZ1K', 'Bullet');
// scripts/Bullet.js

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
var Player = require("Player");

cc.Class({
    extends: cc.Component,

    properties: {
        bulletWidth: 0,
        speed: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        // console.log("generated bullet");
        this.move = false;
        this.xSpeed = 0;
        this.ySpeed = 0;
    },

    getPlayerPosition: function getPlayerPosition() {

        return player.getPosition();
    },
    start: function start() {
        var scene = this.node.parent;
        this.sceneWidth = scene.width / 2;
        this.sceneHeight = scene.height / 2;

        var player = scene.getChildByName("rem");

        this.xSpeed = player.x - this.node.x;
        this.ySpeed = player.y - this.node.y;

        var xSpeedSign = 1;
        var ySpeedSign = 1;
        if (this.xSpeed < 0) xSpeedSign = -1;
        if (this.ySpeed < 0) ySpeedSign = -1;

        var maxSpeed = 200;

        if (Math.abs(this.xSpeed) < Math.abs(this.ySpeed)) {
            this.xSpeed = this.xSpeed * Math.abs(maxSpeed / this.ySpeed);
            this.ySpeed = ySpeedSign * maxSpeed;
        } else {
            this.ySpeed = this.ySpeed * Math.abs(maxSpeed / this.xSpeed);
            this.xSpeed = xSpeedSign * maxSpeed;
        }
        this.move = true;
    },
    detectPlayer: function detectPlayer() {
        var scene = this.node.parent;
        var player = scene.getChildByName("rem");
        var playerPos = player.getPosition();

        var dist = this.node.position.sub(playerPos).mag();

        if (dist < this.node.width / 2) {
            var playerInfo = player.getComponent(Player);
            playerInfo.wasDamaged = true;
            scene.removeChild(this.node);
        }
    },


    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.detectPlayer();
        if (this.move) {
            this.node.y += this.ySpeed * dt;
            this.node.x += this.xSpeed * dt;
        }

        if (this.node.x < -this.sceneWidth || this.node.x > this.sceneWidth || this.node.y < -this.sceneHeight || this.node.y > this.sceneHeight) {
            this.node.destroy();
            console.log("bullet removed");
        }
    }
});

cc._RF.pop();