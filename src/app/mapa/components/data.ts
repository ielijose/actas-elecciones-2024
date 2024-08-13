interface EventLocation {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface CityEvent {
  city: string;
  time: string;
  place: EventLocation;
  image: string;
}

// Your location data
export const locations: CityEvent[] = [
  {
    city: "Aguascalientes",
    time: "6:00 PM",
    place: {
      name: "Plaza Patria",
      address: "Plaza Patria, Aguascalientes, Mexico",
      latitude: 21.88082,
      longitude: -102.29611,
    },
    image: "aguascalientes.png",
  },
  {
    city: "Austin",
    time: "4:00 PM",
    place: {
      name: "Frente al Congress",
      address: "1100 Congress Ave., Austin, TX 78701, USA",
      latitude: 30.27472,
      longitude: -97.74035,
    },
    image: "austin.png",
  },
  {
    city: "Boston",
    time: "5:00 PM",
    place: {
      name: "Faneuil Hall Square",
      address: "Boston, MA 02109, USA (Frente al Faneuil Hall)",
      latitude: 42.36012,
      longitude: -71.05689,
    },
    image: "boston.png",
  },
  {
    city: "Calgary, AB",
    time: "11:00 AM",
    place: {
      name: "City Hall",
      address: "City Hall, Calgary, AB, Canada",
      latitude: 51.04427,
      longitude: -114.06202,
    },
    image: "calgary.png",
  },
  {
    city: "Cancún",
    time: "6:00 PM",
    place: {
      name: "Avda. Bonampack, Malecón Tajamar",
      address: "Frente a Plaza Las Americas, Cancún, Mexico",
      latitude: 21.16191,
      longitude: -86.82537,
    },
    image: "cancún.png",
  },
  {
    city: "CDMX",
    time: "11:00 AM",
    place: {
      name: "Monumento a la Revolución",
      address: "Plaza de la República, Col. Tabacalera, CDMX, Mexico",
      latitude: 19.43618,
      longitude: -99.15463,
    },
    image: "cdmx.png",
  },
  {
    city: "Chihuahua Capital",
    time: "5:00 PM",
    place: {
      name: "Busto de Simón Bolívar",
      address: "Chihuahua Capital, Mexico",
      latitude: 28.63299,
      longitude: -106.07503,
    },
    image: "chihuahua-capital.png",
  },
  {
    city: "Ciudad del Carmen",
    time: "5:00 PM",
    place: {
      name: "Barco Isla de Tris, Playa Norte",
      address: "Ciudad del Carmen, Campeche, Mexico",
      latitude: 18.65136,
      longitude: -91.80742,
    },
    image: "ciudad-del-carmen.png",
  },
  {
    city: "Culiacán",
    time: "6:00 PM",
    place: {
      name: "Iglesia La Lomita",
      address: "Culiacán, Sinaloa, Mexico",
      latitude: 24.8086,
      longitude: -107.394,
    },
    image: "culiacán.png",
  },
  {
    city: "Deerfield Beach, FL",
    time: "5:00 PM",
    place: {
      name: "Gustico Bistró",
      address: "2249 W Hillsboro Blvd, Deerfield Beach, FL 33442, USA",
      latitude: 26.31856,
      longitude: -80.13851,
    },
    image: "deerfield-beach.png",
  },
  {
    city: "Fort Myers, FL",
    time: "10:00 AM",
    place: {
      name: "1140 Colonial Blvd",
      address: "1140 Colonial Blvd, Fort Myers, FL 33907, USA",
      latitude: 26.59792,
      longitude: -81.87231,
    },
    image: "fort-myers.png",
  },
  {
    city: "Guadalajara",
    time: "4:00 PM",
    place: {
      name: "Paseo Chapultepec",
      address: "Guadalajara, Jalisco, Mexico",
      latitude: 20.67668,
      longitude: -103.36652,
    },
    image: "guadalajara.png",
  },
  {
    city: "Houston",
    time: "4:00 PM - 6:00 PM",
    place: {
      name: "25600 Westheimer Pkwy",
      address: "25600 Westheimer Pkwy, Katy, TX 77494, USA",
      latitude: 29.72516,
      longitude: -95.79658,
    },
    image: "houston.png",
  },
  {
    city: "Indianapolis",
    time: "3:00 PM",
    place: {
      name: "Monument Circle",
      address: "1 Monument Cir, Indianapolis, IN 46204, USA",
      latitude: 39.76833,
      longitude: -86.15835,
    },
    image: "indianapolis.png",
  },
  {
    city: "Jacksonville",
    time: "6:00 PM",
    place: {
      name: "Memorial Park",
      address: "1620 Riverside Ave, Jacksonville, FL 32204, USA",
      latitude: 30.31021,
      longitude: -81.68129,
    },
    image: "jacksonville.png",
  },
  {
    city: "León",
    time: "5:30 PM",
    place: {
      name: "Arco de la Calzada",
      address: "León, Guanajuato, Mexico",
      latitude: 21.12161,
      longitude: -101.67809,
    },
    image: "león.png",
  },
  {
    city: "Los Angeles",
    time: "4:00 PM - 8:00 PM",
    place: {
      name: "233 N Spring St",
      address:
        "233 N Spring St, Los Angeles, CA 90012, USA (en la plaza frente al City Hall)",
      latitude: 34.05349,
      longitude: -118.24234,
    },
    image: "los-angeles.png",
  },
  {
    city: "Louisville",
    time: "5:00 PM",
    place: {
      name: "Estacionamiento del Area del Restaurant Las Chamas Venezuelan Food",
      address: "Louisville, KY, USA",
      latitude: 38.25267,
      longitude: -85.75845,
    },
    image: "louisville.png",
  },
  {
    city: "Mérida",
    time: "6:00 PM",
    place: {
      name: "Monumento a la Patria",
      address: "Mérida, Yucatán, Mexico",
      latitude: 20.989736026501696,
      longitude: -89.61682520797497,
    },
    image: "mérida.png",
  },
  {
    city: "Miami",
    time: "4:00 PM",
    place: {
      name: "Bayfront Park",
      address: "301 N Biscayne Blvd, Miami, FL 33132, USA",
      latitude: 25.77426,
      longitude: -80.18574,
    },
    image: "miami.png",
  },
  {
    city: "Monterrey",
    time: "6:00 PM",
    place: {
      name: "Plaza Simón Bolívar",
      address:
        "Lic. José Benitez con Av. Simón Bolívar, Col. Obispado, Monterrey, Mexico",
      latitude: 25.67334,
      longitude: -100.34639,
    },
    image: "monterrey.png",
  },
  {
    city: "Montreal, QC",
    time: "3:00 PM",
    place: {
      name: "Place des Festivals",
      address: "1499 Rue Jeanne-Mance, Montréal, QC H2X 1Z9, Canada",
      latitude: 45.50884,
      longitude: -73.56852,
    },
    image: "montreal.png",
  },
  {
    city: "Naples, FL",
    time: "10:00 AM",
    place: {
      name: "Iglesia Lutherana Pelican",
      address: "5800 Golden Gate, Naples, FL 34116, USA",
      latitude: 26.18347,
      longitude: -81.70502,
    },
    image: "naples.png",
  },
  {
    city: "Nashville, TN",
    time: "2:00 PM",
    place: {
      name: "Parthenon",
      address: "West End Ave, Nashville, TN, USA",
      latitude: 36.14982,
      longitude: -86.81326,
    },
    image: "nashville.png",
  },
  {
    city: "New Haven, CT",
    time: "6:00 PM",
    place: {
      name: "City Hall",
      address: "161 Church St, New Haven, CT 06510, USA",
      latitude: 41.30717,
      longitude: -72.92452,
    },
    image: "new-haven.png",
  },
  {
    city: "New Orleans, LA",
    time: "4:00 PM",
    place: {
      name: "Jackson Square",
      address: "745 Decatur St, New Orleans, LA 70116, USA",
      latitude: 29.95747,
      longitude: -90.06367,
    },
    image: "new-orleans.png",
  },
  {
    city: "Oklahoma City, OK",
    time: "5:00 PM",
    place: {
      name: "Oklahoma State Capitol",
      address: "2300 N Lincoln Blvd, Oklahoma City, OK 73105, USA",
      latitude: 35.49236,
      longitude: -97.50339,
    },
    image: "oklahoma-city.png",
  },
  {
    city: "Orlando, FL",
    time: "4:00 PM",
    place: {
      name: "Festival Park",
      address: "2911 E Robinson St, Orlando, FL 32803, USA",
      latitude: 28.54501,
      longitude: -81.34674,
    },
    image: "orlando.png",
  },
  {
    city: "Philadelphia, PA",
    time: "10:00 AM",
    place: {
      name: "AMOR Sculpture",
      address: "210 N 18th St, Philadelphia, PA 19103, USA",
      latitude: 39.95985,
      longitude: -75.17147,
    },
    image: "philadelphia.png",
  },
  {
    city: "Phoenix, AZ",
    time: "10:00 AM",
    place: {
      name: "Governmental Mall",
      address: "1700 W Washington St, Phoenix, AZ 85007, USA",
      latitude: 33.44838,
      longitude: -112.09766,
    },
    image: "phoenix.png",
  },
  {
    city: "Playa del Carmen",
    time: "6:00 PM",
    place: {
      name: "Plaza 28 de Julio",
      address: "Playa del Carmen, Quintana Roo, Mexico",
      latitude: 20.627614952625525,
      longitude: -87.07475843377601,
    },
    image: "playa-del-carmen.png",
  },
  {
    city: "Port Saint Lucie",
    time: "4:00 PM - 6:00 PM",
    place: {
      name: "Intersection of SW Saint Lucie West and SW Cashmere Blvd",
      address: "Port Saint Lucie, FL 34986, USA",
      latitude: 27.3148442,
      longitude: -80.4060823,
    },
    image: "port-saint-lucie.png",
  },
  {
    city: "Puebla",
    time: "6:00 PM",
    place: {
      name: "Zocalo del Centro de Puebla",
      address: "Zocalo, Puebla, Mexico",
      latitude: 19.0420158,
      longitude: -98.1980826,
    },
    image: "puebla.png",
  },
  {
    city: "Puerto Vallarta",
    time: "7:00 PM",
    place: {
      name: "Malecón",
      address: "Malecón, Puerto Vallarta, Jalisco, Mexico",
      latitude: 20.6110565,
      longitude: -105.238365,
    },
    image: "puerto-vallarta.png",
  },
  {
    city: "Querétaro",
    time: "6:00 PM",
    place: {
      name: "Mirador de los Arcos",
      address: "Querétaro, Mexico",
      latitude: 20.5897237,
      longitude: -100.3596074,
    },
    image: "querétaro.png",
  },
  {
    city: "Raleigh",
    time: "11:00 AM",
    place: {
      name: "3808 Edwards Mill Rd",
      address: "3808 Edwards Mill Rd, Raleigh, NC 27612, USA",
      latitude: 35.8321551,
      longitude: -78.6899395,
    },
    image: "raleigh.png",
  },
  {
    city: "Richmond",
    time: "10:00 AM",
    place: {
      name: "Monroe Park",
      address: "620 W Main Street, Richmond, VA 23220, USA",
      latitude: 37.546477,
      longitude: -77.4526581,
    },
    image: "richmond.png",
  },
  {
    city: "Rochester",
    time: "11:00 AM",
    place: {
      name: "Peace Plaza",
      address: "38 Peace Plaza, Rochester, MN 55902, USA",
      latitude: 44.0224461,
      longitude: -92.463582,
    },
    image: "rochester.png",
  },
  {
    city: "Salt Lake City",
    time: "4:00 PM",
    place: {
      name: "State Capitol",
      address: "350 State St, Salt Lake City, UT 84111, USA",
      latitude: 40.7774918,
      longitude: -111.8881775,
    },
    image: "salt-lake-city.png",
  },
  {
    city: "San Antonio",
    time: "4:00 PM",
    place: {
      name: "The Alamo",
      address: "300 Alamo Plaza, San Antonio, TX 78205, USA",
      latitude: 29.4259676,
      longitude: -98.4861416,
    },
    image: "san-antonio.png",
  },
  {
    city: "San José del Cabo",
    time: "5:00 PM",
    place: {
      name: "Plaza Mijares centro",
      address: "Plaza Mijares centro, San José del Cabo, Mexico",
      latitude: 23.062287,
      longitude: -109.698911,
    },
    image: "san-jose-del-cabo.png",
  },
  {
    city: "San Juan",
    time: "4:00 PM",
    place: {
      name: "Capitolio, Plaza La Democracia",
      address: "Capitolio, Plaza La Democracia, San Juan, Puerto Rico",
      latitude: 18.465383,
      longitude: -66.106048,
    },
    image: "san-juan.png",
  },
  {
    city: "Tampa",
    time: "4:00 PM",
    place: {
      name: "Aré-Pitas",
      address: "2734 University Square Dr, Tampa, FL, USA",
      latitude: 28.058447,
      longitude: -82.414217,
    },
    image: "tampa.png",
  },
  {
    city: "Tijuana",
    time: "4:00 PM",
    place: {
      name: "Glorieta Cuauhtémoc",
      address: "Glorieta Cuauhtémoc, Tijuana, Baja California, Mexico",
      latitude: 32.533489,
      longitude: -117.020141,
    },
    image: "tijuana.png",
  },
  {
    city: "Tulsa",
    time: "6:00 PM",
    place: {
      name: "Mc. Cullough Park",
      address: "1534 E. 25st. Tulsa, OK 74129, USA",
      latitude: 36.134123,
      longitude: -95.948944,
    },
    image: "tulsa.png",
  },
  {
    city: "Veracruz",
    time: "6:00 PM",
    place: {
      name: "Boulevard Miguel Alemán",
      address: "Boulevard Miguel Alemán, Veracruz, Mexico",
      latitude: 19.173773,
      longitude: -96.134224,
    },
    image: "veracruz.png",
  },
  {
    city: "Villahermosa",
    time: "11:00 AM",
    place: {
      name: "Parque la Choca",
      address: "Parque la Choca, Villahermosa, Tabasco, Mexico",
      latitude: 17.994797,
      longitude: -92.940923,
    },
    image: "villahermosa.png",
  },
  {
    city: "Washington",
    time: "6:00 PM",
    place: {
      name: "Libertador Simón Bolívar Memorial",
      address: "203 18 st NW 20006, Washington, DC, USA",
      latitude: 38.896736,
      longitude: -77.041964,
    },
    image: "washington.png",
  },
  {
    city: "Wilmington",
    time: "5:30 PM",
    place: {
      name: "Rodney Square",
      address: "1000 N. Market St, Wilmington, DE 19801, USA",
      latitude: 39.74402,
      longitude: -75.548314,
    },
    image: "wilmington.png",
  },
  {
    city: "San José del Cabo",
    time: "5:00 PM",
    place: {
      name: "Plaza Mijares centro",
      address: "Plaza Mijares, San José del Cabo, Baja California Sur, Mexico",
      latitude: 23.0630112,
      longitude: -109.6996685,
    },
    image: "",
  },
  {
    city: "San Juan",
    time: "4:00 PM",
    place: {
      name: "Capitolio, Plaza La Democracia",
      address: "Capitolio, Plaza La Democracia, San Juan, Puerto Rico",
      latitude: 18.4655397,
      longitude: -66.110509,
    },
    image: "",
  },
  {
    city: "Tampa",
    time: "4:00 PM",
    place: {
      name: "Aré-Pitas",
      address: "2734 University Square Dr, Tampa, FL 33612, USA",
      latitude: 28.0575009,
      longitude: -82.4323542,
    },
    image: "",
  },
  {
    city: "Tijuana",
    time: "4:00 PM",
    place: {
      name: "Glorieta Cuauhtémoc",
      address: "Glorieta Cuauhtémoc, Tijuana, Baja California, Mexico",
      latitude: 32.533489,
      longitude: -117.019902,
    },
    image: "",
  },
  {
    city: "Tulsa",
    time: "6:00 PM",
    place: {
      name: "Mc. Cullough Park",
      address: "1534 E. 25st., Tulsa, OK 74129, USA",
      latitude: 36.137434,
      longitude: -95.935491,
    },
    image: "",
  },
  {
    city: "Veracruz",
    time: "6:00 PM",
    place: {
      name: "Boulevard Miguel Alemán",
      address: "Boulevard Miguel Alemán, Veracruz, Mexico",
      latitude: 19.181739,
      longitude: -96.136302,
    },
    image: "",
  },
  {
    city: "Villahermosa",
    time: "11:00 AM",
    place: {
      name: "Parque la Choca",
      address: "Parque la Choca, Villahermosa, Tabasco, Mexico",
      latitude: 17.999673,
      longitude: -92.945132,
    },
    image: "",
  },
  {
    city: "Washington",
    time: "6:00 PM",
    place: {
      name: "Libertador Simón Bolívar Memorial",
      address: "203 18th St NW, Washington, DC 20006, USA",
      latitude: 38.8923341,
      longitude: -77.0435476,
    },
    image: "",
  },
  {
    city: "Wilmington",
    time: "5:30 PM",
    place: {
      name: "Rodney Square",
      address: "1000 N. Market St., Wilmington, DE 19801, USA",
      latitude: 39.7447927,
      longitude: -75.5487984,
    },
    image: "",
  },
];
