define([
    // Need to delcare Extent here for Firefox to work
    'esri/geometry/Extent',
], function(Extent) {
    var extent = new esri.geometry.Extent({
        'xmin': -9813000,
        'ymin': 4920000,
        'xmax': -9350000,
        'ymax': 5950000,
        'spatialReference': {
            'wkid': 102100
        }
    });
    return {
        map: {
            options: {
                basemap: 'gray',
                extent: extent,
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