const { osmToGtfs, OSMPBFReader, OSMOverpassDownloader } = require('trufi-gtfs-builder')
const path = require('path')
// -66.453088,-17.762296,-65.758056,-17.238372
osmToGtfs({
    outputFiles: { outputDir: __dirname + '/out', trufiTPData: true, gtfs: true },
    geojsonOptions: {
        // osmDataGetter: new OSMPBFReader(path.join(__dirname, "Bolivia-Cochabamba.osm.pbf")),
        osmDataGetter: new OSMOverpassDownloader({
            west: 98.485021,
            south: 3.403644,
            east: 98.855734,
            north: 3.847537
        }),
        skipRoute: (route) => {
            return route.id !== 2084702
        }
    },
    gtfsOptions: {
        stopNameBuilder: stops => {
            if (!stops || stops.length == 0) {
                stops = ['Tanpa nama']
            }
            return stops.join(' dan ')
        },
    }
}).catch(error => console.error(error))