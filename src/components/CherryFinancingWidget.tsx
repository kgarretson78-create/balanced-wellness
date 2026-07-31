import { useEffect } from "react";

const WIDGET_SRC = "https://files.withcherry.com/widgets/widget.js";
const INSTANCE_ID = "_hw";

// Cherry renders the floating estimator into a div it appends to <body>, not
// into #floatingEstimator, so the widget survives route changes on its own and
// has to be hidden by hand when this component unmounts.
const BODY_MOUNT_ID = "widget-floatingEstimator-mount";

// Merchant slug/name are the legacy Suite 101 Medical Spa Cherry account and
// must stay as-is — changing them points the estimator at a different merchant.
const CONFIG = {
  debug: false,
  variables: {
    slug: "suite101medicalspa",
    name: "Suite 101 Medical Spa",
    images: [26],
    customLogo: "",
    defaultPurchaseAmount: 750,
    customImage: "",
    imageCategory: "medspa",
    language: "en",
  },
  styles: {
    primaryColor: "#0d0d0e",
    secondaryColor: "#0d0d0e10",
    fontFamily: "Montserrat",
    headerFontFamily: "Montserrat",
    floatingEstimator: {
      position: "bottom-right",
      // y offset lifts the estimator clear of the Kelli AI chat launcher, which
      // sits in the same corner at a lower z-index and would be covered at 0px.
      offset: { x: "0px", y: "80px" },
      zIndex: 9999,
      ctaFontFamily: "Montserrat",
      bodyFontFamily: "Montserrat",
      ctaColor: "#0d0d0e",
      ctaTextColor: "#FFFFFF",
    },
  },
};

type CherryLoader = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    _hw?: CherryLoader;
  }
}

let scriptInjected = false;

function injectCherryWidget() {
  // widget.js throws unless it finds a queued `init` call, so the stub has to
  // exist and be called before the (async) bundle executes.
  const loader: CherryLoader =
    window._hw ??
    function (...args: unknown[]) {
      (loader.q = loader.q ?? []).push(args);
    };
  window._hw = loader;
  loader("init", CONFIG, ["floatingEstimator"]);

  const script = document.createElement("script");
  script.id = INSTANCE_ID; // widget.js reads its instance name off this id
  script.src = WIDGET_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export function CherryFinancingWidget() {
  useEffect(() => {
    if (!scriptInjected) {
      scriptInjected = true;
      injectCherryWidget();
    }

    const mount = document.getElementById(BODY_MOUNT_ID);
    if (mount) mount.style.display = "";

    return () => {
      const node = document.getElementById(BODY_MOUNT_ID);
      if (node) node.style.display = "none";
    };
  }, []);

  return <div id="floatingEstimator" />;
}
