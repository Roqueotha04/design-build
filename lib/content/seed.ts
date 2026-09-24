import type { Localized } from "@/config/site.types";

export type Service = {
  id: string;
  name: Localized;
  description: Localized;
};

export type ProjectFact = {
  label: Localized;
  value: Localized;
};

export type Project = {
  slug: string;
  name: Localized;
  category: Localized;
  image: string;
  gallery: string[];
  context: Localized;
  approach: Localized;
  solution: Localized;
  facts: ProjectFact[];
  result: Localized;
};

export type ContactInfo = {
  email: string;
  phone: string;
  address: Localized;
  hours: Localized;
};

export type SiteContent = {
  services: Service[];
  projects: Project[];
  contact: ContactInfo;
};

export const siteMeta = {
  name: "Design & Build",
  url: "https://designbuildrd.com",
  description: {
    es: "Estudio de diseño y construcción. El proyecto y la obra quedan en el mismo equipo.",
    en: "Design and construction studio. The project and the build stay with the same team.",
  } satisfies Localized,
};

const residencia: Localized = {
  es: "Residencia premium",
  en: "Premium residence",
};

export const seedContent: SiteContent = {
  services: [
    {
      id: "diseno",
      name: { es: "Diseño", en: "Design" },
      description: {
        es: "El encargo se dibuja con quien va a habitarlo: planta, material y luz.",
        en: "The brief is drawn with the people who will use the space: plan, material, and light.",
      },
    },
    {
      id: "construccion",
      name: { es: "Construcción", en: "Construction" },
      description: {
        es: "La obra la ejecuta el mismo estudio que la proyectó.",
        en: "The studio that designed the work builds it.",
      },
    },
    {
      id: "direccion",
      name: { es: "Dirección de proyecto", en: "Project direction" },
      description: {
        es: "Costo, plazo y decisión técnica siguen en una sola mesa.",
        en: "Cost, schedule, and technical decisions stay at one table.",
      },
    },
    {
      id: "interiores",
      name: { es: "Interiores", en: "Interiors" },
      description: {
        es: "Acabados, mobiliario fijo y detalle se resuelven antes de entrar a obra.",
        en: "Finishes, fixed furniture, and detail are settled before construction starts.",
      },
    },
  ],
  projects: [
    {
      slug: "residencia-con-patio",
      name: { es: "Residencia con patio", en: "Courtyard residence" },
      category: residencia,
      image: "/Proyecto%201.webp",
      gallery: ["/Proyecto%201.webp"],
      context: {
        es: "Una casa que necesitaba sombra, jardín y un acceso claro desde la calle.",
        en: "A house that needed shade, garden, and a clear way in from the street.",
      },
      approach: {
        es: "El patio se trata como una habitación más: piso, techo y vegetación en el mismo dibujo.",
        en: "The courtyard is treated as another room: floor, roof, and planting in the same drawing.",
      },
      solution: {
        es: "Pórtico de madera, muros blancos y jardineras corridas. La luz entra entre las vigas.",
        en: "A timber porch, white walls, and long planters. Light comes in between the beams.",
      },
      facts: [
        {
          label: { es: "Tipo", en: "Type" },
          value: residencia,
        },
        {
          label: { es: "Alcance", en: "Scope" },
          value: { es: "Diseño y obra", en: "Design and build" },
        },
      ],
      result: {
        es: "El exterior queda usable de día, sin perder la relación con el interior.",
        en: "The outdoor room works through the day without losing its link to the interior.",
      },
    },
    {
      slug: "acceso-en-madera",
      name: { es: "Acceso en madera", en: "Timber entry" },
      category: residencia,
      image: "/Proyecto%202.webp",
      gallery: ["/Proyecto%202.webp"],
      context: {
        es: "El frente de la casa tenía que resolver cochera, acceso y una fachada quieta.",
        en: "The front of the house had to settle garage, entry, and a quiet facade.",
      },
      approach: {
        es: "Pocas piezas. El volumen blanco deja que la madera haga el trabajo.",
        en: "Few parts. The white volume lets the timber do the work.",
      },
      solution: {
        es: "Dos portones de lama horizontal, alero continuo y un acceso lateral retirado.",
        en: "Two horizontal-slat doors, a continuous eave, and a set-back side entry.",
      },
      facts: [
        {
          label: { es: "Tipo", en: "Type" },
          value: residencia,
        },
        {
          label: { es: "Alcance", en: "Scope" },
          value: { es: "Fachada y acceso", en: "Facade and entry" },
        },
      ],
      result: {
        es: "Desde la calle se lee una sola pieza, no una suma de puertas.",
        en: "From the street it reads as one piece, not a stack of doors.",
      },
    },
    {
      slug: "bano-principal",
      name: { es: "Baño principal", en: "Primary bathroom" },
      category: residencia,
      image: "/Proyecto%203.webp",
      gallery: ["/Proyecto%203.webp", "/Proyecto%203.png"],
      context: {
        es: "Un baño largo, con luz de frente y poco margen para el desorden.",
        en: "A long bathroom, with light from the front and little room for clutter.",
      },
      approach: {
        es: "Guardar lo que se usa todos los días a la vista, y lo demás detrás del muro de madera.",
        en: "Keep everyday things in sight, and everything else behind the timber wall.",
      },
      solution: {
        es: "Doble bacha, estante abierto y ducha de vidrio. El revestimiento es blanco; la madera marca el mueble.",
        en: "A double basin, an open shelf, and a glass shower. The tile is white; timber marks the vanity.",
      },
      facts: [
        {
          label: { es: "Tipo", en: "Type" },
          value: residencia,
        },
        {
          label: { es: "Alcance", en: "Scope" },
          value: { es: "Interior", en: "Interior" },
        },
      ],
      result: {
        es: "El espacio queda claro de leer: lavado, guardado y ducha, en ese orden.",
        en: "The room is easy to read: wash, store, shower, in that order.",
      },
    },
  ],
  contact: {
    email: "hola@designbuildrd.com",
    phone: "",
    address: {
      es: "República Dominicana",
      en: "Dominican Republic",
    },
    hours: {
      es: "Lunes a viernes, 8 a 17 h",
      en: "Monday to Friday, 8am to 5pm",
    },
  },
};

export const projectTypes: Localized[] = [
  { es: "Corporativo / Workplace", en: "Corporate / Workplace" },
  { es: "Comercial / Retail", en: "Commercial / Retail" },
  { es: "Desarrollo inmobiliario premium", en: "Premium development" },
  { es: "Residencia premium", en: "Premium residence" },
  { es: "Otro / No estoy seguro", en: "Other / Not sure yet" },
];
