import{jsx as _jsx}from"react/jsx-runtime";import{useEffect,useRef}from"react";import{addPropertyControls,ControlType}from"framer";function hexToVec4(color){const rgbMatch=color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);if(rgbMatch){const r=parseInt(rgbMatch[1])/255;const g=parseInt(rgbMatch[2])/255;const b=parseInt(rgbMatch[3])/255;const a=rgbMatch[4]?parseFloat(rgbMatch[4]):1;console.log(`Color ${color} -> [${r}, ${g}, ${b}, ${a}]`);return[r,g,b,a];}let hexStr=color.replace("#","");let r=0,g=0,b=0,a=1;if(hexStr.length===3){// #RGB
r=parseInt(hexStr[0]+hexStr[0],16)/255;g=parseInt(hexStr[1]+hexStr[1],16)/255;b=parseInt(hexStr[2]+hexStr[2],16)/255;}else if(hexStr.length===6){// #RRGGBB
r=parseInt(hexStr.slice(0,2),16)/255;g=parseInt(hexStr.slice(2,4),16)/255;b=parseInt(hexStr.slice(4,6),16)/255;}else if(hexStr.length===8){// #RRGGBBAA
r=parseInt(hexStr.slice(0,2),16)/255;g=parseInt(hexStr.slice(2,4),16)/255;b=parseInt(hexStr.slice(4,6),16)/255;a=parseInt(hexStr.slice(6,8),16)/255;}console.log(`Color ${color} -> [${r}, ${g}, ${b}, ${a}]`);return[r,g,b,a];}const vertexShader=`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;const fragmentShader=`
precision highp float;

#define PI 3.14159265359

uniform float iTime;
uniform vec3 iResolution;
uniform float uSpinRotation;
uniform float uSpinSpeed;
uniform vec2 uOffset;
uniform vec4 uColor1;
uniform vec4 uColor2;
uniform vec4 uColor3;
uniform float uContrast;
uniform float uLighting;
uniform float uSpinAmount;
uniform float uPixelFilter;
uniform float uSpinEase;
uniform bool uIsRotate;
uniform vec2 uMouse;

varying vec2 vUv;

vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / uPixelFilter;
    vec2 uv = (floor(screen_coords.xy * (1.0 / pixel_size)) * pixel_size - 0.5 * screenSize.xy) / length(screenSize.xy) - uOffset;
    float uv_len = length(uv);
    
    float speed = (uSpinRotation * uSpinEase * 0.2);
    if(uIsRotate){
       speed = iTime * speed;
    }
    speed += 302.2;
    
    float mouseInfluence = (uMouse.x * 2.0 - 1.0);
    speed += mouseInfluence * 0.1;
    
    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase * 20.0 * (uSpinAmount * uv_len + (1.0 - uSpinAmount));
    vec2 mid = (screenSize.xy / length(screenSize.xy)) / 2.0;
    uv = (vec2(uv_len * cos(new_pixel_angle) + mid.x, uv_len * sin(new_pixel_angle) + mid.y) - mid);
    
    uv *= 30.0;
    float baseSpeed = iTime * uSpinSpeed;
    speed = baseSpeed + mouseInfluence * 2.0;
    
    vec2 uv2 = vec2(uv.x + uv.y);
    
    for(int i = 0; i < 5; i++) {
        uv2 += sin(max(uv.x, uv.y)) + uv;
        uv += 0.5 * vec2(
            cos(5.1123314 + 0.353 * uv2.y + speed * 0.131121),
            sin(uv2.x - 0.113 * speed)
        );
        uv -= cos(uv.x + uv.y) - sin(uv.x * 0.711 - uv.y);
    }
    
    float contrast_mod = (0.25 * uContrast + 0.5 * uSpinAmount + 1.2);
    float paint_res = min(2.0, max(0.0, length(uv) * 0.035 * contrast_mod));
    float c1p = max(0.0, 1.0 - contrast_mod * abs(1.0 - paint_res));
    float c2p = max(0.0, 1.0 - contrast_mod * abs(paint_res));
    float c3p = 1.0 - min(1.0, c1p + c2p);
    float light = (uLighting - 0.2) * max(c1p * 5.0 - 4.0, 0.0) + uLighting * max(c2p * 5.0 - 4.0, 0.0);
    
    return (0.3 / uContrast) * uColor1 + (1.0 - 0.3 / uContrast) * (uColor1 * c1p + uColor2 * c2p + vec4(c3p * uColor3.rgb, c3p * uColor1.a)) + light;
}

