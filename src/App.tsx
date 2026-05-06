import type { FormEvent } from 'react'
import logoImage from './assets/D2S_Logo-01.jpg'
import heroImage from './assets/D2S Wild West.jpg'
import saloonImage from './assets/D2S Saloon.jpg'
import shovelImage from './assets/D2S Wild West Shovel.jpg'
import andrinImage from './assets/Andrin Baer sepia.jpg'
import angeloImage from './assets/Angelo Razzino sepia.jpg'
import danielImage from './assets/Daniel Rothammer sepia.jpg'
import nicoImage from './assets/Nico Ernst sepia.jpg'
import timonImage from './assets/Timon Willi sepia.jpg'

type ShowFormat = {
  name: string
  label: string
  description: string
  image: string
}

type Benefit = {
  title: string
  text: string
}

type Member = {
  name: string
  image: string
}

type FieldProps = {
  label: string
  name: string
  maxLength: number
  required?: boolean
  placeholder?: string
  type?: 'text' | 'email' | 'tel' | 'url'
}

const showFormats: ShowFormat[] = [
  {
    name: 'Swiss Made',
    label: 'Präzision und Heimat',
    description:
      'Ein kraftvolles Format mit Schweizer Charakter, klaren Rhythmen und hochwertiger Bühnenwirkung.',
    image: shovelImage,
  },
  {
    name: 'Wild West',
    label: 'Staub, Tempo, Show',
    description:
      'Cinematic Drumming mit rauer Energie, starken Bildern und einem Auftritt, der sofort Atmosphäre schafft.',
    image: saloonImage,
  },
  {
    name: 'New York',
    label: 'Urban und direkt',
    description:
      'Street-Performance, Groove und Grossstadtpuls für Events, die modern, schnell und präsent wirken sollen.',
    image: heroImage,
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
  { name: 'Andrin Baer', image: andrinImage },
  { name: 'Angelo Razzino', image: angeloImage },
  { name: 'Daniel Rothammer', image: danielImage },
  { name: 'Nico Ernst', image: nicoImage },
  { name: 'Timon Willi', image: timonImage },
]

const galleryImages = [heroImage, saloonImage, shovelImage, ...members.map((member) => member.image)]

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
  'Straße',
  'Stadt',
  'Postleitzahl',
  'Wo haben Sie Drums2Streets entdeckt?',
  'Datum des Events',
  'Eventbezeichnung',
]

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
      <p className="mb-3 text-xs font-bold uppercase text-[#2f7dca]">{eyebrow}</p>
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

