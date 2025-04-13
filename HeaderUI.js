// HeaderUI.js
import gsap from 'gsap';
import * as THREE from 'three';
import { createContactModal } from './ContactModal.js';

let header;

export function createHeader(tvScreenMesh, camera, controls) {
  header = document.createElement('div');
  header.innerHTML = `
    <button id="home-btn">🏠 Home</button>
    <button id="contact-btn">✉️ Contact Me</button>
  `;

  Object.assign(header.style, {
    position: 'fixed',
    top: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '16px',
    zIndex: '10000',
    background: 'transparent',
    transition: 'opacity 0.3s ease',
  });

  const buttons = header.querySelectorAll('button');
  buttons.forEach(btn => {
    Object.assign(btn.style, {
      fontSize: '15px',
      padding: '8px 18px',
      background: 'rgba(0, 64, 128, 0.85)',
      color: '#fff',
      border: 'none',
      borderRadius: '999px',
      fontWeight: '500',
      fontFamily: 'Segoe UI, sans-serif',
      cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      transition: 'transform 0.2s ease, background 0.2s ease',
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.05)';
      btn.style.background = 'rgba(0, 64, 128, 1)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
      btn.style.background = 'rgba(0, 64, 128, 0.85)';
    });
  });

  document.body.appendChild(header);

  document.getElementById('home-btn').addEventListener('click', () => {
    if (tvScreenMesh) {
      const tvPos = new THREE.Vector3();
      tvScreenMesh.getWorldPosition(tvPos);

      const direction = tvPos.clone().sub(camera.position).normalize();
      const stopDistance = 0.5;
      const newCamPos = tvPos.clone().sub(direction.multiplyScalar(stopDistance));

      controls.target.copy(tvPos);
      controls.update();

      gsap.to(camera.position, {
        duration: 1.5,
        x: newCamPos.x,
        y: newCamPos.y,
        z: newCamPos.z,
        ease: 'power2.inOut',
        onUpdate: () => controls.update()
      });
    }
  });

  document.getElementById('contact-btn').addEventListener('click', () => {
    createContactModal();
  });
}

export function hideHeader() {
  if (header) {
    header.style.opacity = '0';
    header.style.pointerEvents = 'none';
  }
}

export function showHeader() {
  if (header) {
    header.style.opacity = '1';
    header.style.pointerEvents = 'auto';
  }
}
