import type { FormEvent, MouseEvent, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import logoImage from './assets/D2S_Logo_braun-1.png'
import heroImage from './assets/D2S Wild West.jpg'
import saloonImage from './assets/D2S Saloon.jpg'
import shovelImage from './assets/D2S Wild West Shovel.jpg'
import banjoVolcanoImage from './assets/Drums2streets_Banjo Volcano.jpg'
import supertalentImage from './assets/Supertalent D2S Abschlag.jpg'
import lasVegasImage from './assets/D2S Las Vegas.jpg'
import lasVegasBassImage from './assets/D2S E-Bass Las Vegas.jpg'
import swissMadeImage from './assets/d2s swiss made.jpg'
import heroVideo from './assets/D2Shomepage.mp4'
import andrinImage from './assets/Andrin Baer sepia.jpg'
import angeloImage from './assets/Angelo Razzino sepia.jpg'
import danielImage from './assets/Daniel Rothammer sepia.jpg'
import nicoImage from './assets/Nico Ernst sepia.jpg'
import timonImage from './assets/Timon Willi sepia.jpg'

type RoutePath =
  | '/'
  | '/ueber-uns'
  | '/shows/swiss-made'
  | '/shows/wild-west'
  | '/shows/las-vegas'
  | '/shows/new-york'
  | '/become-a-drummer'

type ShowFormat = {
  name: string
  path: RoutePath
  label: string
  description: string
  intro: string
  image: string
  content: string[]
}

type Benefit = {
  title: string
  text: string
}

type Member = {
  name: string
  image?: string
  role?: string
}

type FieldProps = {
  label: string
  name: string
  maxLength: number
  required?: boolean
  placeholder?: string
  type?: 'text' | 'email' | 'tel' | 'url'
}

type DrummerLink = {
  title: string
  url: string
  description: string
}

const showFormats: ShowFormat[] = [
  {
    name: 'Wild West',
    path: '/shows/wild-west',
    label: 'Staub, Tempo, Show',
    description:
      'Cinematic Drumming mit rauer Energie, starken Bildern und einem Auftritt, der sofort Atmosphäre schafft.',
    intro:
      'Das Amerika des 19. Jahrhunderts war geprägt von Pioniergeist und der Besiedelung des Wilden Westens.',
    image: saloonImage,
    content: [
      'Das Amerika des 19. Jahrhunderts war geprägt von Pioniergeist und der Besiedelung des Wilden Westens.',
      'In der gleichen Zeit erreichte auch der Goldrausch seinen Höhepunkt. Aus den dunklen und stickigen Minen kommend, erwachen die Lebensgeister und steigern sich zu einer faszinierenden Trommelshow, welche in einem fulminanten Finale endet.',
      'Musiziert wird mit rustikalen Instrumenten wie alten Spitzhacken, Tonnen und Schaufeln, umrandet von explosiven Effekten. Doch nur zu trommeln wäre den jungen Künstlern zu einfach: Mitreissende Klänge, unterstützt durch schwindelerregende Schläger-Akrobatik und eine gekonnte Choreographie garantieren, dass kein Fuss ruhig und keine Hand ungeklatscht bleibt.',
    ],
  },
  {
    name: 'Swiss Made',
    path: '/shows/swiss-made',
    label: 'Tradition trifft Strasse',
    description:
      'Rohe Strassenrhythmen treffen auf Schweizer Traditionen, Jodel, Gloggen und selbstgebaute Instrumente.',
    intro:
      'Mit dieser Show kehrt Drums2Streets zurück zu seinen Wurzeln: den besonderen Traditionen der Schweiz.',
    image: swissMadeImage,
    content: [
      'Mit dieser Show kehrt Drums2Streets zurück zu seinen Wurzeln: den besonderen Traditionen der Schweiz, wobei das Trommeln eine davon darstellt.',
      'In dieser brandneuen Show verbinden wir die rohen Strassenrhythmen mit besonderen Highlights wie zum Beispiel einer herausragenden Jodlerin oder den charakteristischen “Gloggen”.',
      'Dabei bleiben wir uns treu und bieten diese Show auf Instrumenten dar, welche aus Schrott und Baumaterialien selbst gebaut sind. Kontrast in seiner aufregendsten Form!',
    ],
  },
  {
    name: 'Las Vegas',
    path: '/shows/las-vegas',
    label: 'Licht, Schatten, Spektakel',
    description:
      'Eine visuelle Showwelt mit Licht, Rhythmus, Melodien und überraschenden Instrumenten aus der Schattenseite der Stadt.',
    intro:
      'Las Vegas steht für eine glitzernde Metropole in der Wüste von Nevada.',
    image: lasVegasImage,
    content: [
      'Las Vegas steht für eine glitzernde Metropole in der Wüste von Nevada.',
      'Doch wo sich hell erleuchtete Strassen präsentieren und prunkvolle Casinos in den Himmel wachsen, gibt es auch dunkle Hinterhöfe und vollgestellte Gassen. In diese geheimnisvolle Schattenwelt entführt Drums2Streets mit der Show Las Vegas.',
      'Ausrangierte Spielautomaten, raffiniert in klingende Instrumente umgewandelt, Abwasserrohre, die nicht nur ungeahnte Töne und Melodien von sich geben, sondern auch noch in den wildesten Farben leuchten, sowie eine beeindruckende Kombination von Lasern, Licht, Melodien und vielen visuellen Effekten schaffen ein unvergessliches Erlebnis.',
    ],
  },
  {
    name: 'New York',
    path: '/shows/new-york',
    label: 'Urban und direkt',
    description:
      'Street-Performance, Groove und Grossstadtpuls für Events, die modern, schnell und präsent wirken sollen.',
    intro:
      'The Melting Pot, die Stadt, die niemals schläft, Big Apple, Gotham City: New York City.',
    image: heroImage,
    content: [
      'The Melting Pot, die Stadt, die niemals schläft, Big Apple, Gotham City: Es gibt unzählige Namen für diese Weltmetropole: New York City.',
      'Drums2Streets entführt mit dieser Show in die zwielichtigen Gassen New Yorks der 30er Jahre und überrascht mit aussergewöhnlichen Choreographien. Schattendrummer sorgen für grosse Augen, kurios wirkende Instrumente wie zum Beispiel die “Rainingpipes”, zusammengebaut aus Strassenmüll und Schrott, entfalten ungeahnte Klänge.',
      'Hits aus den aktuellen Charts, ausschliesslich durch diese raffinierten Schrotthaufen dargeboten, lassen die Zuhörer über die Vielfältigkeit von Recycling staunen.',
    ],
  },
]

const benefits: Benefit[] = [
  {
    title: 'Starke Präsenz',
    text: 'Ein Auftritt, der Räume füllt, Aufmerksamkeit bündelt und das Publikum direkt erreicht.',
  },
  {
    title: 'Flexibel buchbar',
    text: 'Passend für Festivals, Firmenanlässe, Privatfeiern, Galas und öffentliche Veranstaltungen.',
  },
  {
    title: 'Professioneller Ablauf',
    text: 'Klare Kommunikation, verlässliche Planung und eine Show, die sich sauber in Ihr Event einfügt.',
  },
  {
    title: 'Premium Wirkung',
    text: 'Rhythmus, Bewegung und visuelle Kraft für Momente, die hochwertig und erinnerbar bleiben.',
  },
]

const members: Member[] = [
  { name: 'Marc Hobi', role: 'Bandleader' },
  { name: 'Andrin Baer', image: andrinImage },
  { name: 'Angelo Razzino', image: angeloImage },
  { name: 'Daniel Rothammer', image: danielImage },
  { name: 'Fabian Diem' },
  { name: 'Nico Ernst', image: nicoImage },
  { name: 'Timon Willi', image: timonImage },
]

const groupGalleryImages = [
  supertalentImage,
  banjoVolcanoImage,
  lasVegasImage,
  lasVegasBassImage,
  heroImage,
  saloonImage,
  shovelImage,
]

const drummerLinks: DrummerLink[] = [
  {
    title: 'Tambourenverein der Stadt Kreuzlingen',
    url: 'https://www.tbvsk.ch',
    description: 'Wo Kinder zu Drummern werden.',
  },
  {
    title: 'Ostschweizer Tambourenverband',
    url: 'https://www.otv.ch',
    description:
      'Finde den ostschweizer Tambourenverein in deiner Nähe und starte deine Ausbildung zum Tambour.',
  },
  {
    title: 'Schweizerischer Tambouren- und Pfeiferverband',
    url: 'https://stpv-astf.ch/',
    description:
      'Offizielle Website des schweizerischen Tambouren- und Pfeiferverbandes.',
  },
]

const mandatoryFields = [
  'First Name',
  'Last Name',
  'Email',
  'Street',
  'City',
  'Zip Code',
  'LEADCF4',
  'LEADCF81',
  'LEADCF1',
]

const fieldLabels = [
  'Vorname',
  'Nachname',
  'E-Mail',
  'Strasse',
  'Stadt',
  'Postleitzahl',
  'Wo haben Sie Drums2Streets entdeckt?',
  'Datum des Events',
  'Eventbezeichnung',
]

function getPath(): RoutePath {
  const path = window.location.pathname
  const knownRoutes: RoutePath[] = [
    '/',
    '/ueber-uns',
    '/shows/swiss-made',
    '/shows/wild-west',
    '/shows/las-vegas',
    '/shows/new-york',
    '/become-a-drummer',
  ]

  return knownRoutes.includes(path as RoutePath) ? (path as RoutePath) : '/'
}

function navigateTo(path: string) {
  const url = new URL(path, window.location.origin)
  window.history.pushState({}, '', `${url.pathname}${url.hash}`)
  window.dispatchEvent(new PopStateEvent('popstate'))

  if (url.hash) {
    requestAnimationFrame(() => {
      document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth' })
    })
    return
  }

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function checkMandatory(event: FormEvent<HTMLFormElement>) {
  for (let i = 0; i < mandatoryFields.length; i += 1) {
    const field = event.currentTarget.elements.namedItem(mandatoryFields[i])

    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) {
      continue
    }

    if (field.value.replace(/^\s+|\s+$/g, '').length === 0) {
      alert(`${fieldLabels[i]} darf nicht leer sein.`)
      field.focus()
      event.preventDefault()
      return
    }
  }
}

function Link({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string
  className?: string
  children: ReactNode
  ariaLabel?: string
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (href.startsWith('/')) {
      event.preventDefault()
      navigateTo(href)
    }
  }

  return (
    <a aria-label={ariaLabel} className={className} href={href} onClick={handleClick}>
      {children}
    </a>
  )
}

function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text?: string
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      <p className="mb-3 text-xs font-bold uppercase text-[#b99b5d]">{eyebrow}</p>
      <h2 className="text-3xl font-black leading-tight text-stone-50 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 text-base leading-7 text-stone-300 md:text-lg">
          {text}
        </p>
      ) : null}
    </div>
  )
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navLinkClass =
    'rounded-md px-4 py-3 text-sm transition hover:bg-white/10 hover:text-[#ead8a8]'

  return (
    <header className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="flex items-center justify-between overflow-visible lg:flex lg:h-[96px] lg:shrink-0 lg:items-center">
          <Link href="/" className="inline-flex items-center" ariaLabel="Drums2Streets">
          <span className="relative flex h-20 w-52 items-center justify-center overflow-visible sm:h-24 sm:w-64 lg:h-[96px] lg:w-72">
              <img
                src={logoImage}
                alt="Drums2Streets"
              className="absolute top-1/2 h-28 w-72 max-w-none -translate-y-[42%] object-contain sm:h-36 sm:w-96 lg:h-36 lg:w-[28rem]"
              />
            </span>
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/#kontakt"
              className="rounded-md bg-[#8f6b32] px-4 py-3 text-xs font-black uppercase text-white shadow-lg shadow-[#8f6b32]/30 transition hover:bg-[#b99b5d]"
            >
              Show buchen
            </Link>
            <button
              aria-expanded={mobileMenuOpen}
              aria-label="Navigation öffnen"
              className="grid h-11 w-11 place-items-center rounded-md border border-white/15 bg-black/70 text-white"
              onClick={() => setMobileMenuOpen((open) => !open)}
              type="button"
            >
              <span className="grid gap-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </span>
            </button>
          </div>
      </div>

      <div
        className={`rounded-lg border border-white/15 bg-black/75 px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur-md sm:px-5 lg:mt-4 lg:flex lg:min-h-[70px] lg:flex-1 lg:items-center lg:justify-between ${
          mobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <nav
          className="grid grid-cols-1 gap-2 text-center font-black uppercase text-white sm:grid-cols-2 lg:flex lg:items-center"
        >
          <Link className={navLinkClass} href="/ueber-uns">
            Über uns
          </Link>
          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center justify-center rounded-md px-4 py-3 text-sm transition hover:bg-white/10 hover:text-[#ead8a8]">
              Showformate
            </summary>
            <div className="mt-2 grid gap-1 rounded-md border border-white/10 bg-black/95 p-2 shadow-2xl shadow-black/50 lg:absolute lg:left-0 lg:top-full lg:z-20 lg:min-w-48">
              {showFormats.map((show) => (
                <Link
                  className="rounded-md px-4 py-3 text-sm text-white transition hover:bg-white/10 hover:text-[#ead8a8]"
                  href={show.path}
                  key={show.name}
                >
                  {show.name}
                </Link>
              ))}
            </div>
          </details>
          <Link className={navLinkClass} href="/become-a-drummer">
            Become a Drummer
          </Link>
          <Link className={navLinkClass} href="/#kontakt">
            Kontakt
          </Link>
        </nav>

        <Link
          href="/#kontakt"
          className="hidden rounded-md bg-[#8f6b32] px-5 py-3 text-xs font-black uppercase text-white shadow-lg shadow-[#8f6b32]/30 transition hover:bg-[#b99b5d] lg:inline-flex"
        >
          Show buchen
        </Link>
      </div>
    </header>
  )
}

function PageShell({ children }: { children: ReactNode }) {
  const [showFloatingButtons, setShowFloatingButtons] = useState(false)

  useEffect(() => {
    function updateFloatingButtons() {
      const isDesktop = window.matchMedia('(min-width: 640px)').matches
      setShowFloatingButtons(isDesktop || window.scrollY > window.innerHeight * 0.9)
    }

    updateFloatingButtons()
    window.addEventListener('scroll', updateFloatingButtons, { passive: true })
    window.addEventListener('resize', updateFloatingButtons)

    return () => {
      window.removeEventListener('scroll', updateFloatingButtons)
      window.removeEventListener('resize', updateFloatingButtons)
    }
  }, [])

  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-stone-100">
      {children}
      <FloatingBookingButton visible={showFloatingButtons} />
      <ScrollToTopButton visible={showFloatingButtons} />
      <Footer />
    </main>
  )
}

function Hero({ children }: { children: ReactNode }) {
  return (
    <section className="relative min-h-[92svh] border-b border-white/10">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        autoPlay
        loop
        muted
        playsInline
        poster={heroImage}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#070707]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_72%,rgba(47,125,202,0.36),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(21,90,159,0.32),transparent_30%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070707] to-transparent" />
      <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <Header />
        {children}
      </div>
    </section>
  )
}

function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string
  title: string
  intro: string
  image: string
}) {
  return (
    <section className="relative min-h-[70svh] border-b border-white/10">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#070707]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(47,125,202,0.32),transparent_32%)]" />
      <div className="relative mx-auto flex min-h-[70svh] max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <Header />
        <div className="flex flex-1 items-end pb-12 pt-24">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-black uppercase text-[#ead8a8]">
              {eyebrow}
            </p>
            <h1 className="text-5xl font-black uppercase leading-[0.9] text-white drop-shadow-2xl sm:text-7xl md:text-8xl">
              {title}
            </h1>
            <p className="mt-8 max-w-2xl border-l-4 border-[#b99b5d] pl-5 text-lg font-semibold leading-8 text-stone-100 md:text-xl">
              {intro}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ShowCard({ show, index }: { show: ShowFormat; index: number }) {
  return (
    <Link
      href={show.path}
      className="group block h-full overflow-hidden rounded-lg border border-white/10 bg-stone-950 transition hover:-translate-y-1 hover:border-[#b99b5d]/60"
    >
      <article className="flex h-full flex-col">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={show.image}
            alt=""
            className="h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
          <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-bold text-stone-100">
            0{index + 1}
          </div>
          <div className="absolute inset-x-5 bottom-5">
            <p className="mb-2 text-xs font-bold uppercase text-[#d8c28a]">
              {show.label}
            </p>
            <h3 className="text-3xl font-black text-white">{show.name}</h3>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-sm leading-6 text-stone-300">{show.description}</p>
          <p className="mt-auto pt-5 text-xs font-black uppercase text-[#ead8a8]">
            Show entdecken
          </p>
        </div>
      </article>
    </Link>
  )
}

function BenefitItem({ benefit }: { benefit: Benefit }) {
  return (
    <div className="border-t border-white/10 py-6">
      <h3 className="text-xl font-extrabold text-stone-50">{benefit.title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-6 text-stone-300">
        {benefit.text}
      </p>
    </div>
  )
}

function FormField({
  label,
  name,
  maxLength,
  required,
  placeholder,
  type = 'text',
}: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-stone-200">
        {label}
        {required ? <span className="text-[#b99b5d]"> *</span> : null}
      </span>
      <input
        className="w-full rounded-md border border-white/10 bg-black/45 px-4 py-3 text-base text-white outline-none transition placeholder:text-stone-600 focus:border-[#b99b5d]"
        maxLength={maxLength}
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </label>
  )
}

function TextAreaField({
  label,
  name,
  required,
}: {
  label: string
  name: string
  required?: boolean
}) {
  return (
    <label className="block md:col-span-2">
      <span className="mb-2 block text-sm font-bold text-stone-200">
        {label}
        {required ? <span className="text-[#b99b5d]"> *</span> : null}
      </span>
      <textarea
        className="min-h-28 w-full rounded-md border border-white/10 bg-black/45 px-4 py-3 text-base text-white outline-none transition placeholder:text-stone-600 focus:border-[#b99b5d]"
        maxLength={2000}
        name={name}
      />
    </label>
  )
}

function ZohoBookingForm() {
  return (
    <div id="crmWebToEntityForm" className="mx-auto w-full max-w-4xl">
      <meta httpEquiv="content-type" content="text/html;charset=UTF-8" />
      <form
        acceptCharset="UTF-8"
        action="https://crm.zoho.eu/crm/WebToLeadForm"
        method="POST"
        name="WebToLeads83470000000197560"
        onSubmit={checkMandatory}
      >
        <input
          type="text"
          style={{ display: 'none' }}
          name="xnQsjsdp"
          value="60ac0ac0397c07c52d9395ae5b98b59741082b16018d43b83c49b43bba37cc08"
          readOnly
        />
        <input type="hidden" name="zc_gad" id="zc_gad" value="" readOnly />
        <input
          type="text"
          style={{ display: 'none' }}
          name="xmIwtLD"
          value="7d52c5120f8815883ddd4c2767026be4158cbd82146e14dc785ab0aaf607f51e"
          readOnly
        />
        <input
          type="text"
          style={{ display: 'none' }}
          name="actionType"
          value="TGVhZHM="
          readOnly
        />
        <input
          type="text"
          style={{ display: 'none' }}
          name="returnURL"
          value="http://www.drums2streets.ch"
          readOnly
        />

        <div className="rounded-lg border border-white/10 bg-stone-950 p-5 text-left shadow-2xl shadow-black/30 sm:p-7 md:p-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase text-[#b99b5d]">Kontakt</p>
            <h3 className="mt-2 text-2xl font-black text-white">
              Booking-Anfrage Drums2Streets
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Firma" maxLength={100} name="Company" />
            <FormField label="Vorname" maxLength={40} name="First Name" required />
            <FormField label="Nachname" maxLength={80} name="Last Name" required />
            <FormField label="Strasse" maxLength={250} name="Street" required />
            <FormField label="Postleitzahl" maxLength={30} name="Zip Code" required />
            <FormField label="Stadt" maxLength={30} name="City" required />
            <FormField label="Land" maxLength={30} name="Country" />
            <FormField
              label="E-Mail"
              maxLength={100}
              name="Email"
              required
              type="email"
            />
            <FormField label="Tel." maxLength={30} name="Phone" type="tel" />
            <FormField label="Mobil" maxLength={30} name="Mobile" type="tel" />
            <FormField label="Webseite" maxLength={255} name="Website" type="url" />
            <FormField
              label="Eventbezeichnung"
              maxLength={255}
              name="LEADCF1"
              required
            />
            <TextAreaField label="Eventlocation" name="LEADCF3" />
            <FormField
              label="Datum des Events"
              maxLength={20}
              name="LEADCF81"
              placeholder="dd.MM.yyyy"
              required
            />
            <TextAreaField label="Das möchten Sie uns noch sagen" name="LEADCF2" />
            <FormField
              label="Wo haben Sie Drums2Streets entdeckt?"
              maxLength={255}
              name="LEADCF4"
              required
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              className="rounded-md bg-[#8f6b32] px-7 py-4 text-sm font-black text-white transition hover:bg-[#b99b5d]"
              type="submit"
            >
              Senden
            </button>
            <button
              className="rounded-md border border-white/15 px-7 py-4 text-sm font-black text-stone-200 transition hover:border-white/35"
              type="reset"
            >
              Zurücksetzen
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function HomePage() {
  return (
    <PageShell>
      <Hero>
        <div className="flex flex-1 items-end pb-12 pt-28 md:pb-16">
          <div className="max-w-5xl">
            <p className="mb-5 text-sm font-black uppercase text-[#ead8a8]">
              Live. Laut. Präzise.
            </p>
            <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.88] text-white drop-shadow-2xl sm:text-7xl md:text-8xl lg:text-9xl">
              Rhythmus, der Events in Bewegung bringt.
            </h1>
            <p className="mt-8 max-w-2xl border-l-4 border-[#b99b5d] pl-5 text-lg font-semibold leading-8 text-stone-100 md:text-xl">
              Drums2Streets liefert explosive Live-Performance für Festivals,
              Firmenanlässe, Privatfeiern und Bühnen, die mehr als Musik
              brauchen.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#kontakt"
                className="inline-flex justify-center rounded-md bg-[#8f6b32] px-7 py-5 text-sm font-black uppercase text-white shadow-2xl shadow-[#8f6b32]/35 transition hover:bg-[#b99b5d]"
              >
                Show buchen
              </Link>
              <Link
                href="/shows/wild-west"
                className="inline-flex justify-center rounded-md border border-white/35 bg-black/35 px-7 py-5 text-sm font-black uppercase text-white transition hover:border-[#d8c28a] hover:text-[#ead8a8]"
              >
                Shows ansehen
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 text-center sm:text-left">
              {['Festival', 'Corporate', 'Privat'].map((item) => (
                <div
                  className="border-t border-white/20 pt-3 text-xs font-black uppercase text-stone-200"
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Hero>

      <IntroSection />
      <AboutTeaser />
      <ShowsSection />
      <WhyBookSection />
      <GallerySection />
      <CrewSection />
      <BecomeADrummerSection expanded={false} />
      <ContactSection />
    </PageShell>
  )
}

function IntroSection() {
  return (
    <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <div>
          <p className="mb-4 text-xs font-bold uppercase text-[#b99b5d]">
            Kurzprofil
          </p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            Professionelle Drum Shows mit Schweizer Präzision.
          </h2>
        </div>
        <p className="text-base leading-8 text-stone-300 md:text-lg">
          Wir verbinden perkussive Energie, Choreografie und eine klare visuelle
          Sprache. Das Resultat ist eine Show, die auf grossen Bühnen trägt und
          bei exklusiven Anlässen genauso stark funktioniert.
        </p>
      </div>
    </section>
  )
}

function AboutTeaser() {
  return (
    <section className="border-y border-white/10 bg-black px-5 py-16 sm:px-8 md:py-24 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-bold uppercase text-[#b99b5d]">
            Über uns
          </p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            Von Streetdrumming inspiriert, in Kreuzlingen weiterentwickelt.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-300 md:text-lg">
            Drums2Streets verwandelt Plastikeimer, Regentonnen, Bauschutt und
            Fundstücke von der Strasse in explosive Instrumente.
          </p>
          <Link
            href="/ueber-uns"
            className="mt-8 inline-flex rounded-md border border-white/20 px-6 py-4 text-sm font-black uppercase text-white transition hover:border-[#d8c28a] hover:text-[#ead8a8]"
          >
            Mehr erfahren
          </Link>
        </div>
        <div className="overflow-hidden rounded-lg border border-white/10 bg-stone-950">
          <img
            src={banjoVolcanoImage}
            alt=""
            className="aspect-[16/10] h-full w-full object-cover opacity-85"
          />
        </div>
      </div>
    </section>
  )
}

function ShowsSection() {
  return (
    <section
      id="shows"
      className="border-b border-white/10 bg-stone-950/70 px-5 py-16 sm:px-8 md:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Showformate"
          title="Drei Welten, ein kompromissloser Puls."
          text="Jedes Format ist als starker Programmpunkt, Opening, Highlight oder Überraschungsmoment einsetzbar."
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {showFormats.map((show, index) => (
            <ShowCard key={show.name} show={show} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyBookSection() {
  return (
    <section
      id="buchen"
      className="px-5 py-16 sm:px-8 md:py-24 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-4 text-xs font-bold uppercase text-[#b99b5d]">
            Warum buchen
          </p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            Für Veranstalter, die einen echten Höhepunkt setzen wollen.
          </h2>
        </div>
        <div className="grid gap-x-10 md:grid-cols-2">
          {benefits.map((benefit) => (
            <BenefitItem key={benefit.title} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  )
}

function GallerySection() {
  return (
    <section
      id="galerie"
      className="border-y border-white/10 bg-black px-5 py-16 sm:px-8 md:py-24 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Galerie"
          title="Live-Momente, Bühnenenergie und grosse Bilder."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groupGalleryImages.map((image, index) => (
            <div
              className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-stone-900"
              key={image}
            >
              <img
                src={image}
                alt={`Drums2Streets Gruppenfoto ${index + 1}`}
                className="h-full w-full object-cover opacity-85 transition duration-500 hover:scale-105 hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-sm font-black text-white">Drums2Streets live</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CrewSection() {
  return (
    <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Crew" title="Menschen hinter dem Sound." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {members.map((member) => (
            <article
              className="overflow-hidden rounded-lg border border-white/10 bg-stone-950"
              key={member.name}
            >
              <div className="aspect-[3/4] overflow-hidden">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover opacity-90"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#8f6b32]/35 via-stone-900 to-black px-5 text-center">
                    <span className="text-4xl font-black uppercase text-white">
                      {member.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-black text-white">{member.name}</h3>
                {member.role ? (
                  <p className="mt-1 text-xs font-bold uppercase text-[#d8c28a]">
                    {member.role}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function BecomeADrummerSection({ expanded }: { expanded: boolean }) {
  return (
    <section
      className={
        expanded
          ? 'px-5 py-16 sm:px-8 md:py-24 lg:px-10'
          : 'border-t border-white/10 bg-stone-950/70 px-5 py-16 sm:px-8 md:py-24 lg:px-10'
      }
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Nachwuchs"
          title="Become a Drummer"
          text="Du möchtest selber trommeln lernen? Hier findest du nützliche Links, die dich deinem Ziel ein Stück näherbringen."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {drummerLinks.map((link) => (
            <a
              className="group flex h-full flex-col rounded-lg border border-white/10 bg-black/45 p-6 transition hover:-translate-y-1 hover:border-[#b99b5d]/60"
              href={link.url}
              key={link.title}
              rel="noreferrer"
              target="_blank"
            >
              <p className="mb-4 text-xs font-bold uppercase text-[#d8c28a]">
                Externer Link
              </p>
              <h3 className="text-xl font-black leading-tight text-white">
                {link.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-stone-300">
                {link.description}
              </p>
              <p className="mt-auto pt-6 text-xs font-black uppercase text-[#ead8a8]">
                Website öffnen
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactCta() {
  return (
    <section className="border-t border-white/10 bg-black px-5 py-16 sm:px-8 md:py-20 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-lg border border-white/10 bg-stone-950 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="mb-3 text-xs font-bold uppercase text-[#b99b5d]">
            Booking
          </p>
          <h2 className="text-3xl font-black text-white">
            Bereit für einen Auftritt, der bleibt?
          </h2>
        </div>
        <Link
          href="/#kontakt"
          className="inline-flex justify-center rounded-md bg-[#8f6b32] px-7 py-5 text-sm font-black uppercase text-white shadow-2xl shadow-[#8f6b32]/25 transition hover:bg-[#b99b5d]"
        >
          Buche deine Show
        </Link>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section
      id="kontakt"
      className="border-t border-white/10 px-5 py-16 sm:px-8 md:py-24 lg:px-10"
    >
      <div className="mx-auto mb-10 max-w-5xl text-center">
        <p className="mb-4 text-xs font-bold uppercase text-[#b99b5d]">
          Kontakt
        </p>
        <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
          Bereit für einen Auftritt, der bleibt?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-stone-300 md:text-lg">
          Füllen Sie aus und wir melden uns.
        </p>
      </div>
      <ZohoBookingForm />
    </section>
  )
}

function FloatingBookingButton({ visible }: { visible: boolean }) {
  return (
    <Link
      href="/#kontakt"
      className={`fixed bottom-5 right-20 z-50 rounded-md border border-white/10 bg-[#8f6b32] px-5 py-4 text-xs font-black uppercase text-white shadow-2xl shadow-black/50 transition hover:bg-[#b99b5d] sm:bottom-6 sm:right-24 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0 sm:pointer-events-auto sm:translate-y-0 sm:opacity-100'
      }`}
    >
      Show buchen
    </Link>
  )
}

function ScrollToTopButton({ visible }: { visible: boolean }) {
  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      aria-label="Nach oben scrollen"
      className={`fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-md border border-white/10 bg-black/75 text-lg font-black text-white shadow-2xl shadow-black/50 transition hover:border-[#b99b5d] hover:text-[#ead8a8] sm:bottom-6 sm:right-6 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0 sm:pointer-events-auto sm:translate-y-0 sm:opacity-100'
      }`}
      onClick={handleClick}
      type="button"
    >
      ↑
    </button>
  )
}

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Über uns"
        image={banjoVolcanoImage}
        intro="Den Streetdrummern in Chicago und New York City nachempfunden, verwandelt Drums2Streets Fundstücke der Strasse in explosive Instrumente."
        title="Über uns"
      />
      <TextPageSection>
        <ArticleBlock title="Drums2Streets">
          <p>
            Den Streetdrummern in Chicago und New York City nachempfunden,
            trommeln Drums2Streets hauptsächlich auf Plastikeimern,
            Regentonnen, Bauschutt und dem auf den Strassen auffindbaren Abfall,
            der zu explosiven Instrumenten umfunktioniert wird. Was daraus
            entsteht, lässt aufhorchen und staunen: eine abwechslungsreiche
            Mischung aus pulsierenden Rhythmen und gekonnter
            Schlegel-Akrobatik.
          </p>
        </ArticleBlock>
        <ArticleBlock title="Leidenschaftliche Trommelkunst">
          <p>
            Die neun jungen Männer und Frauen im Alter zwischen 18 und 29 Jahren
            verbindet eine gemeinsame Leidenschaft: das Trommeln. Sie alle
            kennen sich vom Tambourenverein Kreuzlingen, wo sie bereits als
            Kinder das Trommeln für sich entdeckten. Die Idee zu Drums2Streets
            stammt ursprünglich von Angelo Razzino. Er liess sich vor ein paar
            Jahren bei einer USA-Reise von den dortigen Strassendrummern
            inspirieren. Zu Hause präsentierte er seine Idee den
            Trommler-Kollegen und gründete seine eigene Drummergruppe:
            Drums2Streets war geboren. Per 2026 hat Angelo Razzino die
            Bandleitung an Marc Hobi übergeben, der Drums2Streets heute als
            Bandleader weiterführt.
          </p>
        </ArticleBlock>
        <ArticleBlock title="Von NYC nach Kreuzlingen">
          <p>
            Wie ihre Vorbilder in New York City spielen auch die innovativen
            Kreuzlinger auf Abfall. Ob alte Pfannen, Regentonnen oder
            Umhängetrommeln: sie bauen alle Instrumente selber und entwickeln
            immer wieder neue Ideen. Gemeinsam entstand auch die Idee zum
            abendfüllenden Programm “Roads of America”, das aus den drei Shows
            “New York”, “Wild West” und “Las Vegas” besteht. Mit dem
            Tourneeprogramm “Roads of America” wagen die neun Drummer den
            nächsten grossen Schritt und beweisen, dass Trommeln eben doch sexy
            ist.
          </p>
        </ArticleBlock>
      </TextPageSection>
      <ContactCta />
    </PageShell>
  )
}

function ShowPage({ show }: { show: ShowFormat }) {
  return (
    <PageShell>
      <PageHero
        eyebrow="Show"
        image={show.image}
        intro={show.intro}
        title={show.name}
      />
      <TextPageSection>
        <ArticleBlock title={show.name}>
          {show.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </ArticleBlock>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#kontakt"
            className="inline-flex justify-center rounded-md bg-[#8f6b32] px-7 py-5 text-sm font-black uppercase text-white shadow-2xl shadow-[#8f6b32]/25 transition hover:bg-[#b99b5d]"
          >
            Buche diese Show
          </Link>
          <Link
            href="/#shows"
            className="inline-flex justify-center rounded-md border border-white/20 px-7 py-5 text-sm font-black uppercase text-white transition hover:border-[#d8c28a] hover:text-[#ead8a8]"
          >
            Zurück zu den Shows
          </Link>
        </div>
      </TextPageSection>
    </PageShell>
  )
}

function BecomeADrummerPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Nachwuchs"
        image={supertalentImage}
        intro="Du möchtest selber trommeln lernen? Hier findest du nützliche Links, die dich deinem Ziel ein Stück näherbringen."
        title="Become a Drummer"
      />
      <BecomeADrummerSection expanded />
      <ContactCta />
    </PageShell>
  )
}

function TextPageSection({ children }: { children: ReactNode }) {
  return (
    <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-10">
      <div className="mx-auto max-w-4xl">{children}</div>
    </section>
  )
}

function ArticleBlock({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <article className="border-t border-white/10 py-10 first:border-t-0 first:pt-0">
      <h2 className="mb-6 text-3xl font-black text-white">{title}</h2>
      <div className="space-y-6 text-lg leading-8 text-stone-300">{children}</div>
    </article>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 pb-28 pt-8 text-sm text-stone-500 sm:px-8 sm:py-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3 sm:items-center">
        <Link href="/" className="inline-flex w-fit">
          <img
            src={logoImage}
            alt="Drums2Streets"
            className="h-16 w-fit object-contain drop-shadow-2xl"
          />
        </Link>
        <div className="flex justify-center gap-4 text-stone-300">
          <a
            aria-label="Drums2Streets auf Facebook"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 transition hover:border-[#b99b5d] hover:text-[#ead8a8]"
            href="https://www.facebook.com/drums2streets/?locale=de_DE"
            rel="noreferrer"
            target="_blank"
          >
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M14.2 8.4V6.9c0-.7.5-.9.9-.9h2.1V2.4l-3-.1c-3.3 0-4 2-4 3.9v2.2H7.6V12h2.6v9.7h4V12h3l.5-3.6h-3.5Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            aria-label="Drums2Streets auf Instagram"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 transition hover:border-[#b99b5d] hover:text-[#ead8a8]"
            href="https://www.instagram.com/drums2streets_show/"
            rel="noreferrer"
            target="_blank"
          >
            <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M7.5 2.8h9A4.7 4.7 0 0 1 21.2 7.5v9a4.7 4.7 0 0 1-4.7 4.7h-9a4.7 4.7 0 0 1-4.7-4.7v-9a4.7 4.7 0 0 1 4.7-4.7Zm0 2A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm4.5 3.3a3.9 3.9 0 1 1 0 7.8 3.9 3.9 0 0 1 0-7.8Zm0 2a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Zm4.2-2.8a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
        <div className="hidden sm:block" />
      </div>
    </footer>
  )
}

function App() {
  const [route, setRoute] = useState<RoutePath>(getPath)

  useEffect(() => {
    function handlePopState() {
      setRoute(getPath())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const currentShow = showFormats.find((show) => show.path === route)

  if (route === '/ueber-uns') {
    return <AboutPage />
  }

  if (route === '/become-a-drummer') {
    return <BecomeADrummerPage />
  }

  if (currentShow) {
    return <ShowPage show={currentShow} />
  }

  return <HomePage />
}

export default App
