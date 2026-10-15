'use strict';

/* Datos relevados el 14 de octubre de 2026. Precios en USD para 2 personas. */

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const WEEKDAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const SCHEDULE = {
  dom: {
    out: 'ROS 03:39 → PUJ 10:22',
    back: 'PUJ 20:15 → ROS 04:55 del lunes',
    days: 9,
    hint: 'Salen el sábado a la noche y la vuelta llega el lunes de madrugada.',
  },
  lun: {
    out: 'ROS 05:55 → PUJ 12:38',
    back: 'PUJ 14:38 → ROS 23:18',
    days: 8,
    hint: 'La vuelta es de día y llegan el mismo lunes a la noche.',
  },
  mar: {
    out: 'ROS 01:12 → PUJ 07:55',
    back: 'PUJ 18:10 → ROS 02:50 del miércoles',
    days: 9,
    hint: 'Salen el lunes a la noche y llegan al hotel a la mañana.',
  },
};

/* Tarifa Basic de Arajet, ida y vuelta para 2 (Google Flights). */
const TRIPS = [
  { week: 1, day: 'dom', out: '2027-01-03', back: '2027-01-10', flight: 3620 },
  { week: 1, day: 'lun', out: '2027-01-04', back: '2027-01-11', flight: 3202 },
  { week: 1, day: 'mar', out: '2027-01-05', back: '2027-01-12', flight: 2454 },
  { week: 2, day: 'dom', out: '2027-01-10', back: '2027-01-17', flight: 2364 },
  { week: 2, day: 'lun', out: '2027-01-11', back: '2027-01-18', flight: 2325 },
  { week: 2, day: 'mar', out: '2027-01-12', back: '2027-01-19', flight: 2669 },
  { week: 3, day: 'dom', out: '2027-01-17', back: '2027-01-24', flight: 3320 },
  { week: 3, day: 'lun', out: '2027-01-18', back: '2027-01-25', flight: 2454 },
  { week: 3, day: 'mar', out: '2027-01-19', back: '2027-01-26', flight: 2787 },
  { week: 4, day: 'dom', out: '2027-01-24', back: '2027-01-31', flight: 2641 },
  { week: 4, day: 'lun', out: '2027-01-25', back: '2027-02-01', flight: 2364 },
  { week: 4, day: 'mar', out: '2027-01-26', back: '2027-02-02', flight: 2454 },
  { week: 5, day: 'dom', out: '2027-01-31', back: '2027-02-07', flight: 2289 },
];

const FEBRUARY_TRIP = { day: 'lun', out: '2027-02-01', back: '2027-02-08', flight: 2214 };

const WEEKS = {
  1: 'Semana 1 · salidas del 3 al 5 de enero',
  2: 'Semana 2 · salidas del 10 al 12 de enero',
  3: 'Semana 3 · salidas del 17 al 19 de enero',
  4: 'Semana 4 · salidas del 24 al 26 de enero',
  5: 'Semana 5 · salida del 31 de enero',
};

const LUGGAGE = {
  classic: {
    label: '2 carry-on + 1 valija de 23 kg',
    price: 158,
    approx: true,
    detail: 'tarifa Classic para los dos, USD 92, más una valija de 23 kg desde USD 66 ida y vuelta',
  },
  basic: { label: 'Solo mochila', price: 0, detail: 'tarifa Basic, una mochila de 6 kg cada uno' },
  comfort: { label: '2 valijas de 23 kg', price: 122, detail: 'tarifa Comfort para los dos, sin carry-on' },
  extra: { label: '2 carry-on + 2 valijas', price: 420, detail: 'tarifa Extra para los dos, con cambios sin cargo' },
};

const ROOMS = {
  deluxe: { label: 'Junior Suite Deluxe King', price: 3265 },
  swimup: { label: 'Junior Suite Premium con piscina', price: 3804 },
};

const INSURANCE = {
  oro: { label: 'Universal Oro', price: { 8: 112, 9: 125 } },
  plata: { label: 'Universal Plata', price: { 8: 89, 9: 98 } },
  none: { label: 'Sin asistencia', price: { 8: 0, 9: 0 } },
};

const TRANSFER = {
  private: { label: 'Traslado privado', price: 75 },
  none: { label: 'Sin traslado', price: 0 },
};

/* Estado y cálculos */

const state = {
  luggage: 'classic',
  room: 'deluxe',
  ins: 'oro',
  transfer: 'private',
  sort: 'week',
};

const money = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });
const usd = (n) => `USD ${money.format(Math.round(n))}`;
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const dateOf = (iso) => new Date(`${iso}T12:00:00`);

