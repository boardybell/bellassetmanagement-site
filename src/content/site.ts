// Single source of truth for all copy. Every iteration reads from here.
// Rules: no em dashes, no banned words (see scripts/qa.mjs), no invented facts.
// Anything unconfirmed is written as [CONFIRM: ...] and fails the production QA.

export const company = {
  name: 'Bell Asset Management',
  descriptor: "A private holding company for the Bell family's operating businesses and property.",
  wordmarkDescriptor: 'Holding Company',
  city: 'Jackson, Wyoming',
};

export const statement =
  "Bell Asset Management is a privately held holding company based in Jackson, Wyoming. It owns and oversees the Bell family's operating businesses and property. It holds nothing for anyone else, and it sells nothing. This site exists so that the people who deal with it can confirm what it is and reach it.";

export const holdings = [
  {
    id: 'bbco',
    name: 'Bond Bell & Co LLC',
    place: 'Fort Wayne, Indiana',
    // Entity-scoped copy: the only place regulated words may appear (qa.mjs exempts [data-entity="bbco"]).
    body: 'Bond Bell & Co LLC is a registered investment adviser headquartered in Fort Wayne, Indiana. It is registered in Indiana and notice-filed or registered in California and Texas (CRD 342290). Registration does not imply a certain level of skill or training. Its disclosures, including Form ADV, are available at bondbellandco.com.',
    href: 'https://bondbellandco.com',
    linkLabel: 'bondbellandco.com',
  },
  {
    id: 'bfo',
    name: 'Bell Family Office',
    place: 'Jackson, Wyoming',
    body: 'Bell Family Office is the private-office practice of Bond Bell & Co LLC, based in Jackson, Wyoming. It is a practice of the adviser, not a separate adviser.',
    href: 'https://bellfamilyoffice.com',
    linkLabel: 'bellfamilyoffice.com',
  },
];

export const principal = {
  name: 'Bond Bell',
  title: 'Principal',
  // Approved by Bond 2026-11-07. Sourced from bondbellandco.com/about/.
  bio: [
    "Bond Bell is the Principal of Bell Asset Management, which holds and oversees the Bell family's operating businesses and property.",
    'He has worked in the securities industry since 2004, at Scott & Stringfellow, ING Financial Partners, Voya Financial Advisors, and the Cetera firms.',
    'He is the managing member of Bond Bell & Co LLC, a registered investment adviser headquartered in Fort Wayne, Indiana, and serves as its chief executive and chief compliance officer.',
    'He holds B.A. degrees in Business and Accounting from Randolph-Macon College. He works from Fort Wayne, Indiana, and Jackson, Wyoming.',
  ],
  portraitAlt: 'Portrait of Bond Bell',
};

export const contact = {
  addressLabel: 'Office',
  addressLines: ['680 Cache St, Suite 100-10219', 'Jackson, WY 83001-8694'],
  email: 'contact@bellassetmanagement.com',
};

export const reviewed = 'November 7, 2026';

export const legal = [
  'Bell Asset Management is a privately held holding company. It holds and oversees only the Bell family\'s own businesses and property and does not act for outside parties. It does not provide investment, legal, tax, or accounting advice, and nothing on this site is an offer to sell or a solicitation of an offer to buy any security or interest. Bond Bell & Co LLC is a separate entity and a registered investment adviser; registration does not imply a certain level of skill or training.',
];
export const copyright = `© 2026 Bell Asset Management · Jackson, Wyoming. Content last reviewed ${reviewed}.`;
