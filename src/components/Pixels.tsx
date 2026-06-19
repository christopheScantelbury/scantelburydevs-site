import Script from 'next/script'

// ─────────────────────────────────────────────────────────────────────────────
// Pixels de campanha + analytics. Cada canal só é injetado se sua env var
// (NEXT_PUBLIC_*) estiver definida — deploy seguro mesmo antes de criar as contas.
//
//   NEXT_PUBLIC_GA_ID                  G-XXXXXXX      (GA4 — já em uso)
//   NEXT_PUBLIC_GOOGLE_ADS_ID          AW-XXXXXXXXX   (Google Ads)
//   NEXT_PUBLIC_META_PIXEL_ID          15 dígitos     (Meta / Facebook + Instagram)
//   NEXT_PUBLIC_LINKEDIN_PARTNER_ID    número         (LinkedIn Insight Tag)
//
// GA4 e Google Ads compartilham o mesmo gtag.js (carregado uma única vez aqui).
// ─────────────────────────────────────────────────────────────────────────────

export function Pixels() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
  const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const liId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID

  const gtagPrimaryId = gaId || adsId // qualquer um habilita o gtag.js

  return (
    <>
      {/* ── Google (GA4 + Google Ads) ── */}
      {gtagPrimaryId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagPrimaryId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${gaId ? `gtag('config', '${gaId}', { anonymize_ip: true });` : ''}
              ${adsId ? `gtag('config', '${adsId}');` : ''}
            `}
          </Script>
        </>
      )}

      {/* ── Meta Pixel (Facebook + Instagram Ads) ── */}
      {metaId && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaId}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://www.facebook.com/tr?id=${metaId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* ── LinkedIn Insight Tag ── */}
      {liId && (
        <>
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`
              _linkedin_partner_id = "${liId}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://px.ads.linkedin.com/collect/?pid=${liId}&fmt=gif`}
            />
          </noscript>
        </>
      )}
    </>
  )
}