function dayLabel(iso) {
  const d = dateOf(iso);
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()} de ${MONTHS[d.getMonth()]}`;
}

function googleUrl(trip) {
  const a = dateOf(trip.out);
  const b = dateOf(trip.back);
  const from = a.getMonth() === b.getMonth() ? `${a.getDate()}` : `${a.getDate()} de ${MONTHS[a.getMonth()]}`;
  const query = `vuelos directos de Rosario a Punta Cana del ${from} al ${b.getDate()} de ${MONTHS[b.getMonth()]} 2027 2 adultos`;
  return `https://www.google.com/travel/flights?hl=es&curr=USD&q=${encodeURIComponent(query)}`;
}

const despegarUrl = (trip) => `https://www.despegar.com.ar/shop/flights/results/roundtrip/ROS/PUJ/${trip.out}/${trip.back}/2/0/0?currency=USD`;
const bookingUrl = (trip) => `https://www.booking.com/hotel/do/luxury-bahia-principe-esmeralda-punta-cana2.es.html?checkin=${trip.out}&checkout=${trip.back}&group_adults=2&no_rooms=1&selected_currency=USD`;

function compute(trip) {
  const days = SCHEDULE[trip.day].days;
  const parts = {
    flight: trip.flight,
    luggage: LUGGAGE[state.luggage].price,
    hotel: ROOMS[state.room].price,
    transfer: TRANSFER[state.transfer].price,
    ins: INSURANCE[state.ins].price[days],
  };
  const total = parts.flight + parts.luggage + parts.hotel + parts.transfer + parts.ins;
  return { ...parts, days, total };
}

function setState(patch) {
  Object.assign(state, patch);
  render();
}

/* Render */

function renderControls() {
  document.querySelectorAll('.seg[data-key]').forEach((group) => {
    const key = group.dataset.key;
    group.querySelectorAll('button[data-value]').forEach((button) => {
      button.setAttribute('aria-pressed', String(state[key] === button.dataset.value));
    });
  });
}

function renderIncludes() {
  const luggage = LUGGAGE[state.luggage];
  const ins = INSURANCE[state.ins];
  const parts = [
    'el vuelo directo de Arajet (cambia según la fecha)',
    `equipaje <strong>${luggage.approx ? '≈ ' : ''}${usd(luggage.price)}</strong> (${luggage.detail})`,
    `hotel <strong>${usd(ROOMS[state.room].price)}</strong> (${ROOMS[state.room].label}, 7 noches todo incluido)`,
    state.transfer === 'none' ? 'sin traslado' : `traslado privado ida y vuelta <strong>${usd(TRANSFER.private.price)}</strong>`,
    state.ins === 'none'
      ? 'sin asistencia'
      : `${ins.label} <strong>${usd(ins.price[8])}</strong> si salen un lunes o <strong>${usd(ins.price[9])}</strong> si salen domingo o martes`,
  ];
  document.getElementById('includes').innerHTML = `Cada total suma ${parts.join(' + ')}.`;
}

function renderTop() {
  const ranked = TRIPS
    .map((trip) => ({ trip, r: compute(trip) }))
    .sort((a, b) => a.r.total - b.r.total)
    .slice(0, 3);
  const tags = ['La más barata', 'Segunda', 'Tercera'];
  const luggage = LUGGAGE[state.luggage];

  document.getElementById('top').innerHTML = ranked.map(({ trip, r }, i) => `
    <article class="package card${i === 0 ? ' is-featured' : ''}">
      <div class="package-head">
        <span class="badge ${i === 0 ? 'cheap' : ''}">${tags[i]}</span>
        <span class="sub">Semana ${trip.week}</span>
      </div>
      <h3>${capitalize(dayLabel(trip.out))} al ${dayLabel(trip.back)}</h3>
      <p class="package-text">${SCHEDULE[trip.day].out} · ${SCHEDULE[trip.day].hint}</p>
      <dl class="package-lines">
        <div><dt>Vuelo directo Arajet</dt><dd>${usd(r.flight)}</dd></div>
        <div><dt>Equipaje: ${luggage.label}</dt><dd>${luggage.approx ? '≈ ' : ''}${usd(r.luggage)}</dd></div>
        <div><dt>Esmeralda, 7 noches</dt><dd>${usd(r.hotel)}</dd></div>
        <div><dt>${TRANSFER[state.transfer].label}</dt><dd>${usd(r.transfer)}</dd></div>
        <div><dt>${INSURANCE[state.ins].label}${state.ins === 'none' ? '' : ` (${r.days} días)`}</dt><dd>${usd(r.ins)}</dd></div>
      </dl>
      <div class="package-total">
        <span class="sub">Total para 2</span>
        <strong>${usd(r.total)}</strong>
        <span class="sub">${usd(r.total / 2)} por persona</span>
      </div>
      <div class="links">
        <a class="btn small" href="${googleUrl(trip)}" target="_blank" rel="noopener">Ver vuelo</a>
        <a class="btn small ghost" href="${bookingUrl(trip)}" target="_blank" rel="noopener">Ver hotel</a>
      </div>
    </article>`).join('');
}

