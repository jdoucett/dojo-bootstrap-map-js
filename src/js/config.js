define([
    // Need to delcare Extent here for Firefox to work
    'esri/geometry/Extent','esri/dijit/InfoWindow',
], function(Extent,InfoWindow) {
    var extent = new esri.geometry.Extent({
        'xmin': -9813000,
        'ymin': 4920000,
        'xmax': -9350000,
        'ymax': 5950000,
        'spatialReference': {
            'wkid': 102100
        }
    });
    var infoWindow = new esri.dijit.InfoWindow({}, dojo.create("div"));
    infoWindow.startup();    
    return {
        map: {
            options: {
                basemap: 'gray',
                extent: extent,
                logo:false,
                infoWindow: infoWindow,
            },
            // TODO: add basemaps
            basemaps: {}
        },
        legend: {
            moreInfoUrl: 'https://github.com/Esri/dojo-bootstrap-map-js'
        },
        about: {
            moreInfoUrl: 'http://www.iisgcp.org'
        }
    };
});