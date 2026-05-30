export const heroLines = [
  'Get',
  'Discovered',
  'Get',
  'Connected',
  'Get',
  'Paid',
];

export const heroTicker = [
  'UNDERDAWGS',
  'FOR CREATORS',
  'EST. MMXXVI',
  'GROWTH OVER POPULARITY',
];

export const welcomeSlides = [
  {
    kanji: '01',
    kicker: 'The Beginning',
    title: 'BUILT\nFOR THE\nDAWGS',
    editorial: 'the ones nobody signed.',
    description: 'For the next generation of creators.',
    accent: '#FCD34D',
    bg: '#0A0A0A',
    fg: '#F2EFE6',
  },
  {
    kanji: '02',
    kicker: 'The Pipeline',
    title: 'UNKNOWN\nTO\nUNSTOPPABLE',
    editorial: 'a four-layer system.',
    description: 'Discover. Monetize. Amplify. Manage.',
    accent: '#FF6BB5',
    bg: '#0A0A0A',
    fg: '#F2EFE6',
  },
  {
    kanji: '03',
    kicker: 'The Promise',
    title: 'GROWTH\nOVER\nPOPULARITY',
    editorial: 'we back the underdawg.',
    description: 'Rewarding quality and rising potential.',
    accent: '#FF5A1F',
    bg: '#0A0A0A',
    fg: '#F2EFE6',
  },
];

export const creatorTypes = [
  { key: 'visual', title: 'VISUAL ARTIST', subtitle: 'painters · illustrators · photographers', color: '#FCD34D' },
  { key: 'musician', title: 'MUSICIAN', subtitle: 'singers · producers · djs', color: '#2E5BFF' },
  { key: 'video', title: 'VIDEO CREATOR', subtitle: 'youtubers · filmmakers · vloggers', color: '#FF6BB5' },
  { key: 'writer', title: 'WRITER', subtitle: 'authors · poets · journalists', color: '#FF5A1F' },
  { key: 'performer', title: 'PERFORMER', subtitle: 'dancers · actors · comedians', color: '#FCD34D' },
  { key: 'educator', title: 'EDUCATOR', subtitle: 'teachers · coaches · experts', color: '#2E5BFF' },
  { key: 'podcaster', title: 'PODCASTER', subtitle: 'audio · interviews · shows', color: '#FF6BB5' },
  { key: 'streamer', title: 'STREAMER', subtitle: 'gamers · irl · live', color: '#FF5A1F' },
  { key: 'fashion', title: 'FASHION / LIFE', subtitle: 'fashion · beauty · food', color: '#FCD34D' },
  { key: 'multi', title: 'MULTI-HYPHENATE', subtitle: 'you do all the things', color: '#F2EFE6' },
];

export const userTypes = [
  {
    key: 'creator',
    label: 'CREATOR',
    tag: 'I MAKE THINGS',
    body: 'Art, music, words, video, live — you create for a living or want to.',
    accent: '#FF6BB5',
  },
  {
    key: 'brand',
    label: 'BRAND',
    tag: 'I HIRE CREATORS',
    body: 'Run deals, find talent, launch campaigns with emerging voices.',
    accent: '#FF6BB5',
  },
  {
    key: 'manager',
    label: 'MANAGER',
    tag: 'I REP TALENT',
    body: 'Discover and represent rising creators, negotiate on their behalf.',
    accent: '#FF6BB5',
  },
  {
    key: 'fan',
    label: 'FAN',
    tag: 'I CHAMPION CREATORS',
    body: 'Back your favourites early. Buy art, merch, early access.',
    accent: '#FF6BB5',
  },
];

/** Media note: images come from Unsplash (CDN: images.unsplash.com).
 *  Topic-matched to each creator's craft. Query params force a consistent
 *  1200×1200 crop, auto format + compression so the feed feels professional
 *  without bloating data usage. Avatars use a smaller 400×400 crop of the
 *  same photo for visual coherence between the post header and media. */
export const feedPosts = [
  {
    id: '1',
    creator: 'SOLA ROUX',
    handle: '@solaroux',
    category: 'VISUAL ART',
    location: 'BROOKLYN',
    type: 'IMAGE · SERIES',
    title: 'SALT / STUDY No. 04',
    note: 'blue on bone. acrylic, resin, dust.',
    image: 'https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#2E5BFF',
    bg: '#F2EFE6',
    fg: '#0A0A0A',
    tall: true,
    likes: 1284,
    comments: 42,
    reposts: 18,
    postedAgo: '3H',
    rep: 82,
    rising: true,
  },
  {
    id: '2',
    creator: 'KOREDE ODUSOLA',
    handle: '@kore.odu',
    category: 'MUSIC',
    location: 'LAGOS',
    type: 'AUDIO · EP',
    title: 'NIGHT BUS EP',
    note: 'dropping friday. three tracks. one city.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#FCD34D',
    bg: '#0A0A0A',
    fg: '#F2EFE6',
    tall: false,
    likes: 822,
    comments: 29,
    reposts: 11,
    postedAgo: '7H',
    rep: 78,
    rising: true,
  },
  {
    id: '3',
    creator: 'MAYA PATEL',
    handle: '@maya_films',
    category: 'FILM',
    location: 'MUMBAI',
    type: 'VIDEO · 4 MIN',
    title: 'SHORT: AFTER WATER',
    note: 'a monsoon diary. four minutes. vertical.',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#FF6BB5',
    bg: '#0A0A0A',
    fg: '#F2EFE6',
    tall: true,
    likes: 3102,
    comments: 108,
    reposts: 76,
    postedAgo: '1D',
    rep: 76,
    rising: false,
  },
  {
    id: '4',
    creator: 'ARI SAGAWA',
    handle: '@ari.s',
    category: 'DESIGN',
    location: 'TOKYO',
    type: 'IMAGE · 9 IN SET',
    title: 'TYPE SERIES / WEEK 09',
    note: 'brutalist specimens in cream and ink.',
    image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#0A0A0A',
    bg: '#FCD34D',
    fg: '#0A0A0A',
    tall: false,
    likes: 506,
    comments: 22,
    reposts: 9,
    postedAgo: '2D',
    rep: 71,
    rising: true,
  },
  {
    id: '5',
    creator: 'JULES IYOHA',
    handle: '@jules.iyoha',
    category: 'DANCE',
    location: 'BERLIN',
    type: 'VIDEO · 90 SEC',
    title: 'STUDIO B — RAW TAKE',
    note: 'one shot, no cuts. hip-hop × contemporary.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#FF5A1F',
    bg: '#0A0A0A',
    fg: '#F2EFE6',
    tall: true,
    likes: 2148,
    comments: 64,
    reposts: 52,
    postedAgo: '2D',
    rep: 74,
    rising: false,
  },
  {
    id: '6',
    creator: 'LIN WATANABE',
    handle: '@lin.w',
    category: 'POETRY',
    location: 'KYOTO',
    type: 'TEXT · 13 POEMS',
    title: 'THIRTEEN SMALL PRAYERS',
    note: 'for the ones still becoming.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#2E5BFF',
    bg: '#F2EFE6',
    fg: '#0A0A0A',
    tall: false,
    likes: 714,
    comments: 38,
    reposts: 16,
    postedAgo: '3D',
    rep: 69,
    rising: true,
  },
  {
    id: '7',
    creator: 'REN CAMPOS',
    handle: '@ren.c',
    category: 'MUSIC',
    location: 'MEXICO CITY',
    type: 'AUDIO · SINGLE',
    title: 'CICLOS / TRACK 01',
    note: 'built from field recordings outside the metro.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#FF5A1F',
    bg: '#F2EFE6',
    fg: '#0A0A0A',
    tall: false,
    likes: 1_420,
    comments: 56,
    reposts: 32,
    postedAgo: '4H',
    rep: 73,
    rising: true,
  },
  {
    id: '8',
    creator: 'ADA NIKOLINA',
    handle: '@ada.nikolina',
    category: 'PHOTO',
    location: 'BELGRADE',
    type: 'IMAGE · 12 IN SET',
    title: 'NINE MORNINGS, ONE WINDOW',
    note: 'the light does the work. I just wait.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#FCD34D',
    bg: '#0A0A0A',
    fg: '#F2EFE6',
    tall: true,
    likes: 2_068,
    comments: 71,
    reposts: 29,
    postedAgo: '9H',
    rep: 81,
    rising: false,
  },
  {
    id: '9',
    creator: 'LAKSHMI DRAWS',
    handle: '@lakshmi.draws',
    category: 'ILLUSTRATION',
    location: 'CHENNAI',
    type: 'IMAGE · CARD SET',
    title: 'CHENNAI METRO · 52 CARDS',
    note: 'drawing every passenger who sits across from me. day 210.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#FF6BB5',
    bg: '#F2EFE6',
    fg: '#0A0A0A',
    tall: false,
    likes: 3_204,
    comments: 182,
    reposts: 141,
    postedAgo: '12H',
    rep: 85,
    rising: true,
  },
  {
    id: '10',
    creator: 'OMAR VISUALS',
    handle: '@omar.visuals',
    category: 'FILM',
    location: 'CAIRO',
    type: 'VIDEO · 2 MIN',
    title: 'CALL TO PRAYER / CAR HORN',
    note: 'the city has two soundtracks. both are loud.',
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#2E5BFF',
    bg: '#0A0A0A',
    fg: '#F2EFE6',
    tall: true,
    likes: 5_840,
    comments: 214,
    reposts: 302,
    postedAgo: '1D',
    rep: 88,
    rising: false,
  },
  {
    id: '11',
    creator: 'BEA ORCHESTRA',
    handle: '@bea.orchestra',
    category: 'MUSIC',
    location: 'SÃO PAULO',
    type: 'VIDEO · LIVE',
    title: 'RUA AUGUSTA · STREET TAKE',
    note: '60 piece ensemble. one city block. no permits.',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#FF5A1F',
    bg: '#0A0A0A',
    fg: '#F2EFE6',
    tall: true,
    likes: 9_120,
    comments: 422,
    reposts: 688,
    postedAgo: '1D',
    rep: 92,
    rising: false,
  },
  {
    id: '12',
    creator: 'KAI PLAYS',
    handle: '@kai.plays',
    category: 'STREAMING',
    location: 'SEOUL',
    type: 'LIVE · JUST ENDED',
    title: 'REPLAY: MIDNIGHT SESSION',
    note: 'beat made live tonight. stems in comments.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#FCD34D',
    bg: '#0A0A0A',
    fg: '#F2EFE6',
    tall: false,
    likes: 1_980,
    comments: 95,
    reposts: 41,
    postedAgo: '2D',
    rep: 77,
    rising: true,
  },
  {
    id: '13',
    creator: 'TEO PRINTS',
    handle: '@teo.prints',
    category: 'DESIGN',
    location: 'LONDON',
    type: 'IMAGE · RISOGRAPH',
    title: 'POSTERS FOR PROTESTS WE DIDN’T ATTEND',
    note: 'small batch · shipping worldwide thursday.',
    image: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#0A0A0A',
    bg: '#FCD34D',
    fg: '#0A0A0A',
    tall: false,
    likes: 882,
    comments: 38,
    reposts: 27,
    postedAgo: '2D',
    rep: 72,
    rising: true,
  },
  {
    id: '14',
    creator: 'NORA KOSKINEN',
    handle: '@nora.k',
    category: 'FASHION',
    location: 'HELSINKI',
    type: 'IMAGE · LOOKBOOK',
    title: 'COLD STUDIO / 08',
    note: 'no makeup, no retouching, no rented clothes.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#2E5BFF',
    bg: '#F2EFE6',
    fg: '#0A0A0A',
    tall: true,
    likes: 1_540,
    comments: 62,
    reposts: 38,
    postedAgo: '3D',
    rep: 74,
    rising: true,
  },
  {
    id: '15',
    creator: 'DIEGO MERCADO',
    handle: '@diego.mercado',
    category: 'COMEDY',
    location: 'BUENOS AIRES',
    type: 'VIDEO · 80 SEC',
    title: 'UNA VIDA DE PODCAST',
    note: 'four friends, one microphone, zero editing.',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=80&auto=format&fit=crop',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80&auto=format&fit=crop&crop=faces',
    color: '#FF6BB5',
    bg: '#0A0A0A',
    fg: '#F2EFE6',
    tall: false,
    likes: 4_612,
    comments: 288,
    reposts: 412,
    postedAgo: '4D',
    rep: 86,
    rising: false,
  },
];

