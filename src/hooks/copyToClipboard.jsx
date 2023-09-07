export default function copyToClipboard(copyIndicator, code) {
    navigator.clipboard.writeText(code);
    copyIndicator.current.classList.add("opacity-100");
    setTimeout(() => {
        copyIndicator.current.classList.remove("opacity-100");
    }, 4000);
}