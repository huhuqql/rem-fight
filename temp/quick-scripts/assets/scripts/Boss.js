(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Boss.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '22143XCitVFyq1E65CMLtQz', 'Boss', __filename);
// scripts/Boss.js

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
        jumpHeight: 0,
        jumpDuration: 0,
        maxMoveSpeed: 0,
        accel: 0,

        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },

        redBulletPrefab: {
            default: null,
            type: cc.Prefab
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0;
        this.ySpeed = 0;

        this.timer = 0;
        this.intervalTime = 6;

        this.skillTimer = 0;
        this.skillIntervalTime = 3;
        this.life = 60;
    },
    move: function move() {},


    setJumpAction: function setJumpAction() {

        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        return cc.sequence(jumpUp, jumpDown);
    },

    produceBullet: function produceBullet() {
        var bullet = cc.instantiate(this.bulletPrefab);
        this.node.parent.addChild(bullet);
        bullet.setPosition(this.node.x, this.node.y);
    },
    moveToRandomPosition: function moveToRandomPosition() {
        var randX = (Math.random() - 0.5) * 2 * (this.node.parent.getChildByName("newbg").width / 2 - 50);
        var randY = (Math.random() - 0.5) * 2 * (this.node.parent.getChildByName("newbg").height / 2 - 50);

        this.moveToPosition(randX, randY);
    },
    moveToPlayer: function moveToPlayer() {
        console.log("朝玩家移动");
        var scene = this.node.parent;
        this.sceneWidth = scene.width / 2;
        this.sceneHeight = scene.height / 2;

        var player = scene.getChildByName("rem");

        this.xSpeed = player.x - this.node.x;
        this.ySpeed = player.y - this.node.y;

        var oldSpeed = this.xSpeed;

        var xSpeedSign = 1;
        var ySpeedSign = 1;
        if (this.xSpeed < 0) xSpeedSign = -1;
        if (this.ySpeed < 0) ySpeedSign = -1;

        var maxSpeed = 100;

        if (Math.abs(this.xSpeed) < Math.abs(this.ySpeed)) {
            this.xSpeed = this.xSpeed * Math.abs(maxSpeed / this.ySpeed);
            this.ySpeed = ySpeedSign * maxSpeed;
        } else {
            this.ySpeed = this.ySpeed * Math.abs(maxSpeed / this.xSpeed);
            this.xSpeed = xSpeedSign * maxSpeed;
        }

        setTimeout(function () {
            this.stopMoving();
        }.bind(this), oldSpeed / this.xSpeed * 1000);
    },
    stopMoving: function stopMoving() {
        this.xSpeed = 0;
        this.ySpeed = 0;
    },
    produceRedBullet: function produceRedBullet() {
        if (this.node != null) {
            var redbullet = cc.instantiate(this.redBulletPrefab);
            this.node.parent.addChild(redbullet);
            redbullet.setPosition(this.node.x, this.node.y);
        }
    },
    start: function start() {},


    update: function update(dt) {

        if (this.life <= 0) {
            this.life = 100;
            this.node.destroy();
        }

        if (this.timer > this.intervalTime) {
            this.moveToPlayer();
            // this.produceBullet();
            this.timer = 0;
            console.log("发射！");
        }
        if (this.skillTimer >= this.skillIntervalTime && this.xSpeed == 0) {
            this.produceRedBullet();
            setTimeout(function () {
                this.produceRedBullet();
            }.bind(this), 300);
            setTimeout(function () {
                this.produceRedBullet();
            }.bind(this), 600);
            setTimeout(function () {
                this.produceRedBullet();
            }.bind(this), 900);
            setTimeout(function () {
                this.produceRedBullet();
            }.bind(this), 1200);
            setTimeout(function () {
                this.produceRedBullet();
            }.bind(this), 1500);
            setTimeout(function () {
                this.produceRedBullet();
            }.bind(this), 1800);
            this.skillTimer = 0;
        }
        this.skillTimer += dt;
        this.timer += dt;

        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Boss.js.map
        