function renderTrips() {
  const rows = TRIPS.map((trip) => ({ trip, r: compute(trip) }));
  const totals = rows.map((row) => row.r.total);
  const min = Math.min(...totals);
  const max = Math.max(...totals);
  const bestOfWeek = {};
  rows.forEach((row) => {
    const current = bestOfWeek[row.trip.week];
    if (!current || row.r.total < current.r.total) bestOfWeek[row.trip.week] = row;
  });

  const byPrice = state.sort === 'price';
  const list = byPrice ? rows.slice().sort((a, b) => a.r.total - b.r.total) : rows;
  let lastWeek = null;

  document.getElementById('trips-body').innerHTML = list.map((row) => {
    const { trip, r } = row;
    const schedule = SCHEDULE[trip.day];
    const isCheapest = r.total === min;
    const isBest = bestOfWeek[trip.week] === row;
    const width = max === min ? 100 : 15 + (85 * (r.total - min)) / (max - min);
    const header = !byPrice && trip.week !== lastWeek
      ? `<tr class="week-row"><th colspan="5">${WEEKS[trip.week]}</th></tr>`
      : '';
    lastWeek = trip.week;
    const badges = [
      isCheapest ? '<span class="badge cheap">La más barata de enero</span>' : '',
      isBest && !isCheapest ? '<span class="badge cheap">Mejor de la semana</span>' : '',
    ].join('');
    return `${header}
      <tr class="${isBest ? 'is-best' : ''}">
        <td>
          <div class="airline">${capitalize(dayLabel(trip.out))}</div>
          <span class="sub">${schedule.out}</span>
          ${byPrice ? `<span class="sub">Semana ${trip.week}</span>` : ''}
          ${badges ? `<div class="badges">${badges}</div>` : ''}
        </td>
        <td data-label="Vuelta">${capitalize(dayLabel(trip.back))}<span class="sub">${schedule.back}</span></td>
        <td class="num" data-label="Vuelo (2 personas)">${usd(r.flight)}<span class="sub">${usd(r.flight / 2)} por persona</span></td>
        <td class="num" data-label="Total 2 personas">
          <strong>${usd(r.total)}</strong>
          <span class="sub">${usd(r.total / 2)} por persona</span>
          <span class="sub">${isCheapest ? 'La más barata' : `+${usd(r.total - min)} que la más barata`}</span>
          <span class="total-bar" aria-hidden="true"><span style="width: ${width.toFixed(1)}%"></span></span>
        </td>
        <td>
          <div class="actions">
            <a class="btn small" href="${googleUrl(trip)}" target="_blank" rel="noopener">Vuelo</a>
            <a class="btn small ghost" href="${despegarUrl(trip)}" target="_blank" rel="noopener">Despegar</a>
            <a class="btn small ghost" href="${bookingUrl(trip)}" target="_blank" rel="noopener">Hotel</a>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function renderFebruaryNote() {
  const r = compute(FEBRUARY_TRIP);
  const cheapest = Math.min(...TRIPS.map((trip) => compute(trip).total));
  const diff = cheapest - r.total;
  document.getElementById('feb-note').innerHTML = `<strong>Fuera de enero:</strong> saliendo el lunes 1 de febrero (vuelta el 8) el vuelo baja a ${usd(FEBRUARY_TRIP.flight)} y el total queda en ${usd(r.total)}${diff > 0 ? `, ${usd(diff)} menos que la opción más barata de enero` : ''}. <a href="${googleUrl(FEBRUARY_TRIP)}" target="_blank" rel="noopener">Ver vuelo</a>`;
}

function render() {
  renderControls();
  renderIncludes();
  renderTop();
  renderTrips();
  renderFebruaryNote();
}

/* Eventos */

document.addEventListener('click', (event) => {
  const segButton = event.target.closest('.seg button[data-value]');
  if (segButton) setState({ [segButton.closest('.seg').dataset.key]: segButton.dataset.value });
});

render();
