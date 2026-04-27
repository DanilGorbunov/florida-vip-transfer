export type Language = "en";

export interface Translations {
  nav: {
    home: string;
    services: string;
    contact: string;
    bookNow: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    fullyInsured: string;
    available247: string;
    fiveStarService: string;
    bookYourRide: string;
  };
  services: {
    title: string;
    titleHighlight: string;
    description: string;
    airport: {
      title: string;
      headline: string;
      description: string;
      features: string[];
      pricing: Array<{ route: string; price: string }>;
      cta: string;
    };
    viennaBratislava: {
      title: string;
      headline: string;
      description: string;
      features: string[];
      pricing: Array<{ route: string; price: string }>;
      cta: string;
    };
    dayTours: {
      title: string;
      headline: string;
      description: string;
      features: string[];
      pricing: Array<{ route: string; price: string }>;
      cta: string;
    };
    business: {
      title: string;
      headline: string;
      description: string;
      features: string[];
      pricing: Array<{ route: string; price: string }>;
      cta: string;
    };
    ecoLuxury: {
      title: string;
      headline: string;
      description: string;
      features: string[];
      pricing: Array<{ route: string; price: string }>;
      cta: string;
    };
  };
  contact: {
    title: string;
    titleHighlight: string;
    description: string;
    getInTouch: string;
    emailUs: string;
    email: string;
    emailDesc: string;
    serviceArea: string;
    serviceAreaDetails: string;
    serviceAreaDesc: string;
    operatingHours: string;
    hours: string;
    hoursDesc: string;
    response15min: string;
    responseDesc: string;
    available247: string;
    insured: string;
    rating: string;
  };
  faq: {
    title: string;
    titleHighlight: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  booking: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    selectService: string;
    selectOption: string;
    tripDetails: string;
    yourInformation: string;
    reviewConfirm: string;
    back: string;
    continue: string;
    confirm: string;
    selected: string;
    services: {
      airport: {
        name: string;
        description: string;
        options: Array<{ label: string; price: string }>;
      };
      viennaBratislava: {
        name: string;
        description: string;
        options: Array<{ label: string; price: string }>;
      };
      dayTours: {
        name: string;
        description: string;
        options: Array<{ label: string; price: string }>;
      };
      business: {
        name: string;
        description: string;
        options: Array<{ label: string; price: string }>;
      };
      ecoLuxury: {
        name: string;
        description: string;
        options: Array<{ label: string; price: string }>;
      };
    };
    fields: {
      pickupLocation: string;
      destination: string;
      date: string;
      time: string;
      passengers: string;
      name: string;
      email: string;
      phone: string;
      message: string;
      required: string;
      optional: string;
    };
    placeholders: {
      pickupLocation: string;
      destination: string;
      selectDate: string;
      selectTime: string;
      selectPassengers: string;
      enterName: string;
      enterEmail: string;
      enterPhone: string;
      additionalNotes: string;
    };
    review: {
      service: string;
      option: string;
      tripDetails: string;
      contactInfo: string;
      additionalNotes: string;
    };
    messages: {
      success: string;
      successDesc: string;
      error: string;
      errorDesc: string;
    };
    email: {
      subject: string;
      greeting: string;
      bookingDetails: string;
      service: string;
      option: string;
      pickup: string;
      destination: string;
      date: string;
      time: string;
      passengers: string;
      contact: string;
      name: string;
      email: string;
      phone: string;
      message: string;
      footer: string;
    };
    confirmation: {
      subject: string;
      greeting: string;
      thankYou: string;
      message: string;
      nextSteps: string;
      footer: string;
    };
  };
  cookie: {
    title: string;
    description: string;
    privacyLink: string;
    necessary: string;
    acceptAll: string;
  };
  privacy: {
    title: string;
    lastUpdated: string;
    back: string;
    sections: {
      introduction: { title: string; content: string };
      information: { title: string; intro: string; items: string[] };
      usage: { title: string; intro: string; items: string[] };
      security: { title: string; content: string };
      cookies: { title: string; content: string };
      rights: { title: string; intro: string; items: string[] };
      contact: { title: string; content: string; email: string };
    };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      contact: "Contact",
      bookNow: "Book Now",
    },
    hero: {
      badge: "Premium Transportation Service — Florida",
      title: "Florida VIP",
      titleHighlight: "Transfer",
      subtitle: "Professional transportation across the Sarasota area, Tampa, Naples, Orlando & Miami. Comfortable, reliable, and always on time.",
      fullyInsured: "Fully Insured",
      available247: "24/7 Available",
      fiveStarService: "5-Star Service",
      bookYourRide: "Book Your Ride",
    },
    services: {
      title: "Our",
      titleHighlight: "Services",
      description: "Reliable transfers across Florida — from Parrish and Sarasota to airports and major destinations",
      airport: {
        title: "Departures from Parrish",
        headline: "YOUR LOCAL TRANSFER SPECIALIST",
        description: "Door-to-door service from Parrish to Sarasota-Bradenton Airport and Tampa International. Professional drivers, on-time guarantee.",
        features: [
          "Door-to-door pickup",
          "On-time guarantee",
          "Luggage assistance",
          "Professional licensed drivers",
        ],
        pricing: [
          { route: "Parrish → Sarasota Airport (SRQ)", price: "$60" },
          { route: "Parrish → Tampa Airport (TPA)", price: "$120" },
        ],
        cta: "Book Parrish Transfer",
      },
      viennaBratislava: {
        title: "Departures from Sarasota",
        headline: "SARASOTA TO YOUR DESTINATION",
        description: "From Sarasota to Tampa Airport, Naples, Orlando, and Miami. Comfortable long-distance transfers with professional drivers.",
        features: [
          "Comfortable spacious vehicles",
          "Direct routes, no stops",
          "Flight tracking for airport trips",
          "Door-to-door service",
        ],
        pricing: [
          { route: "Sarasota → Tampa Airport (TPA)", price: "$160" },
          { route: "Sarasota → Naples", price: "$250" },
          { route: "Sarasota → Orlando", price: "$300" },
          { route: "Sarasota → Miami", price: "$700" },
        ],
        cta: "Book Sarasota Transfer",
      },
      dayTours: {
        title: "Sarasota Airport Pickup",
        headline: "ARRIVE & GO IN COMFORT",
        description: "Arriving at Sarasota-Bradenton Airport (SRQ)? We'll meet you at arrivals and take you to Siesta Key, Anna Maria Island, or anywhere in the area.",
        features: [
          "Real-time flight tracking",
          "Meet & greet at arrivals",
          "Luggage assistance",
          "No waiting in taxi lines",
        ],
        pricing: [
          { route: "SRQ → Siesta Key", price: "$110" },
          { route: "SRQ → Anna Maria Island", price: "$110" },
        ],
        cta: "Book Airport Pickup",
      },
      business: {
        title: "Tampa Airport Pickup",
        headline: "FROM TPA TO YOUR DESTINATION",
        description: "Flying into Tampa International Airport (TPA)? We'll pick you up and take you to Sarasota, Naples, and the surrounding area in comfort.",
        features: [
          "Real-time flight tracking",
          "Meet & greet with name sign",
          "Luggage assistance",
          "Comfortable modern vehicles",
        ],
        pricing: [
          { route: "Tampa Airport (TPA) → Sarasota", price: "$250" },
          { route: "Tampa Airport (TPA) → Naples", price: "$450" },
        ],
        cta: "Book Tampa Pickup",
      },
      ecoLuxury: {
        title: "Orlando Airport & Hourly",
        headline: "MCO PICKUPS & FLEXIBLE HOURLY RATES",
        description: "Arriving at Orlando International (MCO)? We cover the full route to Sarasota and Naples. Also available for hourly bookings for errands, events, or local travel.",
        features: [
          "Orlando Airport (MCO) pickups",
          "Full Florida coverage",
          "Flexible hourly service",
          "Corporate & event bookings",
        ],
        pricing: [
          { route: "Orlando (MCO) → Sarasota", price: "$400" },
          { route: "Orlando (MCO) → Naples", price: "$600" },
          { route: "Hourly Rate", price: "$80/hour" },
        ],
        cta: "Book Orlando / Hourly",
      },
    },
    contact: {
      title: "Book Your",
      titleHighlight: "Transfer",
      description: "Ready to travel? Contact us now and we'll arrange your transfer across Florida.",
      getInTouch: "Get in Touch",
      emailUs: "Email Us",
      email: "info@floridaviptransfer.com",
      emailDesc: "Quick response guaranteed",
      serviceArea: "Service Area",
      serviceAreaDetails: "Parrish · Sarasota · Tampa · Naples · Orlando · Miami",
      serviceAreaDesc: "Serving all of Southwest & Central Florida",
      operatingHours: "Operating Hours",
      hours: "24/7 Available",
      hoursDesc: "Round-the-clock service",
      response15min: "Fast Response",
      responseDesc: "We'll confirm your booking quickly.",
      available247: "Available",
      insured: "Insured",
      rating: "Rating",
    },
    faq: {
      title: "Frequently Asked",
      titleHighlight: "Questions",
      description: "Find answers to common questions about our Florida transfer service",
      items: [
        {
          question: "What areas do you serve?",
          answer: "We serve the greater Sarasota and Parrish area, with transfers to and from Tampa Airport, Sarasota Airport, Orlando Airport, Naples, Miami, Siesta Key, Anna Maria Island, and more. Contact us if you don't see your destination listed."
        },
        {
          question: "How far in advance should I book?",
          answer: "We recommend booking at least 24 hours in advance to guarantee availability. However, we do our best to accommodate same-day requests depending on driver availability. For airport pickups, please book ahead so we can track your flight."
        },
        {
          question: "Do you track flights for airport pickups?",
          answer: "Yes — for all airport pickups we monitor your flight in real time. If your flight is delayed or arrives early, we adjust accordingly so there's no extra wait time for you."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit and debit cards, Zelle, Venmo, and cash. Payment details will be confirmed when you book."
        },
        {
          question: "Can I cancel or modify my booking?",
          answer: "Yes, cancellations or changes made at least 24 hours before your pickup are free of charge. Late cancellations may incur a fee. Please contact us as soon as possible if your plans change."
        }
      ]
    },
    booking: {
      step1: "Select Service",
      step2: "Select Route",
      step3: "Trip Details",
      step4: "Your Information",
      step5: "Review & Confirm",
      selectService: "Select Service",
      selectOption: "Select Route",
      tripDetails: "Trip Details",
      yourInformation: "Your Information",
      reviewConfirm: "Review & Confirm",
      back: "Back",
      continue: "Continue",
      confirm: "Confirm Booking",
      selected: "Selected",
      services: {
        airport: {
          name: "Departures from Parrish",
          description: "Parrish to airports",
          options: [
            { label: "Parrish → Sarasota Airport (SRQ)", price: "$60" },
            { label: "Parrish → Tampa Airport (TPA)", price: "$120" },
          ],
        },
        viennaBratislava: {
          name: "Departures from Sarasota",
          description: "Sarasota to airports & cities",
          options: [
            { label: "Sarasota → Tampa Airport (TPA)", price: "$160" },
            { label: "Sarasota → Naples", price: "$250" },
            { label: "Sarasota → Orlando", price: "$300" },
            { label: "Sarasota → Miami", price: "$700" },
          ],
        },
        dayTours: {
          name: "Sarasota Airport Pickup",
          description: "SRQ arrivals to your destination",
          options: [
            { label: "SRQ → Siesta Key", price: "$110" },
            { label: "SRQ → Anna Maria Island", price: "$110" },
          ],
        },
        business: {
          name: "Tampa Airport Pickup",
          description: "TPA arrivals to your destination",
          options: [
            { label: "Tampa Airport (TPA) → Sarasota", price: "$250" },
            { label: "Tampa Airport (TPA) → Naples", price: "$450" },
          ],
        },
        ecoLuxury: {
          name: "Orlando Airport & Hourly",
          description: "MCO pickups & hourly service",
          options: [
            { label: "Orlando (MCO) → Sarasota", price: "$400" },
            { label: "Orlando (MCO) → Naples", price: "$600" },
            { label: "Hourly Rate", price: "$80/hour" },
          ],
        },
      },
      fields: {
        pickupLocation: "Pickup Location",
        destination: "Destination",
        date: "Date",
        time: "Time",
        passengers: "Passengers",
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        message: "Additional Notes",
        required: "*",
        optional: "(Optional)",
      },
      placeholders: {
        pickupLocation: "Address, airport, or landmark",
        destination: "Destination address or landmark",
        selectDate: "Pick a date",
        selectTime: "Select time",
        selectPassengers: "Select passengers",
        enterName: "Enter your name",
        enterEmail: "your@email.com",
        enterPhone: "(941) 000-0000",
        additionalNotes: "Flight number, luggage details, special requests...",
      },
      review: {
        service: "Service",
        option: "Route",
        tripDetails: "Trip Details",
        contactInfo: "Contact Information",
        additionalNotes: "Additional Notes",
      },
      messages: {
        success: "Booking Request Sent!",
        successDesc: "We'll contact you shortly to confirm your transfer.",
        error: "Error",
        errorDesc: "Please fill in all required fields.",
      },
      email: {
        subject: "New Booking Request — Florida VIP Transfer",
        greeting: "New booking request received:",
        bookingDetails: "Booking Details:",
        service: "Service",
        option: "Route",
        pickup: "Pickup Location",
        destination: "Destination",
        date: "Date",
        time: "Time",
        passengers: "Passengers",
        contact: "Contact Information",
        name: "Name",
        email: "Email",
        phone: "Phone",
        message: "Additional Notes",
        footer: "Please contact the customer to confirm the booking.",
      },
      confirmation: {
        subject: "Your booking request has been received",
        greeting: "Dear",
        thankYou: "Thank you for choosing Florida VIP Transfer!",
        message: "Your booking request has been successfully received. We will contact you shortly to confirm the details of your transfer.",
        nextSteps: "What happens next?",
        footer: "We look forward to providing you with a smooth and comfortable ride. If you have any questions, feel free to contact us.",
      },
    },
    cookie: {
      title: "Cookie Policy",
      description: "We use cookies to enhance your experience. By clicking \"Accept All Cookies\" or selecting \"Necessary Cookies\", you agree to our",
      privacyLink: "privacy policy",
      necessary: "Necessary Cookies",
      acceptAll: "Accept All Cookies",
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last updated: April 2026",
      back: "Back to Home",
      sections: {
        introduction: {
          title: "Introduction",
          content: "Florida VIP Transfer (\"we\", \"our\", or \"us\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our transportation service.",
        },
        information: {
          title: "Information We Collect",
          intro: "We collect information that you provide directly to us, including:",
          items: [
            "Personal information such as name, email address, and phone number",
            "Booking information including pickup location, destination, date, and time",
            "Payment information processed securely",
            "Communication preferences and feedback",
          ],
        },
        usage: {
          title: "How We Use Your Information",
          intro: "We use the information we collect to:",
          items: [
            "Process and manage your bookings",
            "Communicate with you about your reservations",
            "Provide customer support and respond to inquiries",
            "Improve our services and user experience",
            "Send promotional materials (with your consent)",
            "Comply with legal obligations",
          ],
        },
        security: {
          title: "Data Security",
          content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        },
        cookies: {
          title: "Cookies",
          content: "We use necessary cookies to ensure the website functions properly. You can choose to accept all cookies or only necessary cookies through our cookie consent banner.",
        },
        rights: {
          title: "Your Rights",
          intro: "You have the right to:",
          items: [
            "Access your personal information",
            "Request correction of inaccurate data",
            "Request deletion of your data",
            "Object to processing of your data",
            "Withdraw consent at any time",
          ],
        },
        contact: {
          title: "Contact Us",
          content: "If you have questions about this Privacy Policy, please contact us at",
          email: "info@floridaviptransfer.com",
        },
      },
    },
  },
};
