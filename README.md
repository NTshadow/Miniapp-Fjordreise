# Miniapp-Fjordreise

En Next.js webapplikasjon for å finne fjordline fergeavganger langs norskekysten, for oppgaven om å bygge en mini bookingapp til stillingen som Web utvikler!

## For å komme i gang: 
```bash
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

---

## Valg og begrunnelser 

### Valg av verktøy 

Backend er implementert med Next.js API Routes, som gjør at frontend og backend ligger i samme prosjekt.

Dette ble valgt for enkelhet og rask utvikling uten behov for separat server.

### Utfordringer
Det jeg syntes var mest utfordrende med denne oppgaven var hvordan jeg skulle håndtere dato valgene uten å hardkode det inn i mockdataen. Dette var relevant for å gjøre søk etter avgangene mer realistisk da det kan være endringer i fergerutene per dag/dato. Selvom de fleste avgangene er stabile tenkte jeg den største forskjellien ble mellom hverdag og helg.

I API-ruten gjenspeiles dette valget gjennom `getSchedule()`-funksjonen, som tar inn en dato og returnerer enten "weekday" eller "weekend". Hvert ruteoppslag i `data/routes.json` har et `schedule`-felt som er en array av hvilke dager ruten opererer. Filtreringen i API-kallet sjekker om rutens schedule inkluderer den beregnede schedule-typen for denne valgte datoen. 

Dette gjør det også enkelt å demonstrerer ulikt API-oppførsel avhengig av dato uten å måtte vedlikeholde data for hundrevis av enkeltdatoer i json filen. 

En annen utfordring jeg møtte på var at jeg opplevde flere ganger at Git-historikken flere ganger ble korrupt fordi prosjektet lå i iCloud Drive, som synkroniserte filer mens Git gjorde commits. Dette kunne låse eller endre `.git`-mappen underveis. Løsningen var å flytte prosjektet til en lokal mappe uten automatisk synkronisering.

### Komponentstruktur, verktøy og gjenbrukbarhet
Jeg ville fokusere på å dele opp koden i små, fokusere komponenter for å unngå gjentagelse. Dette gjorde jeg med components mappen og utils mappen, hvor valgt rute sendes til oppsummering via URL-parametere som JSON-streng, noe som gjør det enkelt å gå direkte til en spesifikk bekreftelse uten ekstra tilstandshåndtering.

`searchForms.tsx` - Søkeskjema med fra/til-valg og datovelger. Validerer at avreise- og ankomststed ikke er det samme.
`results.tsx` - Håndterer visning av søkeresultater, inkludert tom tilstand.
`routeCards.tsx` - Individuelle rutekort med tidslinje, operatør, varighet og pris. Inkluderer også logikk for å vise +1 (dato) når ankomst er dagen etter avreise.
`utils/formatDuration.ts` - Hjelpefunksjon for å formatere reisetid og beregne neste dags ankomst.
`summary/page.tsx` - Oppsummeringsside med generert bookingreferanse og kvitttering.


## Hva jeg ville gjort annerledes med mer tid
#### Innlogging og brukerprofil: 
Brukere skal kunne logge inn og få en personlig oversikt over bookinger, med kvittering og oppsummerig sendt via e-post.
### Betalingsfunksjon:
Integrert betalingsflyt (f.eks. vipps eller kortbetaling) koblet til bookingprosessen.
### Forbedret design: 
Mer polert brukergrensesnitt, universell utforming og bedre mobiltilpassning.
### Flere avganger
Jeg ville også lagt til flere avganger man kan velge utifra.

## Bruk av AI under utvikling
Jeg har brukt AI som hjelpemiddel under utviklingen hovedsakelig Claude assistenten, spesielt for å generere JSON-mockdataen med realistiske avgangstider og reisetider for fergerutene. Dette frigjorde tid for å kunne fokusere på logikk og fil struktur. 
