'use strict';

/* Datos relevados el 14 de octubre de 2026. Precios en USD para 2 personas. */

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const WEEKDAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const SCHEDULE = {
  dom: { out: 'ROS 03:39 → PUJ 10:22', back: 'PUJ 20:15 → ROS 04:55 del lunes', days: 9 },
  lun: { out: 'ROS 05:55 → PUJ 12:38', back: 'PUJ 14:38 → ROS 23:18', days: 8 },
  mar: { out: 'ROS 01:12 → PUJ 07:55', back: 'PUJ 18:10 → ROS 02:50 del miércoles', days: 9 },
};

/* Tarifa Basic de Arajet, ida y vuelta para 2 (Google Flights). */
const TRIPS = [
  { day: 'dom', out: '2027-01-03', back: '2027-01-10', flight: 3620 },
  { day: 'lun', out: '2027-01-04', back: '2027-01-11', flight: 3202 },
  { day: 'mar', out: '2027-01-05', back: '2027-01-12', flight: 2454 },
  { day: 'dom', out: '2027-01-10', back: '2027-01-17', flight: 2364 },
  { day: 'lun', out: '2027-01-11', back: '2027-01-18', flight: 2325 },
  { day: 'mar', out: '2027-01-12', back: '2027-01-19', flight: 2669 },
  { day: 'dom', out: '2027-01-17', back: '2027-01-24', flight: 3320 },
  { day: 'lun', out: '2027-01-18', back: '2027-01-25', flight: 2454 },
  { day: 'mar', out: '2027-01-19', back: '2027-01-26', flight: 2787 },
  { day: 'dom', out: '2027-01-24', back: '2027-01-31', flight: 2641 },
  { day: 'lun', out: '2027-01-25', back: '2027-02-01', flight: 2364 },
  { day: 'mar', out: '2027-01-26', back: '2027-02-02', flight: 2454 },
  { day: 'dom', out: '2027-01-31', back: '2027-02-07', flight: 2289 },
  { day: 'lun', out: '2027-02-01', back: '2027-02-08', flight: 2214 },
];

const LUGGAGE = {
  classic: { label: '2 carry-on + 1 valija de 23 kg', price: 158, approx: true, detail: 'tarifa Classic para los dos (USD 92) + 1 valija desde USD 33 por tramo' },
  basic: { label: 'Solo mochila', price: 0, detail: 'tarifa Basic, una mochila de 6 kg cada uno' },
  comfort: { label: '2 valijas de 23 kg', price: 122, detail: 'tarifa Comfort para los dos, sin carry-on' },
  extra: { label: '2 carry-on + 2 valijas de 23 kg', price: 420, detail: 'tarifa Extra para los dos, con cambios sin cargo' },
};

const ROOMS = {
  deluxe: { label: 'Junior Suite Deluxe King', price: 3265 },
  swimup: { label: 'Junior Suite Premium con piscina', price: 3804 },
};

const INSURANCE = {
  oro: { label: 'Universal Oro', medical: 100000, price: { 8: 112, 9: 125 } },
  plata: { label: 'Universal Plata', medical: 50000, price: { 8: 89, 9: 98 } },
  none: { label: 'Sin asistencia', price: { 8: 0, 9: 0 } },
};

const TRANSFER = {
  private: { label: 'Privado aeropuerto–hotel, ida y vuelta', price: 75 },
  none: { label: 'Sin traslado', price: 0 },
};

/* Estado y cálculos */

const state = { trip: '2027-01-11', luggage: 'classic', room: 'deluxe', ins: 'oro', transfer: 'private' };

const money = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });
const usd = (n) => `USD ${money.format(Math.round(n))}`;
const dateOf = (iso) => new Date(`${iso}T12:00:00`);
const tripById = (id) => TRIPS.find((t) => t.out === id);
const januaryTrips = TRIPS.filter((t) => t.out.startsWith('2027-01'));

function dayLabel(iso) {
  const d = dateOf(iso);
  return `${WEEKDAYS[d.getDay()]} ${d.getDate()} de ${MONTHS[d.getMonth()]}`;
}

function rangeLabel(trip) {
  const a = dateOf(trip.out);
  const b = dateOf(trip.back);
  const from = a.getMonth() === b.getMonth()
    ? `${WEEKDAYS[a.getDay()]} ${a.getDate()}`
    : dayLabel(trip.out);
  return `${from} al ${dayLabel(trip.back)}`;
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

function compute(trip, s) {
  const days = SCHEDULE[trip.day].days;
  const parts = {
    flight: trip.flight,
    luggage: LUGGAGE[s.luggage].price,
    hotel: ROOMS[s.room].price,
    transfer: TRANSFER[s.transfer].price,
    ins: INSURANCE[s.ins].price[days],
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
    group.querySelectorAll('button[data-value]').forEach((button) => {
      button.setAttribute('aria-pressed', String(state[group.dataset.key] === button.dataset.value));
    });
  });
  document.getElementById('sel-trip').value = state.trip;
  document.querySelectorAll('button[data-trip]').forEach((button) => {
    const selected = button.dataset.trip === state.trip;
    button.classList.toggle('is-active', selected);
    button.textContent = selected ? 'Elegida' : 'Elegir';
  });
}