export const featuredCreator = {
  name: 'SOLA ROUX',
  handle: '@solaroux',
  type: 'VISUAL ARTIST',
  location: 'BROOKLYN · NYC',
  rep: 82,
  tier: 'RISING',
  followers: 12480,
  quote:
    'I paint the bits of the city that dry quickly. blue-hour obsessive, resin romantic, still unsigned and proud of it.',
  color: '#2E5BFF',
  openTo: ['BRAND DEALS', 'COMMISSIONS', 'COLLABS'],
  nextDrop: 'SATURDAY 19:00 / RESIN SERIES NO. 05',
};

export type ChallengeAudio = {
  id: string;
  title: string;
  creator: string;
  durationMs: number;
  startMs: number;
};

export type ChallengeEntry = {
  id: string;
  uid: string;
  handle: string;
  caption: string;
  videoUrl: string;
  coverUrl: string;
  likes: number;
  comments: number;
};

export type Challenge = {
  id: string;
  tag: string;
  prompt: string;
  prize: string;
  daysLeft: number;
  entries: number;
  color: string;
  audio: ChallengeAudio;
  reel: ChallengeEntry[];
};

// Reel videos. Sourced from Mixkit's free CDN — direct mp4 downloads of
// real creators making things (painting, music, dance, filming). Each is
// ~3-5 MB / ~15s 720p with audio and streams over a global CDN, so swipes
// don't stall. URLs verified live before commit. Swap in real submissions
// once the backend lands.
//   pattern: https://assets.mixkit.co/videos/{ID}/{ID}-720.mp4
const M = (id: number) => `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`;
const VID_PAINTING_OIL = M(12762);     // girl painting an oil painting
const VID_PAINT_BRUSHES = M(43427);    // an artist's brushes
const VID_PAINT_PALETTE = M(41611);    // artist mixing paint on a palette
const VID_PAINT_DETAIL = M(40310);     // detail view of an artist painting
const VID_GUITARIST = M(42824);        // skillful guitarist on black guitar
const VID_PIANIST = M(44147);          // hands of a pianist
const VID_GUITAR_CLOSE = M(483);       // playing guitar close up
const VID_DANCE_STREET = M(51295);     // young people dancing a choreography in the street
const VID_DANCE_SMOKE = M(33899);      // woman dancing under a cloud of smoke
const VID_BREAKDANCE = M(452);         // man breakdancing
const VID_HIPHOP = M(40369);           // group of hip-hop dancers
const VID_FILMING_LAKE = M(49647);     // young woman filming a video by the lake
const VID_CLAPPERBOARD = M(46353);     // using a clapperboard
const VID_FILMING_CAMERA = M(23485);   // young man recording himself with a camera
const VID_CAMERAMAN = M(22016);        // cameraman filming in the city

// Creator-themed covers (Unsplash CDN). Each is rewritten with `?w=720` so
// FastImage downloads a phone-sized JPEG instead of the 3000px original —
// loads in <200ms on LTE, decodes to ~1 MB of bitmap instead of ~20 MB.
const COVER = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?w=720&auto=format&fit=crop&q=70`;

export const challenges: Challenge[] = [
  {
    id: 'c1',
    tag: '#BONETONES',
    prompt: 'paint with three colors only',
    prize: '₹25,000 + FEATURE',
    daysLeft: 4,
    entries: 218,
    color: '#FCD34D',
    audio: {
      id: 'a1',
      title: 'BONETONES LOOP',
      creator: '@dawnshade',
      durationMs: 60_000,
      startMs: 0,
    },
    reel: [
      {
        id: 'c1-e1',
        uid: 'u_maya',
        handle: '@maya_films',
        caption: 'three colors. one room. one take.',
        videoUrl: VID_PAINTING_OIL,
        coverUrl: COVER('1513364776144-60967b0f800f'),
        likes: 1240,
        comments: 88,
      },
      {
        id: 'c1-e2',
        uid: 'u_sola',
        handle: '@solaroux',
        caption: 'cyan / oxblood / bone',
        videoUrl: VID_PAINT_PALETTE,
        coverUrl: COVER('1452860606245-08befc0ff44b'),
        likes: 980,
        comments: 41,
      },
      {
        id: 'c1-e3',
        uid: 'u_ari',
        handle: '@ari.s',
        caption: 'spray + thread + chalk',
        videoUrl: VID_PAINT_BRUSHES,
        coverUrl: COVER('1547826039-bfc35e0f1ea8'),
        likes: 712,
        comments: 22,
      },
      {
        id: 'c1-e4',
        uid: 'u_jules',
        handle: '@jules.iyoha',
        caption: 'wearable canvas — only three',
        videoUrl: VID_PAINT_DETAIL,
        coverUrl: COVER('1545959570-a94084071b5d'),
        likes: 538,
        comments: 14,
      },
    ],
  },
  {
    id: 'c2',
    tag: '#NIGHTBUS',
    prompt: 'record an original track on public transport',
    prize: '₹40,000 + STUDIO HOUR',
    daysLeft: 7,
    entries: 96,
    color: '#FF6BB5',
    audio: {
      id: 'a2',
      title: 'NIGHT BUS PULSE',
      creator: '@kore.odu',
      durationMs: 45_000,
      startMs: 4_000,
    },
    reel: [
      {
        id: 'c2-e1',
        uid: 'u_kore',
        handle: '@kore.odu',
        caption: 'metro line 7 at 11pm',
        videoUrl: VID_GUITARIST,
        coverUrl: COVER('1511735111819-9a3f7709049c'),
        likes: 2210,
        comments: 174,
      },
      {
        id: 'c2-e2',
        uid: 'u_ren',
        handle: '@ren.c',
        caption: 'bus + boombox + chorus',
        videoUrl: VID_PIANIST,
        coverUrl: COVER('1493225457124-a3eb161ffa5f'),
        likes: 1090,
        comments: 63,
      },
      {
        id: 'c2-e3',
        uid: 'u_lin',
        handle: '@lin.w',
        caption: 'haiku over the hum',
        videoUrl: VID_GUITAR_CLOSE,
        coverUrl: COVER('1485579149621-3123dd979885'),
        likes: 604,
        comments: 28,
      },
    ],
  },
  {
    id: 'c3',
    tag: '#MONSOONMINUTE',
    prompt: 'a sixty-second film about rain',
    prize: '₹60,000 + FESTIVAL SUBMISSION',
    daysLeft: 11,
    entries: 52,
    color: '#2E5BFF',
    audio: {
      id: 'a3',
      title: 'MONSOON RUMBLE',
      creator: '@maya_films',
      durationMs: 60_000,
      startMs: 12_000,
    },
    reel: [
      {
        id: 'c3-e1',
        uid: 'u_maya',
        handle: '@maya_films',
        caption: 'gutter, glass, gold',
        videoUrl: VID_CAMERAMAN,
        coverUrl: COVER('1501691223387-dd0506c89d33'),
        likes: 1820,
        comments: 134,
      },
      {
        id: 'c3-e2',
        uid: 'u_ari',
        handle: '@ari.s',
        caption: 'minute one — only puddles',
        videoUrl: VID_CLAPPERBOARD,
        coverUrl: COVER('1444090542259-0af8fa96557e'),
        likes: 740,
        comments: 39,
      },
    ],
  },
];

export const risingList = [
  { rank: '01', name: 'SOLA ROUX', handle: '@solaroux', city: 'NYC', type: 'VISUAL ARTIST', rep: 82 },
  { rank: '02', name: 'KOREDE O.', handle: '@kore.odu', city: 'LAGOS', type: 'MUSICIAN', rep: 78 },
  { rank: '03', name: 'MAYA PATEL', handle: '@maya_films', city: 'MUMBAI', type: 'FILMMAKER', rep: 76 },
  { rank: '04', name: 'JULES IYOHA', handle: '@jules.iyoha', city: 'BERLIN', type: 'DANCER', rep: 74 },
  { rank: '05', name: 'ARI SAGAWA', handle: '@ari.s', city: 'TOKYO', type: 'DESIGNER', rep: 71 },
  { rank: '06', name: 'LIN WATANABE', handle: '@lin.w', city: 'KYOTO', type: 'POET', rep: 69 },
  { rank: '07', name: 'REN CAMPOS', handle: '@ren.c', city: 'MEXICO CITY', type: 'PRODUCER', rep: 67 },
];

export type LeaderRow = {
  rank: number;
  uid: string;
  handle: string;
  name: string;
  niche: string;
  city: string;
  repScore: number;
  repDelta: number;
  avatarUrl: string;
};

const avatarFor = (seed: string) => `https://i.pravatar.cc/200?u=${seed}`;

