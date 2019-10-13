function Render(text){
  console.log("Render", text)
  if(text.indexOf("###") === 0){
    return "<div>" + text + "<div>"
  }else if(text.indexOf("##") === 0){
    return "<div>" + text + "<div>"
  }else if(text.indexOf("#") === 0){
    return "<div>" + text + "<div>"
  }
  return "<div>"+text+"</div>"
}

export default Render