function ShowCard({ show, index }: { show: ShowFormat; index: number }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-stone-950">
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
          <p className="mb-2 text-xs font-bold uppercase text-[#7db7ee]">
            {show.label}
          </p>
          <h3 className="text-3xl font-black text-white">{show.name}</h3>
        </div>
      </div>
      <p className="p-5 text-sm leading-6 text-stone-300">{show.description}</p>
    </article>
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
        {required ? <span className="text-[#2f7dca]"> *</span> : null}
      </span>
      <input
        className="w-full rounded-md border border-white/10 bg-black/45 px-4 py-3 text-base text-white outline-none transition placeholder:text-stone-600 focus:border-[#2f7dca]"
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
        {required ? <span className="text-[#2f7dca]"> *</span> : null}
      </span>
      <textarea
        className="min-h-28 w-full rounded-md border border-white/10 bg-black/45 px-4 py-3 text-base text-white outline-none transition placeholder:text-stone-600 focus:border-[#2f7dca]"
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
            <p className="text-xs font-bold uppercase text-[#2f7dca]">
              CRM Booking-Anfrage
            </p>
            <h3 className="mt-2 text-2xl font-black text-white">
              Booking-Anfrage Drums2Streets
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Firma" maxLength={100} name="Company" />
            <FormField label="Vorname" maxLength={40} name="First Name" required />
            <FormField label="Nachname" maxLength={80} name="Last Name" required />
            <FormField label="Straße" maxLength={250} name="Street" required />
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
              className="rounded-md bg-[#155a9f] px-7 py-4 text-sm font-black text-white transition hover:bg-[#2f7dca]"
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

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-stone-100">
      <section className="relative min-h-[92svh] border-b border-white/10">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-[#070707]" />
        <div className="relative mx-auto flex min-h-[92svh] max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
          <header className="rounded-lg border border-white/10 bg-black/55 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-md sm:px-5">
            <div className="flex items-center justify-between gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-3"
                aria-label="Drums2Streets"
              >
                <span className="flex h-14 w-36 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white px-3 shadow-lg shadow-black/30 sm:w-44">
                  <img
                    src={logoImage}
                    alt="Drums2Streets"
                    className="h-full w-full object-contain"
                  />
                </span>
            </a>
              <nav className="hidden items-center gap-6 text-sm font-semibold text-stone-300 md:flex">
                <a className="hover:text-white" href="#shows">
                  Shows
                </a>
                <a className="hover:text-white" href="#buchen">
                  Buchen
                </a>
                <a className="hover:text-white" href="#galerie">
                  Galerie
                </a>
                <a className="hover:text-white" href="#kontakt">
                  Kontakt
                </a>
              </nav>
              <a
                href="#kontakt"
                className="hidden rounded-md bg-[#155a9f] px-4 py-3 text-xs font-black text-white transition hover:bg-[#2f7dca] sm:inline-flex"
              >
                Anfrage
              </a>
            </div>
          </header>

          <div className="flex flex-1 items-end pb-12 pt-28 md:pb-16">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-black leading-[0.98] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                Rhythmus, der Events in Bewegung bringt.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-200 md:text-xl">
                Drums2Streets liefert explosive Live-Performance für Festivals,
                Firmenanlässe, Privatfeiern und Bühnen, die mehr als Musik
                brauchen.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#kontakt"
                  className="inline-flex justify-center rounded-md bg-[#155a9f] px-6 py-4 text-sm font-black text-white transition hover:bg-[#2f7dca]"
                >
                  Anfrage starten
                </a>
                <a
                  href="#shows"
                  className="inline-flex justify-center rounded-md border border-white/20 px-6 py-4 text-sm font-black text-white transition hover:border-white/45"
                >
                  Showformate ansehen
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase text-[#2f7dca]">
              Kurzprofil
            </p>
            <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
              Professionelle Drum Shows mit Schweizer Präzision.
            </h2>
          </div>
          <p className="text-base leading-8 text-stone-300 md:text-lg">
            Wir verbinden perkussive Energie, Choreografie und eine klare
            visuelle Sprache. Das Resultat ist eine Show, die auf grossen
            Bühnen trägt und bei exklusiven Anlässen genauso stark funktioniert.
          </p>
        </div>
      </section>

      <section
        id="shows"
        className="border-y border-white/10 bg-stone-950/70 px-5 py-16 sm:px-8 md:py-24 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Showformate"
            title="Drei Welten, ein kompromissloser Puls."
            text="Jedes Format ist als starker Programmpunkt, Opening, Highlight oder Überraschungsmoment einsetzbar."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {showFormats.map((show, index) => (
              <ShowCard key={show.name} show={show} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        id="buchen"
        className="px-5 py-16 sm:px-8 md:py-24 lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase text-[#2f7dca]">
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

      <section
        id="galerie"
        className="border-y border-white/10 bg-black px-5 py-16 sm:px-8 md:py-24 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Galerie"
            title="Live-Momente, Bühnenenergie und Gesichter der Show."
            text="Ein erster Einblick in die Bildwelt von Drums2Streets. Weitere Auftrittsbilder und Video-Stills können später ergänzt werden."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image, index) => (
              <div
                className="aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-stone-900"
                key={image}
              >
                <img
                  src={image}
                  alt={`Drums2Streets Galerie ${index + 1}`}
                  className="h-full w-full object-cover opacity-85 transition duration-500 hover:scale-105 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Crew"
            title="Menschen hinter dem Sound."
            text="Die Sepia-Portraits sind als ruhiger Kontrast zur lauten Show inszeniert und geben der Seite mehr Persönlichkeit."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {members.map((member) => (
              <article
                className="overflow-hidden rounded-lg border border-white/10 bg-stone-950"
                key={member.name}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover opacity-90"
                  />
                </div>
                <h3 className="p-4 text-sm font-black text-white">{member.name}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="kontakt"
        className="border-t border-white/10 px-5 py-16 sm:px-8 md:py-24 lg:px-10"
      >
        <div className="mx-auto mb-10 max-w-5xl text-center">
          <p className="mb-4 text-xs font-bold uppercase text-[#2f7dca]">
            Kontakt
          </p>
          <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
            Bereit für einen Auftritt, der bleibt?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-stone-300 md:text-lg">
            Füllen Sie die Anfrage aus. Die Daten gehen direkt an unser CRM für
            eine saubere Booking-Bearbeitung.
          </p>
        </div>
        <ZohoBookingForm />
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-sm text-stone-500 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <img
            src={logoImage}
            alt="Drums2Streets"
            className="h-10 w-fit rounded-sm bg-white object-contain px-2 py-1"
          />
          <p>Premium Drum Shows aus der Schweiz</p>
        </div>
      </footer>
    </main>
  )
}

export default App
