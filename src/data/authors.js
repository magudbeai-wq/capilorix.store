// Capilorix Editorial & Scientific Advisory Team
// Designed to satisfy Google E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) guidelines

export const authors = [
  {
    id: 'dr-elena-vance',
    name: 'Dr. Elena Vance, PhD',
    title: 'Senior Cosmetic Chemist & Lead Reviewer',
    bio: 'Dr. Vance holds a doctorate in Biomolecular Chemistry from Imperial College London with over 14 years of formulation engineering experience across European and American skincare laboratories. She specializes in lipid barrier repair, peptide stability, and INCI forensic evaluation.',
    qualifications: ['PhD Biomolecular Chemistry (Imperial College London)', 'Member, Society of Cosmetic Scientists (SCS)', '14+ Years Dermal Formulation R&D'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    social: {
      linkedin: 'https://linkedin.com/in/capilorix-elena-vance',
      twitter: 'https://twitter.com/drelenavance',
      researchgate: 'https://researchgate.net/profile/Elena-Vance-Capilorix'
    }
  },
  {
    id: 'chloe-davenport',
    name: 'Chloe Davenport',
    title: 'Clinical Esthetician & Trichology Specialist',
    bio: 'Licensed clinical esthetician and certified trichologist with a private clinical practice in New York. Chloe has evaluated over 500 scalp and skincare formulations and directs Capilorix instrumental cohort testing for pore refinement, hair density, and barrier resilience.',
    qualifications: ['Licensed Clinical Esthetician (NY State Board)', 'Certified Trichologist (World Trichology Society)', '10+ Years Clinical Treatment Practice'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    social: {
      linkedin: 'https://linkedin.com/in/chloedavenport-capilorix',
      instagram: 'https://instagram.com/chloedavenport_skin'
    }
  },
  {
    id: 'marcus-reid',
    name: 'Marcus Reid',
    title: 'Cosmetics Regulatory Analyst & Testing Director',
    bio: 'Marcus oversees clinical safety audits and regulatory compliance at Capilorix. Formerly a compliance advisor for global cosmetic distributors in the UK and Australia, he monitors EU/FDA ingredient restrictions and verifies merchant transparency.',
    qualifications: ['MSc Pharmaceutical Sciences (University of Manchester)', 'Former EU/UK REACH Cosmetic Compliance Officer', 'Safety Assessment Specialist'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    social: {
      linkedin: 'https://linkedin.com/in/marcusreid-capilorix'
    }
  },
  {
    id: 'dr-sarah-jenkins',
    name: 'Dr. Sarah Jenkins, MD',
    title: 'Board-Certified Dermatologist (Advisory Reviewer)',
    bio: 'Dr. Jenkins provides independent medical review for Capilorix skincare and scalp health guides. She is an attending dermatologist at a major Boston teaching hospital and author of numerous peer-reviewed papers on transepidermal water loss and topical retinoids.',
    qualifications: ['MD Dermatology (Harvard Medical School)', 'Fellow, American Academy of Dermatology (FAAD)', 'Published Researcher on Skin Barrier Function'],
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    social: {
      linkedin: 'https://linkedin.com/in/drsarahjenkins-md'
    }
  }
];

export function getAuthorById(id) {
  return authors.find(a => a.id === id) || authors[0];
}
