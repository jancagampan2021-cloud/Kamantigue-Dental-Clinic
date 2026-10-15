/* ---------- CONFIG: edit these ---------- */
const CONFIG = {
  // Option A (recommended): create a free form at https://formspree.io and paste its URL here.
  // Requests will be emailed to you automatically.
  FORM_ENDPOINT: "",                       // e.g. "https://formspree.io/f/xxxxxxxx"
  // Option B (fallback if no endpoint): opens the patient's email app addressed to the clinic.
  CLINIC_EMAIL: "jan.cagampan2021@gmail.com",
  // Clinic hours for the date picker check (24h). Sunday closed = [0]
  OPEN_HOUR: 8, CLOSE_HOUR: 16, CLOSED_DAYS: [0]
};
/* --------------------------------------- */

const form = document.getElementById("bookingForm");
const whenInput = document.getElementById("when");
const banner = document.getElementById("banner");
const sendBtn = document.getElementById("sendBtn");

// Earliest selectable time = now (local), rounded up to next 15 min
(function setMin(){
  const d = new Date(); d.setMinutes(Math.ceil(d.getMinutes()/15)*15, 0, 0);
  const pad = n => String(n).padStart(2,"0");
  whenInput.min = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
})();

const setInvalid = (el, bad, msg) => {
  const wrap = el.closest(".field");
  wrap.classList.toggle("invalid", bad);
  if (msg) { const e = wrap.querySelector(".err"); if (e) e.textContent = msg; }
  return !bad;
};

function normalizePhone(v){
  let d = v.replace(/[^\d+]/g,"");
  d = d.replace(/^\+?63/,"").replace(/^0/,"");
  return d; // expect 10 digits starting with 9
}

function validate(){
  let ok = true;
  ok = setInvalid(document.getElementById("firstName"), !document.getElementById("firstName").value.trim()) && ok;
  ok = setInvalid(document.getElementById("address"), !document.getElementById("address").value.trim()) && ok;

  const email = document.getElementById("email").value.trim();
  ok = setInvalid(document.getElementById("email"), email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) && ok;

  const ph = normalizePhone(document.getElementById("phone").value);
  ok = setInvalid(document.getElementById("phone"), !/^9\d{9}$/.test(ph)) && ok;

  let whenMsg = "Please choose a date and time.", whenBad = false;
  if (!whenInput.value) whenBad = true;
  else {
    const d = new Date(whenInput.value);
    if (d < new Date()) { whenBad = true; whenMsg = "Please choose a future date and time."; }
    else if (CONFIG.CLOSED_DAYS.includes(d.getDay())) { whenBad = true; whenMsg = "The clinic is closed on that day. Please pick another."; }
    else if (d.getHours() < CONFIG.OPEN_HOUR || d.getHours() >= CONFIG.CLOSE_HOUR) { whenBad = true; whenMsg = `Please choose a time between ${CONFIG.OPEN_HOUR}:00 and ${CONFIG.CLOSE_HOUR}:00.`; }
  }
  ok = setInvalid(whenInput, whenBad, whenMsg) && ok;

  const t = document.getElementById("terms");
  document.getElementById("termsWrap").classList.toggle("invalid", !t.checked);
  ok = t.checked && ok;
  return ok;
}

form.addEventListener("input", e => {
  const f = e.target.closest(".field"); if (f) f.classList.remove("invalid");
});

function show(type, msg){
  banner.className = "banner " + type;
  banner.textContent = msg;
  banner.scrollIntoView({behavior:"smooth", block:"center"});
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  if (form.website.value) return; // honeypot (bots)
  if (!validate()) {
    const first = form.querySelector(".invalid"); if (first) first.scrollIntoView({behavior:"smooth", block:"center"});
    return;
  }

  const when = new Date(whenInput.value);
  const data = {
    "First Name": form.firstName.value.trim(),
    "Last Name": form.lastName.value.trim(),
    "Email": form.email.value.trim(),
    "Phone": "+63" + normalizePhone(form.phone.value),
    "Address": form.address.value.trim(),
    "Nature of Appointment": form.service.value || "Not specified",
    "Branch": form.branch.value || "Not specified",
    "Preferred Date/Time": when.toLocaleString("en-PH", {dateStyle:"full", timeStyle:"short"}),
    "Submitted": new Date().toLocaleString("en-PH")
  };

  sendBtn.disabled = true;
  try {
    if (CONFIG.FORM_ENDPOINT) {
      const res = await fetch(CONFIG.FORM_ENDPOINT, {
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      show("ok", "Thank you! Your request was sent. Our helpdesk will contact you to verify and confirm your appointment.");
    } else {
      const body = Object.entries(data).map(([k,v]) => `${k}: ${v}`).join("\n");
      location.href = `mailto:${CONFIG.CLINIC_EMAIL}?subject=${encodeURIComponent("Appointment Request - " + data["First Name"] + " " + data["Last Name"])}&body=${encodeURIComponent(body)}`;
      show("ok", "Your email app should open with your request. Please press Send there to complete it.");
    }
  } catch (err) {
    show("bad", "Sorry, we couldn't send your request. Please try again or call the clinic directly.");
  } finally {
    sendBtn.disabled = false;
  }
});