export const leaderboardWeek: LeaderRow[] = [
  { rank: 1, uid: 'u_maya', handle: '@maya_films', name: 'MAYA PATEL', niche: 'FILM', city: 'MUMBAI', repScore: 9_840, repDelta: 612, avatarUrl: avatarFor('maya') },
  { rank: 2, uid: 'u_sola', handle: '@solaroux', name: 'SOLA ROUX', niche: 'VISUAL', city: 'NYC', repScore: 9_510, repDelta: 488, avatarUrl: avatarFor('sola') },
  { rank: 3, uid: 'u_kore', handle: '@kore.odu', name: 'KOREDE O.', niche: 'MUSIC', city: 'LAGOS', repScore: 9_220, repDelta: 461, avatarUrl: avatarFor('kore') },
  { rank: 4, uid: 'u_jules', handle: '@jules.iyoha', name: 'JULES IYOHA', niche: 'DANCE', city: 'BERLIN', repScore: 8_960, repDelta: 402, avatarUrl: avatarFor('jules') },
  { rank: 5, uid: 'u_ari', handle: '@ari.s', name: 'ARI SAGAWA', niche: 'DESIGN', city: 'TOKYO', repScore: 8_710, repDelta: 358, avatarUrl: avatarFor('ari') },
  { rank: 6, uid: 'u_lin', handle: '@lin.w', name: 'LIN WATANABE', niche: 'POETRY', city: 'KYOTO', repScore: 8_440, repDelta: 314, avatarUrl: avatarFor('lin') },
  { rank: 7, uid: 'u_ren', handle: '@ren.c', name: 'REN CAMPOS', niche: 'AUDIO', city: 'MEX CITY', repScore: 8_180, repDelta: 287, avatarUrl: avatarFor('ren') },
  { rank: 8, uid: 'u_dawn', handle: '@dawnshade', name: 'DAWN SHADE', niche: 'MUSIC', city: 'LA', repScore: 7_920, repDelta: 254, avatarUrl: avatarFor('dawn') },
  { rank: 9, uid: 'u_riv', handle: '@riv.studio', name: 'RIV BASU', niche: 'FILM', city: 'DELHI', repScore: 7_660, repDelta: 221, avatarUrl: avatarFor('riv') },
  { rank: 10, uid: 'u_neo', handle: '@neo.crt', name: 'NEO CHEN', niche: 'CODE/ART', city: 'TAIPEI', repScore: 7_410, repDelta: 198, avatarUrl: avatarFor('neo') },
];

export const leaderboardAllTime: LeaderRow[] = [
  { rank: 1, uid: 'u_sola', handle: '@solaroux', name: 'SOLA ROUX', niche: 'VISUAL', city: 'NYC', repScore: 84_220, repDelta: 488, avatarUrl: avatarFor('sola') },
  { rank: 2, uid: 'u_maya', handle: '@maya_films', name: 'MAYA PATEL', niche: 'FILM', city: 'MUMBAI', repScore: 78_410, repDelta: 612, avatarUrl: avatarFor('maya') },
  { rank: 3, uid: 'u_kore', handle: '@kore.odu', name: 'KOREDE O.', niche: 'MUSIC', city: 'LAGOS', repScore: 72_180, repDelta: 461, avatarUrl: avatarFor('kore') },
  { rank: 4, uid: 'u_dawn', handle: '@dawnshade', name: 'DAWN SHADE', niche: 'MUSIC', city: 'LA', repScore: 68_540, repDelta: 254, avatarUrl: avatarFor('dawn') },
  { rank: 5, uid: 'u_jules', handle: '@jules.iyoha', name: 'JULES IYOHA', niche: 'DANCE', city: 'BERLIN', repScore: 63_710, repDelta: 402, avatarUrl: avatarFor('jules') },
  { rank: 6, uid: 'u_ari', handle: '@ari.s', name: 'ARI SAGAWA', niche: 'DESIGN', city: 'TOKYO', repScore: 59_820, repDelta: 358, avatarUrl: avatarFor('ari') },
  { rank: 7, uid: 'u_ren', handle: '@ren.c', name: 'REN CAMPOS', niche: 'AUDIO', city: 'MEX CITY', repScore: 54_300, repDelta: 287, avatarUrl: avatarFor('ren') },
  { rank: 8, uid: 'u_lin', handle: '@lin.w', name: 'LIN WATANABE', niche: 'POETRY', city: 'KYOTO', repScore: 48_910, repDelta: 314, avatarUrl: avatarFor('lin') },
  { rank: 9, uid: 'u_riv', handle: '@riv.studio', name: 'RIV BASU', niche: 'FILM', city: 'DELHI', repScore: 41_240, repDelta: 221, avatarUrl: avatarFor('riv') },
  { rank: 10, uid: 'u_neo', handle: '@neo.crt', name: 'NEO CHEN', niche: 'CODE/ART', city: 'TAIPEI', repScore: 38_770, repDelta: 198, avatarUrl: avatarFor('neo') },
];

export const weeklyHeadline = {
  chapter: 'CHAPTER 01',
  intro: 'seven creators to watch.',
  subline: 'their first of the year, their best so far.',
  body:
    'Each of them has fewer than twenty thousand followers — and more taste than most people with ten times as many. The algorithm has not caught them yet. We have.',
};

export const pullQuote = {
  quote:
    '“the algorithm rewards popularity. we reward promise.”',
  attribution: 'UNDERDAWGS / MANIFESTO N° 01',
};

export const tickerHandles = [
  '@solaroux', '@kore.odu', '@maya_films', '@jules.iyoha', '@ari.s',
  '@lin.w', '@ren.c', '@ada.nikolina', '@lakshmi.draws', '@omar.visuals',
  '@bea.orchestra', '@kai.plays', '@teo.prints',
];

export const feedStats = [
  { value: 127400, label: 'creators rising' },
  { value: 42900, label: 'deals closed' },
  { value: 18600, label: 'merch shipped' },
  { value: 9340, label: 'verified signed' },
];

export const stats = [
  { value: 127_400, label: 'creators rising' },
  { value: 42_900, label: 'deals closed' },
  { value: 18_600, label: 'merch shipped' },
];