void main() {
    vec2 uv = vUv * iResolution.xy;
    gl_FragColor = effect(iResolution.xy, uv);
}
`;// @framerDisableUnlink
export default function BalatroComponent({spinRotation=-2,spinSpeed=7,offsetX=0,offsetY=0,color1="rgb(211,242,220)",color2="rgb(217,204,227)",color3="rgb(255,255,255)",contrast=1.7,lighting=1,spinAmount=.25,pixelFilter=1e3,spinEase=1,isRotate=false,mouseInteraction=true}){const containerRef=useRef(null);useEffect(()=>{if(!containerRef.current)return;const container=containerRef.current;let cleanupFn=null;const loadOGL=async()=>{try{if(window.OGL){return window.OGL;}try{const OGL=await import("https://cdn.skypack.dev/ogl");window.OGL=OGL;return OGL;}catch(importError){console.warn("Dynamic import failed, trying script tag method:",importError);return new Promise((resolve,reject)=>{const script=document.createElement("script");script.type="module";script.innerHTML=`
              import * as OGL from 'https://cdn.skypack.dev/ogl';
              window.OGL = OGL;
              window.dispatchEvent(new CustomEvent('oglLoaded'));
            `;const handleLoad=()=>{if(window.OGL){resolve(window.OGL);}else{reject(new Error("OGL not found on window object"));}};window.addEventListener("oglLoaded",handleLoad,{once:true});script.onerror=()=>{window.removeEventListener("oglLoaded",handleLoad);reject(new Error("Failed to load OGL script"));};// 타임아웃 설정
setTimeout(()=>{if(!window.OGL){window.removeEventListener("oglLoaded",handleLoad);reject(new Error("OGL loading timeout"));}},5e3);document.head.appendChild(script);});}}catch(error){console.error("Failed to load OGL:",error);throw error;}};const initBalatro=async()=>{try{const OGL=await loadOGL();console.log("OGL loaded successfully:",OGL);if(!OGL||!OGL.Renderer){throw new Error("OGL components not available");}const{Renderer,Program,Mesh,Triangle}=OGL;const renderer=new Renderer({canvas:document.createElement("canvas"),width:container.offsetWidth,height:container.offsetHeight});const gl=renderer.gl;gl.clearColor(0,0,0,1);let program;function resize(){const width=container.offsetWidth;const height=container.offsetHeight;renderer.setSize(width,height);if(program){program.uniforms.iResolution.value=[width,height,width/height];}}resize();const geometry=new Triangle(gl);program=new Program(gl,{vertex:vertexShader,fragment:fragmentShader,uniforms:{iTime:{value:0},iResolution:{value:[container.offsetWidth,container.offsetHeight,container.offsetWidth/container.offsetHeight]},uSpinRotation:{value:spinRotation},uSpinSpeed:{value:spinSpeed},uOffset:{value:[offsetX,offsetY]},uColor1:{value:hexToVec4(color1)},uColor2:{value:hexToVec4(color2)},uColor3:{value:hexToVec4(color3)},uContrast:{value:contrast},uLighting:{value:lighting},uSpinAmount:{value:spinAmount},uPixelFilter:{value:pixelFilter},uSpinEase:{value:spinEase},uIsRotate:{value:isRotate},uMouse:{value:[.5,.5]}}});const mesh=new Mesh(gl,{geometry,program});let animationFrameId;function updateUniforms(){if(program){program.uniforms.uSpinRotation.value=spinRotation;program.uniforms.uSpinSpeed.value=spinSpeed;program.uniforms.uOffset.value=[offsetX,offsetY];program.uniforms.uColor1.value=hexToVec4(color1);program.uniforms.uColor2.value=hexToVec4(color2);program.uniforms.uColor3.value=hexToVec4(color3);program.uniforms.uContrast.value=contrast;program.uniforms.uLighting.value=lighting;program.uniforms.uSpinAmount.value=spinAmount;program.uniforms.uPixelFilter.value=pixelFilter;program.uniforms.uSpinEase.value=spinEase;program.uniforms.uIsRotate.value=isRotate;}}function update(time){if(program){program.uniforms.iTime.value=time*.001;updateUniforms()// 매 프레임마다 uniform 업데이트
;renderer.render({scene:mesh});}animationFrameId=requestAnimationFrame(update);}renderer.gl.canvas.style.width="100%";renderer.gl.canvas.style.height="100%";renderer.gl.canvas.style.display="block";renderer.gl.canvas.style.pointerEvents="auto"// 마우스 이벤트 확실히 받도록
;container.appendChild(renderer.gl.canvas);animationFrameId=requestAnimationFrame(update);function handleMouseMove(e){if(!mouseInteraction||!program)return;const rect=renderer.gl.canvas.getBoundingClientRect()// canvas의 rect 사용
;const x=(e.clientX-rect.left)/rect.width;const y=1-(e.clientY-rect.top)/rect.height;program.uniforms.uMouse.value=[x,y];}renderer.gl.canvas.addEventListener("mousemove",handleMouseMove);window.addEventListener("resize",resize);cleanupFn=()=>{if(animationFrameId){cancelAnimationFrame(animationFrameId);}window.removeEventListener("resize",resize);renderer.gl.canvas.removeEventListener("mousemove",handleMouseMove);if(renderer.gl.canvas.parentNode){container.removeChild(renderer.gl.canvas);}const loseContext=renderer.gl.getExtension("WEBGL_lose_context");if(loseContext){loseContext.loseContext();}};}catch(error){console.error("Failed to initialize Balatro:",error);}};initBalatro();return()=>{if(cleanupFn){cleanupFn();}};},[spinRotation,spinSpeed,offsetX,offsetY,color1,color2,color3,contrast,lighting,spinAmount,pixelFilter,spinEase,isRotate,mouseInteraction]);return /*#__PURE__*/_jsx("div",{ref:containerRef,style:{width:"100%",height:"100%",position:"relative",overflow:"hidden",background:"#000",cursor:"pointer"}});}// Framer Property Controls
addPropertyControls(BalatroComponent,{spinRotation:{type:ControlType.Number,title:"Spin Rotation",defaultValue:-2,min:-10,max:10,step:.1},spinSpeed:{type:ControlType.Number,title:"Spin Speed",defaultValue:7,min:.1,max:20,step:.1},offsetX:{type:ControlType.Number,title:"Offset X",defaultValue:0,min:-1,max:1,step:.01},offsetY:{type:ControlType.Number,title:"Offset Y",defaultValue:0,min:-1,max:1,step:.01},color1:{type:ControlType.Color,title:"Color 1",defaultValue:"rgb(211,242,220)"},color2:{type:ControlType.Color,title:"Color 2",defaultValue:"rgb(217,204,227)"},color3:{type:ControlType.Color,title:"Color 3",defaultValue:"rgb(255,255,255)"},contrast:{type:ControlType.Number,title:"Contrast",defaultValue:1.7,min:.1,max:10,step:.1},lighting:{type:ControlType.Number,title:"Lighting",defaultValue:1,min:0,max:1,step:.1},spinAmount:{type:ControlType.Number,title:"Spin Amount",defaultValue:.25,min:0,max:1,step:.01},pixelFilter:{type:ControlType.Number,title:"Pixel Filter",defaultValue:745,min:100,max:1e3,step:10},spinEase:{type:ControlType.Number,title:"Spin Ease",defaultValue:1,min:0,max:2,step:.1},isRotate:{type:ControlType.Boolean,title:"Is Rotate",defaultValue:false},mouseInteraction:{type:ControlType.Boolean,title:"Mouse Interaction",defaultValue:true,description:"Explore more components at [THE DESIGN FUTURIST](https://thedesignfuturist.zip)"}});
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"BalatroComponent","slots":[],"annotations":{"framerDisableUnlink":"","framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./BalatroComponent.map