// -----------------------------
// Datos base de costos
// -----------------------------

const FLIGHTS = 3862; // vuelos BsAs ⇄ Londres por pareja
const LONDON_COST = 1190; // 7 días Londres (comidas + transporte + ocio)
const BASE_DAY_ROUTE = 120; // comidas + ocio por día en ruta

// Configuración de modos
const modes = {
  auto: {
    label: "🚗 Solo auto",
    desc: "Todo en SUV (BMW X1 compartido entre las dos parejas). Máxima flexibilidad, ideal con bebé.",
    rentalTotal: 909,     // por pareja
    costPerKm: 0.12,      // combustible + peajes + parking por km
    trainFixed: 0,
    note: "Opción más barata y flexible. Solo hay que pedir neumáticos de invierno."
  },
  hibrido: {
    label: "🔁 Híbrido",
    desc: "Parte en tren (Eurostar) y parte en SUV. Menos horas de manejo, algo más caro.",
    rentalTotal: 650,
    costPerKm: 0.10,
    trainFixed: 350,      // Eurostar por pareja
    note: "Buena mezcla de comodidad y control, pero más caro que solo auto."
  },
  trenes: {
    label: "🚆 Solo trenes",
    desc: "Todo trenes (Eurostar + trenes regionales). Cero manejo, pero mucho más caro y menos flexible.",
    rentalTotal: 0,
    costPerKm: 0.25,
    trainFixed: 350,
    note: "Opción más cómoda si odian manejar, pero la más costosa y con más trasbordos con bebé."
  }
};

// -----------------------------
// Datos de bases (solo texto)
// -----------------------------
const belgiumBases = {
  brussels:
    "Bruselas es la base más eficiente: mejor conectada, más servicios, buen punto para Brujas, Gante, Amberes, Namur y Dinant.",
  mechelen:
    "Mechelen (Malinas) es la base más central: 20 min a Bruselas y Amberes, 40 a Gante, 1 h a Brujas. Ciudad muy tranquila y segura.",
  ghent:
    "Gante es la base más estética y divertida, con canales y ambiente universitario. Algo más lejos de Namur y Dinant."
};

const hollandBases = {
  haarlem:
    "Haarlem es la base ideal en Holanda: mini Ámsterdam tranquila, segura, a 18 min en tren/auto de Ámsterdam.",
  amsterdam:
    "Ámsterdam como base sirve si quieren museos y movimiento fuerte, pero es más cara y caótica para estacionar.",
  utrecht:
    "Utrecht es muy bonita, central y local. Perfecta si quieren algo menos turístico que Ámsterdam."
};