export const profileMock = {
  name: 'Sola Roux',
  handle: '@solaroux',
  type: 'VISUAL ARTIST',
  location: 'BROOKLYN · NYC',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop&crop=faces',
  bio: 'I paint the bits of the city that dry quickly. blue-hour obsessive, resin romantic, still unsigned and proud of it.',
  stats: {
    followers: 12_480,
    following: 342,
    reputation: 82,
    earned: 4_820,
  },
  tier: 'RISING',
  niches: ['Abstract', 'Resin', 'Brooklyn', 'Film'],
  platforms: [
    { key: 'ig', name: 'INSTAGRAM', value: '12.4K' },
    { key: 'tt', name: 'TIKTOK', value: '4.8K' },
    { key: 'sp', name: 'SPOTIFY', value: '—' },
  ],
  portfolio: [
    { id: 'p1', title: 'SALT / STUDY 04', color: '#2E5BFF', bg: '#F2EFE6' },
    { id: 'p2', title: 'GLASS HOUSE', color: '#FCD34D', bg: '#0A0A0A' },
    { id: 'p3', title: 'BONE PAINT', color: '#FF6BB5', bg: '#0A0A0A' },
    { id: 'p4', title: 'LAST TRAIN', color: '#0A0A0A', bg: '#FCD34D' },
  ],
};

/* -------------------------------------------------------------------------
 * USER FEED — the personal feed shown on the profile screen. Three kinds:
 *   image  → grid tile (Instagram-like)
 *   video  → reel card with play badge + duration
 *   text   → editorial written post (Twitter-like)
 * ----------------------------------------------------------------------- */
export type UserFeedItem = {
  id: string;
  kind: 'image' | 'video' | 'text';
  title: string;
  body?: string;
  image?: string;
  duration?: string;
  postedAgo: string;
  likes: number;
  comments: number;
  reposts: number;
  accent: string;
  bg?: string;
  category?: string;
};

export const userFeed: UserFeedItem[] = [
  {
    id: 'u1',
    kind: 'image',
    title: 'SALT / STUDY No. 04',
    body: 'blue on bone. acrylic, resin, dust.',
    image: 'https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=1200&q=80&auto=format&fit=crop',
    postedAgo: '3H',
    likes: 1284,
    comments: 42,
    reposts: 18,
    accent: '#2E5BFF',
    category: 'VISUAL ART',
  },
  {
    id: 'u2',
    kind: 'image',
    title: 'GLASS HOUSE / 02',
    body: 'studio window, 6:14am.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&q=80&auto=format&fit=crop',
    postedAgo: '11H',
    likes: 902,
    comments: 24,
    reposts: 9,
    accent: '#FCD34D',
    category: 'PHOTO',
  },
  {
    id: 'u3',
    kind: 'image',
    title: 'BONE PAINT',
    body: 'cream over black. raw canvas.',
    image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=1200&q=80&auto=format&fit=crop',
    postedAgo: '1D',
    likes: 1640,
    comments: 58,
    reposts: 22,
    accent: '#FF6BB5',
    category: 'VISUAL ART',
  },
  {
    id: 'u4',
    kind: 'image',
    title: 'LAST TRAIN',
    body: 'L line, 1:42am, the only seat.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80&auto=format&fit=crop',
    postedAgo: '2D',
    likes: 712,
    comments: 31,
    reposts: 14,
    accent: '#FF5A1F',
    category: 'PHOTO',
  },
  {
    id: 'u5',
    kind: 'image',
    title: 'BLUE HOUR / 11',
    body: 'a corner of canal & van brunt.',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1200&q=80&auto=format&fit=crop',
    postedAgo: '3D',
    likes: 1024,
    comments: 39,
    reposts: 12,
    accent: '#2E5BFF',
    category: 'VISUAL ART',
  },
  {
    id: 'u6',
    kind: 'image',
    title: 'STUDY 12 — RESIN',
    body: 'first pour. five hours dry.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80&auto=format&fit=crop',
    postedAgo: '4D',
    likes: 488,
    comments: 18,
    reposts: 7,
    accent: '#FCD34D',
    category: 'VISUAL ART',
  },

  {
    id: 'v1',
    kind: 'video',
    title: 'STUDIO B — RAW TAKE',
    body: 'one shot, no cuts. thirty seconds.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&q=80&auto=format&fit=crop',
    duration: '0:32',
    postedAgo: '6H',
    likes: 2148,
    comments: 64,
    reposts: 52,
    accent: '#FF5A1F',
    category: 'PROCESS',
  },
  {
    id: 'v2',
    kind: 'video',
    title: 'CANAL ST. / TIMELAPSE',
    body: 'four hours of foot traffic. one minute.',
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1200&q=80&auto=format&fit=crop',
    duration: '1:04',
    postedAgo: '2D',
    likes: 3102,
    comments: 108,
    reposts: 76,
    accent: '#2E5BFF',
    category: 'FILM',
  },
  {
    id: 'v3',
    kind: 'video',
    title: 'POUR / SLOWED',
    body: 'resin at 240fps. headphones on.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80&auto=format&fit=crop',
    duration: '0:48',
    postedAgo: '5D',
    likes: 1840,
    comments: 71,
    reposts: 42,
    accent: '#FCD34D',
    category: 'PROCESS',
  },
  {
    id: 'v4',
    kind: 'video',
    title: 'INTERVIEW / DEEPFIELD',
    body: 'fifteen minute cut. unfiltered.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop',
    duration: '14:22',
    postedAgo: '1W',
    likes: 904,
    comments: 33,
    reposts: 21,
    accent: '#FF6BB5',
    category: 'PRESS',
  },

  {
    id: 't1',
    kind: 'text',
    title: 'on resin and patience',
    body: 'every pour is a small contract with gravity. you set the table, you walk away, you don’t check it for five hours. the painting cures whether or not you watch. that’s the whole lesson, I think.',
    postedAgo: '4H',
    likes: 612,
    comments: 28,
    reposts: 19,
    accent: '#FCD34D',
  },
  {
    id: 't2',
    kind: 'text',
    title: 'note from brooklyn',
    body: 'showed work at deepfield this week. small room, ten people, one bought. the one who bought said it reminded her of her grandmother’s kitchen tile. that is the only review I will read this year.',
    postedAgo: '1D',
    likes: 1042,
    comments: 56,
    reposts: 31,
    accent: '#2E5BFF',
  },
  {
    id: 't3',
    kind: 'text',
    title: 'unfiltered',
    body: 'I don’t use the word “content.” I make work. some of it ends up here. most of it doesn’t.',
    postedAgo: '3D',
    likes: 2184,
    comments: 144,
    reposts: 102,
    accent: '#FF5A1F',
  },
  {
    id: 't4',
    kind: 'text',
    title: 'studio rules',
    body: 'one: never paint past midnight.\ntwo: clean the brush first.\nthree: if it isn’t fun by hour two, it’s never going to be.',
    postedAgo: '6D',
    likes: 808,
    comments: 41,
    reposts: 26,
    accent: '#FF6BB5',
  },
];

/* -------------------------------------------------------------------------
 * MODULE GRID — the 12 surfaces reachable from the YOU tab (modules 2,3,5–15)
 * ----------------------------------------------------------------------- */
export type ModuleDef = {
  key: string;
  label: string;
  eyebrow: string;
  route: string;
  accent: string;
  bg: string;
  fg: string;
};

export const moduleGrid: ModuleDef[] = [
  { key: 'portfolio', label: 'PORTFOLIO', eyebrow: 'MODULE · 02', route: '/(modules)/portfolio', accent: '#FCD34D', bg: '#0A0A0A', fg: '#F2EFE6' },
  { key: 'studio', label: 'STUDIO', eyebrow: 'MODULE · 03', route: '/(modules)/studio', accent: '#2E5BFF', bg: '#F2EFE6', fg: '#0A0A0A' },
  { key: 'audience', label: 'AUDIENCE', eyebrow: 'MODULE · 05', route: '/(modules)/audience', accent: '#FF6BB5', bg: '#0A0A0A', fg: '#F2EFE6' },
  { key: 'analytics', label: 'ANALYTICS', eyebrow: 'MODULE · 06', route: '/(modules)/analytics', accent: '#FCD34D', bg: '#F2EFE6', fg: '#0A0A0A' },
  { key: 'jobs', label: 'JOB BOARD', eyebrow: 'MODULE · 07', route: '/(modules)/jobs', accent: '#FF5A1F', bg: '#0A0A0A', fg: '#F2EFE6' },
  { key: 'merch', label: 'MERCH', eyebrow: 'MODULE · 08', route: '/(modules)/merch', accent: '#FCD34D', bg: '#0A0A0A', fg: '#F2EFE6' },
  { key: 'art', label: 'ART MARKET', eyebrow: 'MODULE · 09', route: '/(modules)/art', accent: '#2E5BFF', bg: '#F2EFE6', fg: '#0A0A0A' },
  { key: 'finance', label: 'FINANCE', eyebrow: 'MODULE · 10', route: '/(modules)/finance', accent: '#FCD34D', bg: '#0A0A0A', fg: '#F2EFE6' },
  { key: 'reputation', label: 'REPUTATION', eyebrow: 'MODULE · 12', route: '/(modules)/reputation', accent: '#FF6BB5', bg: '#F2EFE6', fg: '#0A0A0A' },
  { key: 'community', label: 'COMMUNITY', eyebrow: 'MODULE · 13', route: '/(modules)/community', accent: '#2E5BFF', bg: '#0A0A0A', fg: '#F2EFE6' },
  { key: 'learning', label: 'LEARNING', eyebrow: 'MODULE · 14', route: '/(modules)/learning', accent: '#FCD34D', bg: '#F2EFE6', fg: '#0A0A0A' },
  { key: 'settings', label: 'SETTINGS', eyebrow: 'MODULE · 15', route: '/(modules)/settings', accent: '#9C988A', bg: '#0A0A0A', fg: '#F2EFE6' },
];

