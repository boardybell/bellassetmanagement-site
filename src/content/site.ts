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
    body: 'Bell Asset Management also holds and manages real estate and capital assets. Correspondence about these holdings can be sent to the company\u2019s office by mail.',
  },
];

// People. Bond Bell's facts are from bondbellandco.com/about/. Shirley Lau Scott: title Administrator,
// confirmed by Bond 2026-11-07; tenure and coordination work from the BB&Co claims log, row 30 (CCO-confirmed
// 2026-08-06, pronouns she/her). A bio line marked entity: 'bbco' describes the adviser and may use
// regulated words (qa.mjs exempts it).
export interface BioLine { text: string; entity?: 'bbco' }
export interface Person { id: string; name: string; title: string; bio: BioLine[]; portraitAlt: string }

export const people: Person[] = [
  {
    id: 'bond',
    name: 'Bond Bell',
    title: 'Principal',
    bio: [
      { text: 'Bond Bell is the principal of Bell Asset Management and is responsible for its direction.' },
      { text: 'He has worked in the securities industry since 2004, at Scott & Stringfellow, ING Financial Partners, Voya Financial Advisors, and the Cetera firms.' },
      { text: 'He is also the managing member of Bond Bell & Co LLC, a registered investment adviser headquartered in Fort Wayne, Indiana, where he serves as chief executive and chief compliance officer.' },
      { text: 'He holds B.A. degrees in Business and Accounting from Randolph-Macon College and works from Fort Wayne, Indiana, and Jackson, Wyoming.' },
    ],
    portraitAlt: 'Portrait of Bond Bell',
  },
  {
    id: 'shirley',
    name: 'Shirley Lau Scott',
    title: 'Administrator',
    bio: [
      { text: 'Shirley Lau Scott is the administrator of Bell Asset Management. She has worked with Bond Bell for two years.' },
      { text: 'She also leads client service at Bond Bell & Co LLC, where her work includes coordination with attorneys, accountants, and insurance agents.', entity: 'bbco' },
    ],
    portraitAlt: 'Portrait of Shirley Lau Scott',
  },
];

export const contact = {
  // "Office": Bond confirmed on 2026-11-07 that this is leased office space.
  addressLabel: 'Office',
  addressLines: ['680 Cache St, Suite 100-10219', 'Jackson, WY 83001-8694'],
  // No email or phone on the site (Bond, 2026-11-07). Sales solicitations by letter only.
  proposalsLabel: 'Sales proposals',
  solicitationNote: 'Sales solicitations are accepted by letter only, sent to the office address.',
  proposalsLink: 'How to write to us',
};

// Sales proposals page. Bond's text (2026-11-07), verbatim.
export const proposals = {
  title: 'Sales proposals',
  description: 'How to send Bell Asset Management a sales proposal: a letter sent by U.S. Mail.',
  intro: 'If you would like to sell us a product or service, take the time to understand our business and explain why your offering belongs here.',
  notice: 'Thoughtful, handwritten correspondence sent by U.S. Mail may merit attention. Unsolicited sales emails, automated outreach, and cold calls will be dismissed.',
  lead: 'We value a personal approach because a useful business proposal requires some knowledge of the person and company receiving it. Adding a name to a template tells us very little. A specific observation about our business, followed by a relevant proposal, gives us something to consider.',
  sections: [
    { heading: 'Know whom you are approaching', body: [
      'Learn what the company does. Identify the appropriate person and address your correspondence to them. Make sure the product or service you are offering is relevant to that company\u2019s activities.',
      'You do not need to manufacture a personal connection or open with flattery. Accurate information and a sensible reason for writing are sufficient.',
    ] },
    { heading: 'Explain the proposal plainly', body: [
      'Tell us what you offer, what it would do for our business, and why you believe we might need it. Where practical, include the price or a useful indication of cost.',
      'Give us enough information to assess the proposal without requiring a meeting to discover what you are selling. Avoid vague promises about growth, efficiency, or opportunity. Describe the actual product, service, or result.',
    ] },
    { heading: 'Make the correspondence personal', body: [
      'A handwritten letter should reflect individual thought. Refer to something relevant, explain your reasoning, and sign your name.',
      'The handwriting alone will not make a generic pitch useful. What matters is that you have considered the recipient and written something specifically worth their time. A short, legible letter can accomplish this without an elaborate package or a stack of promotional material.',
    ] },
    { heading: 'Respect the recipient\u2019s time', body: [
      'Keep the initial approach concise. One page will usually provide enough room to introduce yourself and explain a worthwhile proposal.',
      'State your purpose early. Avoid manufactured urgency, exaggerated claims, and requests for an immediate appointment. A prospective customer should be able to understand your offer and decide whether further discussion would be useful.',
    ] },
    { heading: 'Allow us to decide whether to continue', body: [
      'Include your name and contact information, then allow us to consider the correspondence.',
      'Sending a letter does not create an obligation to respond, schedule a meeting, or accept a follow-up call. Please do not follow it with an email sequence, repeated telephone calls, or unsolicited calendar invitations.',
      'If we would like to discuss your proposal, we will contact you.',
    ] },
  ],
  addressHeading: 'Address letters to',
};

// Not changed in the copy revision: a new date would imply a review that has not happened.
export const reviewed = 'November 7, 2026';

// Footer disclosure. The first two sentences are the company description (updated to the owner's
// positioning). The scope limitation "does not act for outside parties" is kept from the approved
export const legal = [
  'Bell Asset Management is a private holding company. It holds and manages operating businesses, real estate, and capital assets, and does not act for outside parties. It does not provide investment, legal, tax, or accounting advice, and nothing on this site is an offer to sell or a solicitation of an offer to buy any security or interest. Bond Bell & Co LLC is a separate entity and a registered investment adviser; registration does not imply a certain level of skill or training.',
];
export const copyright = `© 2026 Bell Asset Management · Jackson, Wyoming. Content last reviewed ${reviewed}.`;