// -----------------------------
// Datos de ciudades e imágenes
// (mantengo tus URLs originales)
// -----------------------------
const cityData = {
  base_be: {
    key: "base_be",
    name: "Base en Bélgica",
    type: "belgica",
    img: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcT28GwC9rO5KJptMouXCDOVsRH7rcOrtwgCCcc7nH3S5A6oGTT743KJVg65ZqniakLvlIVr8qgfTQahX7q4dNVSk2U&s=19",
    desc: "Punto de partida para Brujas, Gante, Amberes, Namur y Dinant."
  },
  brujas: {
    key: "brujas",
    name: "Brujas",
    type: "belgica",
    img: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRGl5LBXt9Sh_NXdK4sv3oa-SS0Z4yvo2HCpbNsRbxoZpMjJkGZDHKZy2vcJ3f_0413en_KhGpN9lWLJiAepdB1ntQ&s=19",
    desc: "Canales, Markt y ciudad medieval compacta."
  },
  gante: {
    key: "gante",
    name: "Gante",
    type: "belgica",
    img: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRtRV2vXTi8FF5eND2qhc2L-nytp8ePnLxd90ZUFCLTEZdy4cxe9k_sdyZiU_uxPI_CQ2F94XYDa-3PuOYFtleS2Gc&s=19",
    desc: "Castillo de los Condes y Graslei/Korenlei."
  },
  amberes: {
    key: "amberes",
    name: "Amberes",
    type: "belgica",
    img: "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=900&q=80",
    desc: "Moda, cafés, catedral y Grote Markt."
  },
  namur: {
    key: "namur",
    name: "Namur",
    type: "belgica",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    desc: "Ciudadela y vistas al río Mosa."
  },
  dinant: {
    key: "dinant",
    name: "Dinant",
    type: "belgica",
    img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUVFxgXFxgYFRgYFxoWGBcYGBYVFxcYHSggGB0lHRUWITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0mHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EAEIQAAECBAQEBAMGBAMHBQAAAAECEQADBCEFEjFBIlFhcQYTgZEUMqEjQlKx0fAVM8HhYoLxBxZDcpKTsiRUotLi/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EAC0RAAICAgECBgEDBAMAAAAAAAABAhEDIRIxQQQTIlFhoXEUwfBCUoGRI7HR/9oADAMBAAIRAxEAPwDz0IiQJicSI78g8jHe8aZ5kc0kBmXGCWYLMojaO0yjq1oV4fYdeI90...", // recortado por brevedad
    desc: "Postal del río Mosa, fortaleza e iglesia."
  },
  haarlem: {
    key: "haarlem",
    name: "Haarlem",
    type: "holanda",
    img: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSBTGD-Hq2zFR5ZJrIpYSJjy71JS1QN0ES4Q3H0junNBsv9GbWw7JvCuhJBRj2r_VBud5stbYFBKFCN0gbQRGtluRc&s=19",
    desc: "Mini Ámsterdam tranquila, perfecta como base en Holanda."
  },
  amsterdam: {
    key: "amsterdam",
    name: "Ámsterdam",
    type: "holanda",
    img: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTVBh9lSB2xk1QqNqnZMcwZ1qQG56kCw031p6E4QYjqqbPGYtjW7qcrO0mX7wBByN8xDHeK8zHLJcSfV3InYA785Ss&s=19",
    desc: "Canales, museos y barco cubierto."
  },
  denbosch: {
    key: "denbosch",
    name: "Den Bosch",
    type: "holanda",
    img: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQPAXKqgvlhfOOwYYFotG1C0Flu0N2XjEBt6H2ZnvSnSHgQI04fn4YMDX6PaL6RmGXow1hIuDgfemXHC1SuJkyQ9ZZU&s=19",
    desc: "Ciudad neerlandesa medieval para cerrar el viaje relajados."
  },
  paris: {
    key: "paris",
    name: "París",
    type: "opcional",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    desc: "Museos, cafés y paseo por el Sena."
  },
  luxembourg: {
    key: "luxembourg",
    name: "Luxemburgo",
    type: "opcional",
    img: "https://images.unsplash.com/photo-1516542076529-1ea3854896f8?auto=format&fit=crop&w=900&q=80",
    desc: "Fortalezas, miradores y casco histórico elegante."
  },
  lille: {
    key: "lille",
    name: "Lille",
    type: "opcional",
    img: "https://images.unsplash.com/photo-1610386358883-9bbc3f7cc9a2?auto=format&fit=crop&w=900&q=80",
    desc: "Ciudad francesa vibrante, barrio antiguo y gastronomía."
  },
  aachen: {
    key: "aachen",
    name: "Aachen",
    type: "opcional",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    desc: "Catedral UNESCO y termas Carolus."
  },
  colonia: {
    key: "colonia",
    name: "Colonia",
    type: "opcional",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    desc: "Gran ciudad a orillas del Rin con catedral famosa."
  },
  dusseldorf: {
    key: "dusseldorf",
    name: "Düsseldorf",
    type: "opcional",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
    desc: "Ciudad moderna junto al Rin, buena para paseo urbano."
  }
};

