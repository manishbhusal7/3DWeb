

// import gsap from 'gsap';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { createHeader, hideHeader, showHeader } from './HeaderUI.js';
// import { loadSnoopy, setSceneReference, updateSnoopy } from './Snoopy.js';

// // === Scene Setup ===
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xf2f2f2);

// // === Renderer ===
// const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.outputColorSpace = THREE.SRGBColorSpace;
// document.body.appendChild(renderer.domElement);
// renderer.domElement.style.position = 'absolute';
// renderer.domElement.style.top = '0';
// renderer.domElement.style.left = '0';
// renderer.domElement.style.width = '100%';
// renderer.domElement.style.height = '100%';

// // === Camera ===
// const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
// camera.position.set(0, 2, 10);

// // === Controls ===
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.enableZoom = true;
// controls.enablePan = false;
// controls.minDistance = 3;
// controls.maxDistance = 12;
// controls.maxPolarAngle = Math.PI / 2.2;
// controls.minPolarAngle = Math.PI / 4;

// // === Lighting ===
// scene.add(new THREE.AmbientLight(0xffffff, 1.2));
// const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
// dirLight.position.set(5, 10, 5);
// scene.add(dirLight);

// // === Iframe setup ===
// const iframe = document.createElement('iframe');
// iframe.src = '';
// Object.assign(iframe.style, {
//   position: 'fixed',
//   border: 'none',
//   top: '0.1',
//   left: '0',
//   width: '100%',
//   height: '100%',
//   display: 'block',
//   opacity: '0',
//   pointerEvents: 'none',
//   transition: 'opacity 0.5s ease'
// });
// document.body.appendChild(iframe);

// // === Back Button ===
// const backButton = document.createElement('button');
// backButton.innerHTML = '🔙 Back';
// backButton.title = 'Return to 3D Scene';

// Object.assign(backButton.style, {
//   position: 'fixed',
//   bottom: '10px',
//   left: '60px',
//   fontSize: '16px',
//   background: '#ffffff',
//   color: '#004080',
//   border: 'none',
//   borderRadius: '999px',
//   padding: '10px 18px',
//   fontWeight: '600',
//   fontFamily: 'Segoe UI, sans-serif',
//   cursor: 'pointer',
//   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//   zIndex: '10000',
//   opacity: '0',
//   pointerEvents: 'none',
//   transition: 'opacity 0.3s ease, transform 0.3s ease',
// });

// backButton.addEventListener('mouseenter', () => {
//   backButton.style.transform = 'scale(1.05)';
// });
// backButton.addEventListener('mouseleave', () => {
//   backButton.style.transform = 'scale(1)';
// });

// document.body.appendChild(backButton);

// function showBackButton() {
//   backButton.style.opacity = '1';
//   backButton.style.pointerEvents = 'auto';
// }

// function hideBackButton() {
//   backButton.style.opacity = '0';
//   backButton.style.pointerEvents = 'none';
// }

// backButton.addEventListener('click', () => {
//   iframe.style.opacity = '0';
//   iframe.style.pointerEvents = 'none';
//   zoomedIn = false;
//   hideBackButton();
//   showHeader();
//   controls.target.set(0, 0, 0);
//   controls.update();

//   gsap.to(camera.position, {
//     duration: 2,
//     x: 0,
//     y: 2,
//     z: 10,
//     ease: 'power2.inOut',
//     onUpdate: () => controls.update()
//   });
// });

// // === Intro popup ===
// const introBar = document.createElement('div');
// introBar.innerHTML = `
//   <div style="position: relative;">
//     <button id="intro-close" style="
//       position: absolute;
//       top: -10px;
//       right: -10px;
//       background: white;
//       border: none;
//       border-radius: 50%;
//       width: 24px;
//       height: 24px;
//       font-weight: bold;
//       color: #004080;
//       cursor: pointer;
//       box-shadow: 0 2px 5px rgba(0,0,0,0.3);
//     ">✕</button>
//     <strong>Hello, I am Manish’s Pet 🐾</strong><br>
//     Use arrow keys to move me around and space to Jump.<br>
//     I’ll help you explore the environment— try clicking on the TV or computer to access Website.
//   </div>
// `;
// introBar.style.cssText = `
//   position: fixed;
//   bottom: 30px;
//   left: 50%;
//   transform: translateX(-50%);
//   background: #004080;
//   color: white;
//   padding: 16px 24px;
//   border-radius: 12px;
//   font-family: 'Segoe UI', sans-serif;
//   font-size: 15px;
//   text-align: center;
//   z-index: 999;
//   box-shadow: 0 4px 8px rgba(0,0,0,0.3);
// `;
// document.body.appendChild(introBar);

