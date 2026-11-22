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
const henMeshes=[];
for(let i=0;i<6;i++){const x=13+(i%3)*5,z=-14+Math.floor(i/3)*4;const hen=ball(.72,x,.85,z,white);hen.userData.baseX=x;hen.userData.baseZ=z;henMeshes.push(hen);ball(.42,x+.45,1.3,z,white);const beak=ball(.18,x+.82,1.25,z,mat(0xe7a53c));beak.scale.set(1.3,.6,1);ball(.08,x+.73,1.43,z-.22,mat(0x2a2d2a));cyl(.15,.15,.28,x,1.8,z,mat(0xce5245));}
// Vegetable garden rows.
const cropLeaves=[];
for(let row=0;row<4;row++){const z=11+row*4;box(18,.3,2.4,-19,.22,z,mat(0x80583a));for(let j=0;j<9;j++){const x=-27+j*2;const stem=cyl(.07,.09,.8,x,.77,z,mat(0x43813a));for(const side of [-1,1]){const leaf=ball(.36,x+side*.32,1.1,z,mat(0x3c963d));leaf.scale.set(1,.38,.65);cropLeaves.push(leaf);}}}
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
// Interactive low-poly equipment and visual effects.
const bucket=new THREE.Group();player.add(bucket);bucket.position.set(.83,1.0,.18);bucket.visible=false;
const bucketBody=new THREE.Mesh(new THREE.CylinderGeometry(.31,.24,.5,12),mat(0x5b9ec3));bucketBody.position.y=0;bucket.add(bucketBody);
const bucketHandle=new THREE.Mesh(new THREE.TorusGeometry(.29,.045,6,14,Math.PI),mat(0xcbdce0));bucketHandle.position.y=.25;bucket.add(bucketHandle);
const wateringCan=new THREE.Group();player.add(wateringCan);wateringCan.position.set(.8,1.1,.2);wateringCan.visible=false;
const canBody=new THREE.Mesh(new THREE.CylinderGeometry(.3,.32,.48,12),mat(0x5cb1a0));wateringCan.add(canBody);
const spout=new THREE.Mesh(new THREE.CylinderGeometry(.08,.12,.6,9),mat(0x5cb1a0));spout.position.set(.38,.12,0);spout.rotation.z=-1.0;wateringCan.add(spout);
const canHandle=new THREE.Mesh(new THREE.TorusGeometry(.3,.05,6,14),mat(0x2c7668));canHandle.position.set(-.27,.14,0);wateringCan.add(canHandle);
const particles=[];
function particleBurst(x,y,z,color,count=14){for(let i=0;i<count;i++){const o=ball(.08+Math.random()*.07,x,y,z,mat(color));o.userData.velocity=new THREE.Vector3((Math.random()-.5)*3,Math.random()*2.2+1,(Math.random()-.5)*3);particles.push({mesh:o,life:.7+Math.random()*.6});}}
const eggs=[];for(let i=0;i<4;i++){const egg=ball(.24,15+(i%2)*1.1,.7,-17+Math.floor(i/2)*1.2,mat(0xffe8c2));egg.scale.set(.8,1.25,.8);eggs.push(egg);}
const interactionSpots=[
 {id:'fish',x:-11.3,z:-18,r:4.4,label:'หยิบถังอาหารและให้อาหารปลา',emoji:'🐟'},
 {id:'chicken',x:15,z:-15,r:5.4,label:'เก็บไข่ไก่',emoji:'🥚'},
 {id:'crop',x:-19,z:8.8,r:5.2,label:'ใช้บัวรดน้ำรดผัก',emoji:'🥬'}
];
const taskDefinitions=[
 {id:'fish',title:'ให้อาหารปลานิล',description:'เดินไปที่บ่อปลา แล้วกดปุ่มทำกิจกรรมเพื่อหยิบถังและให้อาหารปลา'},
 {id:'chicken',title:'เก็บไข่ไก่',description:'เดินไปโรงเรือนไก่แล้วเก็บไข่ให้ครบ'},
 {id:'crop',title:'รดน้ำแปลงผัก',description:'เดินไปแปลงผักและใช้บัวรดน้ำ'}
];
const storageKey='nongmaka-eco-world-phase2-v1';
const initialState=()=>({day:1,completed:{},totalEggs:0,totalActions:0});
let gameState=initialState();try{const saved=JSON.parse(localStorage.getItem(storageKey)||'null');if(saved&&Number.isInteger(saved.day)&&saved.day>=1&&saved.day<=9999&&saved.completed&&typeof saved.completed==='object'){gameState={...initialState(),...saved};}}catch(e){console.warn('Could not load save',e);}
const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify(gameState));}catch(e){console.warn('Save unavailable',e);}};
const dayEl=document.getElementById('day'),taskListEl=document.getElementById('taskList'),taskProgressEl=document.getElementById('taskProgress'),toastEl=document.getElementById('toast');
let toastTimeout=0,animation=null,nearSpot=null;
function toast(message){toastEl.textContent=message;toastEl.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toastEl.classList.remove('show'),3500);}
function completed(id){return !!gameState.completed[id];}
function renderTasks(){dayEl.textContent='วันที่ '+gameState.day;const done=taskDefinitions.filter(t=>completed(t.id)).length;taskProgressEl.textContent=done+'/3 ภารกิจ';taskListEl.innerHTML=taskDefinitions.map(t=>`<li class="${completed(t.id)?'done':''}"><span>${completed(t.id)?'✓':'○'}</span><span>${t.title}</span></li>`).join('');document.getElementById('nextDay').disabled=done!==3;document.getElementById('eggCount').textContent=gameState.totalEggs;}
function startAnimation(id){animation={id,elapsed:0,duration:id==='chicken'?1.65:2.7};bucket.visible=id==='fish';wateringCan.visible=id==='crop';if(id==='fish')toast('กำลังหยิบถังอาหารและโปรยอาหารให้ปลา...');if(id==='chicken')toast('กำลังเก็บไข่ไก่อย่างระมัดระวัง...');if(id==='crop')toast('กำลังใช้บัวรดน้ำรดผัก...');}
function doActivity(){if(animation)return;if(!nearSpot){toast('เดินเข้าใกล้จุดกิจกรรมก่อนนะ');return;}if(completed(nearSpot.id)){toast('ทำภารกิจนี้สำเร็จแล้ว กลับมาทำใหม่ในวันถัดไป');return;}startAnimation(nearSpot.id);}
function finishAnimation(id){animation=null;bucket.visible=false;wateringCan.visible=false;gameState.completed[id]=true;gameState.totalActions++;if(id==='chicken'){gameState.totalEggs+=4;eggs.forEach(e=>e.visible=false);toast('เก็บไข่สำเร็จ! ได้ไข่ 4 ฟอง');}if(id==='fish'){particleBurst(-19,.9,-18,0xf4c76d,18);toast('ให้อาหารปลาเรียบร้อย! ปลาได้รับอาหารแล้ว');}if(id==='crop'){cropLeaves.forEach(l=>l.scale.multiplyScalar(1.018));toast('รดน้ำเรียบร้อย! แปลงผักได้รับน้ำแล้ว');}save();renderTasks();if(taskDefinitions.every(t=>completed(t.id)))setTimeout(()=>toast('ทำครบทั้ง 3 ฐานแล้ว! กด “วันถัดไป” เพื่อเริ่มภารกิจใหม่'),800);}
function nextDay(){if(!taskDefinitions.every(t=>completed(t.id)))return;gameState.day++;gameState.completed={};eggs.forEach(e=>e.visible=true);save();renderTasks();toast('เริ่มวันที่ '+gameState.day+' แล้ว ภารกิจใหม่พร้อมให้ทำ!');}
document.getElementById('nextDay').addEventListener('click',nextDay);
document.getElementById('resetGame').addEventListener('click',()=>{if(!confirm('เริ่มเกมใหม่และลบความก้าวหน้าที่บันทึกไว้บนอุปกรณ์นี้?'))return;gameState=initialState();eggs.forEach(e=>e.visible=true);save();renderTasks();toast('เริ่มเกมใหม่เรียบร้อย');});
document.getElementById('taskToggle').addEventListener('click',()=>{const panel=document.getElementById('taskPanel');panel.classList.toggle('collapsed');document.getElementById('taskToggle').setAttribute('aria-expanded',String(!panel.classList.contains('collapsed')));});
renderTasks();eggs.forEach(e=>e.visible=!completed('chicken'));