// -----------------------------
// Itinerario base (sin opcionales)
// solo la parte de ruta, Londres lo agregamos fijo
// -----------------------------
const baseRouteOrder = [
  { key: "base_be", label: "Base en Bélgica", km: 350, transportLabel: "Londres → Bélgica" },
  { key: "brujas", label: "Brujas", km: 200, transportLabel: "Excursión Brujas" },
  { key: "gante", label: "Gante", km: 120, transportLabel: "Excursión Gante" },
  { key: "amberes", label: "Amberes", km: 120, transportLabel: "Excursión / cambio de base" },
  { key: "namur", label: "Namur", km: 70, transportLabel: "Amberes → Namur" },
  { key: "dinant", label: "Dinant", km: 60, transportLabel: "Namur → Dinant" },
  // aquí se insertan las opcionales
  { key: "haarlem", label: "Haarlem", km: 500, transportLabel: "Bélgica → Holanda" },
  { key: "amsterdam", label: "Ámsterdam", km: 30, transportLabel: "Haarlem → Ámsterdam" },
  { key: "denbosch", label: "Den Bosch", km: 100, transportLabel: "Ámsterdam → Den Bosch" },
  { key: "return", label: "Regreso a Bruselas / Londres", km: 350, transportLabel: "Holanda → Bruselas / aeropuerto" }
];

// Cada ciudad opcional la trato como 2 días (llegada + paseo local)
const optionalCitySegments = {
  paris: [
    { key: "paris", label: "París (llegada)", km: 300, transportLabel: "Bélgica → París" },
    { key: "paris", label: "París (paseo)", km: 40, transportLabel: "Movimientos urbanos París" }
  ],
  luxembourg: [
    { key: "luxembourg", label: "Luxemburgo (llegada)", km: 220, transportLabel: "Bélgica → Luxemburgo" },
    { key: "luxembourg", label: "Luxemburgo (paseo)", km: 30, transportLabel: "Movimientos urbanos Luxemburgo" }
  ],
  lille: [
    { key: "lille", label: "Lille (llegada)", km: 115, transportLabel: "Bélgica → Lille" },
    { key: "lille", label: "Lille (paseo)", km: 15, transportLabel: "Movimientos urbanos Lille" }
  ],
  aachen: [
    { key: "aachen", label: "Aachen (llegada)", km: 140, transportLabel: "Bélgica → Aachen" },
    { key: "aachen", label: "Aachen (paseo)", km: 20, transportLabel: "Movimientos urbanos Aachen" }
  ],
  colonia: [
    { key: "colonia", label: "Colonia (llegada)", km: 210, transportLabel: "Bélgica → Colonia" },
    { key: "colonia", label: "Colonia (paseo)", km: 25, transportLabel: "Movimientos urbanos Colonia" }
  ],
  dusseldorf: [
    { key: "dusseldorf", label: "Düsseldorf (llegada)", km: 225, transportLabel: "Bélgica → Düsseldorf" },
    { key: "dusseldorf", label: "Düsseldorf (paseo)", km: 25, transportLabel: "Movimientos urbanos Düsseldorf" }
  ]
};

// -----------------------------
// Referencias DOM
// -----------------------------
const tbody = document.getElementById("tbodyDays");
const modeDescEl = document.getElementById("modeDesc");
const sumFlightsEl = document.getElementById("sumFlights");
const sumLondonEl = document.getElementById("sumLondon");
const sumRouteEl = document.getElementById("sumRoute");
const sumTotalEl = document.getElementById("sumTotal");
const modeNoteEl = document.getElementById("modeNote");
const pillModeEl = document.getElementById("pillMode");
const cityGridEl = document.getElementById("cityGrid");

const baseBelgiumSelect = document.getElementById("baseBelgium");
const baseHollandSelect = document.getElementById("baseHolland");
const descBelgiumEl = document.getElementById("descBelgium");
const descHollandEl = document.getElementById("descHolland");

