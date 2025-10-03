import { ScrollViewStyleReset } from 'expo-router/html'
import { type PropsWithChildren } from 'react'

/**
 * This file is web-only and used to configure the root HTML for every web page during static rendering.
 * The contents of this function only run in Node.js environments and do not have access to the DOM or browser APIs.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="it" translate="no">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="google" content="notranslate" />
        <meta name="googlebot" content="notranslate" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, shrink-to-fit=no maximum-scale=1.0, user-scalable=no"
        />
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  )
}
