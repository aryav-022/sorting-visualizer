export default function getTranslateX(element) {
    const computedStyle = window.getComputedStyle(element);
    const transform = computedStyle.getPropertyValue("transform");

    if (transform === "none") return 0;

    const values = transform.split("(")[1].split(")")[0].split(",");
    const translateX = parseFloat(values[4]) || 0;

    return translateX;
}