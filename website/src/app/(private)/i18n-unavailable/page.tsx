"use client";

import ErrorPage from "next/error";

/**
 * I18n Unavailable Page
 * ---
 * This page is shown when localization data cannot be loaded.
 * It returns a 503 Service Unavailable status code to indicate
 */
export default function I18nUnavailablePage() {
  return (
    <html>
      <body>
        <ErrorPage
          statusCode={503}
          title="We’re unable to load localization data right now. Please try reloading the page or check back shortly."
        />
      </body>
    </html>
  );
}
