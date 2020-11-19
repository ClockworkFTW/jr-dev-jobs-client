const jobData = {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: [],
  },
  cluster: true,
  clusterMaxZoom: 14,
  clusterRadius: 50,
};

const clusters = {
  id: "clusters",
  type: "circle",
  source: "job-data",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": "#5a67d8",
    "circle-radius": ["step", ["get", "point_count"], 16, 25, 32, 50, 48],
    "circle-stroke-color": "white",
    "circle-stroke-width": 3,
  },
};

const clusterCount = {
  id: "cluster-count",
  type: "symbol",
  source: "job-data",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 14,
  },
  paint: {
    "text-color": "white",
  },
};

const jobLayer = {
  id: "job-layer",
  type: "circle",
  source: "job-data",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#5a67d8",
    "circle-radius": 16,
    "circle-stroke-color": "white",
    "circle-stroke-width": 3,
  },
};

export default { jobData, clusters, clusterCount, jobLayer };
