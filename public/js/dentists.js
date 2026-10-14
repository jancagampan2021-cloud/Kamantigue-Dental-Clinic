const dentists = [
  {
    id: 1,
    photo: 'dentist1.png',
    name: 'Dr. Cecilia C. Kamantigue',
    specialty: 'General Dentistry & Orthodontics',
    bio: 'Dedicated to providing thoughtful, evidence-based dental care with a focus on comfort, prevention, and beautiful natural results.',
    philosophy: 'Dr. Kamantigue believes every patient deserves clear information and a treatment plan that fits their goals.',
    education: [
      'Doctor of Dental Medicine — University Name',
      'Continuing Education — Cosmetic Dentistry'
    ],
    achievements: [
      'Professional achievement',
      'Dental organization membership',
      'Advanced clinical training',
      'Community dental outreach'
    ]
  },
  {
    id: 2,
    photo: 'dentist2.png',
    name: 'Dr. Danica Anne C. Kamantigue',
    specialty: 'General Dentistry',
    bio: 'Add a short bio for this dentist here.',
    philosophy: 'Add their philosophy/approach here.',
    education: [
      'Doctor of Dental Medicine — University Name'
    ],
    achievements: [
      'Professional achievement'
    ]
  },
    {
    id: 3,
    photo: 'dentist3.png',
    name: 'Dr. Anna Pauline Kamantigue Palma',
    specialty: 'General Dentistry',
    bio: 'Add a short bio for this dentist here.',
    philosophy: 'Add their philosophy/approach here.',
    education: [
      'Doctor of Dental Medicine — University Name'
    ],
    achievements: [
      'Professional achievement'
    ]
  }
//     {
//     id: 4,
//     photo: 'dentist4.png',
//     name: 'Dr. Dentist 4',
//     specialty: 'Pediatric Dentistry',
//     bio: 'Add a short bio for this dentist here.',
//     philosophy: 'Add their philosophy/approach here.',
//     education: [
//       'Doctor of Dental Medicine — University Name'
//     ],
//     achievements: [
//       'Professional achievement'
//     ]
//   }
];

function renderDentists() {
  const grid = document.querySelector('.dentists-grid');
  if (!grid) return;

  const list = (items) => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;

  grid.innerHTML = dentists.map(d => `
    <article class="dentist-card">
      <img class="dentist-photo" src="../public/img/${d.photo}" alt="${d.name}">
      <div class="dentist-info">
        <h2>${d.name}</h2>
        <span class="specialty">${d.specialty}</span>

        <h3>Education</h3>
        ${list(d.education)}

        <h3>Achievements</h3>
        ${list(d.achievements)}

        <h3>Philosophy</h3>
        <p>${d.philosophy}</p>
      </div>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderDentists);