'use strict';

/* Datos relevados el 4 de octubre de 2026. Precios en USD para 2 personas. */

const BUDGET = 3000;
const NIGHTS = 7;
const ED_CARD_FEE = 40;
const LEVY_RATE = 0.125;
const LEVY_PER_NIGHT = 3;
const CDW_WEEK = 77;

const DATES = {
  A: { label: '11 al 18 de abril', checkIn: '2027-04-11', checkOut: '2027-04-18' },
  B: { label: '18 al 25 de abril', checkIn: '2027-04-18', checkOut: '2027-04-25' },
};

const ORIGINS = { ROS: 'Rosario', BUE: 'Buenos Aires' };

function despegarUrl(origin, dates) {
  const d = DATES[dates];
  return `https://www.despegar.com.ar/shop/flights/results/roundtrip/${origin}/AUA/${d.checkIn}/${d.checkOut}/2/0/0?currency=USD`;
}

const FLIGHTS = [
  {
    id: 'a-ros-latam', dates: 'A', origin: 'ROS', airline: 'LATAM', via: 'Escala en Lima',
    out: ['ROS 07:45 → AUA 18:10', '1 escala · 11 h 25 m'],
    back: ['AUA 19:15 → ROS 06:30 (+1)', '1 escala · 10 h 15 m'],
    minutes: 1300, baggage: 'Mochila + carry-on 12 kg',
    price: 1420, debit: 1364, bag: 184, bagNote: 'Valija: +USD 92 por persona (tarifa Standard)',
    source: 'Despegar', url: despegarUrl('ROS', 'A'), recommended: true,
  },
  {
    id: 'a-ros-copa-latam', dates: 'A', origin: 'ROS', airline: 'Copa + LATAM', via: 'Ida por Panamá, vuelta por Lima',
    out: ['ROS 05:21 → AUA 18:21', '1 escala · 14 h'],
    back: ['AUA 19:15 → ROS 06:30 (+1)', '1 escala · 10 h 15 m'],
    minutes: 1455, baggage: 'Sin valija',
    price: 1425, club: 1378,
    source: 'Despegar', url: despegarUrl('ROS', 'A'),
  },
  {
    id: 'a-ros-copa', dates: 'A', origin: 'ROS', airline: 'Copa', via: 'Escala en Panamá',
    out: ['ROS 05:21 → AUA 18:21', '1 escala · 14 h'],
    back: ['AUA 19:23 → ROS 00:20 (+2)', 'Escala de 18 h 49 m en Panamá'],
    minutes: 2460, baggage: 'Basic: valija con cargo',
    price: 1765, approx: true,
    note: 'USD 360,85 la ida + USD 521,50 la vuelta, por persona. Volviendo el martes 20, la vuelta baja a USD 334,20.',
    source: 'Copa',
    url: 'https://shopping.copaair.com/?roundtrip=true&adults=2&children=0&infants=0&date1=2027-04-11&date2=2027-04-18&promocode=&area1=ROS&area2=AUA&advanced_air_search=false&flexible_dates_v2=false&langid=es',
  },
  {
    id: 'a-bue-latam', dates: 'A', origin: 'BUE', airline: 'LATAM', via: 'Escala en Lima',
    out: ['EZE 07:20 → AUA 18:10', '1 escala · 11 h 50 m'],
    back: ['AUA 19:15 → EZE 06:20 (+1)', '1 escala · 10 h 5 m'],
    minutes: 1315, baggage: 'Mochila + carry-on 12 kg',
    price: 1363, debit: 1308, bag: 184, bagApprox: true,
    source: 'Despegar', url: despegarUrl('BUE', 'A'),
  },
  {
    id: 'a-bue-copa-latam', dates: 'A', origin: 'BUE', airline: 'Copa + LATAM', via: 'Ida por Panamá, vuelta por Lima',
    out: ['EZE 09:04 → AUA 18:21', '1 escala · 10 h 17 m'],
    back: ['AUA 19:15 → EZE 06:20 (+1)', '1 escala · 10 h 5 m'],
    minutes: 1222, baggage: 'Sin valija',
    price: 1339, club: 1295,
    source: 'Despegar', url: despegarUrl('BUE', 'A'),
  },
  {
    id: 'a-bue-copa', dates: 'A', origin: 'BUE', airline: 'Copa', via: 'Escala en Panamá',
    out: ['EZE 09:04 → AUA 18:21', '1 escala · 10 h 17 m'],
    back: ['AUA 07:10 → EZE 23:23', '1 escala · 15 h 13 m'],
    minutes: 1530, baggage: 'Sin valija',
    price: 1402, debit: 1346,
    source: 'Despegar', url: despegarUrl('BUE', 'A'),
  },
  {
    id: 'a-bue-ar', dates: 'A', origin: 'BUE', airline: 'Aerolíneas Argentinas', via: 'Vuelo directo', direct: true,
    out: ['EZE 00:50 → AUA 07:15', 'Directo · 7 h 25 m'],
    back: ['AUA 08:45 → EZE 17:00', 'Directo · 7 h 15 m'],
    minutes: 880, baggage: 'Tarifa Base: sin valija',
    price: 1700, bag: 344, bagNote: 'Tarifa Plus con valija: USD 2.044',
    note: 'Sale el sábado 10 a la noche. USD 428 + USD 422 por persona pagando en dólares (en Despegar: USD 1.721).',
    source: 'Aerolíneas',
    url: 'https://www.aerolineas.com.ar/flights-offers?adt=2&inf=0&chd=0&flexDates=false&cabinClass=Economy&flightType=ROUND_TRIP&leg=BUE-AUA-20270411&leg=AUA-BUE-20270418',
  },
  {
    id: 'b-ros-latam', dates: 'B', origin: 'ROS', airline: 'LATAM', via: 'Escala en Lima',
    out: ['ROS 07:45 → AUA 18:10', '1 escala · 11 h 25 m'],
    back: ['AUA 19:15 → ROS 06:30 (+1)', '1 escala · 10 h 15 m'],
    minutes: 1300, baggage: 'Mochila + carry-on 12 kg',
    price: 1329, debit: 1276, bag: 184, bagApprox: true,
    source: 'Despegar', url: despegarUrl('ROS', 'B'), recommended: true,
  },
  {
    id: 'b-ros-copa-latam', dates: 'B', origin: 'ROS', airline: 'Copa + LATAM', via: 'Ida por Panamá, vuelta por Lima',
    out: ['ROS 05:21 → AUA 18:21', '1 escala · 14 h'],
    back: ['AUA 19:15 → ROS 06:30 (+1)', '1 escala · 10 h 15 m'],
    minutes: 1455, baggage: 'Sin valija',
    price: 1371, club: 1325,
    source: 'Despegar', url: despegarUrl('ROS', 'B'),
  },
  {
    id: 'b-bue-latam', dates: 'B', origin: 'BUE', airline: 'LATAM', via: 'Escala en Lima',
    out: ['AEP 08:40 → AUA 18:10', '1 escala · 10 h 30 m'],
    back: ['AUA 19:15 → AEP 08:30 (+1)', '1 escala · 12 h 15 m'],
    minutes: 1365, baggage: 'Mochila + carry-on 12 kg',
    price: 1342, debit: 1288, bag: 184, bagApprox: true,
    source: 'Despegar', url: despegarUrl('BUE', 'B'),
  },
  {
    id: 'b-bue-copa-latam', dates: 'B', origin: 'BUE', airline: 'Copa + LATAM', via: 'Ida por Panamá, vuelta por Lima',
    out: ['EZE 09:04 → AUA 18:21', '1 escala · 10 h 17 m'],
    back: ['AUA 19:15 → AEP 08:30 (+1)', '1 escala · 12 h 15 m'],
    minutes: 1352, baggage: 'Sin valija',
    price: 1339, club: 1295,
    source: 'Despegar', url: despegarUrl('BUE', 'B'),
  },
];

