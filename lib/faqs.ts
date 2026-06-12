export interface Faq {
  q: string;
  a: string;
}

export interface FaqCategory {
  title: string;
  items: Faq[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: "Buy gold and order online",
    items: [
      { q: "How do I buy gold from Prime Gold?", a: "Browse the store, add the bars or coins you want to your cart, and check out. We confirm the order and arrange storage or delivery." },
      { q: "What payment methods do you accept?", a: "We accept bank transfer and major cards. Larger orders are usually settled by transfer." },
      { q: "Is the price fixed when I order?", a: "Gold prices move all day. The price you see is locked at checkout for that order." },
      { q: "Do your products come certified?", a: "Yes. Every bar and coin is certified, and bars are serial numbered and sealed with an assay card." },
      { q: "Can I buy gold as a gift?", a: "Yes. Coins make a simple gift, and we can deliver with the certificate included." },
      { q: "Is there a minimum order?", a: "You can start from a single one-gram bar. There is no large minimum to begin." },
      { q: "How is my order delivered?", a: "Orders ship fully insured with tracking, or you can collect from our Dubai office." },
      { q: "Can I store the gold with you instead of taking delivery?", a: "Yes. We offer insured storage, so you can own metal without keeping it at home." },
      { q: "Do you deliver to Lebanon?", a: "Yes. We arrange insured delivery to Lebanon alongside the UAE." },
      { q: "How do I know the gold is genuine?", a: "Each item is certified at the refinery, serial numbered, and sealed. The assay card confirms its weight and purity." },
    ],
  },
  {
    title: "Sell your gold",
    items: [
      { q: "Can I sell my gold back to Prime Gold?", a: "Yes. We buy back gold we have sold at fair market value." },
      { q: "How is the buyback price set?", a: "It tracks the live spot price for your metal and weight on the day you sell." },
      { q: "What do I need to sell?", a: "The item in its original sealed packaging with its certificate makes the process fastest." },
      { q: "How quickly do I get paid?", a: "Once we verify the item, we arrange payment promptly by bank transfer." },
    ],
  },
  {
    title: "Privacy",
    items: [
      { q: "What personal data do you collect?", a: "Only what we need to process your order and meet legal requirements, such as your name, contact details, and payment information." },
      { q: "Do you share my data?", a: "We do not sell your data. We share it only with the partners needed to fulfil your order, such as payment and delivery providers." },
      { q: "How is my data protected?", a: "We use industry-standard security and limit access to staff who need it." },
      { q: "Can I ask you to delete my data?", a: "Yes. Contact us and we will handle your request within the limits of the law." },
      { q: "Do you use cookies?", a: "We use essential cookies to run the site and basic analytics to improve it." },
    ],
  },
  {
    title: "Other questions",
    items: [
      { q: "Where are you based?", a: "Our office is in Al Ras, Dubai, and we serve clients across the UAE and Lebanon." },
      { q: "Are your prices in AED?", a: "Yes, all prices are shown in UAE dirhams." },
      { q: "What is the difference between bars and coins?", a: "Bars sit closest to the metal value. Coins carry a mint guarantee and resell easily. Both are certified." },
      { q: "What is LBMA approval?", a: "It means a refiner meets the London Bullion Market Association standards, so its bars are accepted worldwide." },
      { q: "Do you charge VAT on gold?", a: "Investment-grade gold is generally treated favourably for tax in the UAE. We confirm any applicable charges at checkout." },
      { q: "How do I contact support?", a: "Call +961 70 882 983, email info@primegoldshop.com, or use the contact form." },
    ],
  },
];
