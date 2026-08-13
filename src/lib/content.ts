export const site = {
  name: "FitnessClub",
  tagline: "Train Better. Live Stronger.",
  office: "Unit 4, Riverside Works, Station Road",
  handle: "@fitnessclub",
  emails: [
    { label: "Membership", address: "hello@fitnessclub.com" },
    { label: "Coaching", address: "coaching@fitnessclub.com" },
    { label: "Corporate", address: "teams@fitnessclub.com" },
  ],
};

export const nav = [
  { label: "Home", href: "#top" },
  { label: "Membership", href: "#perks" },
  { label: "Classes", href: "#classes" },
  { label: "Coaching", href: "#training" },
  { label: "Visit", href: "#contact" },
];

export const hero = {
  eyebrow: "Now open in 12 neighbourhoods",
  title: ["Strength Starts", "The Day You Show Up"],
  lede: "Serious equipment, coaches who learn your name, and a floor that never feels crowded — whatever hour you train.",
  primary: { label: "Book a free week", href: "#contact" },
  secondary: { label: "Find your club", href: "#clubs" },
  quote: {
    body: "I'd quit three gyms before this one. The difference is somebody noticed when I stopped coming, and asked why.",
    author: "Rehan A., member since 2023",
  },
  members: "4,200 members train with us each week",
  avatars: ["/media/avatar-1.jpg", "/media/avatar-2.jpg", "/media/avatar-3.jpg"],
};

export const stats = [
  { value: "94%", label: "Of new members hit their first strength milestone inside 90 days." },
  { value: "18", label: "Hours a day, every day. Doors open 5 AM, last rep at 11 PM." },
  { value: "200+", label: "Classes a month across strength, conditioning, yoga and recovery." },
];

export const perks = {
  eyebrow: "One price. No joining fee. No lock-in.",
  title: "Full Access to Every Club From ₹1,499 a Month",
  cta: { label: "Compare memberships", href: "#contact" },
  items: [
    {
      title: "12 Clubs, One Keycard",
      body: "Your card opens every door in the network. No branch tiers, no peak-hour surcharge, no separate membership for the studio floor.",
      image: "/media/perk-clubs.jpg",
      tone: "plain",
    },
    {
      title: "Coaches Certified in Strength & Rehab",
      body: "Every coach on our floor holds both qualifications. That is why people who arrive with a bad back leave still training rather than being told to rest it.",
      image: "/media/perk-trainers.jpg",
      tone: "lime",
    },
    {
      title: "25+ Class Formats Included",
      body: "Classes are not an upsell. Book any format, any club, up to seven days ahead — and cancel free up to two hours before it starts.",
      image: "/media/perk-classes.jpg",
      tone: "plain",
    },
    {
      title: "Pause Any Month, Cancel Any Time",
      body: "Travelling, injured, or just having a bad month? Freeze the membership from the app. No phone call, no retention script, no fee.",
      image: "/media/perk-flexible.jpg",
      tone: "accent",
    },
  ],
} as const;

export const clubs = {
  eyebrow: "12 clubs, one keycard",
  title: "Train Anywhere. Nothing Extra to Pay.",
  lede: "Every membership opens every door. Lift near the office on a weekday, swim near home on a Sunday — same card, same price.",
  cta: { label: "See all clubs", href: "#contact" },
  items: [
    { name: "The Iron Yard", area: "Riverside", image: "/media/club-1.jpg" },
    { name: "Old Mill Strength", area: "Northgate", image: "/media/club-2.jpg" },
    { name: "Platform 9", area: "Station Road", image: "/media/club-3.jpg" },
    { name: "Harbour Point", area: "Dockside", image: "/media/club-4.jpg" },
    { name: "Green Park Studio", area: "Green Park", image: "/media/club-5.jpg" },
    { name: "The Engine Room", area: "Millfield", image: "/media/club-6.jpg" },
  ],
};

export const training = {
  eyebrow: "Coaching that adapts to you",
  title: "One-to-One Coaching From ₹899 a Session",
  lede: "Every coach here holds a strength qualification and a rehab one. That combination is rare, and it is why people who arrive with a bad shoulder leave still training.",
  cta: { label: "Meet the coaches", href: "#contact" },
  images: ["/media/training-1.jpg", "/media/training-2.jpg"],
  points: [
    { title: "First session is a screen", body: "We test how you move before we load anything. No guessing." },
    { title: "Return from injury", body: "Programmes built with physios, not around them." },
    { title: "Get properly strong", body: "Progressive overload, tracked week to week, explained as we go." },
    { title: "Body composition", body: "Training and food habits that survive a busy month." },
  ],
};

export const pilates = {
  eyebrow: "New this season",
  title: "Reformer Pilates — Small Groups, From ₹1,199 a Session",
  lede: "Six reformers, one coach, no queue. The class most likely to fix the aches you have stopped mentioning.",
  cta: { label: "Reserve a reformer", href: "#contact" },
  images: ["/media/pilates-1.jpg", "/media/pilates-2.jpg"],
  points: [
    "Capped at six people, so you get corrected",
    "Builds control through the hips and mid-back",
    "Low impact — trains well alongside heavy lifting",
  ],
};

