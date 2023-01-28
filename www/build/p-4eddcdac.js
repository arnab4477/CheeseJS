import{B as s,a as e}from"./p-5a92e793.js";var i;!function(s){s.whitePawn="P",s.blackPawn="p",s.whiteRook="R",s.blackRook="r",s.whiteKnight="N",s.blackKnight="n",s.whiteBishop="B",s.blackBishop="b",s.whiteQueen="Q",s.blackQueen="q",s.whiteKing="K",s.blackKing="k"}(i||(i={}));const a={K:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/45px-Chess_klt45.svg.png",k:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/45px-Chess_kdt45.svg.png",Q:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/45px-Chess_qlt45.svg.png",q:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/45px-Chess_qdt45.svg.png",R:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Chess_rlt45.svg/45px-Chess_rlt45.svg.png",r:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Chess_rdt45.svg/45px-Chess_rdt45.svg.png",B:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chess_blt45.svg/45px-Chess_blt45.svg.png",b:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Chess_bdt45.svg/45px-Chess_bdt45.svg.png",N:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/45px-Chess_nlt45.svg.png",n:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/45px-Chess_ndt45.svg.png",P:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Chess_plt45.svg/45px-Chess_plt45.svg.png",p:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chess_pdt45.svg/45px-Chess_pdt45.svg.png"},t=(s,e,t,r,d)=>{switch(s){case i.whitePawn:return`<div id="${t[r][d]}" class="square" style="background-color: ${e}"><img id="P" alt='white pawn' class="piece" draggable="true" src=${a.P}></div>`;case i.blackPawn:return`<div id="${t[r][d]}" class="square" style="background-color: ${e}"><img id="p" alt='black pawn' class="piece" draggable="true" src=${a.p}></div>`;case i.whiteRook:return`<div id="${t[r][d]}" class="square" style="background-color: ${e}"><img id="R" alt='white rook' class="piece" draggable="true" src=${a.R}></div>`;case i.blackRook:return`<div id="${t[r][d]}" class="square" style="background-color: ${e}"><img id="r" alt='black rook' class="piece" draggable="true" src=${a.r}></div>`;case i.whiteKnight:return`<div id="${t[r][d]}" class="square" style="background-color: ${e}"><img id="N" alt='white knight' class="piece" draggable="true" src=${a.N}></div>`;case i.blackKnight:return`<div id="${t[r][d]}" class="square" style="background-color: ${e}"><img id="n" alt='black knight' class="piece" draggable="true" src=${a.n}></div>`;case i.whiteBishop:return`<div id="${t[r][d]}" class="square" style="background-color: ${e}"><img id="B" alt='white bishop' class="piece" draggable="true" src=${a.B}></div>`;case i.blackBishop:return`<div id="${t[r][d]}" class="square" style="background-color: ${e}"><img id="b" alt='black bishop' class="piece" draggable="true" src=${a.b}></div>`;case i.whiteQueen:return`<div id="${t[r][d]}" class="square" style="background-color: ${e}"><img id="Q" alt='white queen' class="piece" draggable="true" src=${a.Q}></div>`;case i.blackQueen:return`<div id="${t[r][d]}" class="square" style="background-color: ${e}"><img id="q" alt='black queen' class="piece" draggable="true" src=${a.q}></div>`;case i.whiteKing:return`<div id="${t[r][d]}" class="square" style="background-color: ${e}"><img id="K" alt='white king' class="piece" draggable="true" src=${a.K}></div>`;case i.blackKing:return`<div id="${t[r][d]}" class="square" style="background-color: ${e}"><img id="k" alt='black king' class="piece" draggable="true" src=${a.k}></div>`;default:return""}},r=(i="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")=>{const a=i.split("/"),t=Object.assign({},s);let r="";for(let s=0;s<e.length;s++)for(let i=0;i<e.length;i++){r=a[s][i];let d=e[s][i],l=d[0],c=d[1];if("string"==typeof r&&r.match(/[a-zA-Z]/))t[l][c]=r;else if("number"==typeof parseInt(r))for(let s=0;s<parseInt(r);s++)i++}return t},d=(s,i,a)=>{const r=a.split("/"),d=[s,i];let l=0,c="",o="";for(let s=0;s<e.length;s++){o+='<div class="row">';for(let i=0;i<e.length;i++){let a=r[s][i];if(c=d[l],"string"==typeof a&&a.match(/[a-zA-Z]/))o+=t(a,c,e,s,i),l=(l+1)%2;else if("number"==typeof parseInt(a))for(let t=0;t<parseInt(a);t++)o+=`<div id="${e[s][i]}" class="square" style="background-color: ${c}"></div>`,l=(l+1)%2,c=d[l],i++}l=(l+1)%2,o+="</div>"}return o};export{r as f,d as g,a as p}