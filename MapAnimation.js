mapboxgl.accessToken ="YOUR_KEY";

//pk.eyJ1IjoiZ2JtdXJwaHl5eSIsImEiOiJjbGZqZjEzNWUwMDg1NDJxb2I2NGJvZHFzIn0.ERg4wTD65VLGxSbK-cyTeQ

  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.104081, 42.365554],
      zoom: 14
  });
 
var marker = new mapboxgl.Marker()
    .setLngLat([-71.092761, 42.357575])
    .addTo(map);

const busStops = [
    [-71.093729, 42.359244], 
    [-71.094915, 42.360175],
    [-71.095800, 42.360698],
    [-71.099558, 42.362953],
    [-71.103476, 42.365248],
    [-71.106067, 42.366806],
    [-71.108717, 42.368355],
    [-71.110799, 42.369192],
    [-71.113095, 42.370218],
    [-71.115476, 42.372085],
    [-71.117585, 42.373016],
    [-71.118625, 42.374863]
];

var counter = 0;
function move(){
  setTimeout(()=>{
    if (counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++;
    move();
  },1000); 
}

async function run() {
    const locations = await getBusLocations();
    console.log(new Date());
    console.log(locations);

    setTimeout(run, 15000);
}

async function getBusLocations() {
    const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
    const response = await fetch(url);
    const json = await response.jsonn();
    return json.data;
}

run();