const OTHER_AIRLINES = {
  A: {
    ROS: ['Arajet desde USD 1.585 (sin carry-on)', 'Aerolíneas Argentinas desde USD 1.728'],
    BUE: ['Aerolíneas Argentinas USD 1.721', 'Avianca desde USD 1.722'],
  },
  B: {
    ROS: ['Arajet desde USD 1.642 (sin carry-on)', 'Aerolíneas Argentinas desde USD 1.707'],
    BUE: ['Avianca desde USD 1.485', 'Aerolíneas Argentinas desde USD 1.774'],
  },
};

const DATE_COMPARE = [
  ['11–18 abr<span class="sub">domingo a domingo</span>', 'USD 1.420 · LATAM', 'USD 1.339 · Copa + LATAM', 'Las fechas que pediste.'],
  ['18–25 abr<span class="sub">domingo a domingo</span>', '<strong>USD 1.329 · LATAM</strong>', 'USD 1.339 · Copa + LATAM', 'La más barata desde Rosario. En Aruba ya es temporada baja y el auto sale menos.'],
  ['11–17 abr<span class="sub">domingo a sábado</span>', 'USD 1.404 · LATAM', '—', 'Solo USD 16 menos, con una noche menos.'],
  ['13–20 abr<span class="sub">martes a martes</span>', 'USD 1.432 · LATAM', '≈ USD 1.357 · LATAM', 'Desde Rosario la ida tiene 2 escalas (30 h).'],
  ['14–21 abr<span class="sub">miércoles a miércoles</span>', '—', '≈ USD 1.141 · Arajet', 'Lo más barato, pero sin carry-on.'],
];

const APTS = [
  {
    id: '897169771390832746', name: 'Sea Star Aruba #4',
    title: 'Acogedora casa isleña, terraza soleada, piscina y naturaleza #4',
    zone: 'Noord · 5 min en auto de las playas', rating: 4.99, reviews: 105,
    features: ['Cama king', 'Pileta y jacuzzi', 'Parrilla', 'Terraza'],
    price: { A: 966, B: 966 }, freeCancel: true,
  },
  {
    id: '1240720376102730474', name: 'Estudio a 5 min de Eagle Beach',
    title: 'Acogedor alojamiento a 5 minutos de Eagle Beach',
    zone: 'Noord · 5 min en auto de Eagle Beach', rating: 4.97, reviews: 32,
    features: ['Vista al jardín', 'Pileta y jacuzzi', 'Sillas y toallas de playa'],
    price: { A: 836, B: 836 }, freeCancel: true,
  },
  {
    id: '820247188516077632', name: 'Bari Aruba #3',
    title: '¡A 3 minutos de la PLAYA! ¡Grandes comodidades! #3',
    zone: 'Noord · 3 min en auto de Eagle Beach y Palm Beach', rating: 4.92, reviews: 132,
    features: ['1 dormitorio', 'Pileta', 'Supermercado a pasos'],
    price: { A: 1028, B: 1028 }, freeCancel: true,
  },
  {
    id: '1405370902386342974', name: 'Palma Real · Signature Stays',
    title: 'NUEVO 1 DORMITORIO/Palma Real Walk Palm Beach por Signature Stays',
    zone: 'Noord · 15 min a pie de Palm Beach', rating: 4.95, reviews: 22,
    features: ['Nuevo', '1 dormitorio', 'Cama king', 'Pileta'],
    price: { A: 1046, B: 1029 }, freeCancel: true,
  },
  {
    id: '974674378723481876', name: 'Apartamento con encanto',
    title: '¡Apartamento con encanto, a pie de playa!',
    zone: 'Noord · a pasos de la playa, según el anuncio', rating: 4.91, reviews: 58,
    features: ['Recién reformado', 'Terraza privada', 'Pileta', 'Cocina equipada'],
    price: { A: 1100, B: 1100 }, freeCancel: false,
  },
  {
    id: '597146893888988025', name: 'Sun Experience 3',
    title: 'Experiencia de sol 3, 1 BR con piscina privada',
    zone: '5 min en auto de Eagle Beach y Palm Beach', rating: 4.96, reviews: 179,
    features: ['Pileta privada', 'Patio', 'Cocina completa'],
    price: { A: 1183, B: 1183 }, freeCancel: false,
  },
  {
    id: '597993527364513989', name: 'Sun Experience 4',
    title: 'Experiencia de sol 4, 1 BR con piscina privada',
    zone: '5 min en auto de Eagle Beach y Palm Beach', rating: 4.97, reviews: 181,
    features: ['Pileta privada', 'Cama king', 'Cocina completa'],
    price: { A: 1307, B: 1307 }, freeCancel: false,
  },
  {
    id: '1321877316088237136', name: 'Sun Cunucu 3',
    title: 'Sun Cunucu 3, una habitación con piscina privada',
    zone: 'Noord · a unos 5 min en auto de Eagle Beach', rating: 5.0, reviews: 73,
    features: ['Pileta privada', 'Decoración moderna'],
    price: { A: 1319, B: 1319 }, freeCancel: false,
  },
  {
    id: '29122171', name: 'A 4 min a pie de Eagle Beach',
    title: 'Apartamento nuevo, a 4 minutos a pie de Eagle Beach',
    zone: 'Noord · complejo residencial', rating: 4.85, reviews: 193,
    features: ['1 dormitorio', '2 camas', 'Pileta', 'Hasta 4 personas'],
    price: { A: 1361, B: 1361 }, freeCancel: false,
  },
];

const CAR_RATES = {
  A: { base: 313, detail: "Jay's: USD 302,50 la semana + patente USD 10,50" },
  B: { base: 260.5, detail: "Jay's (estimado): USD 250 la semana + patente USD 10,50" },
};

const CARS = [
  {
    company: "Jay's Car Rental", url: 'https://www.jayscarrentalaruba.com/cars-rates/economy/',
    car: 'Kia Picanto o similar (casi todos automáticos)',
    rate: 'USD 275 por semana + 10% de impuesto (16/1 al 15/4/2027) + patente USD 1,50 por día',
    insurance: 'CDW USD 77 por semana (franquicia USD 1.000)',
    a: '<strong>USD 390</strong> con CDW<span class="sub">USD 313 sin CDW</span>',
    b: '<strong>≈ USD 338</strong> con CDW<span class="sub">≈ USD 261 sin CDW. La tarifa 2027 no está publicada; uso la de 2026 (USD 250 por semana).</span>',
  },
  {
    company: 'Royal Car Rental', url: 'https://www.arubaroyal.com/deals/',
    car: 'Kia Picanto o similar, automático',
    rate: 'USD 230 por semana (tarifa online del 1/4 al 19/12), con 10% de descuento por semana',
    insurance: 'CDW opcional USD 15 por día',
    a: '<strong>≈ USD 312</strong> con CDW<span class="sub">Confirmar impuestos al reservar</span>',
    b: '<strong>≈ USD 312</strong> con CDW<span class="sub">Confirmar impuestos al reservar</span>',
  },
  {
    company: 'Value Car Rental', url: 'https://www.valuearuba.com/lowseason.php',
    car: 'Kia Picanto',
    rate: 'USD 250 por semana con impuestos (temporada baja 2026)',
    insurance: 'Aparte',
    a: '<span class="sub">Sin tarifa publicada para esas fechas</span>',
    b: '<strong>≈ USD 250</strong> + seguro<span class="sub">Referencia de 2026</span>',
  },
];

/* Asistencia para 2 adultos, 9 días (hasta el aterrizaje de vuelta). Cobran en pesos; USD a unos ARS 1.540. */
const UNIVERSAL_URL = 'https://www.universal-assistance.com/ar/';
const ASSIST_CARD_URL = 'https://www.assistcard.com/ar';