/* -------------------------------------------------------------------------
 * MODULE 5 — AUDIENCE
 * ----------------------------------------------------------------------- */
export type Platform = {
  key: string;
  name: string;
  handle: string;
  followers: number;
  connected: boolean;
  growth: number;
  accent: string;
};

export const platformSeed: Platform[] = [
  { key: 'ig', name: 'INSTAGRAM', handle: '@solaroux', followers: 12_480, connected: true, growth: 4.2, accent: '#FF6BB5' },
  { key: 'tt', name: 'TIKTOK', handle: '@solaroux', followers: 4_820, connected: true, growth: 12.8, accent: '#FCD34D' },
  { key: 'yt', name: 'YOUTUBE', handle: 'Sola Roux', followers: 2_106, connected: false, growth: 0, accent: '#FF5A1F' },
  { key: 'tw', name: 'TWITTER', handle: '@solaroux', followers: 3_240, connected: false, growth: 0, accent: '#2E5BFF' },
  { key: 'sp', name: 'SPOTIFY', handle: 'Sola Roux', followers: 0, connected: false, growth: 0, accent: '#FCD34D' },
  { key: 'tv', name: 'TWITCH', handle: 'solaroux', followers: 0, connected: false, growth: 0, accent: '#FF6BB5' },
];

export const topFans = [
  { id: 'f1', handle: '@keira.t', score: 98, note: 'Bought 3 prints · comments weekly', platforms: ['ig', 'tt'] },
  { id: 'f2', handle: '@miguel.arte', score: 94, note: 'Shared 12 times last month', platforms: ['ig'] },
  { id: 'f3', handle: '@sunday_kids', score: 91, note: 'Owns your Salt series', platforms: ['ig', 'tt', 'yt'] },
  { id: 'f4', handle: '@nyla.collect', score: 88, note: 'Repeated commission buyer', platforms: ['ig'] },
  { id: 'f5', handle: '@deepfield.mag', score: 84, note: 'Editorial pickup · 2025', platforms: ['tw', 'ig'] },
  { id: 'f6', handle: '@tori.d', score: 80, note: 'Early supporter · 18mo in', platforms: ['ig', 'tt'] },
];

export const emailSubscribersSeed = [
  { id: 's1', email: 'keira.t@hey.com', tag: 'Top Fan', joinedAgo: '3w' },
  { id: 's2', email: 'miguel.arte@mail.io', tag: 'Collector', joinedAgo: '1mo' },
  { id: 's3', email: 'nyla.collect@me.com', tag: 'Buyer', joinedAgo: '2mo' },
  { id: 's4', email: 'deepfield@mag.com', tag: 'Press', joinedAgo: '3mo' },
];

/* -------------------------------------------------------------------------
 * MODULE 6 — ANALYTICS
 * ----------------------------------------------------------------------- */
export const analyticsSeed = {
  totals: {
    reach: 28_420,
    engagement: 6_142,
    engagementRate: 8.2,
    profileViews: 2_846,
    growth7d: 4.8,
    growth30d: 12.3,
  },
  trend: [3.2, 4.1, 4.6, 4.4, 5.8, 6.9, 7.2, 6.8, 8.1, 8.4, 9.2, 9.6],
  topContent: [
    { id: '1', title: 'SALT / STUDY 04', views: 18_422, likes: 1_284, rate: 9.1 },
    { id: '5', title: 'STUDIO B — RAW TAKE', views: 12_104, likes: 2_148, rate: 17.7 },
    { id: '3', title: 'AFTER WATER', views: 9_210, likes: 3_102, rate: 33.6 },
  ],
  audience: {
    ages: [
      { label: '18-24', value: 38 },
      { label: '25-34', value: 41 },
      { label: '35-44', value: 14 },
      { label: '45+', value: 7 },
    ],
    locations: [
      { label: 'NYC', value: 22 },
      { label: 'LA', value: 14 },
      { label: 'LONDON', value: 11 },
      { label: 'BERLIN', value: 9 },
      { label: 'TOKYO', value: 8 },
    ],
    devices: [
      { label: 'MOBILE', value: 88 },
      { label: 'DESKTOP', value: 12 },
    ],
  },
  ai: [
    { id: 'a1', kind: 'TREND', title: '"resin pour" is up 214% in your niche', body: 'Post a making-of this week — engagement window closes Thursday.', accent: '#FCD34D' },
    { id: 'a2', kind: 'TIMING', title: 'Post Tue / Thu at 6:40 PM for +42% reach', body: 'Your cohort responds late-evening. Short video preferred on Thursday.', accent: '#2E5BFF' },
    { id: 'a3', kind: 'CONTENT', title: 'Your 4-minute films get 3x engagement', body: 'Consider AFTER WATER as a recurring series. 4min is the sweet spot.', accent: '#FF6BB5' },
    { id: 'a4', kind: 'COLLAB', title: 'Pair with @kore.odu for 34% audience overlap', body: 'Sound + visual overlap is strong. A split EP cover-art collab would compound.', accent: '#FF5A1F' },
  ],
};

/* -------------------------------------------------------------------------
 * MODULE 7 — JOBS / BRAND DEALS
 * ----------------------------------------------------------------------- */
export type Job = {
  id: string;
  title: string;
  brand: string;
  type: string;
  niche: string;
  budgetMin: number;
  budgetMax: number;
  deliverable: string;
  deadline: string;
  applicants: number;
  location: string;
  accent: string;
  verified: boolean;
  description: string;
};

export const jobsSeed: Job[] = [
  {
    id: 'j1',
    title: 'ACID SUMMER CAPSULE — VISUAL LEAD',
    brand: 'ODDBIRD STUDIOS',
    type: 'SPONSORED POST',
    niche: 'Visual Art',
    budgetMin: 60_000,
    budgetMax: 120_000,
    deliverable: '3 reels, 5 stills, repost rights 90d',
    deadline: '2026-05-12',
    applicants: 24,
    location: 'REMOTE · NYC PREFERRED',
    accent: '#FCD34D',
    verified: true,
    description:
      'Oddbird is launching ACID SUMMER — a limited drop of resin-dipped tees. We want three creators whose palette leans chemical and whose work feels like heatwave evenings. You decide the visual grammar; we supply the product and the money.',
  },
  {
    id: 'j2',
    title: 'NIGHT BUS — SOUND CAMPAIGN',
    brand: 'CITYLINE × RED CIRCLE',
    type: 'VIDEO INTEGRATION',
    niche: 'Music',
    budgetMin: 85_000,
    budgetMax: 180_000,
    deliverable: '1 original 60s track, 2 short vid edits',
    deadline: '2026-05-04',
    applicants: 42,
    location: 'REMOTE',
    accent: '#2E5BFF',
    verified: true,
    description:
      'CityLine is re-launching its late-night bus routes with a single premise: the city is best heard after midnight. We need a creator whose music already sounds like that. Master rights stay with you.',
  },
  {
    id: 'j3',
    title: 'AFTER RAIN — DOC SERIES PILOT',
    brand: 'SLOW PRESS',
    type: 'UGC CREATION',
    niche: 'Film',
    budgetMin: 40_000,
    budgetMax: 90_000,
    deliverable: '1 pilot (4-7 min), 3 short cuts',
    deadline: '2026-06-01',
    applicants: 11,
    location: 'MUMBAI · KYOTO · LAGOS',
    accent: '#FF6BB5',
    verified: true,
    description:
      'A quiet doc series about cities after rainfall. You pick your city. We cover gear + airfare. No voiceover template — your film is your film.',
  },
  {
    id: 'j4',
    title: 'GET VIRAL — ACID SUMMER DROP',
    brand: 'UNDERDAWG × ODDBIRD',
    type: 'GET VIRAL CAMPAIGN',
    niche: 'Multi-niche',
    budgetMin: 15_000,
    budgetMax: 30_000,
    deliverable: '1 post, coordinated launch window',
    deadline: '2026-05-18',
    applicants: 186,
    location: 'ANY',
    accent: '#FF5A1F',
    verified: true,
    description:
      'Invite-only coordinated amplification. 40 selected creators publish inside a 6-hour window. Every post is disclosed. Every post is paid. You choose how you post it — we handle everything else.',
  },
  {
    id: 'j5',
    title: 'AMBASSADOR — 6 MONTH',
    brand: 'COPPERLEAF',
    type: 'BRAND AMBASSADOR',
    niche: 'Fashion',
    budgetMin: 240_000,
    budgetMax: 480_000,
    deliverable: '2 posts/month, 1 event/quarter',
    deadline: '2026-05-30',
    applicants: 8,
    location: 'LONDON / NYC',
    accent: '#FCD34D',
    verified: true,
    description:
      'Six-month creative partnership. We want creators whose personal style is already a point of view — not a mood board. Long-form relationship, retainer structure, quarterly in-person.',
  },
  {
    id: 'j6',
    title: 'PRODUCT REVIEW — HEADPHONES',
    brand: 'LATHE AUDIO',
    type: 'PRODUCT REVIEW',
    niche: 'Music',
    budgetMin: 12_000,
    budgetMax: 22_000,
    deliverable: '1 video review (5-8min)',
    deadline: '2026-04-30',
    applicants: 58,
    location: 'REMOTE',
    accent: '#FF6BB5',
    verified: false,
    description:
      'New studio-grade over-ears. Send it, keep it, review it. Honest only — we reject sweetened pitches.',
  },
];

