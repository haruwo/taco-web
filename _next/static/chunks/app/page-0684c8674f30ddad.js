(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1787:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>m});var s=a(5155),l=a(2115),n=a(9039);let r=e=>{let{rpm:t,maxRpm:a=8e3,yellowZone:r=7e3,redZone:d=7500,speed:i,gearNumber:c,width:m=300,height:h=300,startAngle:o=.5*Math.PI,endAngle:u=2*Math.PI,nextGearRpm:x}=e,p=(0,l.useRef)(null);return(0,l.useEffect)(()=>{if(!p.current)return;let e=n.Ltv(p.current);e.selectAll("*").remove();let s=m/2,l=h/2,i=Math.min(m,h)/2-20,b=Math.min(m,h)/300,f=Math.max(8,Math.round(12*b)),j=Math.max(16,Math.round(24*b)),v=Math.max(18,Math.round(28*b)),g=Math.max(2,Math.round(3*b)),N=Math.max(1,Math.round(2*b)),M=Math.max(6,Math.round(10*b)),y=Math.max(4,Math.round(6*b)),w=.5*Math.PI,k=n.m4Y().domain([0,a]).range([o,u]),I=n.JLW().innerRadius(i-30*b).outerRadius(i).startAngle(o+w).endAngle(u+w);if(e.append("path").attr("d",I).attr("transform","translate(".concat(s,", ").concat(l,")")).attr("fill","#e0e0e0"),r<a){let t=n.JLW().innerRadius(i-30*b).outerRadius(i).startAngle(k(r)+w).endAngle(k(Math.min(d,a))+w);e.append("path").attr("d",t).attr("transform","translate(".concat(s,", ").concat(l,")")).attr("fill","#FFD700")}if(d<a){let t=n.JLW().innerRadius(i-30*b).outerRadius(i).startAngle(k(d)+w).endAngle(k(a)+w);e.append("path").attr("d",t).attr("transform","translate(".concat(s,", ").concat(l,")")).attr("fill","#FF0000")}let C=a<=1e4?1e3:2e3;n.y17(0,a+1,C).forEach(t=>{let a=k(t),n=s+(i-30*b)*Math.cos(a),r=l+(i-30*b)*Math.sin(a),d=s+(i-10*b)*Math.cos(a),c=l+(i-10*b)*Math.sin(a);e.append("line").attr("x1",n).attr("y1",r).attr("x2",d).attr("y2",c).attr("stroke","black").attr("stroke-width",N);let m=s+(i-45*b)*Math.cos(a),h=l+(i-45*b)*Math.sin(a);e.append("text").attr("x",m).attr("y",h).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("font-size","".concat(f,"px")).text(t/1e3)});let R=k(Math.min(t,a)),P=i-8*b,S=s+P*Math.cos(R),F=l+P*Math.sin(R),A=R+Math.PI/2,L=R-Math.PI/2,E=s+g*Math.cos(A),_=l+g*Math.sin(A),z=s+g*Math.cos(L),O=l+g*Math.sin(L);if(e.append("path").attr("d","M ".concat(E," ").concat(_," L ").concat(S," ").concat(F," L ").concat(z," ").concat(O," Z")).attr("fill","red").attr("stroke","none"),void 0!==x){let t=k(Math.min(x,a)),n=s+P*Math.cos(t),r=l+P*Math.sin(t),d=t+Math.PI/2,i=t-Math.PI/2,c=s+g*Math.cos(d),m=l+g*Math.sin(d),h=s+g*Math.cos(i),o=l+g*Math.sin(i);e.append("path").attr("d","M ".concat(c," ").concat(m," L ").concat(n," ").concat(r," L ").concat(h," ").concat(o," Z")).attr("fill","#0066cc").attr("stroke","none")}e.append("circle").attr("cx",s).attr("cy",l).attr("r",M).attr("fill","#333"),e.append("circle").attr("cx",s).attr("cy",l).attr("r",y).attr("fill","#666");let W=l+150*b,Z=l-120*b,J=t>=d;e.append("text").attr("x",s).attr("y",W).attr("text-anchor","middle").attr("font-size","".concat(j,"px")).attr("font-weight","bold").attr("fill",J?"#FF0000":"black").text("".concat(Math.round(t)," RPM")),e.append("text").attr("x",s).attr("y",Z).attr("text-anchor","middle").attr("font-size","".concat(v,"px")).attr("font-weight","bold").text("".concat(x?"".concat(c,"-").concat(Number(c)+1):c))},[t,a,r,d,i,c,m,h,o,u,x]),(0,s.jsx)("div",{className:"tachometer-container",children:(0,s.jsx)("svg",{ref:p,width:m,height:h})})};function d(e){let t=function(e){let t=e.match(/^(\d+)\/(\d+)\/R(\d+)$/);if(!t)return null;let a=parseInt(t[1],10);return{width:a,aspectRatio:parseInt(t[2],10),rimDiameter:parseInt(t[3],10)}}(e);if(!t)return .65;let{width:a,aspectRatio:s,rimDiameter:l}=t;return(25.4*l+a*s/100*2)/1e3}function i(e){return Math.PI*d(e)}let c=()=>{let e=.5*Math.PI,t=2*Math.PI,[a,n]=(0,l.useState)({first:5.087,second:2.991,third:2.035,fourth:1.594,fifth:1.286,sixth:1,seventh:0,eighth:0,ninth:0,reverse:4.696}),[c,m]=(0,l.useState)(2.866),[h,o]=(0,l.useState)("195/50/R16"),[u,x]=(0,l.useState)(7e3),[p,b]=(0,l.useState)(7500),[f,j]=(0,l.useState)(8e3),[v,g]=(0,l.useState)(60),[N,M]=(0,l.useState)(1),[y,w]=(0,l.useState)(e),[k,I]=(0,l.useState)(t),[C,R]=(0,l.useState)(3),[P,S]=(0,l.useState)({width:300,height:300}),F=(0,l.useRef)(null),[A,L]=(0,l.useState)([]),E=(100*d(h)).toFixed(1),_=(100*i(h)).toFixed(1),z=(1e3/i(h)).toFixed(1);(0,l.useEffect)(()=>{let e=[a.first,a.second,a.third,a.fourth,a.fifth,a.sixth,a.seventh,a.eighth,a.ninth,a.reverse].filter(e=>e>0);L(e.map(e=>{var t,a,s;return t=v,a=e,s=c,Math.round(t/3.6/(Math.PI*d(h))*60*a*s)}))},[v,a,c,h]),(0,l.useEffect)(()=>{if(!F.current)return;let e=()=>{var e;let t=null===(e=F.current)||void 0===e?void 0:e.querySelectorAll(".tachometer-item");if(!t||0===t.length)return;let a=t[0],s=a.clientWidth;a.clientHeight;let l=Math.max(s-32,100),n=Math.max(l,100);S({width:l,height:n})};e();let t=new ResizeObserver(()=>{e()});return t.observe(F.current),()=>{t.disconnect()}},[A.length,C]);let O=(e,t)=>{let a=parseFloat(t)||0;n(t=>({...t,[e]:a}))};return Object.values(a).filter((e,t)=>e>0&&t<9).length,(0,s.jsxs)("div",{className:"container mx-auto p-4",children:[(0,s.jsx)("h1",{className:"text-2xl font-bold mb-6",children:"ギア比タコメーターアプリ"}),(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{className:"mb-6",children:(0,s.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-md",children:[(0,s.jsxs)("label",{className:"block text-sm font-medium mb-1",children:["速度: ",v," km/h"]}),(0,s.jsx)("input",{type:"range",min:"0",max:"300",value:v,onChange:e=>{g(parseInt(e.target.value)||0)},className:"w-full"})]})}),(0,s.jsx)("div",{ref:F,className:"grid ".concat((()=>{switch(C){case 1:return"grid-cols-1";case 2:return"grid-cols-2";case 3:default:return"grid-cols-3";case 4:return"grid-cols-4";case 5:return"grid-cols-5";case 6:return"grid-cols-6"}})()," gap-4"),children:A.map((e,t)=>{if(t===A.length-1)return null;let a=A[t+1];return a>e&&(a=void 0),(0,s.jsx)("div",{className:"bg-white p-4 rounded-lg shadow-md tachometer-item",children:(0,s.jsx)(r,{rpm:e,maxRpm:f,yellowZone:u,redZone:p,speed:v,gearNumber:t+1,nextGearRpm:a,width:P.width,height:P.height,startAngle:y,endAngle:k})},t)})})]}),(0,s.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-md",children:[(0,s.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"ギア比設定"}),(0,s.jsxs)("div",{className:"grid grid-cols-2 gap-4 mb-6",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"第1速"}),(0,s.jsx)("input",{type:"number",step:"0.001",value:a.first||"",onChange:e=>O("first",e.target.value),className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"第2速"}),(0,s.jsx)("input",{type:"number",step:"0.001",value:a.second||"",onChange:e=>O("second",e.target.value),className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"第3速"}),(0,s.jsx)("input",{type:"number",step:"0.001",value:a.third||"",onChange:e=>O("third",e.target.value),className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"第4速"}),(0,s.jsx)("input",{type:"number",step:"0.001",value:a.fourth||"",onChange:e=>O("fourth",e.target.value),className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"第5速"}),(0,s.jsx)("input",{type:"number",step:"0.001",value:a.fifth||"",onChange:e=>O("fifth",e.target.value),className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"第6速"}),(0,s.jsx)("input",{type:"number",step:"0.001",value:a.sixth||"",onChange:e=>O("sixth",e.target.value),className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"第7速"}),(0,s.jsx)("input",{type:"number",step:"0.001",value:a.seventh||"",onChange:e=>O("seventh",e.target.value),className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"第8速"}),(0,s.jsx)("input",{type:"number",step:"0.001",value:a.eighth||"",onChange:e=>O("eighth",e.target.value),className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"第9速"}),(0,s.jsx)("input",{type:"number",step:"0.001",value:a.ninth||"",onChange:e=>O("ninth",e.target.value),className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"後退 (R)"}),(0,s.jsx)("input",{type:"number",step:"0.001",value:a.reverse||"",onChange:e=>O("reverse",e.target.value),className:"w-full px-3 py-2 border rounded-md"})]})]}),(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"最終減速比"}),(0,s.jsx)("input",{type:"number",step:"0.001",value:c||"",onChange:e=>{m(parseFloat(e.target.value)||0)},className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"タイヤサイズ (例: 195/50/R16)"}),(0,s.jsx)("input",{type:"text",value:h,onChange:e=>{o(e.target.value)},className:"w-full px-3 py-2 border rounded-md",placeholder:"195/50/R16"})]}),(0,s.jsxs)("div",{className:"grid grid-cols-2 gap-4 mb-6",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"開始角度 (π\xd7)"}),(0,s.jsx)("input",{type:"number",step:"0.1",value:y/Math.PI,onChange:e=>{w((parseFloat(e.target.value)||0)*Math.PI)},className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"終了角度 (π\xd7)"}),(0,s.jsx)("input",{type:"number",step:"0.1",value:k/Math.PI,onChange:e=>{I((parseFloat(e.target.value)||0)*Math.PI)},className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"イエローゾーン開始 (rpm)"}),(0,s.jsx)("input",{type:"number",step:"100",value:u||"",onChange:e=>{x(parseInt(e.target.value)||0)},className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"レッドゾーン開始 (rpm)"}),(0,s.jsx)("input",{type:"number",step:"100",value:p||"",onChange:e=>{b(parseInt(e.target.value)||0)},className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"最大RPM"}),(0,s.jsx)("input",{type:"number",step:"100",value:f||"",onChange:e=>{j(parseInt(e.target.value)||0)},className:"w-full px-3 py-2 border rounded-md"})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block text-sm font-medium mb-1",children:"タコメーター列数 (1-6)"}),(0,s.jsx)("input",{type:"number",min:"1",max:"6",value:C,onChange:e=>{R(Math.max(1,Math.min(6,parseInt(e.target.value)||1)))},className:"w-full px-3 py-2 border rounded-md"})]})]}),(0,s.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"タイヤ情報と計算式"}),(0,s.jsxs)("div",{className:"mb-2",children:[(0,s.jsx)("span",{className:"font-medium",children:"現在のタイヤサイズ:"})," ",h]}),(0,s.jsxs)("div",{className:"mb-2",children:[(0,s.jsx)("span",{className:"font-medium",children:"タイヤ外径:"})," ",E," cm"]}),(0,s.jsxs)("div",{className:"mb-2",children:[(0,s.jsx)("span",{className:"font-medium",children:"タイヤ外周:"})," ",_," cm"]}),(0,s.jsxs)("div",{className:"mb-2",children:[(0,s.jsx)("span",{className:"font-medium",children:"1km走行あたりの回転数:"})," ",z," 回転"]}),(0,s.jsxs)("div",{className:"mb-3",children:[(0,s.jsx)("span",{className:"font-medium",children:"タイヤ外径の計算式:"}),(0,s.jsxs)("div",{className:"mt-1 text-sm bg-gray-50 p-2 rounded",children:["タイヤ外径 = リム径(インチ) \xd7 25.4 + 2 \xd7 (タイヤ幅(mm) \xd7 扁平率 \xf7 100)",(0,s.jsx)("br",{}),(0,s.jsxs)("span",{className:"text-gray-600",children:["例: ",h," の場合"]}),(0,s.jsx)("br",{}),"リム径 = 16インチ, タイヤ幅 = 195mm, 扁平率 = 50%",(0,s.jsx)("br",{}),"タイヤ外径 = 16 \xd7 25.4 + 2 \xd7 (195 \xd7 50 \xf7 100) = ",E," cm"]})]}),(0,s.jsxs)("div",{className:"mb-2",children:[(0,s.jsx)("span",{className:"font-medium",children:"タイヤ外周の計算式:"}),(0,s.jsxs)("div",{className:"mt-1 text-sm bg-gray-50 p-2 rounded",children:["タイヤ外周 = π \xd7 タイヤ外径",(0,s.jsx)("br",{}),(0,s.jsxs)("span",{className:"text-gray-600",children:["例: ",h," の場合"]}),(0,s.jsx)("br",{}),"タイヤ外周 = π \xd7 ",E," cm = ",_," cm"]})]}),(0,s.jsxs)("div",{className:"mb-2",children:[(0,s.jsx)("span",{className:"font-medium",children:"RPM計算式:"}),(0,s.jsx)("div",{className:"mt-1 text-sm bg-gray-50 p-2 rounded",children:"RPM = (速度[km/h] \xd7 ギア比 \xd7 最終減速比 \xd7 60) \xf7 (タイヤ外周[m] \xd7 3.6)"})]}),(0,s.jsxs)("div",{className:"text-sm text-gray-600 mt-2",children:[(0,s.jsx)("span",{className:"font-medium",children:"現在の設定:"})," 最終減速比 = ",c]})]})]})]})};function m(){return(0,s.jsx)("main",{className:"min-h-screen py-8",children:(0,s.jsx)(c,{})})}},2261:(e,t,a)=>{Promise.resolve().then(a.bind(a,1787))}},e=>{var t=t=>e(e.s=t);e.O(0,[39,441,684,358],()=>t(2261)),_N_E=e.O()}]);