const INSURANCE = [
  {
    id: 'ua-value', company: 'Universal Assistance', short: 'Universal', plan: 'Value', medical: 80000,
    details: ['Preexistencias USD 10.000', 'Odontología USD 600', 'Demora de equipaje USD 300'],
    price: 191, ars: 294954, promo: '35% off', listArs: 453776, listPrice: 294, url: UNIVERSAL_URL,
  },
  {
    id: 'ua-excellence', company: 'Universal Assistance', short: 'Universal', plan: 'Excellence', medical: 150000,
    details: ['Preexistencias USD 15.000', 'Odontología USD 1.000', 'Demora de equipaje USD 400'],
    price: 205, ars: 316936, promo: '35% off', listArs: 487594, listPrice: 316, url: UNIVERSAL_URL, recommended: true,
  },
  {
    id: 'ua-maximum', company: 'Universal Assistance', short: 'Universal', plan: 'Maximum', medical: 300000,
    details: ['Preexistencias USD 20.000', 'Odontología USD 3.000', 'Demora de equipaje USD 400'],
    price: 218, ars: 336243, promo: '50% off', listArs: 672487, listPrice: 436, url: UNIVERSAL_URL,
  },
  {
    id: 'ac-classic', company: 'Assist Card', short: 'Assist Card', plan: 'Classic', medical: 60000,
    details: ['Preexistencias USD 10.000', 'Odontología USD 500', 'Repatriación sanitaria incluida'],
    price: 339.3, ars: 522522, url: ASSIST_CARD_URL,
  },
  {
    id: 'ac-premium', company: 'Assist Card', short: 'Assist Card', plan: 'Premium', medical: 150000,
    details: ['Preexistencias USD 15.000', 'Medicamentos USD 2.000', 'Repatriación sanitaria USD 100.000'],
    price: 367.2, ars: 565488, url: ASSIST_CARD_URL,
  },
  {
    id: 'ac-privileged', company: 'Assist Card', short: 'Assist Card', plan: 'Privileged', medical: 300000,
    details: ['Preexistencias USD 20.000', 'Medicamentos USD 2.500', 'Repatriación sanitaria USD 100.000'],
    price: 396, ars: 609840, url: ASSIST_CARD_URL,
  },
];

const PACKAGES = [
  {
    id: 'p1', tag: 'Recomendado', badge: 'rec', featured: true, title: 'Mejor depto',
    dates: 'B', flight: 'b-ros-latam', pay: 'debit', apt: '897169771390832746', cdw: 'agency', ins: 'ua-excellence',
    text: 'Sea Star #4 (4,99 con 105 reseñas, cama king, pileta y jacuzzi) del 18 al 25, con el vuelo de LATAM más barato y el auto en temporada baja.',
    extra: 'Hay que pagar el vuelo con débito. Con crédito entra solo si tu tarjeta cubre el seguro del auto. El auto es estimado.',
  },
  {
    id: 'p2', tag: 'Tus fechas', badge: '', title: 'Estudio cerca de Eagle Beach',
    dates: 'A', flight: 'a-ros-latam', pay: 'debit', apt: '1240720376102730474', cdw: 'agency', ins: 'ua-excellence',
    text: 'Del 11 al 18 con LATAM desde Rosario y un estudio a 5 minutos de Eagle Beach (4,97, pileta y jacuzzi, cancelación gratuita).',
    extra: 'Hay que pagar el vuelo con débito: con crédito, en el peor caso se pasa por USD 17.',
  },
  {
    id: 'p3', tag: 'Más barato', badge: 'cheap', title: 'Pagando con crédito',
    dates: 'B', flight: 'b-ros-latam', pay: 'credit', apt: '1240720376102730474', cdw: 'agency', ins: 'ua-excellence',
    text: 'El mismo estudio del 18 al 25, con el vuelo pagado con tarjeta de crédito y el seguro del auto de la rentadora.',
    extra: "No depende del débito ni de la tarjeta. El auto es estimado: Jay's todavía no publicó la tarifa de temporada baja 2027.",
  },
];

const CHECKLIST = [
  ['ED card', 'Cada uno la completa online en edcardaruba.aw, entre 7 días y 4 horas antes del vuelo. Incluye la Sustainability Fee de USD 20 por persona, ya sumada en los totales.'],
  ['Pasaporte', 'Vigente durante toda la estadía. Los argentinos no necesitan visa. Pueden pedir pasaje de vuelta, reserva de alojamiento y fondos suficientes.'],
  ['Asistencia al viajero', 'No es obligatoria para Aruba, pero conviene. Si eligen Universal, cómprenla hasta el 12 de octubre para tener el descuento: Excellence cuesta USD 205 para los dos (sin promo, ≈ USD 316) y cubre hasta USD 150.000 en gastos médicos.'],
  ['Pagar en dólares', 'En Despegar, pagando en USD no se cobra la percepción RG 5617 (30%). Con débito, el vuelo de LATAM baja unos USD 55; dos de las combinaciones cuentan con eso.'],
  ['Equipaje', 'LATAM Light incluye mochila y carry-on de 12 kg por persona. Para despachar valija, la tarifa Standard cuesta USD 92 más por persona.'],
  ['Retiro del auto', "Llegan el domingo a las 18:10 y la web de Jay's dice que entrega de lunes a viernes, de 8 a 17:30. Confirmen por WhatsApp (+297 566-6888) que les dejan el auto en el aeropuerto; si no pueden, consulten a Royal (+297 744-9955). Edad mínima: 23 años. Jay's pide un depósito de USD 300."],
  ['Seguro del auto', 'Muchas tarjetas Gold o Platinum cubren el CDW en el exterior. Si la de ustedes lo cubre, se ahorran USD 77.'],
  ['Total del depto', 'Antes de pagar en Airbnb, revisen la línea de impuestos: Aruba cobra 12,5% + USD 3 por noche y algunos anfitriones lo suman al final.'],
  ['Precios', 'Son del 4 de octubre de 2026. Los vuelos suben a medida que se acerca la fecha; conviene comprar el pasaje primero.'],
];

