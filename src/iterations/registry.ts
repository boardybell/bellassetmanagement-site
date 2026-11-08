// The ten design iterations. The gallery index reads this; each iteration's pages live in
// src/pages/iterations/NN/ and their styles and parts in src/iterations/NN/.
export interface Iteration {
  n: string;
  family: 'Ledger' | 'Architectural' | 'Typographic' | 'Inverse';
  name: string;
  thesis: string;
  rationale: string; // two sentences
  pages: { href: string; label: string }[]; // relative to /iterations/NN/
}

export const iterations: Iteration[] = [
  { n: '01', family: 'Ledger', name: 'Colonnade', thesis: 'Ownership is a quiet job, done every day.',
    rationale: 'The closest sibling to bondbellandco.com: cream ground, a full-bleed navy colonnade, and the thesis set over it in Playfair. One page, read top to bottom like a single sheet of letterhead.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '02', family: 'Ledger', name: 'Cornice', thesis: "The family's enterprises, held under one roof.",
    rationale: 'The same bones split into three pages, with a fixed left rail carrying the wordmark and navigation. Suits a reader doing diligence who wants to land directly on Holdings or Principal.',
    pages: [{ href: '', label: 'Home' }, { href: 'holdings/', label: 'Holdings' }, { href: 'principal/', label: 'Principal' }] },
  { n: '03', family: 'Ledger', name: 'Plate', thesis: 'One name above the businesses, and a person behind the name.',
    rationale: 'No full-bleed image. The hero is typographic, with one small architectural plate inset beside it the way a bound report places a frontispiece.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '04', family: 'Architectural', name: 'Timber', thesis: 'What the family owns, it keeps in good repair.',
    rationale: 'Image-led and gridded: each section opens on a large photograph with a gold hairline caption. Mountain-west timber and stone tie the entity to Jackson.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '05', family: 'Architectural', name: 'Lake', thesis: 'Every holding has an owner who reads the mail.',
    rationale: 'A split-screen hero, image left and type right, across four pages. The most conventional company-site structure of the ten, and the easiest to extend later.',
    pages: [{ href: '', label: 'Home' }, { href: 'holdings/', label: 'Holdings' }, { href: 'principal/', label: 'Principal' }, { href: 'contact/', label: 'Contact' }] },
  { n: '06', family: 'Architectural', name: 'Sequence', thesis: 'The work is mostly stewardship, and stewardship is mostly attention.',
    rationale: 'A sticky image panel that changes once per section as the reader scrolls: threshold, fence, river, barn. Restrained motion, no parallax, and a static fallback for reduced motion.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '07', family: 'Typographic', name: 'Measure', thesis: 'Owned plainly and kept carefully.',
    rationale: 'Big type, rules, and whitespace, with a single accent image. Everything is carried by Playfair at display sizes and generous measure.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '08', family: 'Typographic', name: 'Rule', thesis: 'The holding company is the part that does not change.',
    rationale: 'Full-width horizontal rules are the structure: every section is a ruled band, and the navigation is a running header line like a bound ledger.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '09', family: 'Inverse', name: 'Report Cover', thesis: "The structure behind the family's enterprises, and nothing more.",
    rationale: 'Navy ground and cream type, with the gold twin-corner marks from the Bond Bell & Co report suite translated to the web. Reads like the cover of an annual report.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '10', family: 'Inverse', name: 'Arcade', thesis: 'Built to be kept, not sold.',
    rationale: 'A navy hero that gives way to a cream body as the reader scrolls, across three pages. Pairs the weight of the report covers with the readability of the Ledger pages.',
    pages: [{ href: '', label: 'Home' }, { href: 'holdings/', label: 'Holdings' }, { href: 'principal/', label: 'Principal' }] },
  { n: '11', family: 'Architectural', name: 'Portico', thesis: 'Built square, and meant to be handed down.',
    rationale: 'Drawn from the vocabulary of an 1850s eastern North Carolina town house: white frame, Greek Revival symmetry, Italianate brackets, and a later two-story classical portico. The layout borrows the bones: a symmetrical header, entablature bands over each section, and holdings set in pilaster bays.',
    pages: [{ href: '', label: 'Home' }] },
];
