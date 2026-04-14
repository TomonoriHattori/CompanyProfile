/* ============================================================
   speech.js
   All inline scripts extracted from speech.html
============================================================ */

/* ============================================================
   HubSpot Privacy / Google Consent Mode + GTM Loader
   ============================================================ */
var _hsp = window._hsp = window._hsp || [];
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

var useGoogleConsentModeV2 = true;
var waitForUpdateMillis = 1000;



var hsLoadGtm = function loadGtm() {
    if(window._hsGtmLoadOnce) {
      return;
    }

    if (useGoogleConsentModeV2) {

      gtag('set','developer_id.dZTQ1Zm',true);

      gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': waitForUpdateMillis
      });

      _hsp.push(['useGoogleConsentModeV2'])
    }

    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5Q579RMM');

    window._hsGtmLoadOnce = true;
};

_hsp.push(['addPrivacyConsentListener', function(consent){
  if(consent.allowed || (consent.categories && consent.categories.analytics)){
    hsLoadGtm();
  }
}]);


/* ============================================================
   HubSpot Vars (app base URL)
   ============================================================ */
var hsVars = { app_hs_base_url: 'https://app-na2.hubspot.com' };


/* ============================================================
   Google Tag Manager (inline snippet)
   ============================================================ */
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5Q579RMM');


/* ============================================================
   HubSpot language var
   ============================================================ */
var hsVars = hsVars || {}; hsVars['language'] = 'ja';


/* ============================================================
   HubSpot Analytics Code Not Loaded event
   ============================================================ */
(function(){
  const timeoutEvent = document.createEvent('CustomEvent');
  timeoutEvent.initCustomEvent("content-analytics-code-not-loaded", true, true, { detail: "Not loaded in preview mode" });
  window.dispatchEvent(timeoutEvent);
})();


/* ============================================================
   HubSpot Page Variables (hsVars)
   ============================================================ */
var hsVars = {
    render_id: "73aab241-3e23-41e0-886c-d986ac040399",
    ticks: 1774847571376,
    page_id: 124718437709,
    
    content_group_id: 0,
    portal_id: 19700338,
    app_hs_base_url: "https://app-na2.hubspot.com",
    cp_hs_base_url: "https://cp-na2.hubspot.com",
    language: "ja",
    analytics_page_type: "landing-page",
    scp_content_type: "",
    
    analytics_page_id: "124718437709",
    category_id: 1,
    folder_id: 0,
    is_hubspot_user: null
}