// src/data/deafassist.js

export const deafAssistData = {
  title: 'DeafAssist',
  tagline: 'Assistive Eyewear for the Hearing Impaired',
  role: 'Co-Founder & Lead Developer',
  status: 'Ongoing',
  irisFinalist: true,
  date: 'October 2026',

  description: `Assistive eyewear for people with hearing loss, combining environmental-sound classification, visual alerts and approximate directional cues. A physical prototype and glasses-to-iPhone audio connection have been demonstrated; recognition and haptic validation continue.`,

  longDescription: `DeafAssist is an assistive technology project that aims to make everyday environments safer and more accessible for people with hearing loss. The eyewear prototype uses microphones, sound recognition and a visual display to identify selected environmental sounds — including horns, sirens, doorbells and alarms — and provide approximate directional cues so the wearer knows where a sound is coming from.

The project now includes a Bluetooth-connected companion app with visual cues, distinct vibration patterns and a history of alerts. The app is designed to supplement the eyewear's display with phone-based alerts.

During user testing at Kochar Infotech (KocharTech), Amritsar, a participant with hearing loss validated the prototype and endorsed several proposed uses. The participant recommended repositioning the battery to address heat near the face and reducing obstruction to the wearer's field of view — feedback that will guide the next design iteration.

The device works without internet, and the siren-like important sounds are identified using on-device audio classification. All information is displayed visually on a heads-up display in front of the wearer's eyes.`,

  highlights: [
    {
      icon: 'ear',
      title: 'Sound Classification',
      text: 'On-device AI identifies environmental sounds — horns, sirens, doorbells, alarms — without internet.',
    },
    {
      icon: 'glasses',
      title: 'Visual HUD Alerts',
      text: 'Heads-up display shows what sound was detected and its approximate direction in real time.',
    },
    {
      icon: 'phone',
      title: 'Companion App',
      text: 'Bluetooth-connected iPhone app with visual cues, vibration patterns and alert history.',
    },
    {
      icon: 'direction',
      title: 'Directional Cues',
      text: 'Approximate directional indicators help the wearer locate the source of important sounds.',
    },
    {
      icon: 'offline',
      title: 'Works Offline',
      text: 'Fully functional without internet — on-device processing ensures privacy and reliability.',
    },
    {
      icon: 'testing',
      title: 'User Validated',
      text: 'Successfully tested with a hearing-impaired participant at KocharTech, Amritsar.',
    },
  ],

  mediaArticle: {
    title: 'Amritsar student successfully tests sound-alert eyewear for hearing-impaired people',
    source: 'Sach Kahoon Punjabi',
    url: 'https://sachkahoonpunjabi.com/state/punjab/amritsar-student-successfully-tests-sound-alert-eyewear-for-hearing-impaired-people/article-60962',
    date: 'October 24, 2026',
  },

  pressCoverage: [
    {
      id: 1,
      source: 'Sach Kahoon',
      language: 'Punjabi',
      image: '/images/deafassist/press-sachkahoon.jpeg',
      date: 'Oct 25, 2026',
    },
    {
      id: 2,
      source: 'Daily Fakr-Ae-Hind',
      language: 'English',
      image: '/images/deafassist/press-fakraehind-english.jpeg',
      date: 'Oct 24, 2026',
    },
    {
      id: 3,
      source: 'Daily Fakr-Ae-Hind',
      language: 'Punjabi',
      image: '/images/deafassist/press-fakraehind-punjabi.jpeg',
      date: 'Oct 24, 2026',
    },
    {
      id: 4,
      source: 'FHS News',
      language: 'English',
      image: '/images/deafassist/press-fhs-english.jpeg',
      date: 'Oct 24, 2026',
    },
    {
      id: 5,
      source: 'Punjab Yugmarg',
      language: 'English / Punjabi',
      image: '/images/deafassist/press-punjab-yugmarg.jpeg',
      date: 'Oct 25, 2026',
    },
  ],

  testingPhotos: [
    {
      id: 1,
      image: '/images/deafassist/testing-1.jpeg',
      caption: 'Prototype demonstration at Kochar Infotech (KocharTech), Amritsar',
    },
    {
      id: 2,
      image: '/images/deafassist/testing-2.jpeg',
      caption: 'User testing the DeafAssist eyewear with hearing-impaired participant',
    },
    {
      id: 3,
      image: '/images/deafassist/testing-3.jpeg',
      caption: 'Aarush explaining the prototype hardware and sound recognition module',
    },
    {
      id: 4,
      image: '/images/deafassist/testing-4.jpeg',
      caption: 'Successful testing session — participant validates the concept',
    },
  ],
};