const keys=new Set();let joystick={x:0,y:0},yaw=0,drag=false,lastX=0,activeZone=null,walkPhase=0;
const locationEl=document.getElementById('location'),actionWrap=document.getElementById('interact'),notice=document.getElementById('notice');
function closeNotice(){notice.style.display='none';}
function interact(){if(nearSpot){doActivity();return;}if(!activeZone)return;notice.innerHTML=`<h2>${activeZone.title}</h2><p>${activeZone.description}</p><p style="margin-top:10px;color:#66796e;font-size:13px">ระยะที่ 1: สำรวจโลก 3D · ภารกิจและระบบเติบโตจะเพิ่มในระยะต่อไป</p><button id="closeNotice">กลับไปสำรวจ</button>`;notice.style.display='block';document.getElementById('closeNotice').addEventListener('click',closeNotice);}
document.getElementById('action').addEventListener('click',interact);
window.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();keys.add(e.key.toLowerCase());if(e.key.toLowerCase()==='e'&&!e.repeat)interact();if(e.key==='Escape')closeNotice();});
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
function animate(){const dt=Math.min(clock.getDelta(),.05),blocked=notice.style.display==='block'||!!animation;let forward=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0)+joystick.y;let right=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0)+joystick.x;const length=Math.hypot(forward,right);if(length>.08&&!blocked){forward/=Math.max(1,length);right/=Math.max(1,length);const vx=Math.sin(yaw)*forward+Math.cos(yaw)*right,vz=-Math.cos(yaw)*forward+Math.sin(yaw)*right;player.position.x=THREE.MathUtils.clamp(player.position.x+vx*dt*6,-38,38);player.position.z=THREE.MathUtils.clamp(player.position.z+vz*dt*6,-38,38);player.rotation.y=Math.atan2(vx,vz);walkPhase+=dt*12;legs[0].rotation.x=Math.sin(walkPhase)*.55;legs[1].rotation.x=-Math.sin(walkPhase)*.55;}else{legs[0].rotation.x*=.8;legs[1].rotation.x*=.8;}
let nearest=null,min=Infinity;for(const z of zones){const d=Math.hypot(player.position.x-z.x,player.position.z-z.z);if(d<min){min=d;nearest=z;}}
activeZone=min<15?nearest:null;
nearSpot=null;let spotDistance=Infinity;for(const s of interactionSpots){const d=Math.hypot(player.position.x-s.x,player.position.z-s.z);if(d<s.r&&d<spotDistance){nearSpot=s;spotDistance=d;}}
const actionButton=document.getElementById('action');actionWrap.style.display=(nearSpot||activeZone)?'block':'none';actionButton.textContent=nearSpot?(completed(nearSpot.id)?'✓ สำเร็จแล้ว':nearSpot.emoji+' '+nearSpot.label):'สำรวจฐาน';actionButton.disabled=!!animation;
locationEl.textContent=nearSpot?`📍 ${nearSpot.label} · กด E หรือปุ่มกิจกรรม`:activeZone?`📍 ${activeZone.name} · เดินไปยังจุดกิจกรรม`:'📍 ลานกลางโรงเรียน · เดินไปยังฐานการเรียนรู้';
if(animation){animation.elapsed+=dt;const progress=animation.elapsed/animation.duration;const swing=Math.sin(progress*Math.PI*5)*.25;bucket.rotation.z=swing;wateringCan.rotation.z=-.4+Math.sin(progress*Math.PI*4)*.18;
 if(animation.id==='fish'&&Math.random()<dt*18)particleBurst(-12,.9,-18,0xe8c26d,2);
 if(animation.id==='crop'&&Math.random()<dt*14)particleBurst(-19,1.8,11,0x5fbbe9,2);
 if(animation.id==='chicken'&&progress>.5)eggs.forEach(e=>e.visible=false);
 if(animation.elapsed>=animation.duration)finishAnimation(animation.id);
}
for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.life-=dt;p.mesh.position.addScaledVector(p.mesh.userData.velocity,dt);p.mesh.userData.velocity.y-=dt*5;p.mesh.scale.multiplyScalar(.985);if(p.life<=0){scene.remove(p.mesh);p.mesh.geometry.dispose();particles.splice(i,1);}}
for(let i=0;i<henMeshes.length;i++){henMeshes[i].position.x=henMeshes[i].userData.baseX+Math.sin(clock.elapsedTime*.8+i)*.15;}

const target=new THREE.Vector3(player.position.x+Math.sin(yaw)*12,10,player.position.z+Math.cos(yaw)*12);camera.position.lerp(target,Math.min(1,dt*5));camera.lookAt(player.position.x,1.5,player.position.z);
for(let i=0;i<fishMeshes.length;i++){fishMeshes[i].position.x+=Math.sin(clock.elapsedTime*.7+i)*dt*.13;}
renderer.render(scene,camera);requestAnimationFrame(animate);}
camera.position.set(0,10,16);document.getElementById('loading').remove();animate();
