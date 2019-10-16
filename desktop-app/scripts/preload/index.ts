// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

console.log("preload");0

window.addEventListener('DOMContentLoaded', () => {
  console.log("document loaded");;
  const replaceText = (selector: any, text: any) => {
    const element = document.querySelector(selector)
    console.log(element);
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`.${type}-version`, (process as any).versions[type])
  }
})
