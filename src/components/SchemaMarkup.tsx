import { useEffect } from "react";

export function LocalBusinessSchema() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "@id": "https://balancedmedicalspa.com/#organization",
      name: "Balanced Wellness Medical Spa",
      description: "Premier luxury medical spa offering Botox, Dermal Fillers, RF Microneedling, CO2 Laser Resurfacing, Medical Weight Loss, and more in Kingsport & Jonesborough, TN. Board-certified providers delivering natural-looking results.",
      url: "https://balancedmedicalspa.com",
      telephone: "+1-423-646-2169",
      image: "https://balancedmedicalspa.com/images/logo.jpeg",
      logo: "https://balancedmedicalspa.com/images/logo.jpeg",
      priceRange: "$$",
      currenciesAccepted: "USD",
      paymentAccepted: "Cash, Credit Card, Debit Card",
      medicalSpecialty: [
        "Botox",
        "Dermal Fillers",
        "RF Microneedling",
        "CO2 Laser Resurfacing",
        "Medical Weight Loss",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "17:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/balancedwellnessmedspa",
        "https://www.instagram.com/balancedwellnessmedspa",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "200",
      },
      areaServed: [
        { "@type": "City", name: "Kingsport" },
        { "@type": "City", name: "Jonesborough" },
        { "@type": "City", name: "Johnson City" },
        { "@type": "City", name: "Bristol" },
        { "@type": "State", name: "Tennessee" },
      ],
      founder: {
        "@type": "Person",
        name: "Kelli Griffey",
        jobTitle: "Founder & CEO",
      },
      department: [
        {
          "@type": "MedicalBusiness",
          name: "Balanced Wellness Medical Spa - Jonesborough",
          telephone: "+1-423-646-2169",
          address: {
            "@type": "PostalAddress",
            streetAddress: "120 Cherokee St",
            addressLocality: "Jonesborough",
            addressRegion: "TN",
            postalCode: "37659",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 36.2948,
            longitude: -82.4732,
          },
          hasMap: "https://maps.google.com/?q=120+Cherokee+St,+Jonesborough,+TN+37659",
          availableService: [
            "Botox", "Dermal Fillers", "CO2 Laser Resurfacing", "RF Microneedling",
            "IV Therapy", "Medical Weight Loss", "Skin Rejuvenation", "Hormone Optimization",
          ].map((svc) => ({
            "@type": "MedicalProcedure",
            name: svc,
            procedureType: "Noninvasive",
          })),
        },
        {
          "@type": "MedicalBusiness",
          name: "Balanced Wellness Medical Spa - Kingsport",
          telephone: "+1-423-765-1393",
          address: {
            "@type": "PostalAddress",
            streetAddress: "1309 S John B Dennis Hwy, Ste 104",
            addressLocality: "Kingsport",
            addressRegion: "TN",
            postalCode: "37660",
            addressCountry: "US",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 36.5484,
            longitude: -82.5618,
          },
          hasMap: "https://maps.google.com/?q=1309+S+John+B+Dennis+Hwy,+Ste+104,+Kingsport,+TN+37660",
          availableService: [
            "Botox", "Dermal Fillers", "Laser Treatments", "Medical Weight Loss",
            "RF Microneedling", "Skin Rejuvenation", "Hormone Optimization", "IV Therapy", "Peptide Therapy",
          ].map((svc) => ({
            "@type": "MedicalProcedure",
            name: svc,
            procedureType: "Noninvasive",
          })),
        },
      ],
    };

    const el = document.getElementById("local-business-schema");
    if (el) {
      el.textContent = JSON.stringify(schema);
    } else {
      const script = document.createElement("script");
      script.id = "local-business-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
    return () => {
      const el = document.getElementById("local-business-schema");
      if (el) el.remove();
    };
  }, []);

  return null;
}

interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  faqs?: { q: string; a: string }[];
}

export function ServiceSchema({ serviceName, description, faqs }: ServiceSchemaProps) {
  useEffect(() => {
    const schemas: object[] = [
      {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        name: serviceName,
        description,
        procedureType: "Noninvasive",
        followup: "Follow-up appointment recommended 2–4 weeks after treatment.",
        preparation: "Consultation required prior to treatment.",
        howPerformed: "Performed by board-certified medical professionals at Balanced Wellness Medical Spa.",
        recognizingAuthority: {
          "@type": "Organization",
          name: "American Medical Association",
        },
      },
    ];

    if (faqs && faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      });
    }

    const el = document.getElementById("service-schema");
    if (el) {
      el.textContent = JSON.stringify(schemas);
    } else {
      const script = document.createElement("script");
      script.id = "service-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schemas);
      document.head.appendChild(script);
    }
    return () => {
      const el = document.getElementById("service-schema");
      if (el) el.remove();
    };
  }, [serviceName, description]);

  return null;
}
