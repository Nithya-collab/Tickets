export interface MenuLink {
  label: string;
  href: string;
}

export interface MenuGroup {
  title: string;
  links: MenuLink[];
}
const menuData: MenuGroup[] = [
    {
      title: "Events",
      links: [
        { label: "Music Concerts - Live", href: "/music-concerts/live" },
        { label: "Music Concerts - Recorded", href: "/music-concerts/recorded" },
        { label: "Standup Comedy Shows - Live", href: "/standup-comedy-shows/live" },
        { label: "Standup Comedy Shows - Recorded", href: "/standup-comedy-shows/recorded" },
        { label: "Happenings - Live", href: "/happenings/live" },
        { label: "Happenings - Recorded", href: "/happenings/recorded" },
        { label: "Birthday Celebrations - Live", href: "/birthday-celebrations/live" },
        { label: "Birthday Celebrations - Recorded", href: "/birthday-celebrations/recorded" },
        { label: "Marriage Occasions - Live", href: "/marriage-occasions/live" },
        { label: "Marriage Occasions - Recorded", href: "/marriage-occasions/recorded" },
        { label: "Betrothal Occasions - Live", href: "/betrothal-occasions/live" },
        { label: "Film Audio Launch & Pooja Events - Live", href: "/film-audio-launch-pooja-events/live" },
      { label: "Film Audio Launch & Pooja Events - Recorded", href: "/film-audio-launch-pooja-events/recorded" },
      { label: "Dance Studio Performances - Live", href: "/dance-studio-performances/live" },
      { label: "Dance Studio Performances - Recorded", href: "/dance-studio-performances/recorded" },
      { label: "Workshops & Masterclass - Live", href: "/workshops-masterclass/live" },
      { label: "Workshops & Masterclass - Recorded", href: "/workshops-masterclass/recorded" },
      { label: "Enterprise Collaborations - Live", href: "/enterprise-collaborations/live" },
      { label: "Enterprise Collaborations - Recorded", href: "/enterprise-collaborations/recorded" },
      { label: "Webinars - Live", href: "/webinars/live" },
      { label: "Webinars - Recorded", href: "/webinars/recorded" },
      { label: "Live Stalls", href: "/live-stalls" },
      { label: "Startup/Product Launch Events - Live", href: "/startup-product-launch-events/live" },
      { label: "Startup/Product Launch Events - Recorded", href: "/startup-product-launch-events/recorded" },
      { label: "Investment Events - Live", href: "/investment-events/live" },
      { label: "Investment Events - Recorded", href: "/investment-events/recorded" },
      { label: "Talks by CxO’s", href: "/talks-by-cxos" },
      { label: "Conferences", href: "/conferences" },
      { label: "Talk Shows - Live", href: "/talk-shows/live" },
      { label: "Talk Shows - Recorded", href: "/talk-shows/recorded" },
      { label: "Political Campaigns - Live", href: "/political-campaigns/live" },
      { label: "Political Campaigns - Recorded", href: "/political-campaigns/recorded" },
      { label: "Sports - Live", href: "/sports/live" },
      { label: "Sports - Recorded", href: "/sports/recorded" },
      { label: "Spirituality Discourses", href: "/spirituality-discourses" },
    ],
  },
  {
    title: "Popular",
    links: [
      { label: "New Arrivals", href: "/popular/new-arrivals" },
      { label: "Recently Watched", href: "/popular/recently-watched" },
      { label: "Recommended", href: "/popular/recommended" },
    ],
  },
  {
    title: "Artists",
    links: [
      { label: "Social Media Influencers (MVP)", href: "/artists/social-media-influencers" },
      { label: "Business Excellences", href: "/artists/business-excellences" },
      { label: "Sports Icon", href: "/artists/sports-icon" },
      { label: "Actors and Actresses", href: "/artists/actors-actresses" },
      { label: "Politicians", href: "/artists/politicians" },
      { label: "Independent Artists", href: "/artists/independent-artists" },
      { label: "Upcoming Artists", href: "/artists/upcoming-artists" },
      { label: "Top Artist Concerts - Popular", href: "/top-artist-concerts/popular" },
      { label: "Top Artist Concerts - New Arrivals", href: "/top-artist-concerts/new-arrivals" },
      { label: "Top Artist Concerts - Recently Watched", href: "/top-artist-concerts/recently-watched" },
      { label: "Top Artist Concerts - Recommended", href: "/top-artist-concerts/recommended" },
    ],
  },
  {
    title: "Articles",
    links: [
      { label: "Blog Page", href: "/articles/blog" },
      { label: "Features", href: "/articles/features" },
      { label: "Premiere", href: "/articles/premiere" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default menuData;