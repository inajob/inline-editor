import hljs from 'highlight.js'

export const hljsRender = (no, text) => {
  return '<pre class="hljs">'+hljs.highlightAuto(text.join("\n")).value+'</pre>'
}