/* Estado y cálculos */

const state = {
  dates: 'B',
  flight: 'b-ros-latam',
  pay: 'debit',
  bag: false,
  apt: '897169771390832746',
  cdw: 'agency',
  ins: 'ua-excellence',
  levy: 'add',
  origin: 'all',
  flightSort: 'price',
  aptSort: 'price',
};

const money = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });
const usd = (n) => `USD ${money.format(Math.round(n))}`;
const num = (n) => money.format(Math.round(n));
const ratingText = (n) => (Number.isInteger(n) ? n.toFixed(1) : String(n)).replace('.', ',');

const flightById = (id) => FLIGHTS.find((f) => f.id === id);
const aptById = (id) => APTS.find((a) => a.id === id);
const insuranceById = (id) => INSURANCE.find((i) => i.id === id);
const flightsFor = (dates) => FLIGHTS.filter((f) => f.dates === dates);
const levyFor = (price) => price * LEVY_RATE + LEVY_PER_NIGHT * NIGHTS;
const carFor = (dates, cdw) => CAR_RATES[dates].base + (cdw === 'agency' ? CDW_WEEK : 0);

function airbnbUrl(apt, dates) {
  const d = DATES[dates];
  return `https://www.airbnb.com.ar/rooms/${apt.id}?check_in=${d.checkIn}&check_out=${d.checkOut}&adults=2`;
}

function compute(s) {
  const flight = flightById(s.flight);
  const apt = aptById(s.apt);
  const flightCost = s.pay === 'debit' && flight.debit ? flight.debit : flight.price;
  const bagCost = s.bag && flight.bag ? flight.bag : 0;
  const aptCost = apt.price[s.dates];
  const levyCost = s.levy === 'add' ? levyFor(aptCost) : 0;
  const carCost = carFor(s.dates, s.cdw);
  const insurance = insuranceById(s.ins);
  const insCost = insurance ? insurance.price : 0;
  const total = flightCost + bagCost + aptCost + levyCost + carCost + insCost + ED_CARD_FEE;
  return { flight, apt, insurance, flightCost, bagCost, aptCost, levyCost, carCost, insCost, total };
}

function equivalentFlight(id, dates) {
  const current = flightById(id);
  const options = flightsFor(dates);
  const match = options.find((f) => f.origin === current.origin && f.airline === current.airline)
    || options.find((f) => f.origin === current.origin)
    || options[0];
  return match.id;
}

function setState(patch) {
  const next = { ...state, ...patch };
  if (patch.dates && patch.dates !== state.dates && !patch.flight) {
    next.flight = equivalentFlight(state.flight, patch.dates);
  }
  const flight = flightById(next.flight);
  next.dates = flight.dates;
  if (!flight.debit) next.pay = 'credit';
  if (!flight.bag) next.bag = false;
  Object.assign(state, next);
  render();
}

/* Render */

function renderControls() {
  const flight = flightById(state.flight);

  document.querySelectorAll('.seg[data-key]').forEach((group) => {
    const key = group.dataset.key;
    group.querySelectorAll('button[data-value]').forEach((button) => {
      button.setAttribute('aria-pressed', String(state[key] === button.dataset.value));
    });
  });

  const debitButton = document.querySelector('.seg[data-key="pay"] button[data-value="debit"]');
  debitButton.disabled = !flight.debit;
  debitButton.textContent = flight.debit
    ? `Débito (−${usd(flight.price - flight.debit)})`
    : 'Débito (sin dato)';

  const bag = document.getElementById('bag');
  bag.checked = state.bag;
  bag.disabled = !flight.bag;
  document.getElementById('bag-label').textContent = flight.bag
    ? `Sumar valija despachada (+${usd(flight.bag)}${flight.bagApprox ? ' aprox.' : ''})`
    : 'Valija despachada: precio no relevado para este vuelo';

  const flightSelect = document.getElementById('sel-flight');
  flightSelect.innerHTML = flightsFor(state.dates)
    .slice()
    .sort((a, b) => a.price - b.price)
    .map((f) => `<option value="${f.id}">${f.airline} desde ${ORIGINS[f.origin]} · ${f.approx ? '≈ ' : ''}${usd(f.price)}</option>`)
    .join('');
  flightSelect.value = state.flight;

  const aptSelect = document.getElementById('sel-apt');
  aptSelect.innerHTML = APTS
    .slice()
    .sort((a, b) => a.price[state.dates] - b.price[state.dates])
    .map((a) => `<option value="${a.id}">${a.name} · ★ ${ratingText(a.rating)} · ${usd(a.price[state.dates])}</option>`)
    .join('');
  aptSelect.value = state.apt;

  const insSelect = document.getElementById('sel-ins');
  insSelect.innerHTML = `${INSURANCE
    .map((i) => `<option value="${i.id}">${i.short} ${i.plan} · médica USD ${num(i.medical)} · ${usd(i.price)}</option>`)
    .join('')}<option value="none">No sumar (ya tengo con la tarjeta u otra)</option>`;
  insSelect.value = state.ins;
}

