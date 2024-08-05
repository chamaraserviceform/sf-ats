export function loadScript(url, callback) {
    if (!document.getElementById(url)) {
        var scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'text/javascript');
        scriptTag.setAttribute('src', url);
        scriptTag.setAttribute('id', url);
        scriptTag.setAttribute('charset', 'UTF-8');

        scriptTag.async = true;

        if (scriptTag.readyState) {
            scriptTag.onreadystatechange = function () {
                if (this.readyState === 'complete' || this.readyState === 'loaded') {
                    callback();
                }
            };
        } else {
            scriptTag.onload = callback;
        }

        (document.getElementsByTagName('head')[0] || document.documentElement).appendChild(scriptTag);
    } else {
        callback();
    }
}

export const generateId = (length) => {
    let id = '';
    while (id.length < length) {
        id += Math.random().toString(36).substr(2, length - id.length);
    }
    return id;
};

export
function lightOrDark(color) {

    // Variables for red, green, blue values
    let r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If HEX --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 200) {
        return 'light';
    }
    else {
        return 'dark';
    }
}

export function buildOptions (data, machine) {

    const mapValues =  data.map(item => item[machine])
        .filter(value => value)

    const uniqueValues = [...new Set(mapValues)];

    return uniqueValues.map(value => {
        return {
            value: value,
            label: value,
        }
    })

}