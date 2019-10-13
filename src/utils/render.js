export const Render = (text) => {
  // TODO: sanitize!!
  console.log("Render", text)
  if(isBlock(text)){
    let lines = getLines(text);
    let firstLine = lines[0];
    let lastPart = lines.slice(1);
    let parts = firstLine.split(/\s+/);

    let ret = "";
    console.log("PARTS:",parts)
    if(parts[0] === ">>"){
      switch(parts[1]){
        case "pre":
          ret += "<span class='mode'>&gt;&gt; " + "pre</span>";
          ret += "<pre>" + lastPart.join("\n") + "</pre>";
        break;
        default:
          ret += "<pre>" + text + "</pre>";
      }
    }else{
      ret += "<pre>" + text + "</pre>";
    }
    return ret;
  }else{
    if(text.indexOf("###") === 0){
      return "<div>" + text + "<div>"
    }else if(text.indexOf("##") === 0){
      return "<div>" + text + "<div>"
    }else if(text.indexOf("#") === 0){
      return "<div>" + text + "<div>"
    }
    return "<div>"+text+"</div>"
  }
}

export const isBlock = (text) => {
  return text.indexOf(">>") === 0
}

// sのindex番目がx,yで何番目か調べる
export const getCursorPos = (index, text) => {
  var list = text.split(/[\r\n]/);
  var pos = 0;
  var i;
  for(i = 0; i < list.length; i ++){
    pos += list[i].length + 1;
    if(pos > index){
      // X, Y
      return [index - (pos - list[i].length - 1), i]
    }
  }
  console.log("error getPos")
}
export const getLines = (text) => {
  var list = text.split(/[\r\n]/);
  return list;
}

export const numLines = (s) => {
  return s.split(/[\r\n]/).length
}

