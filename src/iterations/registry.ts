// The design iterations. The gallery index reads this; each iteration's pages live in
// src/pages/iterations/NN/ and their styles and parts in src/iterations/NN/.
// All iterations use the same copy (src/content/site.ts); descriptions here compare layouts only.
export interface Iteration {
  n: string;
  family: 'Ledger' | 'Architectural' | 'Typographic' | 'Inverse';
  name: string;
  rationale: string; // factual layout description, two sentences
  pages: { href: string; label: string }[]; // relative to /iterations/NN/
}

export const iterations: Iteration[] = [
  { n: '01', family: 'Ledger', name: 'Colonnade',
    rationale: 'Single page with a full-width navy photograph of a colonnade, the headline set over it, and navigation at the top right. Cream sections follow with centered headings; the structure is closest to bondbellandco.com.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '02', family: 'Ledger', name: 'Cornice',
    rationale: 'Three pages, with navigation in a fixed left rail that also carries the wordmark and email address. A wide navy photograph of a cornice opens the home page, and text runs left-aligned on cream.',
    pages: [{ href: '', label: 'Home' }, { href: 'holdings/', label: 'Holdings' }, { href: 'principal/', label: 'Principal' }] },
  { n: '03', family: 'Ledger', name: 'Plate',
    rationale: 'Single page with a centered wordmark and navigation in a ruled bar beneath it. There is no full-width image, only a small framed photograph beside the headline, and the sections use a numbered two-column layout.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '04', family: 'Architectural', name: 'Timber',
    rationale: 'Single page on a twelve-column grid. A large warm-toned photograph of timber and stone opens the page, a second photograph sits beside the holdings, and gold rules separate the sections.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '05', family: 'Architectural', name: 'Lake',
    rationale: 'Four pages. The home page splits the screen between a navy mountain photograph and the text, and the inner pages place a navy title panel beside the content.',
    pages: [{ href: '', label: 'Home' }, { href: 'holdings/', label: 'Holdings' }, { href: 'principal/', label: 'Principal' }, { href: 'contact/', label: 'Contact' }] },
  { n: '06', family: 'Architectural', name: 'Sequence',
    rationale: 'Single page with a fixed photograph panel on the left that changes once per section, using four warm-toned images, and the text in the right column. On phones the first image sits above the text.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '07', family: 'Typographic', name: 'Measure',
    rationale: 'Single page set mainly in type, with a large Playfair headline, full-width rules, and wide spacing. One small photograph accompanies the company description.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '08', family: 'Typographic', name: 'Rule',
    rationale: 'Single page divided by horizontal rules in the manner of a ledger, with navigation in a running line that stays at the top of the screen. A wide navy horizon photograph sits under the headline.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '09', family: 'Inverse', name: 'Report Cover',
    rationale: 'Single page on a navy background with cream type. Gold corner marks taken from the Bond Bell & Co report covers frame the opening, the photograph, and each section heading.',
    pages: [{ href: '', label: 'Home' }] },
  { n: '10', family: 'Inverse', name: 'Arcade',
    rationale: 'Three pages, each opening on a navy photograph of a stone arcade that blends into a cream body below. Navigation sits over the photograph.',
    pages: [{ href: '', label: 'Home' }, { href: 'holdings/', label: 'Holdings' }, { href: 'principal/', label: 'Principal' }] },
  { n: '11', family: 'Architectural', name: 'Portico',
    rationale: 'Single page using the forms of a Greek Revival house: a navy photograph of a two-story portico and a symmetrical header with the wordmark between two pairs of links. Each section heading sits in a ruled band, and the holdings are set between vertical rules.',
    pages: [{ href: '', label: 'Home' }] },
];