const modeButtons = document.querySelectorAll(".mode-btn");
const optCityCheckboxes = document.querySelectorAll(".optCity");

// -----------------------------
// Helpers
// -----------------------------
function fmtUSD(x){
  return "$" + x.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

// Obtener lista de opcionales activos
function getActiveOptionalKeys(){
  return Array.from(optCityCheckboxes)
    .filter(c => c.checked)
    .map(c => c.value);
}

// Construir lista de días de ruta (sin Londres) según opcionales
function buildRouteDays(activeOptionals){
  const route = [];
  // copiamos base hasta antes de Haarlem (index 0..5)
  for(let i=0;i<6;i++){
    route.push({...baseRouteOrder[i]});
  }
  // insertamos opcionales
  activeOptionals.forEach(key=>{
    const segs = optionalCitySegments[key];
    if(segs){
      segs.forEach(s => route.push({...s}));
    }
  });
  // añadimos resto de base (Haarlem en adelante)
  for(let i=6;i<baseRouteOrder.length;i++){
    route.push({...baseRouteOrder[i]});
  }
  return route;
}

// Calcular total km de la ruta
function calcTotalKm(routeDays){
  return routeDays.reduce((sum,d)=> sum + (d.km || 0), 0);
}

// Construir mapa ciudad -> primer número de día (para etiquetas en tarjetas)
function buildCityFirstDayMap(londonDaysCount, routeDays){
  const map = {};
  let dayNum = 1 + londonDaysCount;
  routeDays.forEach(d=>{
    if(!map[d.key]){
      map[d.key] = dayNum;
    }
    dayNum++;
  });
  return map;
}

// Render tarjetas visuales
function renderCityGrid(routeDays, cityFirstDay){
  cityGridEl.innerHTML = "";
  // lista única de keys en orden de aparición
  const seen = new Set();
  const keysInOrder = [];
  routeDays.forEach(d=>{
    if(d.key === "return") return;
    if(!seen.has(d.key)){
      seen.add(d.key);
      keysInOrder.push(d.key);
    }
  });

  keysInOrder.forEach(key=>{
    const city = cityData[key];
    if(!city) return;
    const day = cityFirstDay[key] || "–";

    const card = document.createElement("div");
    card.className = "city-card";
    card.innerHTML = `
      <img src="${city.img}" alt="${city.name}">
      <div class="city-body">
        <span class="day-tag">Día ${day}</span>
        <h3 class="city-title">${city.name}</h3>
        <p class="muted">${city.desc}</p>
      </div>
    `;
    cityGridEl.appendChild(card);
  });
}

// Render tabla + resumen
function renderTrip(modeKey){
  const mode = modes[modeKey];
  const activeOptionals = getActiveOptionalKeys();
  const londonDaysCount = 7;

  // Construimos días de ruta
  const routeDays = buildRouteDays(activeOptionals);
  const numRouteDays = routeDays.length;
  const totalKm = calcTotalKm(routeDays);

  // Costo base de ruta (comidas + ocio)
  const routeBaseCost = BASE_DAY_ROUTE * numRouteDays;

  // Costo transporte según modo
  let transportTotal = 0;
  if(modeKey === "auto"){
    transportTotal = mode.rentalTotal + mode.costPerKm * totalKm;
  }else if(modeKey === "hibrido"){
    transportTotal = mode.rentalTotal + mode.costPerKm * totalKm + mode.trainFixed;
  }else{
    transportTotal = mode.trainFixed + mode.costPerKm * totalKm;
  }

  const transportPerRouteDay = transportTotal / numRouteDays;
  const routeTotal = routeBaseCost + transportTotal;
  const tripTotal = FLIGHTS + LONDON_COST + routeTotal;

  // Resumen global
  sumFlightsEl.textContent = fmtUSD(FLIGHTS);
  sumLondonEl.textContent = fmtUSD(LONDON_COST);
  sumRouteEl.textContent = fmtUSD(routeTotal);
  sumTotalEl.textContent = fmtUSD(tripTotal);
  modeDescEl.textContent = mode.desc;
  modeNoteEl.textContent = `${mode.note} Km totales de ruta: ${totalKm.toFixed(0)} km. Días de ruta: ${numRouteDays}.`;
  pillModeEl.textContent = "Tipo de viaje seleccionado: " + mode.label;

  // Tabla día a día
  tbody.innerHTML = "";
  let dayNum = 1;

  // Londres (fijo)
  for(let i=0;i<londonDaysCount;i++){
    const tr = document.createElement("tr");
    tr.className = "london";
    const base = 170;
    const tTransport = 30;
    const tDay = base + tTransport;
    tr.innerHTML = `
      <td class="center">${dayNum}</td>
      <td>Londres</td>
      <td><span class="badge badge-london">Londres</span></td>
      <td>—</td>
      <td>Metro / a pie</td>
      <td>${fmtUSD(base)}</td>
      <td>${fmtUSD(tTransport)}</td>
      <td><strong>${fmtUSD(tDay)}</strong></td>
    `;
    tbody.appendChild(tr);
    dayNum++;
  }

  // Ruta
  routeDays.forEach(d=>{
    const tr = document.createElement("tr");
    tr.className = "route";

    const base = BASE_DAY_ROUTE;
    const tTransport = transportPerRouteDay;
    const tDay = base + tTransport;

    // Etiqueta tipo
    let typeLabel = "Ruta Europa";
    if(d.key === "base_be" || cityData[d.key]?.type === "belgica"){
      typeLabel = "Bélgica";
    }else if(cityData[d.key]?.type === "holanda"){
      typeLabel = "Holanda";
    }else if(cityData[d.key]?.type === "opcional"){
      typeLabel = "Opcional";
    }

    const kmText = d.km ? d.km + " km" : "—";

    tr.innerHTML = `
      <td class="center">${dayNum}</td>
      <td>${d.label}</td>
      <td><span class="badge badge-route">${typeLabel}</span></td>
      <td>${kmText}</td>
      <td>${d.transportLabel}</td>
      <td>${fmtUSD(base)}</td>
      <td>${fmtUSD(tTransport)}</td>
      <td><strong>${fmtUSD(tDay)}</strong></td>
    `;
    tbody.appendChild(tr);
    dayNum++;
  });

  // Mapa ciudad -> primer día
  const cityFirstDay = buildCityFirstDayMap(londonDaysCount, routeDays);
  renderCityGrid(routeDays, cityFirstDay);

  // Actualizar estado visual de botones
  modeButtons.forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.mode === modeKey);
  });
}

// -----------------------------
// Eventos
// -----------------------------
modeButtons.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const modeKey = btn.dataset.mode;
    renderTrip(modeKey);
  });
});

optCityCheckboxes.forEach(chk=>{
  chk.addEventListener("change", ()=>{
    // Re-render con el modo actualmente activo
    const activeBtn = Array.from(modeButtons).find(b=>b.classList.contains("active"));
    const modeKey = activeBtn ? activeBtn.dataset.mode : "auto";
    renderTrip(modeKey);
  });
});

baseBelgiumSelect.addEventListener("change", e=>{
  descBelgiumEl.textContent = belgiumBases[e.target.value];
});

baseHollandSelect.addEventListener("change", e=>{
  descHollandEl.textContent = hollandBases[e.target.value];
});

// -----------------------------
// Estado inicial
// -----------------------------
function init(){
  // Descripciones iniciales de bases
  descBelgiumEl.textContent = belgiumBases["brussels"];
  descHollandEl.textContent = hollandBases["haarlem"];
  // Modo por defecto: híbrido o auto (yo te pongo auto, porque ya vimos que conviene)
  renderTrip("auto");
}
init();
