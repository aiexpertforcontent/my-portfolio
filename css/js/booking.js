/**
 * ==========================================================================
 * BOMBAY CLINIC - APPOINTMENT & WHATSAPP BOOKING SCRIPT
 * ==========================================================================
 */

const CLINIC_WHATSAPP_NUMBER = '919833228284';

function sendWhatsAppBooking(data) {
  const text = `*New Appointment Request - Bombay Clinic*\n\n` +
    `👤 *Patient Name:* ${data.name || 'Not specified'}\n` +
    `📞 *Contact:* ${data.phone || 'Not specified'}\n` +
    `👨‍⚕️ *Doctor Preferred:* ${data.doctor || 'Any Doctor'}\n` +
    `📅 *Preferred Date:* ${data.date || 'Earliest Available'}\n` +
    `⏰ *Preferred Time:* ${data.timeSlot || 'Morning / Evening'}\n` +
    `🩺 *Symptoms / Concern:* ${data.notes || 'Routine consultation'}`;

  const url = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Modal Booking Form
  const modalForm = document.querySelector('#modalBookingForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(modalForm);
      const bookingData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        doctor: formData.get('doctor'),
        date: formData.get('date'),
        timeSlot: formData.get('timeSlot'),
        notes: formData.get('notes')
      };

      const submitBtn = modalForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting Request...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        modalForm.style.display = 'none';
        const successBox = document.querySelector('#modalBookingSuccess');
        if (successBox) successBox.style.display = 'block';

        // Also offer instant WhatsApp sync button
        const waBtn = document.querySelector('#modalWhatsAppSync');
        if (waBtn) {
          waBtn.onclick = () => sendWhatsAppBooking(bookingData);
        }
      }, 600);
    });
  }

  // 2. Main Page In-line Booking Form
  const pageForm = document.querySelector('#pageBookingForm');
  if (pageForm) {
    pageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(pageForm);
      const bookingData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        doctor: formData.get('doctor'),
        date: formData.get('date'),
        timeSlot: formData.get('timeSlot'),
        notes: formData.get('notes')
      };

      const submitBtn = pageForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        pageForm.style.display = 'none';
        const successBox = document.querySelector('#pageBookingSuccess');
        if (successBox) successBox.style.display = 'block';

        const waBtn = document.querySelector('#pageWhatsAppSync');
        if (waBtn) {
          waBtn.onclick = () => sendWhatsAppBooking(bookingData);
        }
      }, 600);
    });
  }
});