function renderResult() {
  const r = compute(state);
  const diff = BUDGET - r.total;
  const flightExtras = [
    state.pay === 'debit' && r.flight.debit ? 'pago con débito' : '',
    r.bagCost ? 'con valija' : '',
  ].filter(Boolean).join(', ');

  const items = [
    {
      key: 'flight', label: 'Vuelos', value: r.flightCost + r.bagCost,
      detail: `${r.flight.airline} desde ${ORIGINS[r.flight.origin]}${flightExtras ? ` (${flightExtras})` : ''}`,
      sub: `${r.flight.out[0]} · vuelta ${r.flight.back[0]}`,
    },
    {
      key: 'apt', label: 'Departamento', value: r.aptCost,
      detail: `${r.apt.name} · ★ ${ratingText(r.apt.rating)} · 7 noches`,
    },
    {
      key: 'levy', label: 'Impuesto turístico', value: r.levyCost,
      detail: '12,5% + USD 3 por noche, por si lo cobran aparte',
    },
    {
      key: 'car', label: 'Auto', value: r.carCost,
      detail: `${CAR_RATES[state.dates].detail}${state.cdw === 'agency' ? ' + CDW USD 77' : ' · seguro de la tarjeta'}`,
    },
    {
      key: 'ins', label: 'Asistencia al viajero', value: r.insCost,
      detail: r.insurance ? `${r.insurance.short} ${r.insurance.plan} · cobertura médica USD ${num(r.insurance.medical)} · 9 días` : '',
    },
    {
      key: 'ed', label: 'ED card', value: ED_CARD_FEE,
      detail: 'Sustainability Fee de USD 20 por persona',
    },
  ].filter((item) => item.value > 0);

  const scale = Math.max(BUDGET, r.total);
  const notes = [];
  if (state.dates === 'B') {
    notes.push("El auto del 18 al 25 es estimado: Jay's todavía no publicó la tarifa de temporada baja 2027.");
  }
  if (r.flight.approx) {
    notes.push('El precio de este vuelo es aproximado: suma la ida y la vuelta que muestra copaair.com.');
  }
  if (r.bagCost && r.flight.bagApprox) {
    notes.push('El costo de la valija se relevó en LATAM desde Rosario del 11 al 18; para este vuelo es aproximado.');
  }
  if (r.insurance && r.insurance.listPrice) {
    notes.push(`La asistencia tiene la promo de Universal, válida comprando hasta el 12 de octubre de 2026; sin promo cuesta ≈ ${usd(r.insurance.listPrice)}.`);
  }
  if (!r.insurance) {
    notes.push('Sin asistencia sumada: revisen que la de su tarjeta cubra gastos médicos en Aruba.');
  }
  if (diff < 0) {
    const insTip = r.insCost > 300 ? ' la asistencia de Universal,' : '';
    notes.push(`Para entrar en USD 3.000: probá un depto más barato,${insTip} el seguro de tu tarjeta para el auto o pagar el vuelo con débito.`);
  }

  document.getElementById('calc-result').innerHTML = `
    <div class="result-top">
      <div>
        <p class="kicker">Total para 2 · ${DATES[state.dates].label}</p>
        <p class="total">${usd(r.total)}</p>
        <p class="per-person">${usd(r.total / 2)} por persona</p>
      </div>
      <span class="status ${diff >= 0 ? 'is-ok' : 'is-over'}">${diff >= 0 ? `Sobran ${usd(diff)}` : `Se pasa por ${usd(-diff)}`}</span>
    </div>
    <div class="budget" role="img" aria-label="Composición del total frente al tope de USD 3.000">
      <div class="budget-bar">
        ${items.map((item) => `<span class="c-${item.key}" style="width:${(item.value / scale) * 100}%"></span>`).join('')}
      </div>
      <div class="budget-cap" style="left:${(BUDGET / scale) * 100}%"><span>Tope USD 3.000</span></div>
    </div>
    <ul class="breakdown">
      ${items.map((item) => `
        <li>
          <i class="dot c-${item.key}"></i>
          <div>
            <strong>${item.label}</strong>
            <span class="sub">${item.detail}</span>
            ${item.sub ? `<span class="sub">${item.sub}</span>` : ''}
          </div>
          <b>${usd(item.value)}</b>
        </li>`).join('')}
    </ul>
    ${notes.length ? `<div class="result-notes">${notes.map((n) => `<p>${n}</p>`).join('')}</div>` : ''}
  `;
}

