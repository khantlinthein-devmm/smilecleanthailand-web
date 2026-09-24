import Script from "next/script";

// Set these in the hosting environment (e.g. Vercel → Settings → Environment Variables).
// Nothing loads until an ID is provided.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // Google Analytics 4, e.g. G-XXXXXXXXXX
const LINE_TAG_ID = process.env.NEXT_PUBLIC_LINE_TAG_ID; // LINE Tag ID from LINE Ads Manager

export default function Analytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`}
          </Script>
        </>
      )}
      {LINE_TAG_ID && (
        <Script id="line-tag" strategy="afterInteractive">
          {`(function(g,d,o){g._ltq=g._ltq||[];g._lt=g._lt||function(){g._ltq.push(arguments)};var h=location.protocol==='https:'?'https://d.line-scdn.net':'http://d.line-cdn.net';var s=d.createElement('script');s.async=1;s.src=o||h+'/n/line_tag/public/release/v1/lt.js';var t=d.getElementsByTagName('script')[0];t.parentNode.insertBefore(s,t);})(window,document);_lt('init',{customerType:'account',tagId:${JSON.stringify(LINE_TAG_ID)}});_lt('send','pv',[${JSON.stringify(LINE_TAG_ID)}]);`}
        </Script>
      )}
    </>
  );
}