// const autoRemove = setTimeout(() => introBar.remove(), 20000);
// document.getElementById('intro-close').addEventListener('click', () => {
//   clearTimeout(autoRemove);
//   introBar.remove();
// });

// // === Load GLTF ===
// const loader = new GLTFLoader();
// let tvScreenMesh, tvEdgeGlow;
// let solidMesh, solidEdgeGlow;
// let cylinderMesh, cylinderGlow;
// let curveMesh, curveGlow;

// loader.load('newroom.glb', (gltf) => {
//   const model = gltf.scene;
//   scene.add(model);

//   model.traverse((child, index) => {
//     if (child.isMesh && (!child.name || /[\uFFFD]/.test(child.name))) {
//       child.name = `Mesh_${index}`;
//     }
//   });

//   tvScreenMesh = model.getObjectByName('Flat_TV_Simple_Material35_0');
//   if (tvScreenMesh) {
//     tvScreenMesh.material.emissive = new THREE.Color(0x00ffff);
//     tvScreenMesh.material.emissiveIntensity = 0;
//     const edges = new THREE.EdgesGeometry(tvScreenMesh.geometry, 25);
//     const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
//     tvEdgeGlow = new THREE.LineSegments(edges, lineMat);
//     tvEdgeGlow.visible = false;
//     tvScreenMesh.add(tvEdgeGlow);

//     // ✅ Create header after TV is available
//     createHeader(tvScreenMesh, camera, controls);
//   }

//   solidMesh = model.getObjectByName('Solid1_Instance__1');
//   if (solidMesh) {
//     const edges = new THREE.EdgesGeometry(solidMesh.geometry, 25);
//     const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
//     solidEdgeGlow = new THREE.LineSegments(edges, lineMat);
//     solidEdgeGlow.visible = false;
//     solidMesh.add(solidEdgeGlow);
//   }

//   cylinderMesh = model.getObjectByName('Cylinder030');
//   if (cylinderMesh) {
//     const edges = new THREE.EdgesGeometry(cylinderMesh.geometry, 25);
//     const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
//     cylinderGlow = new THREE.LineSegments(edges, lineMat);
//     cylinderGlow.visible = false;
//     cylinderMesh.add(cylinderGlow);
//   }

//   curveMesh = model.getObjectByName('Curve021_1');
//   if (curveMesh) {
//     const edges = new THREE.EdgesGeometry(curveMesh.geometry, 25);
//     const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
//     curveGlow = new THREE.LineSegments(edges, lineMat);
//     curveGlow.visible = false;
//     curveMesh.add(curveGlow);
//   }
// });

// // === Raycasting and interaction ===
// const mouse = new THREE.Vector2();
// const raycaster = new THREE.Raycaster();

// window.addEventListener('mousemove', (event) => {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera);
//   document.body.style.cursor = 'default';

//   if (tvScreenMesh && tvEdgeGlow) {
//     const intersectsTV = raycaster.intersectObject(tvScreenMesh);
//     tvEdgeGlow.visible = intersectsTV.length > 0;
//     tvScreenMesh.material.emissiveIntensity = intersectsTV.length > 0 ? 0.6 : 0;
//     if (intersectsTV.length > 0) document.body.style.cursor = 'pointer';
//   }

//   if (solidMesh && solidEdgeGlow) {
//     const intersectsSolid = raycaster.intersectObject(solidMesh);
//     solidEdgeGlow.visible = intersectsSolid.length > 0;
//     if (intersectsSolid.length > 0) document.body.style.cursor = 'pointer';
//   }

