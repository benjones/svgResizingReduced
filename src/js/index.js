import WebMidi from 'webmidi'
import SelectorControl from '../svgs/selectorControl.svg'
import SliderControl from '../svgs/sliderControl.svg'

const imageToUseMap = {
    "selectorControl.svg": SelectorControl,
    "sliderControl.svg": SliderControl
};

window.onload = function () {
    console.log("document loaded");
    let ui = new uiHandle(document.getElementById("theSVG"));

}

class uiHandle {
    constructor(svg) {
        this.svg = svg.contentDocument;
        console.log(this.svg);
        console.log(this.svg.querySelector("#osc1waveform"));


        this.controls = {
            osc1Wave: new SelectorControlWidget(
                imageToUse(this.svg.querySelector("#osc1waveform")),
                {
                    name: "Osc 1 Waveform",
                }),
            osc1Mod: new SelectorControlWidget(
                imageToUse(this.svg.querySelector("#osc1Mod")),
                {
                }),
            osc1Control1: new SliderControlWidget(
                imageToUse(this.svg.querySelector("#osc1Control1")),
                {
                }),
            osc1Control2: new SliderControlWidget(
                imageToUse(this.svg.querySelector("#osc1Control2")),
                {
                }),
        };

    }
}

//Inkscape apparently won't make a <use> reference for me, but uses an <image> element as a link
//This function replaces the <image> with a <use> element
function imageToUse(imageNode) {
    console.log("converting: imageNode");
    console.log(imageNode);
    console.log(imageNode.getAttribute("xlink:href"));
    let src = imageToUseMap[imageNode.getAttribute("xlink:href")];
    let scFrag = document.createRange().createContextualFragment(src);
    let scElement = scFrag.firstElementChild;
    console.log(imageNode);
    console.log(scElement);

    let toCopy = ["x", "y", "width", "height", "id"];
    for (let attr of toCopy) {
        console.log("original attribute: ", attr);
        console.log(imageNode.getAttributeNS(null, attr));
        scElement.setAttribute(attr, imageNode.getAttributeNS(null, attr));
    }

    let parent = imageNode.parentNode;
    imageNode.remove();
    parent.appendChild(scElement);

    return scElement;
}

class SelectorControlWidget {

    constructor(svgNode, options) {
        console.log("constructing SCW");
        console.log(options);
        this.svgNode = svgNode;
    }

}

//Associate text with the corresponding value from a sysex dump
//or a CC message
class SelectorControlOption {
    constructor(displayText, sysexValue, controlChangeValue) {
        this.displayText = displayText;
        this.sysexValue = sysexValue;
        this.controlChangeValue = controlChangeValue;
    }
}

class SliderControlWidget {
    constructor(svgNode, options) {
        console.log("making slider control widget", options);
        this.svgNode = svgNode;
    }
}