export type Deal = {
  id: string;
  jobId: string;
  title: string;
  brand: string;
  status: 'APPLIED' | 'SHORTLISTED' | 'NEGOTIATING' | 'CONTRACT' | 'ACTIVE' | 'IN REVIEW' | 'COMPLETED';
  progress: number;
  amount: number;
  nextAction: string;
  accent: string;
};

export const dealsSeed: Deal[] = [
  {
    id: 'd1',
    jobId: 'j2',
    title: 'NIGHT BUS — SOUND CAMPAIGN',
    brand: 'CITYLINE × RED CIRCLE',
    status: 'ACTIVE',
    progress: 0.62,
    amount: 135_000,
    nextAction: 'Submit final video edit',
    accent: '#2E5BFF',
  },
  {
    id: 'd2',
    jobId: 'j5',
    title: 'COPPERLEAF AMBASSADOR',
    brand: 'COPPERLEAF',
    status: 'NEGOTIATING',
    progress: 0.25,
    amount: 0,
    nextAction: 'Counter-offer rate card',
    accent: '#FCD34D',
  },
  {
    id: 'd3',
    jobId: 'j1',
    title: 'ACID SUMMER CAPSULE',
    brand: 'ODDBIRD STUDIOS',
    status: 'IN REVIEW',
    progress: 0.85,
    amount: 90_000,
    nextAction: 'Wait for brand approval (2d)',
    accent: '#FF5A1F',
  },
];

export const rateCardSeed = [
  { key: 'post', name: 'FEED POST', base: 28_000, desc: 'Single image/carousel. Crediting included.' },
  { key: 'reel', name: 'SHORT VIDEO', base: 45_000, desc: '15-60s vertical. Export-ready.' },
  { key: 'story', name: 'STORY / 24H', base: 8_000, desc: 'Per frame. Bundle of 3 discounted.' },
  { key: 'integ', name: 'VIDEO INTEGRATION', base: 85_000, desc: '2-4min organic brand integration.' },
  { key: 'ugc', name: 'UGC ASSET', base: 22_000, desc: 'Brand-use only. No posting on my channels.' },
  { key: 'amb', name: 'AMBASSADOR (MONTHLY)', base: 60_000, desc: 'Monthly retainer. 3mo minimum.' },
];

/* -------------------------------------------------------------------------
 * MODULE 8 — MERCH
 * ----------------------------------------------------------------------- */
export type Product = {
  id: string;
  name: string;
  type: string;
  baseCost: number;
  margin: number;
  color: string;
  bg: string;
  fg: string;
  published: boolean;
  sold: number;
};

export const productTypes = [
  { key: 't-shirt', name: 'T-SHIRT', baseCost: 480 },
  { key: 'hoodie', name: 'HOODIE', baseCost: 1_100 },
  { key: 'mug', name: 'MUG', baseCost: 240 },
  { key: 'cap', name: 'CAP', baseCost: 380 },
  { key: 'tote', name: 'TOTE BAG', baseCost: 320 },
  { key: 'poster', name: 'POSTER', baseCost: 180 },
  { key: 'sticker', name: 'STICKER PACK', baseCost: 90 },
  { key: 'phone', name: 'PHONE CASE', baseCost: 420 },
];

export const productsSeed: Product[] = [
  { id: 'p1', name: 'SALT / STUDY TEE', type: 'T-SHIRT', baseCost: 480, margin: 520, color: '#2E5BFF', bg: '#F2EFE6', fg: '#0A0A0A', published: true, sold: 182 },
  { id: 'p2', name: 'BONE PAINT HOODIE', type: 'HOODIE', baseCost: 1_100, margin: 900, color: '#FCD34D', bg: '#0A0A0A', fg: '#F2EFE6', published: true, sold: 96 },
  { id: 'p3', name: 'LAST TRAIN POSTER', type: 'POSTER', baseCost: 180, margin: 220, color: '#0A0A0A', bg: '#FCD34D', fg: '#0A0A0A', published: true, sold: 341 },
];

export const merchOrdersSeed = [
  { id: 'o1', product: 'SALT / STUDY TEE', buyer: '@keira.t', qty: 1, total: 1_000, status: 'SHIPPED', date: '3d' },
  { id: 'o2', product: 'BONE PAINT HOODIE', buyer: '@miguel.arte', qty: 1, total: 2_000, status: 'PRINTING', date: '1d' },
  { id: 'o3', product: 'LAST TRAIN POSTER', buyer: '@tori.d', qty: 2, total: 800, status: 'DELIVERED', date: '6d' },
  { id: 'o4', product: 'SALT / STUDY TEE', buyer: '@sunday_kids', qty: 1, total: 1_000, status: 'CONFIRMED', date: '6h' },
];

/* -------------------------------------------------------------------------
 * MODULE 9 — ART MARKETPLACE
 * ----------------------------------------------------------------------- */
export type Artwork = {
  id: string;
  title: string;
  kind: 'ORIGINAL' | 'LIMITED PRINT' | 'OPEN PRINT' | 'DIGITAL';
  price: number;
  year: number;
  edition?: string;
  medium: string;
  dimensions?: string;
  color: string;
  bg: string;
  fg: string;
  available: boolean;
};

export const artSeed: Artwork[] = [
  { id: 'a1', title: 'SALT / STUDY No. 04', kind: 'ORIGINAL', price: 42_000, year: 2026, medium: 'Acrylic, resin, dust on panel', dimensions: '60×48cm', color: '#2E5BFF', bg: '#F2EFE6', fg: '#0A0A0A', available: true },
  { id: 'a2', title: 'GLASS HOUSE', kind: 'LIMITED PRINT', price: 6_800, year: 2025, edition: '12 / 30', medium: 'Giclée on cotton rag', dimensions: '50×70cm', color: '#FCD34D', bg: '#0A0A0A', fg: '#F2EFE6', available: true },
  { id: 'a3', title: 'BONE PAINT', kind: 'OPEN PRINT', price: 2_400, year: 2025, medium: 'Archival pigment', dimensions: '30×40cm', color: '#FF6BB5', bg: '#0A0A0A', fg: '#F2EFE6', available: true },
  { id: 'a4', title: 'LAST TRAIN, 04:12', kind: 'DIGITAL', price: 1_200, year: 2026, medium: 'High-res PNG + TIFF bundle', color: '#0A0A0A', bg: '#FCD34D', fg: '#0A0A0A', available: true },
];

export const commissionsSeed = [
  { id: 'cm1', from: '@nyla.collect', brief: 'Portrait — resin-over-acrylic, 40cm sq.', budget: 18_000, status: 'QUOTED', accent: '#FF6BB5' },
  { id: 'cm2', from: '@deepfield.mag', brief: 'Editorial cover — summer issue.', budget: 28_000, status: 'IN PROGRESS', accent: '#FCD34D' },
  { id: 'cm3', from: '@miguel.arte', brief: 'Resin study — gift, rush timeline.', budget: 9_000, status: 'NEW', accent: '#2E5BFF' },
];

/* -------------------------------------------------------------------------
 * MODULE 10 — FINANCE
 * ----------------------------------------------------------------------- */
export type Transaction = {
  id: string;
  kind: string;
  source: string;
  amount: number;
  direction: 'IN' | 'OUT';
  date: string;
  status: 'CLEARED' | 'PENDING' | 'SCHEDULED';
};

export const transactionsSeed: Transaction[] = [
  { id: 't1', kind: 'BRAND DEAL', source: 'CITYLINE × RED CIRCLE', amount: 67_500, direction: 'IN', date: '2d', status: 'CLEARED' },
  { id: 't2', kind: 'MERCH', source: 'Salt / Study Tee × 4', amount: 4_000, direction: 'IN', date: '3d', status: 'CLEARED' },
  { id: 't3', kind: 'ART SALE', source: 'GLASS HOUSE — print', amount: 6_800, direction: 'IN', date: '4d', status: 'CLEARED' },
  { id: 't4', kind: 'PAYOUT', source: 'HDFC ****4821', amount: 60_000, direction: 'OUT', date: '1w', status: 'CLEARED' },
  { id: 't5', kind: 'TIP', source: '@keira.t', amount: 500, direction: 'IN', date: '5h', status: 'CLEARED' },
  { id: 't6', kind: 'GET VIRAL', source: 'ACID SUMMER campaign', amount: 22_000, direction: 'IN', date: '12d', status: 'PENDING' },
  { id: 't7', kind: 'COMMISSION', source: '@deepfield.mag — deposit', amount: 14_000, direction: 'IN', date: '2w', status: 'CLEARED' },
  { id: 't8', kind: 'FEE', source: 'Platform fee', amount: 1_820, direction: 'OUT', date: '1w', status: 'CLEARED' },
];

export const payoutsSeed = [
  { id: 'po1', method: 'HDFC ****4821', amount: 60_000, date: '1w', status: 'CLEARED' },
  { id: 'po2', method: 'UPI sola@hdfc', amount: 18_000, date: '3w', status: 'CLEARED' },
  { id: 'po3', method: 'HDFC ****4821', amount: 42_000, date: '5w', status: 'CLEARED' },
];