export const classes = {
  eyebrow: "Included with every membership",
  title: "25+ Class Formats, Booked From Your Phone",
  lede: "Timetables run early, late and all weekend. Book up to seven days ahead, cancel free up to two hours before, and never pay extra.",
  cta: { label: "View the timetable", href: "#contact" },
  items: [
    { name: "Slow Flow Yoga", tag: "Mind & Body", level: "Easy", length: "60 min", image: "/media/class-1.jpg" },
    { name: "Metcon 45", tag: "Conditioning", level: "Hard", length: "45 min", image: "/media/class-2.jpg" },
    { name: "Kettlebell Club", tag: "Strength", level: "Medium", length: "45 min", image: "/media/class-3.jpg" },
    { name: "Rhythm Cardio", tag: "Dance", level: "Medium", length: "50 min", image: "/media/class-4.jpg" },
    { name: "Barbell Basics", tag: "Strength", level: "Medium", length: "60 min", image: "/media/class-5.jpg" },
    { name: "Deep Stretch", tag: "Recovery", level: "Easy", length: "40 min", image: "/media/class-6.jpg" },
  ],
};

export const stories = {
  eyebrow: "Members, in their own words",
  title: "The Part Nobody Photographs",
  lede: "Not the before-and-after. The Tuesday in February when it was raining and they came anyway. Here is what that actually looked like.",
  items: [
    {
      headline: "I stopped negotiating with myself.",
      body: "Booking the class the night before removed the argument. By the time I woke up the decision was already made.",
      image: "/media/story-1.jpg",
    },
    {
      headline: "The shoulder finally settled.",
      body: "Two years of avoiding overhead work. My coach screened it, gave me eight weeks of boring homework, and now I press pain-free.",
      image: "/media/story-2.jpg",
    },
    {
      headline: "I train on work trips now.",
      body: "Twelve clubs on one card meant no excuse when I moved offices. I just walked into a different branch and carried on.",
      image: "/media/story-3.jpg",
    },
    {
      headline: "Deadlift went 40 kg to 100 kg.",
      body: "Barbell Basics taught me the setup properly. Eighteen months later I am lifting more than I weigh and nothing hurts.",
      image: "/media/story-4.jpg",
    },
    {
      headline: "Turns out I like the recovery class most.",
      body: "I joined to lose weight and stayed for Deep Stretch on Sunday evenings. It is the only hour all week my phone stays in the locker.",
      image: "/media/story-5.jpg",
    },
  ],
};

export const blog = {
  eyebrow: "The FitnessClub journal",
  title: "Straight Answers, No Supplements to Sell",
  lede: "Written by the coaches on our floor. If a question comes up three times in a week, it ends up here.",
  cta: { label: "Read the journal", href: "#contact" },
  posts: [
    {
      category: "Training",
      date: "Jul 28, 2026",
      title: "The 10-Minute Warm-Up That Prevents Most Gym Injuries",
      excerpt: "Three movements, in order, before you touch a barbell.",
      image: "/media/post-1.jpg",
    },
    {
      category: "Nutrition",
      date: "Jul 14, 2026",
      title: "How Much Water You Actually Need on Training Days",
      excerpt: "The real number is lower than the internet claims — and easier to hit.",
      image: "/media/post-2.jpg",
    },
    {
      category: "Training",
      date: "Jun 30, 2026",
      title: "Progressive Overload, Explained Without the Jargon",
      excerpt: "Why adding 2.5 kg beats changing your whole programme.",
      image: "/media/post-3.jpg",
    },
    {
      category: "Habits",
      date: "Jun 16, 2026",
      title: "Training With Someone Beats Training Alone",
      excerpt: "Attendance data from our own floor, and what it says about accountability.",
      image: "/media/post-4.jpg",
    },
    {
      category: "Habits",
      date: "Jun 2, 2026",
      title: "Set Goals You Will Still Care About in Month Three",
      excerpt: "Skip the new year target. Pick something you can measure weekly.",
      image: "/media/post-5.jpg",
    },
    {
      category: "Member Stories",
      date: "May 19, 2026",
      title: "From Two Sessions a Month to Four a Week",
      excerpt: "What changed was the commute, not the motivation.",
      image: "/media/post-6.jpg",
    },
  ],
};

export const closing = {
  title: "Your First Week Is On Us",
  lede: "Full access to every club, every class, and one coaching session — no card, no contract, no sales call.",
  cta: { label: "Claim your free week", href: "mailto:hello@fitnessclub.com" },
  image: "/media/cta.jpg",
};

export const footer = {
  gallery: ["/media/gallery-1.jpg", "/media/gallery-2.jpg", "/media/gallery-3.jpg"],
  // Every entry points at a section that exists on the page. Anything without a
  // destination — the legal pages, careers, the social accounts — is left out
  // rather than parked on "#": a footer full of links that go nowhere costs
  // more trust than the missing rows do.
  columns: [
    {
      title: "Classes",
      links: [
        { label: "Slow Flow Yoga", href: "#classes" },
        { label: "Metcon 45", href: "#classes" },
        { label: "Kettlebell Club", href: "#classes" },
        { label: "Rhythm Cardio", href: "#classes" },
        { label: "Deep Stretch", href: "#classes" },
        { label: "Reformer Pilates", href: "#pilates" },
      ],
    },
    {
      title: "Club",
      links: [
        { label: "Memberships", href: "#perks" },
        { label: "Find a Club", href: "#clubs" },
        { label: "Personal Coaching", href: "#training" },
        { label: "Free Week", href: "#contact" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Journal", href: "#journal" },
        { label: "Member Stories", href: "#stories" },
      ],
    },
  ],
};
