const services = [
  {
    id: 1,
    name: 'Comprehensive Dental Examination',
    description: '* Oral examination and dental charting\n <br />* Medical and dental history taking\n <br />* Intraoral and extraoral examination\n <br />* Caries and periodontal assessment\n <br />* Occlusal and TMJ assessment\n <br />* Treatment planning',
  },
  {
    id: 2,
    name: 'Preventive Dentistry',
    description: '* Oral prophylaxis / dental cleaning\n <br />* Fluoride application\n <br />* Pit and fissure sealants\n <br />* Oral hygiene instruction\n <br />* Caries prevention and risk assessment\n <br />* Dietary counseling related to oral health',
  },
  {
    id: 3,
    name: 'Restorative Dentistry',
    description: '* Composite resin restorations\n <br />* Glass ionomer restorations\n <br />* Amalgam restorations\n <br />* Temporary/interim restorations\n <br />* Management of dental caries\n <br />* Restoration of fractured teeth',
  },
  {
    id: 4,
    name: 'Periodontal Procedures',
    description: '* Supragingival and subgingival scaling\n <br />* Root planning\n <br />* Periodontal charting\n <br />* Management of gingivitis and mild-to-moderate periodontitis\n <br />* Periodontal maintenance\n <br />* Basic periodontal education and home-care instruction',
  },
  {
    id: 5,
    name: 'Oral Surgery / Minor Oral Surgery',
    description: '* Simple tooth extractions\n <br />* Surgical extraction of erupted teeth\n <br />* Removal of retained roots\n <br />* Management of postoperative complications\n <br />* Suturing\n <br />* Alveoloplasty when indicated\n <br />* Management of common dental emergencies',
  },
  {
    id: 6,
    name: 'Endodontic Procedures',
    description: '* Pulp vitality testing\n <br />* Diagnosis of pulpal and periapical conditions\n <br />* Emergency management of dental pain\n <br />* Pulpotomy/pulpectomy where within the dentist’s scope and training\n <br />* Root canal treatment of appropriate cases\n <br />* Temporary restoration following endodontic treatment',
  },
  {
    id: 7,
    name: 'Prosthodontic Procedures',
    description: '* Complete dentures\n <br />* Removable partial dentures\n <br />* Fixed prosthodontic procedures such as crowns and bridges\n <br />* Impression taking\n <br />* Bite registration\n <br />* Denture adjustment and relining\n <br />*Temporary crowns/bridges',
  },
  {
    id: 8,
    name: 'Pediatric Dentistry',
    description: '* Dental examination of children\n <br />* Preventive care\n <br />* Fluoride application\n <br />* Fissure sealants\n <br />* Restorations in primary and young permanent teeth\n <br />* Pulp therapy for appropriate primary teeth\n <br />*Extraction of primary teeth when indicated\n <br />* Oral health education for children and parents',
  },
  {
    id: 9,
    name: 'Orthodontic/Interceptive Care',
    description: '* Basic orthodontic assessment\n <br />* Preliminary orthodontic diagnosis\n <br />* Space maintenance\n <br />* Simple interceptive procedures\n <br />* Referral of complex orthodontic cases\n <br />* Follow-up/maintenance of appropriate orthodontic cases',
  },
  {
    id: 10,
    name: 'Cosmetic / Esthetic Dentistry',
    description: '* Tooth-colored restorations\n <br />* Composite bonding\n <br />* Tooth reshaping/contouring\n <br />* Teeth whitening/bleaching\n <br />* Esthetic treatment planning\n <br />* Veneers in appropriate cases',
  },
  {
    id: 11,
    name: 'Dental Radiography and Diagnosis',
    description: '* Periapical radiographs\n <br />* Bitewing radiographs\n <br />* Panoramic radiographs\n <br />* Radiographic interpretation\n <br />* Assessment of impacted teeth\n <br />* Evaluation of periapical lesions, caries, bone levels, and other abnormalities',
  },
  {
    id: 12,
    name: 'Emergency Dental Care',
    description: '* Management of acute dental pain\n <br />* Emergency restorations\n <br />* Management of dental trauma\n <br />* Management of acute odontogenic infections\n <br />* Temporary stabilization of fractured teeth\n <br />* Management of post-extraction concerns\n <br />* Referral of cases requiring specialist care',
  }
];

function renderServices() {
  const grid = document.querySelector('.service-grid');
  if (!grid) return;

  grid.innerHTML = services.map((s, i) => `
    <article class="service-card">
      <span class="service-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="service-icon">✦</span>
      <h2>${s.name}</h2>
      <p>${s.description}</p>
      <a class="book-btn" href="booking.html?service=${encodeURIComponent(s.name)}">Book this Service</a>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', renderServices);