/* -------------------------------------------------------------------------
 * MODULE 11 — INBOX / MESSAGES
 * ----------------------------------------------------------------------- */
export type Thread = {
  id: string;
  kind: 'PRIMARY' | 'REQUEST' | 'COLLAB' | 'DEAL';
  handle: string;
  name: string;
  preview: string;
  unread: number;
  updatedAgo: string;
  accent: string;
  verified?: boolean;
  typing?: boolean;
  archived?: boolean;
  messages: { from: 'them' | 'me'; body: string; ts: string }[];
};

export const threadsSeed: Thread[] = [
  {
    id: 'th1',
    kind: 'DEAL',
    handle: 'cityline.team',
    name: 'CITYLINE × RED CIRCLE',
    preview: 'Reviewing your cut — expect notes Wed AM.',
    unread: 1,
    updatedAgo: '12m',
    accent: '#2E5BFF',
    verified: true,
    messages: [
      { from: 'them', body: 'Hey Sola — landed on NIGHT BUS as the campaign name.', ts: '2d' },
      { from: 'me', body: 'Love it. Sending the first cut tomorrow.', ts: '2d' },
      { from: 'them', body: 'Reviewing your cut — expect notes Wed AM.', ts: '12m' },
    ],
  },
  {
    id: 'th2',
    kind: 'COLLAB',
    handle: 'kore.odu',
    name: 'KOREDE ODUSOLA',
    preview: 'yo. split EP cover? your palette, my sound.',
    unread: 2,
    updatedAgo: '1h',
    accent: '#FCD34D',
    messages: [
      { from: 'them', body: 'yo. split EP cover? your palette, my sound.', ts: '1h' },
      { from: 'them', body: 'i have 4 tracks, you have infinite blue.', ts: '1h' },
    ],
  },
  {
    id: 'th3',
    kind: 'PRIMARY',
    handle: 'keira.t',
    name: 'KEIRA TSEKOVA',
    preview: 'still obsessed with SALT/04. ship to berlin?',
    unread: 0,
    updatedAgo: '3h',
    accent: '#FF6BB5',
    messages: [
      { from: 'them', body: 'still obsessed with SALT/04. ship to berlin?', ts: '3h' },
      { from: 'me', body: 'yes — DHL express, 4-6 days. sending invoice.', ts: '2h' },
    ],
  },
  {
    id: 'th4',
    kind: 'REQUEST',
    handle: 'luma.agency',
    name: 'LUMA AGENCY',
    preview: 'We represent a detergent brand. Hear us out.',
    unread: 1,
    updatedAgo: '1d',
    accent: '#9C988A',
    messages: [
      { from: 'them', body: 'We represent a detergent brand. Hear us out.', ts: '1d' },
    ],
  },
  {
    id: 'th5',
    kind: 'PRIMARY',
    handle: 'maya_films',
    name: 'MAYA PATEL',
    preview: 'the kyoto crew wants in on AFTER WATER.',
    unread: 0,
    updatedAgo: '2d',
    accent: '#FF5A1F',
    messages: [
      { from: 'them', body: 'the kyoto crew wants in on AFTER WATER.', ts: '2d' },
      { from: 'me', body: 'send me their reel — im in if theyre in.', ts: '2d' },
    ],
  },
];

/* -------------------------------------------------------------------------
 * MODULE 12 — REPUTATION
 * ----------------------------------------------------------------------- */
export const repBreakdown = [
  { key: 'quality', label: 'CONTENT QUALITY', weight: 20, score: 88 },
  { key: 'consistency', label: 'CONSISTENCY', weight: 15, score: 74 },
  { key: 'authenticity', label: 'AUTHENTICITY', weight: 15, score: 96 },
  { key: 'community', label: 'COMMUNITY STANDING', weight: 15, score: 82 },
  { key: 'brand', label: 'BRAND RELIABILITY', weight: 15, score: 90 },
  { key: 'growth', label: 'AUDIENCE GROWTH', weight: 10, score: 72 },
  { key: 'tenure', label: 'PLATFORM TENURE', weight: 10, score: 68 },
];

export const badgesSeed = [
  { key: 'rising', name: 'RISING STAR', earned: true, note: '12% MoM growth for 3 months' },
  { key: 'consistent', name: 'CONSISTENT', earned: true, note: 'Posted weekly for 14 weeks' },
  { key: 'engagement', name: 'ENGAGEMENT MASTER', earned: true, note: 'Top 10% engagement rate' },
  { key: 'brandfav', name: 'BRAND FAVORITE', earned: false, note: 'Need 5 deals at 4.5+ rating' },
  { key: 'community', name: 'COMMUNITY PILLAR', earned: true, note: 'Positive contributions, zero violations' },
  { key: 'earlybird', name: 'EARLY ADOPTER', earned: true, note: 'Joined in year one' },
  { key: 'challenge', name: 'CHALLENGE WINNER', earned: false, note: 'Win a platform challenge' },
  { key: 'topseller', name: 'TOP SELLER', earned: false, note: 'Top 10% merch/art sales' },
  { key: 'mentor', name: 'MENTOR', earned: false, note: 'Help 3 other creators' },
];

export const verificationSteps = [
  { key: 'email', label: 'EMAIL', done: true },
  { key: 'phone', label: 'PHONE', done: true },
  { key: 'id', label: 'GOVERNMENT ID', done: false },
  { key: 'liveness', label: 'LIVENESS CHECK', done: false },
  { key: 'review', label: 'MANUAL REVIEW', done: false },
];

/* -------------------------------------------------------------------------
 * MODULE 13 — COMMUNITY
 * ----------------------------------------------------------------------- */
export const groupsSeed = [
  { id: 'g1', name: 'BROOKLYN PAINTERS', members: 482, niche: 'Visual Art', joined: true, accent: '#2E5BFF' },
  { id: 'g2', name: 'RESIN + POUR', members: 1_284, niche: 'Technique', joined: true, accent: '#FCD34D' },
  { id: 'g3', name: 'MONSOON CLUB (DOC)', members: 96, niche: 'Film', joined: false, accent: '#FF6BB5' },
  { id: 'g4', name: 'LAGOS → BERLIN', members: 642, niche: 'Music / Diaspora', joined: false, accent: '#FF5A1F' },
  { id: 'g5', name: 'WOMEN WHO PAINT', members: 2_108, niche: 'Visual Art', joined: true, accent: '#FCD34D' },
];

export const eventsSeed = [
  { id: 'e1', title: 'OPEN STUDIO · BROOKLYN', date: 'MAY 18', host: 'UNDERDAWG NYC', rsvps: 124, accent: '#FCD34D' },
  { id: 'e2', title: 'AMA: PRICING YOUR ART', date: 'MAY 22', host: 'SOLA ROUX + KEIRA T.', rsvps: 312, accent: '#2E5BFF' },
  { id: 'e3', title: 'RESIN CLASS — LEVEL 01', date: 'JUN 02', host: 'RESIN + POUR', rsvps: 58, accent: '#FF6BB5' },
];

// Community post taxonomy per Module 13 spec (8 types).
export type CommunityPostKind =
  | 'DISCUSSION'
  | 'QUESTION'
  | 'WIN'
  | 'STRUGGLE'
  | 'TIP'
  | 'RESOURCE'
  | 'COLLAB'
  | 'FEEDBACK';

export const communityPostsSeed: Array<{
  id: string;
  from: string;
  kind: CommunityPostKind;
  body: string;
  ago: string;
  likes: number;
  comments: number;
}> = [
  { id: 'cp1', from: '@maya_films',  kind: 'WIN',        body: 'AFTER WATER just got into a festival. year-making.',                              ago: '2h',  likes: 218, comments: 34 },
  { id: 'cp2', from: '@kore.odu',    kind: 'STRUGGLE',   body: 'three versions of NIGHT BUS. none feel finished. send ears.',                    ago: '5h',  likes: 92,  comments: 41 },
  { id: 'cp3', from: '@lin.w',       kind: 'TIP',        body: 'self-publish your poems as zines. people still buy paper.',                      ago: '1d',  likes: 184, comments: 22 },
  { id: 'cp4', from: '@ari.s',       kind: 'RESOURCE',   body: 'brutalist type specimens — free bundle → inside WOMEN WHO PAINT',                ago: '1d',  likes: 312, comments: 18 },
  { id: 'cp5', from: '@deepfield',   kind: 'DISCUSSION', body: 'is selling prints "selling out"? been wrestling with this for months.',          ago: '4h',  likes: 67,  comments: 96 },
  { id: 'cp6', from: '@tori.d',      kind: 'QUESTION',   body: 'what actually moves the needle on tiktok in 2026 for visual artists? real talk.', ago: '6h',  likes: 58,  comments: 71 },
  { id: 'cp7', from: '@jules.iyoha', kind: 'COLLAB',     body: 'looking for a poet for a 3-minute vertical film. brooklyn. paid. dm.',           ago: '8h',  likes: 41,  comments: 12 },
  { id: 'cp8', from: '@nyla.collect',kind: 'FEEDBACK',   body: 'rough cut of CICLOS TRACK 02 — be brutal, please. (link in profile)',           ago: '12h', likes: 33,  comments: 28 },
];

// --- Groups, Events, Mentors, Q&A, Polls (Module 13) -----------------------

