  /*
  {{link url}}
  {{img img}}
  */

  function newPiece(kind, s){
    return {kind: kind, body: s};
  }

  // multi-target indexOf
  // return minimum index and target
  function capture(body, targets, offset){
    var minPos = -1;
    var minTarget = "";
    targets.forEach(function(target){
      var index = body.indexOf(target, offset);
      if(index != -1){
        if(minPos == -1 || minPos > index){
          minPos = index;
          minTarget = target;
        }
      }
    });
    return {pos: minPos, target: minTarget}
  }

  export function parse(body){
    var pos = 0;
    var fMap = [
      {target: '{{'},
      {target: '}}'},
    ];
    function inner(level){
      var out = [];
      while(true){
        var cap;
        if(level == 0){
          cap = capture(body, ["{{","}}", "http://", "https://"], pos);
        }else{
          cap = capture(body, ["{{","}}"], pos);
        }
        if(cap.target == "{{"){
          out.push(newPiece("text", body.slice(pos, cap.pos)));
          pos = cap.pos + "{{".length;
          out.push(inner(level + 1));
        }else if(cap.target == "}}"){
          out.push(newPiece("text", body.slice(pos, cap.pos)));
          pos = cap.pos + "}}".length;
          if(level > 0){
            break;
          }
        }else if((cap.target=="https://" || cap.target == "http://")){
          if(pos != cap.pos){
            out.push(newPiece("text", body.slice(pos, cap.pos)));
          }
          var endPos = capture(body, [" ","\r", "\n"], cap.pos + cap.target.length);
          if(endPos.pos != -1){
            out.push(newPiece("url", body.slice(cap.pos, endPos.pos)));
            pos = endPos.pos;
          }else{
            out.push(newPiece("url", body.slice(cap.pos, body.length)));
            pos = body.length;
            break;
          }
        }else{
          out.push(newPiece("text", body.slice(pos, body.length)));
          pos = body.length;
          break;
        }
      }
      return out;
    };
    return inner(0);
  }

  export function htmlEncode(body){
    var out = [];
    var tmp;
    var list;
    var cmd,remain;
    body.forEach(function(v){
      if(Array.isArray(v)){
        tmp = htmlEncode(v);
        list = tmp.split(/\s+/, 2); //  cmd, remain...

        var m = tmp.match(/\s+/);
        if(m){
          var delimiter = m[0];
          cmd = tmp.slice(0, m.index);
        }else{
          cmd = "";
        }

        switch(cmd){
          default:
            out.push("{{")
            out.push(tmp);
            out.push("}}")
        }
      }else{
        switch(v.kind){
          case "text":
            out.push(v.body);
            break;
          case "url":
            // todo: escape
            out.push("<a href='" +  v.body + "'>" + v.body + "</a><a href='http://b.hatena.ne.jp/entry/"+ v.body+"' target='_blank'><img src='http://b.hatena.ne.jp/entry/image/" + v.body + "' /></a>");
            break;
        }
      }
    });
    return out.join("");
  }