function renderPackages() {
  document.getElementById('packages').innerHTML = PACKAGES.map((p) => {
    const config = { ...state, dates: p.dates, flight: p.flight, apt: p.apt, cdw: p.cdw, pay: p.pay, ins: p.ins, bag: false };
    const low = compute({ ...config, levy: 'included' });
    const high = compute({ ...config, levy: 'add' });
    return `
      <article class="package card${p.featured ? ' is-featured' : ''}">
        <div class="package-head">
          <span class="badge ${p.badge}">${p.tag}</span>
          <span class="sub">${DATES[p.dates].label}</span>
        </div>
        <h3>${p.title}</h3>
        <p class="package-text">${p.text}</p>
        <dl class="package-lines">
          <div><dt>Vuelo ${low.flight.airline} desde ${ORIGINS[low.flight.origin]}${p.pay === 'debit' ? ' (débito)' : ''}</dt><dd>${usd(low.flightCost)}</dd></div>
          <div><dt>${low.apt.name}</dt><dd>${usd(low.aptCost)}</dd></div>
          <div><dt>Auto ${p.cdw === 'agency' ? 'con CDW' : 'sin CDW (tarjeta)'}</dt><dd>${p.dates === 'B' ? '≈ ' : ''}${usd(low.carCost)}</dd></div>
          <div><dt>Asistencia ${low.insurance.short} ${low.insurance.plan}</dt><dd>${usd(low.insCost)}</dd></div>
          <div><dt>ED card (2 personas)</dt><dd>${usd(ED_CARD_FEE)}</dd></div>
        </dl>
        <div class="package-total">
          <span class="sub">Total para 2</span>
          <strong>${usd(low.total)} – ${num(high.total)}</strong>
          <span class="sub">${usd(low.total / 2)} – ${num(high.total / 2)} por persona</span>
        </div>
        <p class="package-extra">${p.extra}</p>
        <button type="button" class="btn" data-package="${p.id}">Ver en la calculadora</button>
      </article>`;
  }).join('');
}

function renderFlights() {
  let list = flightsFor(state.dates);
  if (state.origin !== 'all') list = list.filter((f) => f.origin === state.origin);
  list = list.slice().sort((a, b) => (state.flightSort === 'duration' ? a.minutes - b.minutes : a.price - b.price));
  const cheapest = Math.min(...list.map((f) => f.price));
  const fastest = Math.min(...list.map((f) => f.minutes));

  document.getElementById('flights-body').innerHTML = list.map((f) => {
    const selected = f.id === state.flight;
    const badges = [
      f.recommended ? '<span class="badge rec">Recomendado</span>' : '',
      f.price === cheapest ? '<span class="badge cheap">Más barato</span>' : '',
      f.direct ? '<span class="badge direct">Directo</span>' : '',
      !f.direct && f.minutes === fastest ? '<span class="badge">Más corto</span>' : '',
    ].join('');
    const prices = [
      f.debit ? `<span class="sub">${usd(f.debit)} con débito</span>` : '',
      f.club ? `<span class="sub">${usd(f.club)} con Club Despegar</span>` : '',
      `<span class="sub">${usd(f.price / 2)} por persona</span>`,
    ].join('');
    return `
      <tr class="${selected ? 'is-selected' : ''}">
        <td>
          <div class="airline">${f.airline}</div>
          <span class="sub">Desde ${ORIGINS[f.origin]} · ${f.via}</span>
          ${badges ? `<div class="badges">${badges}</div>` : ''}
          ${f.note ? `<span class="sub row-note">${f.note}</span>` : ''}
        </td>
        <td data-label="Ida">${f.out[0]}<span class="sub">${f.out[1]}</span></td>
        <td data-label="Vuelta">${f.back[0]}<span class="sub">${f.back[1]}</span></td>
        <td data-label="Equipaje">${f.baggage}${f.bagNote ? `<span class="sub">${f.bagNote}</span>` : ''}</td>
        <td class="num" data-label="Total 2 personas"><strong>${f.approx ? '≈ ' : ''}${usd(f.price)}</strong>${prices}</td>
        <td>
          <div class="actions">
            <button type="button" class="btn small${selected ? ' is-active' : ''}" data-set="flight" data-value="${f.id}">${selected ? 'Elegido' : 'Elegir'}</button>
            <a class="btn small ghost" href="${f.url}" target="_blank" rel="noopener">Ver en ${f.source}</a>
          </div>
        </td>
      </tr>`;
  }).join('');

  const origins = state.origin === 'all' ? ['ROS', 'BUE'] : [state.origin];
  document.getElementById('flights-others').innerHTML = `<strong>Otras aerolíneas en Despegar</strong> (precio desde, 2 personas): ${origins
    .map((o) => `${ORIGINS[o]}: ${OTHER_AIRLINES[state.dates][o].join(' · ')}`)
    .join('. ')}.`;
}

function renderApts() {
  const list = APTS.slice().sort((a, b) => (state.aptSort === 'rating'
    ? b.rating - a.rating || b.reviews - a.reviews
    : a.price[state.dates] - b.price[state.dates]));

  document.getElementById('apts').innerHTML = list.map((a) => {
    const price = a.price[state.dates];
    const trip = compute({ ...state, apt: a.id });
    const selected = a.id === state.apt;
    const url = airbnbUrl(a, state.dates);
    return `
      <article class="apt card${selected ? ' is-selected' : ''}">
        <div class="apt-head">
          <h3><a href="${url}" target="_blank" rel="noopener">${a.name}</a></h3>
          <span class="rating">★ ${ratingText(a.rating)} <span>(${a.reviews})</span></span>
        </div>
        <p class="apt-title">“${a.title}”</p>
        <p class="sub">${a.zone}</p>
        <ul class="chips">${a.features.map((feature) => `<li>${feature}</li>`).join('')}</ul>
        <div class="apt-price">
          <strong>${usd(price)}</strong>
          <span class="sub">7 noches · ${usd(price / NIGHTS)} por noche</span>
          <span class="sub">Si cobran el impuesto aparte: ${usd(price + levyFor(price))}</span>
        </div>
        <div class="apt-meta">
          <span class="tag${a.freeCancel ? ' ok' : ''}">${a.freeCancel ? 'Cancelación gratuita' : 'Sin cancelación gratuita'}</span>
          <span class="tag ${trip.total > BUDGET ? 'over' : 'ok'}">Viaje completo: ${usd(trip.total)}</span>
        </div>
        <div class="apt-actions">
          <button type="button" class="btn${selected ? ' is-active' : ''}" data-set="apt" data-value="${a.id}">${selected ? 'Elegido en la calculadora' : 'Elegir este'}</button>
          <a class="btn ghost" href="${url}" target="_blank" rel="noopener">Ver en Airbnb</a>
        </div>
      </article>`;
  }).join('');
}