export type CommunityGroupKind = 'NICHE' | 'LOCATION' | 'INTEREST' | 'PRIVATE';
export const communityGroupsSeed: Array<{
  id: string;
  name: string;
  kind: CommunityGroupKind;
  members: number;
  blurb: string;
  accent: string;
}> = [
  { id: 'cg1', name: 'WOMEN WHO PAINT',      kind: 'NICHE',    members: 4_820, blurb: 'painters · printmakers · resin obsessives',  accent: '#FCD34D' },
  { id: 'cg2', name: 'BROOKLYN CREATORS',    kind: 'LOCATION', members: 2_140, blurb: 'studios · shows · meet-ups within the BK',     accent: '#2E5BFF' },
  { id: 'cg3', name: 'VERTICAL FILMMAKERS',  kind: 'INTEREST', members: 6_310, blurb: 'short-form film, ig + tiktok native',         accent: '#FF6BB5' },
  { id: 'cg4', name: 'THE BACK ROOM',        kind: 'PRIVATE',  members: 48,    blurb: 'invite-only — verified senior creators',      accent: '#FF5A1F' },
];

export const communityEventsSeed: Array<{
  id: string;
  title: string;
  kind: 'MEETUP' | 'WEBINAR' | 'AMA' | 'WORKSHOP';
  host: string;
  when: string;
  location: string;
  rsvps: number;
  accent: string;
}> = [
  { id: 'ev1', title: 'PORTFOLIO TEARDOWN',         kind: 'WEBINAR',  host: 'Maya Patel',       when: 'Thu · 19:00', location: 'Online',           rsvps: 412, accent: '#FCD34D' },
  { id: 'ev2', title: 'BROOKLYN OPEN STUDIOS',      kind: 'MEETUP',   host: 'BK Creators',      when: 'Sat · 14:00', location: 'Williamsburg',     rsvps: 188, accent: '#2E5BFF' },
  { id: 'ev3', title: 'PRICING AMA — RAISE YOUR RATES', kind: 'AMA',  host: 'Underdawg Legal',  when: 'Sun · 11:00', location: 'Online',           rsvps: 264, accent: '#FF6BB5' },
];

export const mentorsSeed: Array<{
  id: string;
  handle: string;
  name: string;
  expertise: string;
  rate: string;
  avail: 'OPEN' | 'WAITLIST' | 'FULL';
  rating: number;
  reviews: number;
  accent: string;
}> = [
  { id: 'm1', handle: '@maya_films',   name: 'Maya Patel',      expertise: 'PRICING · CLIENT WORK', rate: '$120 / hr', avail: 'OPEN',     rating: 4.9, reviews: 64, accent: '#FCD34D' },
  { id: 'm2', handle: '@kore.odu',     name: 'Kore Odu',        expertise: 'MUSIC PRODUCTION',      rate: '$95 / hr',  avail: 'WAITLIST', rating: 4.8, reviews: 42, accent: '#2E5BFF' },
  { id: 'm3', handle: '@lin.w',        name: 'Lin Wei',         expertise: 'WRITING · ZINES',       rate: 'FREE',      avail: 'OPEN',     rating: 5.0, reviews: 22, accent: '#FF6BB5' },
];

export const qaSeed: Array<{ id: string; from: string; question: string; answers: number; ago: string }> = [
  { id: 'qa1', from: '@nyla.collect',  question: 'how do you price a 6-piece commission for a hotel chain?',          answers: 14, ago: '3h' },
  { id: 'qa2', from: '@ari.s',         question: 'best print-on-demand for archival giclée? (US shipping)',           answers: 9,  ago: '7h' },
  { id: 'qa3', from: '@deepfield',     question: 'how do you handle a client ghosting after a deposit?',              answers: 22, ago: '1d' },
];

export const pollsSeed: Array<{
  id: string;
  from: string;
  question: string;
  options: Array<{ key: string; label: string; votes: number }>;
  totalVotes: number;
  ago: string;
}> = [
  {
    id: 'pl1',
    from: '@maya_films',
    question: 'where do you actually find paid commissions?',
    options: [
      { key: 'ig',  label: 'INSTAGRAM DMs',     votes: 124 },
      { key: 'rep', label: 'REPEAT CLIENTS',    votes: 312 },
      { key: 'ref', label: 'WORD OF MOUTH',     votes: 248 },
      { key: 'pl',  label: 'A PLATFORM (?)',    votes: 41 },
    ],
    totalVotes: 725,
    ago: '5h',
  },
];

/* -------------------------------------------------------------------------
 * MODULE 14 — LEARNING
 * ----------------------------------------------------------------------- */
export const coursesSeed = [
  {
    id: 'c1',
    title: 'PRICING YOUR ART, WITHOUT FLINCHING',
    instructor: 'Maya Patel',
    duration: '38 min',
    lessons: 6,
    category: 'MONETIZATION',
    accent: '#FCD34D',
  },
  {
    id: 'c2',
    title: 'THE ALGORITHM IS A PUZZLE (AND YOU ARE THE SHAPE)',
    instructor: 'Ari Sagawa',
    duration: '52 min',
    lessons: 8,
    category: 'GROWTH',
    accent: '#2E5BFF',
  },
  {
    id: 'c3',
    title: 'CONTRACTS FOR CREATORS — A PLAIN-LANGUAGE GUIDE',
    instructor: 'Underdawg Legal',
    duration: '1h 12m',
    lessons: 9,
    category: 'BUSINESS',
    accent: '#FF6BB5',
  },
  {
    id: 'c4',
    title: 'FILMING VERTICAL WITHOUT LOOKING LIKE A TIKTOK',
    instructor: 'Jules Iyoha',
    duration: '41 min',
    lessons: 5,
    category: 'CONTENT',
    accent: '#FF5A1F',
  },
];

export const lessonsSample = [
  { id: 'l1', title: 'YOUR RATE IS A POSITION, NOT A NUMBER', duration: '7 min' },
  { id: 'l2', title: 'THE FIVE-PART PRICE', duration: '6 min' },
  { id: 'l3', title: 'NEGOTIATION AS VOCABULARY', duration: '8 min' },
  { id: 'l4', title: 'HOW TO RAISE WITHOUT LOSING', duration: '5 min' },
  { id: 'l5', title: 'FIRST YES, THEN NUMBER', duration: '6 min' },
  { id: 'l6', title: 'THE "NO" THAT MAKES CAREERS', duration: '6 min' },
];

/* -------------------------------------------------------------------------
 * MODULE 3 — STUDIO (content types)
 * ----------------------------------------------------------------------- */
export const contentTypes = [
  { key: 'image', name: 'IMAGE', sub: 'capture or pick from gallery', accent: '#FCD34D', route: '/(modules)/camera?mode=PHOTO' },
  { key: 'video', name: 'VIDEO', sub: 'record or pick from gallery', accent: '#2E5BFF', route: '/(modules)/camera?mode=VIDEO' },
  { key: 'audio', name: 'AUDIO', sub: 'track, clip, podcast', accent: '#FF6BB5', route: '/(modules)/studio/audio-composer' },
  { key: 'text', name: 'TEXT', sub: 'essay, poem, note', accent: '#FF5A1F', route: '/(modules)/studio/text-composer' },
  { key: 'story', name: 'STORY', sub: '24h ephemeral', accent: '#FCD34D', route: '/(modules)/camera?mode=STORY' },
  { key: 'live', name: 'LIVE', sub: 'go live, in real time', accent: '#FF5A1F', route: '/(modules)/studio/live-composer' },
];

/* -------------------------------------------------------------------------
 * TRENDING / EXPLORE
 * ----------------------------------------------------------------------- */
export const trendingTags = [
  '#BONETONES', '#RESINPOUR', '#NIGHTBUS', '#MONSOONMINUTE', '#RAWSTUDIO',
  '#OPENSTUDIO', '#BLUEHOUR', '#BRUTALISTYPE', '#SIXTYSECOND',
];

export const categoriesGrid = [
  { key: 'art', label: 'VISUAL ART', accent: '#FCD34D' },
  { key: 'music', label: 'MUSIC', accent: '#2E5BFF' },
  { key: 'film', label: 'FILM', accent: '#FF6BB5' },
  { key: 'dance', label: 'DANCE', accent: '#FF5A1F' },
  { key: 'poetry', label: 'POETRY', accent: '#FCD34D' },
  { key: 'design', label: 'DESIGN', accent: '#2E5BFF' },
  { key: 'fashion', label: 'FASHION', accent: '#FF6BB5' },
  { key: 'podcast', label: 'PODCAST', accent: '#FF5A1F' },
];

/* -------------------------------------------------------------------------
 * MODULE 15 — SETTINGS DEFAULTS
 * ----------------------------------------------------------------------- */
export const defaultSettings = {
  notifications: {
    engagement: true,
    messages: true,
    deals: true,
    orders: true,
    community: false,
    platform: true,
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
  },
  privacy: {
    profilePublic: true,
    activityStatus: true,
    readReceipts: true,
    allowMessagesFrom: 'EVERYONE',
    showInSearch: true,
    hideFollowerCount: false,
  },
  security: {
    twoFactor: false,
    loginAlerts: true,
  },
  prefs: {
    language: 'EN',
    region: 'IN',
    haptics: true,
  },
};