//   if (cylinderMesh && cylinderGlow) {
//     const intersectsCylinder = raycaster.intersectObject(cylinderMesh);
//     cylinderGlow.visible = intersectsCylinder.length > 0;
//     if (intersectsCylinder.length > 0) document.body.style.cursor = 'pointer';
//   }

//   if (curveMesh && curveGlow) {
//     const intersectsCurve = raycaster.intersectObject(curveMesh);
//     curveGlow.visible = intersectsCurve.length > 0;
//     if (intersectsCurve.length > 0) document.body.style.cursor = 'pointer';
//   }
// });

// // === Click interaction ===
// let zoomedIn = false;
// const iframeTargets = {
//   'Flat_TV_Simple_Material35_0': 'https://ubuntutheme.vercel.app/',
//   'Solid1_Instance__1': 'https://resume-github-io-nine.vercel.app/'
// };
// const externalLinks = {
//   'Cylinder030': 'https://www.linkedin.com/in/manishbhusal/',
//   'Curve021_1': 'https://github.com/manishbhusal7'
// };

// window.addEventListener('click', (event) => {
//   const clickMouse = new THREE.Vector2(
//     (event.clientX / window.innerWidth) * 2 - 1,
//     -(event.clientY / window.innerHeight) * 2 + 1
//   );

//   raycaster.setFromCamera(clickMouse, camera);
//   const intersects = raycaster.intersectObjects(scene.children, true);

//   if (intersects.length > 0) {
//     const clicked = intersects.find(i => i.object && (iframeTargets[i.object.name] || externalLinks[i.object.name]));
//     if (clicked) {
//       const name = clicked.object.name;

//       if (externalLinks[name]) {
//         window.open(externalLinks[name], '_blank');
//         return;
//       }

//       if (!zoomedIn) {
//         const hitPoint = clicked.point.clone();
//         const direction = hitPoint.clone().sub(camera.position).normalize();
//         const stopDistance = 0.5;
//         const newCamPos = hitPoint.clone().sub(direction.multiplyScalar(stopDistance));

//         controls.target.copy(hitPoint);
//         controls.update();

//         gsap.to(camera.position, {
//           duration: 1.5,
//           x: newCamPos.x,
//           y: newCamPos.y,
//           z: newCamPos.z,
//           ease: 'power2.inOut',
//           onUpdate: () => controls.update(),
//           onComplete: () => {
//             iframe.src = iframeTargets[name];
//             iframe.style.opacity = '1';
//             iframe.style.pointerEvents = 'auto';
//             zoomedIn = true;
//             showBackButton();
//             hideHeader(); // Hide header when iframe is active
//           }
//         });
//       }
//     }
//   }
// });

// // === Load Snoopy ===
// const clock = new THREE.Clock();
// loadSnoopy(scene, camera);
// setSceneReference(scene);

// // === Animate ===
// function animate() {
//   requestAnimationFrame(animate);
//   const delta = clock.getDelta();
//   updateSnoopy(delta);
//   controls.update();
//   renderer.render(scene, camera);
// }
// animate();

// // === Resize ===
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });



import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createHeader, hideHeader, showHeader } from './HeaderUI.js';
import { loadSnoopy, setSceneReference, updateSnoopy } from './Snoopy.js';

// === Scene Setup ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2f2f2);

// === Renderer ===
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';

// === Camera ===
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 10);

// === Controls ===
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = true;
controls.enablePan = false;
controls.minDistance = 3;
controls.maxDistance = 12;
controls.maxPolarAngle = Math.PI / 2.2;
controls.minPolarAngle = Math.PI / 4;

// === Lighting ===
scene.add(new THREE.AmbientLight(0xffffff, 1.2));
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// === Iframe setup ===
const iframe = document.createElement('iframe');
iframe.src = '';
Object.assign(iframe.style, {
  position: 'fixed',
  border: 'none',
  top: '0.1',
  left: '0',
  width: '100%',
  height: '100%',
  display: 'block',
  opacity: '0',
  pointerEvents: 'none',
  transition: 'opacity 0.5s ease'
});
document.body.appendChild(iframe);

