/* ================================================================
 *  voice.js  –  Inline scripts extracted from voice.html
 *
 *  Contains:
 *    - HubSpot variables (hsVars, _hsp, dataLayer)
 *    - Google Tag Manager initialization
 *    - HubSpot analytics placeholder event
 * ================================================================ */

// === Inline script [0] ===
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

// === Inline script [1] ===
var hsVars = { app_hs_base_url: 'https://app-na2.hubspot.com' };

// === Inline script [7] ===
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5Q579RMM');

// === Inline script [8] ===
var hsVars = hsVars || {}; hsVars['language'] = 'ja';

// === Inline script [12] ===
(function(){
  const timeoutEvent = document.createEvent('CustomEvent');
  timeoutEvent.initCustomEvent("content-analytics-code-not-loaded", true, true, { detail: "Not loaded in preview mode" });
  window.dispatchEvent(timeoutEvent);
})();

// === Inline script [13] ===
var hsVars = {
    render_id: "3b7850d8-f7fb-4c9c-9fa6-63584a8060ee",
    ticks: 1774847578061,
    page_id: 182975199538,
    
    content_group_id: 0,
    portal_id: 19700338,
    app_hs_base_url: "https://app-na2.hubspot.com",
    cp_hs_base_url: "https://cp-na2.hubspot.com",
    language: "ja",
    analytics_page_type: "landing-page",
    scp_content_type: "",
    
    analytics_page_id: "182975199538",
    category_id: 1,
    folder_id: 0,
    is_hubspot_user: null
}