function renderResult() {
  const trip = tripById(state.trip);
  const r = compute(trip, state);
  const cheapest = Math.min(...januaryTrips.map((t) => compute(t, state).total));
  const diff = r.total - cheapest;
  const schedule = SCHEDULE[trip.day];
  const luggage = LUGGAGE[state.luggage];
  const insurance = INSURANCE[state.ins];

  let status = `<span class="status is-diff">${usd(diff)} más que la más barata</span>`;
  if (diff === 0) status = '<span class="status is-ok">La más barata de enero</span>';
  if (diff < 0) status = `<span class="status is-ok">${usd(-diff)} menos que la más barata de enero</span>`;

  const items = [
    {
      key: 'flight', label: 'Vuelo directo Arajet', value: r.flight,
      detail: `Ida ${dayLabel(trip.out)}: ${schedule.out}`,
      sub: `Vuelta ${dayLabel(trip.back)}: ${schedule.back}`,
    },
    { key: 'ed', label: 'Equipaje', value: r.luggage, approx: luggage.approx, detail: `${luggage.label}: ${luggage.detail}` },
    { key: 'apt', label: 'Hotel, 7 noches todo incluido', value: r.hotel, detail: `Bahia Principe Explore Esmeralda · ${ROOMS[state.room].label}` },
    { key: 'car', label: 'Traslado', value: r.transfer, detail: TRANSFER[state.transfer].label },
    {
      key: 'ins', label: 'Asistencia al viajero', value: r.ins,
      detail: insurance.medical ? `${insurance.label} · ${r.days} días · médica hasta USD ${money.format(insurance.medical)}` : '',
    },
  ].filter((item) => item.value > 0);

  const notes = [];
  if (trip.day === 'dom') notes.push('Sale el domingo a las 03:39: hay que estar en el aeropuerto el sábado a la noche.');
  if (trip.day === 'mar') notes.push('Sale el martes a la 01:12: hay que estar en el aeropuerto el lunes a la noche.');
  if (luggage.approx) notes.push('El equipaje es estimado: Arajet cobra la valija desde USD 33 por tramo si la agregan al comprar el pasaje.');
  if (trip.out.startsWith('2027-02')) notes.push('Esta fecha ya es de febrero.');
  if (state.ins === 'none') notes.push('Sin asistencia: revisen que la de su tarjeta cubra gastos médicos en República Dominicana.');

  document.getElementById('calc-result').innerHTML = `
    <div class="result-top">
      <div>
        <p class="kicker">Total para 2 · ${rangeLabel(trip)}</p>
        <p class="total">${usd(r.total)}</p>
        <p class="per-person">${usd(r.total / 2)} por persona</p>
      </div>
      ${status}
    </div>
    <div class="budget" role="img" aria-label="Composición del total">
      <div class="budget-bar">
        ${items.map((item) => `<span class="c-${item.key}" style="width:${(item.value / r.total) * 100}%"></span>`).join('')}
      </div>
    </div>
    <ul class="breakdown">
      ${items.map((item) => `
        <li>
          <i class="dot c-${item.key}"></i>
          <div>
            <strong>${item.label}</strong>
            ${item.detail ? `<span class="sub">${item.detail}</span>` : ''}
            ${item.sub ? `<span class="sub">${item.sub}</span>` : ''}
          </div>
          <b>${item.approx ? '≈ ' : ''}${usd(item.value)}</b>
        </li>`).join('')}
    </ul>
    <div class="result-links">
      <a class="btn small" href="${googleUrl(trip)}" target="_blank" rel="noopener">Ver vuelo en Google Flights</a>
      <a class="btn small ghost" href="${despegarUrl(trip)}" target="_blank" rel="noopener">Ver en Despegar</a>
      <a class="btn small ghost" href="${bookingUrl(trip)}" target="_blank" rel="noopener">Ver hotel en Booking</a>
    </div>
    ${notes.length ? `<div class="result-notes">${notes.map((n) => `<p>${n}</p>`).join('')}</div>` : ''}
  `;
}

function render() {
  renderControls();
  renderResult();
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
    setState({ [segButton.closest('.seg').dataset.key]: segButton.dataset.value });
    return;
  }

  const tripButton = event.target.closest('[data-trip]');
  if (tripButton) {
    event.preventDefault();
    setState({ trip: tripButton.dataset.trip });
    goToCalculator();
  }
});

document.getElementById('sel-trip').addEventListener('change', (event) => setState({ trip: event.target.value }));

render();
