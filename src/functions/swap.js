import getTranslateX from './getTranslateX.js';

export default function swap(i1, i2, bars) {
    const barWidth = 64;

    // Get the current translation of the arr
    const translation1 = getTranslateX(bars[i1]);
    const translation2 = getTranslateX(bars[i2]);

    // Apply the new translation
    bars[i1].style.transform = `translateX(${translation1 + (i2 - i1) * barWidth}px)`;
    bars[i2].style.transform = `translateX(${translation2 + (i1 - i2) * barWidth}px)`;

    // Swap the elements in the array
    [bars[i1], bars[i2]] = [bars[i2], bars[i1]];
}