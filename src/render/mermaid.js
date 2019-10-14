import {mermaidAPI} from 'mermaid'

export const mermaidRender = (no, text) => {
  let render = "";
  try{
    let elementId = 'mermaid' + no;
    let preRenderedElement = document.getElementById(elementId);
    if(preRenderedElement){
      preRenderedElement.innerHTML = "";
      preRenderedElement.parentNode.removeChild(preRenderedElement);
    }
    mermaidAPI.parse(text.join("\n"));
    mermaidAPI.render(elementId, text.join("\n"), function(svgCode){
      render = svgCode;
    })
  }catch(e){
    console.log(e)
    render = "<pre class='error'>"+e.str+"</pre>";
  }
  // TODO: why can I get rendered code?
  return "<div style='width:100%;'>"+render+"</div>";
}
