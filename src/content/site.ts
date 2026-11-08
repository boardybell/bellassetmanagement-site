// Single source of truth for all copy. Every iteration reads from here.
// Rules: no em dashes, no banned words (see scripts/qa.mjs), no invented facts.
// Anything unconfirmed is written as [CONFIRM: ...] and fails the production QA.
//
// Positioning (owner's direction, 2026-11-07): Bell Asset Management is a private holding company
// in Jackson, Wyoming, led by Bond Bell, that holds and manages operating businesses, real estate,
// and capital assets. Earlier "family assets" framing is retired. Bell Family Office keeps its name.

export const company = {
  name: 'Bell Asset Management',
  city: 'Jackson, Wyoming',
  // Hero headline and the sentence that follows it. Together they are the company statement;
  // layouts must not repeat either sentence in an eyebrow, caption, or second paragraph.
  headline: 'Bell Asset Management is a private holding company based in Jackson, Wyoming.',
  lede: 'Led by Bond Bell, the company holds and manages operating businesses, real estate, and capital assets.',
  // Meta description and social description for the home page.
  description:
    'Bell Asset Management is a private holding company in Jackson, Wyoming. Led by Bond Bell, it holds and manages operating businesses, real estate, and capital assets.',
  wordmarkDescriptor: 'Holding Company',
};

// Holdings. Two cards: the operating business (with its private-office practice grouped under it)
// and the real estate and capital assets. No property addresses, types, or sizes are given because
// none have been supplied.
export const holdingsIntro =
  "Bell Asset Management's holdings include Bond Bell & Co LLC, an operating business, as well as real estate and capital assets.";

export interface Practice { name: string; body: string; href: string; linkLabel: string }
export interface Holding {
  id: string;
  category: string;
  name: string;
  body: string;
  href?: string;
  linkLabel?: string;
  practice?: Practice;
}

export const holdings: Holding[] = [
  {
    id: 'bbco',
    category: 'Operating business',
    name: 'Bond Bell & Co LLC',
    // Entity-scoped copy: the only place regulated words may appear (qa.mjs exempts [data-entity="bbco"]).
    body: 'Bond Bell & Co LLC is a registered investment adviser headquartered in Fort Wayne, Indiana. It is registered in Indiana and notice-filed or registered in California and Texas (CRD 342290). Registration does not imply a certain level of skill or training. Its disclosures, including Form ADV, are available at bondbellandco.com.',
    href: 'https://bondbellandco.com',
    linkLabel: 'bondbellandco.com',
    practice: {
      name: 'Bell Family Office',
      body: 'Bell Family Office is the private-office practice of Bond Bell & Co LLC, based in Jackson, Wyoming.',
      href: 'https://bellfamilyoffice.com',
      linkLabel: 'bellfamilyoffice.com',
    },
  },
  {
    id: 'assets',
    category: 'Other holdings',
    name: 'Real estate and capital assets',
    body: 'Bell Asset Management also holds and manages real estate and capital assets. Correspondence about these holdings can be sent to the company by mail or email.',
  },
];

export const principal = {
  name: 'Bond Bell',
  title: 'Principal',
  // Facts from bondbellandco.com/about/. Role at Bell Asset Management kept separate from the
  // executive and compliance roles at Bond Bell & Co LLC.
  bio: [
    'Bond Bell is the principal of Bell Asset Management and is responsible for its direction.',
    'He has worked in the securities industry since 2004, at Scott & Stringfellow, ING Financial Partners, Voya Financial Advisors, and the Cetera firms.',
    'He is also the managing member of Bond Bell & Co LLC, a registered investment adviser headquartered in Fort Wayne, Indiana, where he serves as chief executive and chief compliance officer.',
    'He holds B.A. degrees in Business and Accounting from Randolph-Macon College and works from Fort Wayne, Indiana, and Jackson, Wyoming.',
  ],
  portraitAlt: 'Portrait of Bond Bell',
};

export const contact = {
  // "Office": Bond confirmed on 2026-11-07 that this is leased office space.
  addressLabel: 'Office',
  addressLines: ['680 Cache St, Suite 100-10219', 'Jackson, WY 83001-8694'],
  email: 'contact@bellassetmanagement.com',
  // Bond's policy (2026-11-07): sales solicitations by letter only.
  solicitationNote: 'Sales solicitations are accepted by mail only, at the address above.',
};

// Not changed in the copy revision: a new date would imply a review that has not happened.
export const reviewed = 'November 7, 2026';

// Footer disclosure. The first two sentences are the company description (updated to the owner's
// positioning). The scope limitation "does not act for outside parties" is kept from the approved
export const legal = [
  'Bell Asset Management is a private holding company. It holds and manages operating businesses, real estate, and capital assets, and does not act for outside parties. It does not provide investment, legal, tax, or accounting advice, and nothing on this site is an offer to sell or a solicitation of an offer to buy any security or interest. Bond Bell & Co LLC is a separate entity and a registered investment adviser; registration does not imply a certain level of skill or training.',
];
export const copyright = `© 2026 Bell Asset Management · Jackson, Wyoming. Content last reviewed ${reviewed}.`;
