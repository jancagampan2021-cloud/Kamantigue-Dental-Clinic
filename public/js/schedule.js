// ---------- Availability data ----------
const days  = ['Mon 21', 'Tue 22', 'Wed 23'];
const times = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

// Slots that are already taken: { dentistId: { day: [times] } }
// Any slot not listed here shows as Open.
const booked = {
  1: { 'Mon 21': ['9:00 AM', '2:30 PM'], 'Tue 22': ['1:00 PM'],            'Wed 23': ['10:30 AM', '4:00 PM'] },
  2: { 'Mon 21': ['1:00 PM'],            'Tue 22': ['10:30 AM', '4:00 PM'], 'Wed 23': ['9:00 AM', '2:30 PM'] },
  3: { 'Mon 21': ['10:30 AM', '4:00 PM'],'Tue 22': ['9:00 AM', '2:30 PM'],  'Wed 23': ['1:00 PM'] }
};

// Build { dentistId: [ { day, slots: [ { time, open } ] } ] }
const schedules = {};
dentists.forEach(d => {
  schedules[d.id] = days.map(day => ({
    day,
    slots: times.map(time => ({
      time,
      open: !((booked[d.id] && booked[d.id][day]) || []).includes(time)
    }))
  }));
});

// ---------- Filters + calendars ----------
let selected = dentists.slice(0, 3).map(d => d.id);

function initSchedulePage() {
  const filtersEl = document.getElementById('filters');
  const grid = document.getElementById('calGrid');
  if (!filtersEl || !grid) return;

  dentists.forEach(d => {
    const label = document.createElement('label');
    label.className = 'filter-chip';
    label.innerHTML = `<input type="checkbox" value="${d.id}" ${selected.includes(d.id) ? 'checked' : ''}> ${d.name}`;

    label.querySelector('input').addEventListener('change', e => {
      if (e.target.checked) {
        if (selected.length >= 3) { e.target.checked = false; return; }
        selected.push(d.id);
      } else {
        selected = selected.filter(x => x !== d.id);
      }
      renderCalendars();
    });

    filtersEl.appendChild(label);
  });

  // One click listener for every open slot
  grid.addEventListener('click', e => {
    const slot = e.target.closest('.slot.open');
    if (!slot) return;
    openBooking(Number(slot.dataset.dentist), slot.dataset.day, slot.dataset.time);
  });

  renderCalendars();
}

function renderCalendars() {
  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  selected.forEach(id => {
    const d = dentists.find(x => x.id === id);
    const card = document.createElement('div');
    card.className = 'cal-card';
    card.innerHTML = `
      <div class="cal-head">
        <strong>${d.name}</strong><br>
        <small>${d.specialty}</small>
      </div>
      <div class="cal-body">
        ${schedules[id].map(dayObj => `
          <div class="day-label">${dayObj.day}</div>
          ${dayObj.slots.map(s => `
            <div class="slot ${s.open ? 'open' : 'booked'}"
                 data-dentist="${id}" data-day="${dayObj.day}" data-time="${s.time}">
              <span>${s.time}</span>
              <span class="tag ${s.open ? '' : 'full'}">${s.open ? 'Open' : 'Full'}</span>
            </div>`).join('')}
        `).join('')}
      </div>`;
    grid.appendChild(card);
  });
}

// ---------- Booking modal ----------
let currentSlot = null;

function openBooking(dentistId, day, time) {
  const d = dentists.find(x => x.id === dentistId);
  currentSlot = { dentistId, day, time };
  document.getElementById('modalSlotInfo').textContent = `${d.name} · ${day} · ${time}`;
  document.getElementById('bookModal').classList.add('open');
}

function closeBooking() {
  document.getElementById('bookModal').classList.remove('open');
}

function initBookingModal() {
  const modal = document.getElementById('bookModal');
  const form  = document.getElementById('bookingForm');
  if (!modal || !form) return;

  document.getElementById('closeModal').addEventListener('click', closeBooking);
  modal.addEventListener('click', e => { if (e.target === modal) closeBooking(); }); // click outside
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBooking(); });

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Mark the slot as taken so it shows "Full"
    const dayObj = schedules[currentSlot.dentistId].find(x => x.day === currentSlot.day);
    dayObj.slots.find(s => s.time === currentSlot.time).open = false;

    closeBooking();
    form.reset();
    renderCalendars();
    alert('Appointment request sent. We will confirm by phone or email shortly.');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSchedulePage();
  initBookingModal();
});