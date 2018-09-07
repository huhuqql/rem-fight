(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Monter1.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '10701bvrwRGxL5qnMfPYmP6', 'Monter1', __filename);
// scripts/Monter1.js

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
        }

        // redBulletPrefab: {
        //     default: null,
        //     type: cc.Prefab  
        // },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0;

        this.timer = 0;
        this.intervalTime = 3;
    },
    move: function move() {},


    setJumpAction: function setJumpAction() {

        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        return cc.sequence(jumpUp, jumpDown);
    },

    produceBullet: function produceBullet() {
        if (this.node != null) {
            var bullet = cc.instantiate(this.bulletPrefab);
            this.node.parent.addChild(bullet);
            bullet.setPosition(this.node.x, this.node.y);
        }
    },
    hulkSmash: function hulkSmash() {
        var animationComponent = this.getComponent(cc.Animation);
        var animState = animationComponent.play('hulk-skill');
        animState.speed = 1.5;
    },


    // produceRedBullet(){
    //     var redbullet = cc.instantiate(this.redBulletPrefab);
    //     this.node.parent.addChild(redbullet);
    //     redbullet.setPosition(this.node.x, this.node.y);
    // },

    start: function start() {},


    update: function update(dt) {

        if (this.timer > this.intervalTime) {
            this.hulkSmash();
            this.produceBullet();
            this.timer = 0;
            console.log("发射！");
        }
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
        //# sourceMappingURL=Monter1.js.map
        