// === Back Button ===
const backButton = document.createElement('button');
backButton.innerHTML = '🔙 Back';
backButton.title = 'Return to 3D Scene';
Object.assign(backButton.style, {
  position: 'fixed',
  bottom: '10px',
  left: '60px',
  fontSize: '16px',
  background: '#ffffff',
  color: '#004080',
  border: 'none',
  borderRadius: '999px',
  padding: '10px 18px',
  fontWeight: '600',
  fontFamily: 'Segoe UI, sans-serif',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  zIndex: '10000',
  opacity: '0',
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease, transform 0.3s ease',
});

backButton.addEventListener('mouseenter', () => {
  backButton.style.transform = 'scale(1.05)';
});
backButton.addEventListener('mouseleave', () => {
  backButton.style.transform = 'scale(1)';
});

document.body.appendChild(backButton);

function showBackButton() {
  backButton.style.opacity = '1';
  backButton.style.pointerEvents = 'auto';
}

function hideBackButton() {
  backButton.style.opacity = '0';
  backButton.style.pointerEvents = 'none';
}

backButton.addEventListener('click', () => {
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';
  zoomedIn = false;
  hideBackButton();
  showHeader();
  controls.target.set(0, 0, 0);
  controls.update();

  gsap.to(camera.position, {
    duration: 2,
    x: 0,
    y: 2,
    z: 10,
    ease: 'power2.inOut',
    onUpdate: () => controls.update()
  });
});

// === Intro popup ===
const introBar = document.createElement('div');
introBar.innerHTML = `
  <div style="position: relative;">
    <button id="intro-close" style="
      position: absolute;
      top: -10px;
      right: -10px;
      background: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      font-weight: bold;
      color: #004080;
      cursor: pointer;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    ">✕</button>
    <strong>Hello, I am Manish’s Pet 🐾</strong><br>
    Use arrow keys to move me around and space to Jump.<br>
    I’ll help you explore the environment— try clicking on the TV or computer to access Website.
  </div>
`;
introBar.style.cssText = `
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #004080;
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  font-family: 'Segoe UI', sans-serif;
  font-size: 15px;
  text-align: center;
  z-index: 999;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
`;
document.body.appendChild(introBar);

const autoRemove = setTimeout(() => introBar.remove(), 20000);
document.getElementById('intro-close').addEventListener('click', () => {
  clearTimeout(autoRemove);
  introBar.remove();
});

// === Load GLTF ===
const loader = new GLTFLoader();
let tvScreenMesh, tvEdgeGlow;
let solidMesh, solidEdgeGlow;
let cylinderMesh, cylinderGlow;
let curveMesh, curveGlow;

loader.load('// === Load GLTF ===
const loader = new GLTFLoader();
let tvScreenMesh, tvEdgeGlow;
let solidMesh, solidEdgeGlow;
let cylinderMesh, cylinderGlow;
let curveMesh, curveGlow;

loader.load('https://github.com/manishbhusal7/3DWeb/releases/download/v1.0.0/newroom.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  model.traverse((child, index) => {
    if (child.isMesh && (!child.name || /[�]/.test(child.name))) {
      child.name = `Mesh_${index}`;
    }
  });', (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  model.traverse((child, index) => {
    if (child.isMesh && (!child.name || /[�]/.test(child.name))) {
      child.name = `Mesh_${index}`;
    }
  });

  tvScreenMesh = model.getObjectByName('Flat_TV_Simple_Material35_0');
  if (tvScreenMesh) {
    tvScreenMesh.material.emissive = new THREE.Color(0x00ffff);
    tvScreenMesh.material.emissiveIntensity = 0;
    const edges = new THREE.EdgesGeometry(tvScreenMesh.geometry, 25);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
    tvEdgeGlow = new THREE.LineSegments(edges, lineMat);
    tvEdgeGlow.visible = false;
    tvScreenMesh.add(tvEdgeGlow);
    createHeader(tvScreenMesh, camera, controls);
  }

  solidMesh = model.getObjectByName('Solid1_Instance__1');
  if (solidMesh) {
    const edges = new THREE.EdgesGeometry(solidMesh.geometry, 25);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
    solidEdgeGlow = new THREE.LineSegments(edges, lineMat);
    solidEdgeGlow.visible = false;
    solidMesh.add(solidEdgeGlow);
  }

  cylinderMesh = model.getObjectByName('Cylinder030');
  if (cylinderMesh) {
    const edges = new THREE.EdgesGeometry(cylinderMesh.geometry, 25);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
    cylinderGlow = new THREE.LineSegments(edges, lineMat);
    cylinderGlow.visible = false;
    cylinderMesh.add(cylinderGlow);
  }

  curveMesh = model.getObjectByName('Curve021_1');
  if (curveMesh) {
    const edges = new THREE.EdgesGeometry(curveMesh.geometry, 25);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
    curveGlow = new THREE.LineSegments(edges, lineMat);
    curveGlow.visible = false;
    curveMesh.add(curveGlow);
  }
}, undefined, (error) => {
  console.error('❌ Failed to load GLB model:', error);
});

