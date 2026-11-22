import * as THREE from 'three';
import './style.css';

const app = document.getElementById('app');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9bd8f0);
scene.fog = new THREE.Fog(0x9bd8f0, 65, 125);
const camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 150);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
app.prepend(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xf4fcff, 0x7b9664, 2.1));
const sun = new THREE.DirectionalLight(0xfff3d4, 2.4);
sun.position.set(-22, 40, 20); sun.castShadow = true;
sun.shadow.mapSize.set(1024,1024);
sun.shadow.camera.left=-42; sun.shadow.camera.right=42; sun.shadow.camera.top=42; sun.shadow.camera.bottom=-42;
scene.add(sun);
const mat = (color, roughness=0.9) => new THREE.MeshStandardMaterial({color, roughness});
const grass = mat(0x88c86e), pathMat=mat(0xe8c998), wood=mat(0xb87d4b), white=mat(0xfff7e7);
function box(w,h,d,x,y,z,m,shadow=true){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=shadow;o.receiveShadow=true;scene.add(o);return o;}
function ball(r,x,y,z,m){const o=new THREE.Mesh(new THREE.SphereGeometry(r,12,10),m);o.position.set(x,y,z);o.castShadow=true;scene.add(o);return o;}
function cyl(rt,rb,h,x,y,z,m){const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,10),m);o.position.set(x,y,z);o.castShadow=true;scene.add(o);return o;}
box(82,.4,82,0,-.25,0,grass,false);
box(5,.045,75,0,.01,0,pathMat,false);box(75,.045,5,0,.02,0,pathMat,false);
const zones=[
  {id:'fish',name:'ฐานประมง',x:-19,z:-18,color:0x56b7d3,title:'🐟 ฐานประมง · ผู้เลี้ยงปลา',description:'เรียนรู้การเตรียมบ่อ ตรวจคุณภาพน้ำ ให้อาหารปลา และติดตามการเจริญเติบโตของปลานิล ในระยะต่อไปจะมีภารกิจและสถานการณ์ให้ตัดสินใจ'},
  {id:'chicken',name:'ฐานปศุสัตว์',x:19,z:-18,color:0xe2b56d,title:'🐔 ฐานปศุสัตว์ · ผู้เลี้ยงไก่',description:'สำรวจโรงเรือน ดูแลอาหารและน้ำ ตรวจสุขภาพไก่ไข่ และเรียนรู้สุขอนามัยในการเลี้ยงสัตว์ปีก'},
  {id:'crop',name:'ฐานเกษตร',x:-19,z:18,color:0x78b75a,title:'🥬 ฐานเกษตร · ผู้ปลูกผัก',description:'ทดลองเพาะปลูกผักบุ้งจีน เตรียมดิน รดน้ำ และสังเกตการเจริญเติบโตจากสภาพแวดล้อมที่แตกต่างกัน'}
];
for(const z of zones){box(24,.08,24,z.x,.01,z.z,mat(z.color),false);}
// Pond: blue water with visible fish silhouettes.
box(17,.55,13,-19,.25,-18,mat(0x8d7158));box(15.8,.08,11.8,-19,.57,-18,mat(0x369ec1,.28),false);
const fishMeshes=[];
for(let i=0;i<10;i++){const x=-25+(i%5)*2.7,z=-21+Math.floor(i/5)*5;const fish=ball(.35,x,.72,z,mat(i%2?0xf3d77e:0x436a75));fish.scale.set(1.5,.4,.65);fishMeshes.push(fish);}
box(5,.3,2.4,-10,.65,-18,wood);
// Chicken coop and hens.
box(13,.35,11,19,.2,-18,mat(0xd9b17b));box(9,5,6,19,2.7,-21,mat(0xf2dbad));
const roof=box(11,.55,8,19,5.55,-21,mat(0xb45c4e));roof.rotation.z=.1;
for(let i=0;i<6;i++){const x=13+(i%3)*5,z=-14+Math.floor(i/3)*4;ball(.72,x,.85,z,white);ball(.42,x+.45,1.3,z,white);const beak=ball(.18,x+.82,1.25,z,mat(0xe7a53c));beak.scale.set(1.3,.6,1);ball(.08,x+.73,1.43,z-.22,mat(0x2a2d2a));cyl(.15,.15,.28,x,1.8,z,mat(0xce5245));}
// Vegetable garden rows.
for(let row=0;row<4;row++){const z=11+row*4;box(18,.3,2.4,-19,.22,z,mat(0x80583a));for(let j=0;j<9;j++){const x=-27+j*2;const stem=cyl(.07,.09,.8,x,.77,z,mat(0x43813a));for(const side of [-1,1]){const leaf=ball(.36,x+side*.32,1.1,z,mat(0x3c963d));leaf.scale.set(1,.38,.65);}}}
// Learning center / school.
box(18,7,12,20,3.5,19,mat(0xffe4ad));box(20,.7,14,20,7.25,19,mat(0x8c8ac4));
for(let i=0;i<3;i++)box(2.4,2.5,.12,14+i*5,4.2,12.92,mat(0x7db9d4));
box(3,4,.15,20,2,12.9,mat(0x9a6d4c));
// Trees.
for(const [x,z] of [[-34,-34],[-34,0],[-34,34],[34,-34],[34,0],[34,34],[0,-34],[0,34],[-8,33],[31,10]]){cyl(.35,.5,3.2,x,1.6,z,wood);ball(2.2,x,4.25,z,mat(0x4d9d55));ball(1.7,x-1,5,z,mat(0x62b66a));}
// Avatar (simple, original geometric model).
const player=new THREE.Group();scene.add(player);
const body=new THREE.Mesh(new THREE.CylinderGeometry(.55,.65,1.25,9),mat(0x3a8b76));body.position.y=1.35;body.castShadow=true;player.add(body);
const head=new THREE.Mesh(new THREE.SphereGeometry(.48,14,12),mat(0xffd1a5));head.position.y=2.36;head.castShadow=true;player.add(head);
const hat=new THREE.Mesh(new THREE.CylinderGeometry(.6,.72,.24,12),mat(0xe8b95a));hat.position.y=2.82;player.add(hat);
const legs=[];for(const side of [-1,1]){const leg=new THREE.Mesh(new THREE.BoxGeometry(.29,.82,.32),mat(0x304d73));leg.position.set(side*.25,.45,0);player.add(leg);legs.push(leg);}
player.position.set(0,.1,4);
const keys=new Set();let joystick={x:0,y:0},yaw=0,drag=false,lastX=0,activeZone=null,walkPhase=0;
const locationEl=document.getElementById('location'),actionWrap=document.getElementById('interact'),notice=document.getElementById('notice');
function closeNotice(){notice.style.display='none';}
function interact(){if(!activeZone)return;notice.innerHTML=`<h2>${activeZone.title}</h2><p>${activeZone.description}</p><p style="margin-top:10px;color:#66796e;font-size:13px">ระยะที่ 1: สำรวจโลก 3D · ภารกิจและระบบเติบโตจะเพิ่มในระยะต่อไป</p><button id="closeNotice">กลับไปสำรวจ</button>`;notice.style.display='block';document.getElementById('closeNotice').addEventListener('click',closeNotice);}
document.getElementById('action').addEventListener('click',interact);
window.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();keys.add(e.key.toLowerCase());if(e.key.toLowerCase()==='e')interact();if(e.key==='Escape')closeNotice();});
window.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));
const joy=document.getElementById('joystick'),stick=document.getElementById('stick');
function joyMove(e){const r=joy.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2),len=Math.max(1,Math.hypot(dx,dy)),scale=Math.min(len,42)/len;joystick.x=dx*scale/42;joystick.y=-dy*scale/42;stick.style.transform=`translate(${dx*scale}px,${dy*scale}px)`;}
joy.addEventListener('pointerdown',e=>{joy.setPointerCapture(e.pointerId);joyMove(e);});joy.addEventListener('pointermove',e=>{if(joy.hasPointerCapture(e.pointerId))joyMove(e);});function joyEnd(){joystick.x=joystick.y=0;stick.style.transform='translate(0,0)';}joy.addEventListener('pointerup',joyEnd);joy.addEventListener('pointercancel',joyEnd);
document.getElementById('lookReset').addEventListener('click',()=>yaw=0);
renderer.domElement.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;renderer.domElement.setPointerCapture(e.pointerId);});
renderer.domElement.addEventListener('pointermove',e=>{if(drag){yaw-=(e.clientX-lastX)*.006;lastX=e.clientX;}});
renderer.domElement.addEventListener('pointerup',()=>drag=false);renderer.domElement.addEventListener('pointercancel',()=>drag=false);
function resize(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));}window.addEventListener('resize',resize);
const clock=new THREE.Clock();
function animate(){const dt=Math.min(clock.getDelta(),.05),blocked=notice.style.display==='block';let forward=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0)+joystick.y;let right=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0)+joystick.x;const length=Math.hypot(forward,right);if(length>.08&&!blocked){forward/=Math.max(1,length);right/=Math.max(1,length);const vx=Math.sin(yaw)*forward+Math.cos(yaw)*right,vz=-Math.cos(yaw)*forward+Math.sin(yaw)*right;player.position.x=THREE.MathUtils.clamp(player.position.x+vx*dt*6,-38,38);player.position.z=THREE.MathUtils.clamp(player.position.z+vz*dt*6,-38,38);player.rotation.y=Math.atan2(vx,vz);walkPhase+=dt*12;legs[0].rotation.x=Math.sin(walkPhase)*.55;legs[1].rotation.x=-Math.sin(walkPhase)*.55;}else{legs[0].rotation.x*=.8;legs[1].rotation.x*=.8;}
let nearest=null,min=Infinity;for(const z of zones){const d=Math.hypot(player.position.x-z.x,player.position.z-z.z);if(d<min){min=d;nearest=z;}}
activeZone=min<15?nearest:null;actionWrap.style.display=activeZone?'block':'none';locationEl.textContent=activeZone?`📍 ${activeZone.name} · กด E หรือปุ่มสำรวจ`:'📍 ลานกลางโรงเรียน · เดินไปยังฐานการเรียนรู้';
const target=new THREE.Vector3(player.position.x+Math.sin(yaw)*12,10,player.position.z+Math.cos(yaw)*12);camera.position.lerp(target,Math.min(1,dt*5));camera.lookAt(player.position.x,1.5,player.position.z);
for(let i=0;i<fishMeshes.length;i++){fishMeshes[i].position.x+=Math.sin(clock.elapsedTime*.7+i)*dt*.13;}
renderer.render(scene,camera);requestAnimationFrame(animate);}
camera.position.set(0,10,16);document.getElementById('loading').remove();animate();
