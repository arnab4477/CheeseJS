import{r,h as e}from"./p-4d97f5d8.js";import{a as i}from"./p-5a92e793.js";const t=class{constructor(e){r(this,e),this.light="#E0C35A",this.dark="#7A6A31"}componentDidLoad(){this.checkerboardContainer.innerHTML=((r,e)=>{let t,o="";for(let h=0;h<i.length;h++){o+="<div class='row'>";for(let s=0;s<i.length;s++)t=(h+s)%2==0?r:e,o+=`<div class='square' style='background-color: ${t}'></div>`;o+="</div>"}return o})(this.light,this.dark)}render(){return e("div",{ref:r=>this.checkerboardContainer=r,id:"checker-board-container"})}};t.style="#checker-board-container{position:relative;width:400px;height:400px}.row{display:flex;flex-direction:row;width:100%;height:50px}.square{width:50px;height:50px}@media (max-width: 550px){#checker-board-container{width:360px;height:360px}.row{height:45px}.square{width:45px;height:45px}}";export{t as checker_board}