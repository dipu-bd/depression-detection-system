// To enable gradient color transition

import { Meteor } from 'meteor/meteor';

// create an instance:
//     const gradient = new Gradient();
// start coloring from onRendered:
//     gradient.start(this.$(".gradient"));
// stop from onDestroyed:
//     gradient.stop();
export class Gradient {

    constructor(element, speed) {
        this.colors = new Array(
            [62, 35, 255],
            [60, 255, 60],
            [255, 35, 98],
            [45, 175, 230],
            [255, 0, 255],
            [255, 128, 0]
        );

        this.step = 0;
        //color table indices for: 
        // current color left
        // next color left
        // current color right
        // next color right
        this.colorIndices = [0, 1, 2, 3];

        //transition speed
        this.gradientSpeed = speed || 0.002;

        // initially element is null
        this.element = element;
    }

    setElement(elem) {
        this.element = elem;
    }

    start(elem) {
        const gradient = this;
        this.element = elem || this.element;
        this.process = Meteor.setInterval(function () {
            gradient.updateGradient();  
        }, 10);
    }

    stop() {
        Meteor.clearInterval(this.process); 
    }

    updateGradient() {

        if ($ === undefined) return;

        let c0_0 = this.colors[this.colorIndices[0]];
        let c0_1 = this.colors[this.colorIndices[1]];
        let c1_0 = this.colors[this.colorIndices[2]];
        let c1_1 = this.colors[this.colorIndices[3]];

        let istep = 1 - this.step;
        let r1 = Math.round(istep * c0_0[0] + this.step * c0_1[0]);
        let g1 = Math.round(istep * c0_0[1] + this.step * c0_1[1]);
        let b1 = Math.round(istep * c0_0[2] + this.step * c0_1[2]);
        let color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

        let r2 = Math.round(istep * c1_0[0] + this.step * c1_1[0]);
        let g2 = Math.round(istep * c1_0[1] + this.step * c1_1[1]);
        let b2 = Math.round(istep * c1_0[2] + this.step * c1_1[2]);
        let color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

        this.element.css({
            background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
        }).css({
            background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
        });

        this.step += this.gradientSpeed;
        if (this.step >= 1) {
            this.step %= 1;
            this.colorIndices[0] = this.colorIndices[1];
            this.colorIndices[2] = this.colorIndices[3];

            //pick two new target color indices
            //do not pick the same as the current one
            this.colorIndices[1] = (this.colorIndices[1] + Math.floor(1 + Math.random() * (this.colors.length - 1))) % this.colors.length;
            this.colorIndices[3] = (this.colorIndices[3] + Math.floor(1 + Math.random() * (this.colors.length - 1))) % this.colors.length;
        }
    }
}