function renderInsurance() {
  const cheapest = Math.min(...INSURANCE.map((i) => i.price));

  document.getElementById('ins-body').innerHTML = INSURANCE.map((i) => {
    const selected = i.id === state.ins;
    const badges = [
      i.recommended ? '<span class="badge rec">Recomendado</span>' : '',
      i.price === cheapest ? '<span class="badge cheap">Más barato</span>' : '',
      i.promo ? `<span class="badge direct">${i.promo} hasta el 12/10</span>` : '',
    ].join('');
    return `
      <tr class="${selected ? 'is-selected' : ''}">
        <td>
          <div class="airline">${i.company} · ${i.plan}</div>
          ${badges ? `<div class="badges">${badges}</div>` : ''}
        </td>
        <td data-label="Cobertura médica"><strong>USD ${num(i.medical)}</strong></td>
        <td data-label="Incluye">${i.details.join('<br>')}</td>
        <td class="num" data-label="Total 2 personas">
          <strong>${usd(i.price)}</strong>
          <span class="sub">ARS ${num(i.ars)}</span>
          ${i.listArs ? `<span class="sub">Sin promo: ARS ${num(i.listArs)} (≈ ${usd(i.listPrice)})</span>` : ''}
        </td>
        <td>
          <div class="actions">
            <button type="button" class="btn small${selected ? ' is-active' : ''}" data-set="ins" data-value="${i.id}">${selected ? 'Elegido' : 'Elegir'}</button>
            <a class="btn small ghost" href="${i.url}" target="_blank" rel="noopener">Ver en ${i.short}</a>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function renderStatic() {
  const dateLabels = ['', 'Mejor desde Rosario', 'Mejor desde Buenos Aires', 'Comentario'];
  document.getElementById('dates-body').innerHTML = DATE_COMPARE
    .map((row) => `<tr>${row.map((cell, i) => (i === 0
      ? `<td class="nowrap">${cell}</td>`
      : `<td data-label="${dateLabels[i]}">${cell}</td>`)).join('')}</tr>`)
    .join('');

  document.getElementById('cars-body').innerHTML = CARS.map((c) => `
    <tr>
      <td class="nowrap"><a href="${c.url}" target="_blank" rel="noopener">${c.company}</a></td>
      <td data-label="Auto">${c.car}</td>
      <td data-label="Tarifa">${c.rate}</td>
      <td data-label="Seguro">${c.insurance}</td>
      <td data-label="7 días · 11–18">${c.a}</td>
      <td data-label="7 días · 18–25">${c.b}</td>
    </tr>`).join('');

  document.getElementById('checklist').innerHTML = CHECKLIST
    .map(([title, text]) => `<li><strong>${title}</strong><span>${text}</span></li>`)
    .join('');
}

function render() {
  renderControls();
  renderResult();
  renderFlights();
  renderApts();
  renderInsurance();
}

/* Eventos */

function goToCalculator() {
  document.getElementById('calculadora').scrollIntoView({ behavior: 'smooth', block: 'start' });
  const result = document.getElementById('calc-result');
  result.classList.remove('flash');
  void result.offsetWidth;
  result.classList.add('flash');
}

document.addEventListener('click', (event) => {
  const segButton = event.target.closest('.seg button[data-value]');
  if (segButton) {
    if (!segButton.disabled) setState({ [segButton.closest('.seg').dataset.key]: segButton.dataset.value });
    return;
  }

  const setButton = event.target.closest('[data-set]');
  if (setButton) {
    setState({ [setButton.dataset.set]: setButton.dataset.value });
    return;
  }

  const packageButton = event.target.closest('[data-package]');
  if (packageButton) {
    const p = PACKAGES.find((item) => item.id === packageButton.dataset.package);
    setState({ dates: p.dates, flight: p.flight, apt: p.apt, cdw: p.cdw, pay: p.pay, ins: p.ins, bag: false });
    goToCalculator();
  }
});

document.getElementById('sel-flight').addEventListener('change', (event) => setState({ flight: event.target.value }));
document.getElementById('sel-apt').addEventListener('change', (event) => setState({ apt: event.target.value }));
document.getElementById('sel-ins').addEventListener('change', (event) => setState({ ins: event.target.value }));
document.getElementById('bag').addEventListener('change', (event) => setState({ bag: event.target.checked }));

renderStatic();
renderPackages();
render();
