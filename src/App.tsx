import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Injectables from "./pages/Injectables";
import LaserTreatments from "./pages/LaserTreatments";
import WeightLoss from "./pages/WeightLoss";
import Wellness from "./pages/Wellness";
import HormoneOptimization from "./pages/HormoneOptimization";
import Memberships from "./pages/Memberships";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Book from "./pages/Book";
import BookNow from "./pages/BookNow";
import OnlineCare from "./pages/OnlineCare";
import Contact from "./pages/Contact";
import SkinAnalyzer from "./pages/SkinAnalyzer";
import AdminLeads from "./pages/AdminLeads";
import SmsConsent from "./pages/SmsConsent";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import FlexiblePayments from "./pages/FlexiblePayments";
import NotFound from "@/pages/not-found";
import { KelliAIChat } from "./components/KelliAI";
import { FloatingBookButton } from "./components/FloatingBookButton";
import { EmailSignupPopup } from "./components/EmailSignupPopup";
import { VisitorTracker } from "./components/VisitorTracker";
import { BookingChooserProvider } from "./components/booking/LocationChooser";

// SEO Service Pages
import BotoxKingsport from "./pages/seo/BotoxKingsport";
import DysportKingsport from "./pages/seo/DysportKingsport";
import DaxxifyKingsport from "./pages/seo/DaxxifyKingsport";
import LipFillerKingsport from "./pages/seo/LipFillerKingsport";
import LaserSkinRejuvenation from "./pages/seo/LaserSkinRejuvenation";
import RFMicroneedlingKingsport from "./pages/seo/RFMicroneedlingKingsport";
import MedicalWeightLossKingsport from "./pages/seo/MedicalWeightLossKingsport";
import HormoneTherapyKingsport from "./pages/seo/HormoneTherapyKingsport";
import PeptideTherapyKingsport from "./pages/seo/PeptideTherapyKingsport";
import SkinTighteningKingsport from "./pages/seo/SkinTighteningKingsport";

// Online Care category SEO pages
import OnlineWeightLossKingsport from "./pages/seo/OnlineWeightLossKingsport";
import OnlineSkincareKingsport from "./pages/seo/OnlineSkincareKingsport";
import WomensHealthKingsport from "./pages/seo/WomensHealthKingsport";
import MensHealthKingsport from "./pages/seo/MensHealthKingsport";

// Local SEO Pages
import MedicalSpaKingsport from "./pages/seo/MedicalSpaKingsport";
import MedicalSpaJonesborough from "./pages/seo/MedicalSpaJonesborough";
import WeightLossClinicKingsport from "./pages/seo/WeightLossClinicKingsport";
import WellnessClinicKingsport from "./pages/seo/WellnessClinicKingsport";
import KingsportMedSpa from "./pages/seo/KingsportMedSpa";
import JonesboroughMedSpa from "./pages/seo/JonesboroughMedSpa";
import IVLoungeKingsport from "./pages/seo/IVLoungeKingsport";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Core pages */}
      <Route path="/admin/leads" component={AdminLeads} />
      <Route path="/sms-consent" component={SmsConsent} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-and-conditions" component={TermsAndConditions} />
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/injectables" component={Injectables} />
      <Route path="/laser-treatments" component={LaserTreatments} />
      <Route path="/weight-loss" component={WeightLoss} />
      <Route path="/wellness" component={Wellness} />
      <Route path="/hormone-optimization" component={HormoneOptimization} />
      <Route path="/memberships" component={Memberships} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/about" component={About} />
      <Route path="/book" component={Book} />
      <Route path="/book-now" component={BookNow} />
      <Route path="/social-booking" component={BookNow} />
      <Route path="/online-care" component={OnlineCare} />
      <Route path="/telehealth" component={OnlineCare} />
      <Route path="/online-telehealth" component={OnlineCare} />
      <Route path="/contact" component={Contact} />
      <Route path="/skin-analyzer" component={SkinAnalyzer} />
      <Route path="/flexible-payments" component={FlexiblePayments} />

      {/* SEO Service Pages */}
      <Route path="/botox-kingsport-tn" component={BotoxKingsport} />
      <Route path="/dysport-kingsport-tn" component={DysportKingsport} />
      <Route path="/daxxify-kingsport-tn" component={DaxxifyKingsport} />
      <Route path="/lip-filler-kingsport-tn" component={LipFillerKingsport} />
      <Route path="/laser-skin-rejuvenation-kingsport-tn" component={LaserSkinRejuvenation} />
      <Route path="/rf-microneedling-kingsport-tn" component={RFMicroneedlingKingsport} />
      <Route path="/medical-weight-loss-kingsport-tn" component={MedicalWeightLossKingsport} />
      <Route path="/hormone-therapy-kingsport-tn" component={HormoneTherapyKingsport} />
      <Route path="/peptide-therapy-kingsport-tn" component={PeptideTherapyKingsport} />
      <Route path="/skin-tightening-kingsport-tn" component={SkinTighteningKingsport} />

      {/* Online Care category pages */}
      <Route path="/online-weight-loss-kingsport-tn" component={OnlineWeightLossKingsport} />
      <Route path="/online-skincare-kingsport-tn" component={OnlineSkincareKingsport} />
      <Route path="/womens-health-kingsport-tn" component={WomensHealthKingsport} />
      <Route path="/mens-health-kingsport-tn" component={MensHealthKingsport} />

      {/* Local SEO Pages */}
      <Route path="/medical-spa-kingsport-tn" component={MedicalSpaKingsport} />
      <Route path="/medical-spa-jonesborough-tn" component={MedicalSpaJonesborough} />
      <Route path="/weight-loss-clinic-kingsport-tn" component={WeightLossClinicKingsport} />
      <Route path="/wellness-clinic-kingsport-tn" component={WellnessClinicKingsport} />
      <Route path="/kingsport-med-spa" component={KingsportMedSpa} />
      <Route path="/jonesborough-med-spa" component={JonesboroughMedSpa} />

      {/* IV Lounge */}
      <Route path="/iv-lounge-kingsport-tn" component={IVLoungeKingsport} />
      <Route path="/iv-hydration-kingsport-tn" component={IVLoungeKingsport} />

      <Route component={NotFound} />
    </Switch>
  );
}

function GlobalOverlays() {
  const [location] = useLocation();
  // A2P 10DLC compliance: SMS consent page must be a clean, single opt-in source
  // with no chat widgets or popups.
  const isComplianceCleanPage =
    location === "/sms-consent" ||
    location === "/privacy-policy" ||
    location === "/terms-and-conditions";
  if (isComplianceCleanPage) return null;
  return (
    <>
      <EmailSignupPopup />
      <KelliAIChat />
      <FloatingBookButton />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <BookingChooserProvider>
            <Router />
            <VisitorTracker />
            <GlobalOverlays />
          </BookingChooserProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
