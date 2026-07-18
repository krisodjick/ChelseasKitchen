const form = document.getElementById('orderForm');
const qty = document.getElementById('quantity');
const extraTaco = document.getElementById('extraTaco');
const extraBerry = document.getElementById('extraBerry');
const totalEl = document.getElementById('total');
const deliveryDateEl = document.getElementById('deliveryDate');
const messageEl = document.getElementById('formMessage');

function nextThursday() {
  const now = new Date();
  const day = now.getDay();
  let days = (4 - day + 7) % 7;
  const afterCutoff = day === 3 && now.getHours() >= 20;
  if (days === 0 || afterCutoff) days += 7;
  const d = new Date(now);
  d.setDate(now.getDate() + days);
  return d;
}

const deliveryDate = nextThursday();
deliveryDateEl.textContent = deliveryDate.toLocaleDateString('en-CA', {weekday:'long', month:'long', day:'numeric'});

function total() {
  let amount = Number(qty.value) * 15;
  if (extraTaco.checked) amount += 5;
  if (extraBerry.checked) amount += 5;
  totalEl.textContent = `$${amount}`;
  return amount;
}
[qty, extraTaco, extraBerry].forEach(el => el.addEventListener('change', total));

total();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  messageEl.textContent = '';
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const body = [
    "THURSDAY LUNCH CLUB ORDER",
    "",
    `Delivery date: ${deliveryDateEl.textContent}`,
    `Name: ${data.get('name')}`,
    `Carleton email: ${data.get('email')}`,
    `Phone: ${data.get('phone')}`,
    `Building: ${data.get('building')}`,
    `Room / meeting spot: ${data.get('meetingSpot')}`,
    `Delivery time: ${data.get('time')}`,
    `Lunch boxes: ${data.get('quantity')}`,
    `Extra Taco Bite: ${data.get('extraTaco') ? 'Yes (+$5)' : 'No'}`,
    `Extra Maple Berry Bite: ${data.get('extraBerry') ? 'Yes (+$5)' : 'No'}`,
    `Payment: ${data.get('payment')}`,
    `Total due on delivery: $${total()}`,
    `Special instructions: ${data.get('instructions') || 'None'}`,
    "",
    "Please reply to confirm this order. Miigwech!"
  ].join('\n');

  const subject = `Thursday Lunch Order – ${data.get('name')} – ${deliveryDateEl.textContent}`;
  const mailto = `mailto:kris@chelseaskitchen.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  messageEl.textContent = 'Your order email is ready. Please press Send in your email app to complete your reservation.';
  window.location.href = mailto;
});
