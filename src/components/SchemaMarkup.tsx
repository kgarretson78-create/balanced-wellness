import { useEffect } from "react";
import { LOCATIONS, type OpeningHoursSpec } from "@/lib/booking";

const toSchemaHours = (specs: OpeningHoursSpec[]) =>
  specs.map((s) => ({ "@type": "OpeningHoursSpecification", ...s }));

const KINGSPORT_HOURS = toSchemaHours(LOCATIONS.kingsport.hours.schema);
const JONESBOROUGH_HOURS = toSchemaHours(LOCATIONS.jonesborough.hours.schema);

export function LocalBusinessSchema() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "@id": "https://www.balancedmedicalspa.com/#organization",
      name: "Balanced Wellness Medical Spa",
      description: "Premier luxury medical spa offering Botox, Dermal Fillers, RF Microneedling, CO2 Laser Resurfacing, Medical Weight Loss, and Hormone Optimization in Kingsport & Jonesborough, TN. Two convenient Tri-Cities locations, board-certified providers, 8,000+ patients treated, 200+ five-star reviews.",
      url: "https://www.balancedmedicalspa.com",
      telephone: "+1-423-765-1393",
      image: "https://www.balancedmedicalspa.com/images/logo.jpeg",
      logo: "https://www.balancedmedicalspa.com/images/logo.jpeg",
      priceRange: "$$",
      currenciesAccepted: "USD",
      paymentAccepted: "Cash, Credit Card, Debit Card, CareCredit, Cherry Financing",
      medicalSpecialty: [
        "Botox",
        "Dysport",
        "Daxxify",
        "Dermal Fillers",
        "RF Microneedling",
        "CO2 Laser Resurfacing",
        "Medical Weight Loss",
        "Hormone Replacement Therapy",
        "Peptide Therapy",
      ],
      openingHoursSpecification: KINGSPORT_HOURS,
      sameAs: [
        "https://www.facebook.com/balancedwellnessmedspa",
        "https://www.instagram.com/balancedwellnessmedspa",
      ],
      areaServed: [
        { "@type": "City", name: "Kingsport" },
        { "@type": "City", name: "Jonesborough" },
        { "@type": "City", name: "Johnson City" },
        { "@type": "City", name: "Bristol" },
        { "@type": "City", name: "Greeneville" },
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
          "@id": "https://www.balancedmedicalspa.com/medical-spa-jonesborough-tn#location",
          name: "Balanced Wellness Medical Spa - Jonesborough",
          url: "https://www.balancedmedicalspa.com/medical-spa-jonesborough-tn",
          telephone: "+1-423-646-2169",
          openingHoursSpecification: JONESBOROUGH_HOURS,
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
            "Botox", "Dysport", "Daxxify", "Dermal Fillers", "CO2 Laser Resurfacing", "RF Microneedling",
            "IV Therapy", "Medical Weight Loss", "Skin Rejuvenation", "Hormone Optimization",
          ].map((svc) => ({
            "@type": "MedicalProcedure",
            name: svc,
            procedureType: "Noninvasive",
          })),
        },
        {
          "@type": "MedicalBusiness",
          "@id": "https://www.balancedmedicalspa.com/medical-spa-kingsport-tn#location",
          name: "Balanced Wellness Medical Spa - Kingsport",
          url: "https://www.balancedmedicalspa.com/medical-spa-kingsport-tn",
          telephone: "+1-423-765-1393",
          openingHoursSpecification: KINGSPORT_HOURS,
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
            "Botox", "Dysport", "Daxxify", "Dermal Fillers", "Laser Treatments", "Medical Weight Loss",
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
  canonicalUrl?: string;
  faqs?: { q: string; a: string }[];
  breadcrumbs?: { name: string; url: string }[];
}

export function ServiceSchema({ serviceName, description, canonicalUrl, faqs, breadcrumbs }: ServiceSchemaProps) {
  useEffect(() => {
    const schemas: object[] = [
      {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        name: serviceName,
        description,
        url: canonicalUrl,
        procedureType: "Noninvasive",
        followup: "Follow-up appointment recommended 2–4 weeks after treatment.",
        preparation: "Consultation required prior to treatment.",
        howPerformed: "Performed by board-certified medical professionals at Balanced Wellness Medical Spa.",
        recognizingAuthority: {
          "@type": "Organization",
          name: "American Medical Association",
        },
        provider: { "@id": "https://www.balancedmedicalspa.com/#organization" },
      },
    ];

    if (faqs && faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        url: canonicalUrl,
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

    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: b.url,
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
  }, [serviceName, description, canonicalUrl, faqs, breadcrumbs]);

  return null;
}
