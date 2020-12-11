import React from "react"
import Head from "next/head"

const PageTitle = ({ title }) => {
  return (
    <Head>
      <title>{title} - Marque um horário.</title>

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
      />
      <meta httpEquiv="Content-Language" content="pt-br" />
      <meta name="application-name" content="AgendaSimples" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Agenda Simples" />
      <meta name="description" content="Agenda Simples" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta property="og:title" content="Agenda Simples." />
      <meta property="og:description" content="Agenda Simples." />
    </Head>
  )
}

export default PageTitle
