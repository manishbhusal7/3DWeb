import emailjs from 'emailjs-com';

export function createContactModal() {
  const modal = document.createElement('div');
  modal.id = 'contact-modal';
  modal.innerHTML = `
    <form id="contact-form" style="
      background: white;
      padding: 30px;
      max-width: 400px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      position: relative;
    ">
      <button type="button" id="close-modal" style="
        position: absolute;
        top: -12px;
        right: -12px;
        background: #004080;
        border: none;
        border-radius: 50%;
        color: white;
        width: 30px;
        height: 30px;
        font-size: 18px;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      ">×</button>
      <h3 style="margin-bottom: 12px; font-family: 'Segoe UI'; color: #004080;">📬 Contact Me</h3>
      <input type="text" name="from_name" placeholder="Your Name" required style="width: 100%; margin-bottom: 10px; padding: 8px; border-radius: 6px; border: 1px solid #ccc;" />
      <input type="email" name="reply_to" placeholder="Your Email" required style="width: 100%; margin-bottom: 10px; padding: 8px; border-radius: 6px; border: 1px solid #ccc;" />
      <textarea name="message" placeholder="Your Message" required style="width: 100%; height: 80px; padding: 8px; border-radius: 6px; border: 1px solid #ccc;"></textarea>
      <button type="submit" style="margin-top: 12px; width: 100%; padding: 10px; background: #004080; color: white; border: none; border-radius: 6px; cursor: pointer;">
        Send
      </button>
    </form>
  `;

  Object.assign(modal.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '10001'
  });

  document.body.appendChild(modal);

  document.getElementById('close-modal').addEventListener('click', () => {
    modal.remove();
  });

  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  const form = modal.querySelector('#contact-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      this
    ).then(() => {
      showToast('✅ Message sent successfully!', 'success');
      modal.remove();
    }, (error) => {
      showToast('❌ Failed to send message. Try again!', 'error');
    });
  });
}

function showToast(message, type) {
  const toast = document.createElement('div');
  toast.textContent = message;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: type === 'success' ? '#4CAF50' : '#d32f2f',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'Segoe UI, sans-serif',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    zIndex: '99999',
    opacity: '0',
    transition: 'opacity 0.3s ease, bottom 0.3s ease'
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.bottom = '40px';
  });

  // Auto remove after 3s
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.bottom = '30px';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
