

import gsap from 'gsap';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let snoopy, mixer, cameraRef, sceneRef;
let animations = [];
let currentAction;
let tooltip;
let isJumping = false;
let followSnoopy = true;

const woof = new Audio('woof.mp3');

const keys = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
};

export function loadSnoopy(scene, camera) {
  sceneRef = scene;
  cameraRef = camera;

  const loader = new GLTFLoader();
  loader.load('snoopy.glb', (gltf) => {
    snoopy = gltf.scene;
    snoopy.name = 'snoopy';
    snoopy.scale.set(1.2, 1.2, 1.2);
    snoopy.position.set(0, 0, 7);
    scene.add(snoopy);

    mixer = new THREE.AnimationMixer(snoopy);
    animations = gltf.animations;
    playAnimation('Sit');

    tooltip = document.createElement('div');
    tooltip.id = 'snoopy-tooltip';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);
    createHeader(tvScreenMesh, camera, controls);

  });

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
}

export function updateSnoopy(delta) {
  if (!snoopy || !cameraRef || !sceneRef) return;
  if (mixer) mixer.update(delta);

  const moveDir = new THREE.Vector3();
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();

  cameraRef.getWorldDirection(forward);
  forward.y = 0;
  forward.normalize();
  right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

  if (keys.forward) moveDir.add(forward);
  if (keys.backward) moveDir.sub(forward);
  if (keys.left) moveDir.sub(right);
  if (keys.right) moveDir.add(right);

  const isMoving = moveDir.lengthSq() > 0;
  playAnimation(isMoving ? 'Walk' : 'Sit');

  if (isMoving) {
    moveDir.normalize().multiplyScalar(4 * delta);
    snoopy.position.add(moveDir);
    const angle = Math.atan2(moveDir.x, moveDir.z);
    gsap.to(snoopy.rotation, { y: angle, duration: 0.2 });
  }

  if (followSnoopy) {
    const offset = new THREE.Vector3(0, 2, 5);
    const target = snoopy.position.clone().add(offset);
    cameraRef.position.lerp(target, 0.1);
    cameraRef.lookAt(snoopy.position);
  }

  // Proximity detection
  const tv = sceneRef.getObjectByName('Flat_TV_Simple_Material35_0');
  const pc = sceneRef.getObjectByName('Solid1_Instance__1');
  const dTV = tv ? snoopy.position.distanceTo(tv.position) : Infinity;
  const dPC = pc ? snoopy.position.distanceTo(pc.position) : Infinity;

  const nearTV = dTV < 2.5;
  const nearPC = dPC < 2.5;

  if (nearTV && !nearPC) {
    showHint('You are near Computer Its on your right click on it.');
  } else if (nearPC && !nearTV) {
    showHint('This is TV! Click on it.');
  } else if (nearTV && nearPC) {
    showHint('You’re near both the TV and the Computer!');
  }
}

export function setSceneReference(scene) {
  sceneRef = scene;
}

export function setFollowSnoopy(value) {
  followSnoopy = value;
}

function handleKeyDown(e) {
  switch (e.code) {
    case 'ArrowUp':
    case 'KeyW': keys.forward = true; break;
    case 'ArrowDown':
    case 'KeyS': keys.backward = true; break;
    case 'ArrowLeft':
    case 'KeyA': keys.left = true; break;
    case 'ArrowRight':
    case 'KeyD': keys.right = true; break;
    case 'Space':
      if (!isJumping) {
        keys.jump = true;
        isJumping = true;
        triggerJumpBark();
        setTimeout(() => (isJumping = false), 800);
      }
      break;
  }
}

function handleKeyUp(e) {
  switch (e.code) {
    case 'ArrowUp':
    case 'KeyW': keys.forward = false; break;
    case 'ArrowDown':
    case 'KeyS': keys.backward = false; break;
    case 'ArrowLeft':
    case 'KeyA': keys.left = false; break;
    case 'ArrowRight':
    case 'KeyD': keys.right = false; break;
  }
}

function playAnimation(name) {
  const clip = animations.find(a => a.name.toLowerCase().includes(name.toLowerCase()));
  if (!clip) return;

  const newAction = mixer.clipAction(clip);
  if (currentAction !== newAction) {
    if (currentAction) currentAction.fadeOut(0.3);
    currentAction = newAction;
    currentAction.reset().fadeIn(0.3).play();
  }
}

function triggerJumpBark() {
  gsap.to(snoopy.position, {
    y: 2,
    duration: 0.4,
    yoyo: true,
    repeat: 1,
    ease: 'power2.out'
  });

  woof.pause();
  woof.currentTime = 0;
  woof.play();

  setTimeout(() => {
    woof.pause();
    woof.currentTime = 0;
  }, 1000);
}

function showHint(msg) {
  let hint = document.getElementById('snoopy-hint');
  if (!hint) {
    hint = document.createElement('div');
    hint.id = 'snoopy-hint';
    hint.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: #222;
      color: #fff;
      padding: 10px 20px;
      font-size: 14px;
      border-radius: 8px;
      font-family: sans-serif;
      z-index: 999;
    `;
    document.body.appendChild(hint);
  }
  hint.textContent = msg;
  clearTimeout(hint.timer);
  hint.timer = setTimeout(() => hint.remove(), 4000);
}