// === Raycasting and interaction ===
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  document.body.style.cursor = 'default';

  if (tvScreenMesh && tvEdgeGlow) {
    const intersectsTV = raycaster.intersectObject(tvScreenMesh);
    tvEdgeGlow.visible = intersectsTV.length > 0;
    tvScreenMesh.material.emissiveIntensity = intersectsTV.length > 0 ? 0.6 : 0;
    if (intersectsTV.length > 0) document.body.style.cursor = 'pointer';
  }

  if (solidMesh && solidEdgeGlow) {
    const intersectsSolid = raycaster.intersectObject(solidMesh);
    solidEdgeGlow.visible = intersectsSolid.length > 0;
    if (intersectsSolid.length > 0) document.body.style.cursor = 'pointer';
  }

  if (cylinderMesh && cylinderGlow) {
    const intersectsCylinder = raycaster.intersectObject(cylinderMesh);
    cylinderGlow.visible = intersectsCylinder.length > 0;
    if (intersectsCylinder.length > 0) document.body.style.cursor = 'pointer';
  }

  if (curveMesh && curveGlow) {
    const intersectsCurve = raycaster.intersectObject(curveMesh);
    curveGlow.visible = intersectsCurve.length > 0;
    if (intersectsCurve.length > 0) document.body.style.cursor = 'pointer';
  }
});

// === Click interaction ===
let zoomedIn = false;
const iframeTargets = {
  'Flat_TV_Simple_Material35_0': 'https://ubuntutheme.vercel.app/',
  'Solid1_Instance__1': 'https://resume-github-io-nine.vercel.app/'
};
const externalLinks = {
  'Cylinder030': 'https://www.linkedin.com/in/manishbhusal/',
  'Curve021_1': 'https://github.com/manishbhusal7'
};

window.addEventListener('click', (event) => {
  const clickMouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );

  raycaster.setFromCamera(clickMouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const clicked = intersects.find(i => i.object && (iframeTargets[i.object.name] || externalLinks[i.object.name]));
    if (clicked) {
      const name = clicked.object.name;

      if (externalLinks[name]) {
        window.open(externalLinks[name], '_blank');
        return;
      }

      if (!zoomedIn) {
        const hitPoint = clicked.point.clone();
        const direction = hitPoint.clone().sub(camera.position).normalize();
        const stopDistance = 0.5;
        const newCamPos = hitPoint.clone().sub(direction.multiplyScalar(stopDistance));

        controls.target.copy(hitPoint);
        controls.update();

        gsap.to(camera.position, {
          duration: 1.5,
          x: newCamPos.x,
          y: newCamPos.y,
          z: newCamPos.z,
          ease: 'power2.inOut',
          onUpdate: () => controls.update(),
          onComplete: () => {
            iframe.src = iframeTargets[name];
            iframe.style.opacity = '1';
            iframe.style.pointerEvents = 'auto';
            zoomedIn = true;
            showBackButton();
            hideHeader();
          }
        });
      }
    }
  }
});

// === Load Snoopy ===
const clock = new THREE.Clock();
loadSnoopy(scene, camera);
setSceneReference(scene);

// === Animate ===
function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  updateSnoopy(delta);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// === Resize ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
