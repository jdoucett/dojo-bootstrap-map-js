define([
    'dojo/_base/declare',
    'dojo/_base/array',

    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',

    'esri/map',
    'esri/dijit/Scalebar',
    'esri/layers/ArcGISDynamicMapServiceLayer',
    'esri/layers/WebTiledLayer',
    'esri/dijit/LocateButton',
    'esri/dijit/Geocoder',
    'esri/layers/ImageParameters',
    'esri/geometry/Extent',
    'esri/SpatialReference',

    'bootstrap-map-js/bootstrapmap',

    'dojo/text!./templates/Map.html'
], function(declare, array,
    _WidgetBase, _TemplatedMixin,
    Map, Scalebar, ArcGISDynamicMapServiceLayer, WebTiledLayer, LocateButton, Geocoder, ImageParameters, Extent, SpatialReference,
    BootstrapMap,
    template) {

    var dateText = '1993 - 2002';
    var fishText = 'Rainbow Trout';
    var summaryText = 'Catch per Trip';

    var imageParameters = new ImageParameters();
    imageParameters.format = "PNG24"; //set the image type to PNG24, note default is PNG8.            

    //Defines dynamic layer for showing fish data.  Used in setFishmap and _initMap functions
    var decadeCatchDataLayer = new ArcGISDynamicMapServiceLayer("http://prodgis2.agriculture.purdue.edu/arcgis/rest/services/IISGLakeMI/Decade_Catch_Data_LakeMI/MapServer", {
        "opacity": .90,
        imageParameters: imageParameters
    });

    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,

        postCreate: function() {
            this.inherited(arguments);
            this._initMap();
        },

        setFishmap: function(dateText, fishText, summaryText) {
            var map = this.map;
            var l, options;
            // this.clearFishMap();
            if (dateText == '1993 - 2002') {
                if (fishText == 'Rainbow Trout') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [11];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [14];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [17];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 93 - 02, Rainbow Trout, no CPUE match');
                    }
                } else if (fishText == 'Lake Trout') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [21];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [24];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [27];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 93 - 02, Lake Trout, no CPUE match');
                    }
                } else if (fishText == 'Chinook Salmon') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [31];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [34];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [37];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 93 - 02, Chinook Salmon, no CPUE match');
                    }
                } else if (fishText == 'Brown Trout') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [41];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [44];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [47];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 93 - 02, Brown Trout, no CPUE match');
                    }
                } else if (fishText == 'Coho Salmon') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [51];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [54];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [57];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 93 - 02, Coho Salmon, no CPUE match');
                    }
                } else {
                    console.log('Decade 93 - 02, no fish match');
                }
            } else if (dateText == '2003 - 2012') {
                if (fishText == 'Rainbow Trout') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [12];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [15];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [18];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 03 - 12, Rainbow Trout, no CPUE match');
                    }
                } else if (fishText == 'Lake Trout') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [22];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [28];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [28];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 03 - 12, Lake Trout, no CPUE match');
                    }
                } else if (fishText == 'Chinook Salmon') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [32];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [35];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [38];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 03 - 12, Chinook Salmon, no CPUE match');
                    }
                } else if (fishText == 'Brown Trout') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [42];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [45];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [48];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 03 - 12, Brown Trout, no CPUE match');
                    }
                } else if (fishText == 'Coho Salmon') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [52];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [55];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [58];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 03 - 12, Coho Salmon, no CPUE match');
                    }
                } else {
                    console.log('Decade 03 - 12, no fish match');
                }
            } else {
                console.log('No Decade Match');
            }
        },

        _initMap: function() {
            this.map = BootstrapMap.create(this.mapNode, this.config.map.options);
            console.log ('The options are' , this.config.map.options);            
            this.scalebar = new Scalebar({
                map: this.map,
                scalebarUnit: 'dual'
            });
            this.geoLocate = new LocateButton({
                map: this.map,
                'class': 'locate-button'
            }, this.locateNode);
            this.geoLocate.startup();
            this.geocoder = new Geocoder({
                map: this.map,
                'class': 'geocoder'
            }, this.searchNode);
            this.geocoder.startup();

            var decadeCatchBaseLayer = new ArcGISDynamicMapServiceLayer("http://prodgis2.agriculture.purdue.edu/arcgis/rest/services/IISGLakeMI/Decade_Catch_Data_LakeMI/MapServer", {
                "opacity": .90,
                imageParameters: imageParameters
            });
            this.map.addLayer(decadeCatchBaseLayer);
            var visibleBaseLayerIds = [1, 2, 3, 4, 65];
            decadeCatchBaseLayer.setVisibleLayers(visibleBaseLayerIds);

            // decadeCatchDataLayer defined as global for use in this function and setFishMap function

            this.map.addLayer(decadeCatchDataLayer);
            //Set first fish map to display on load
            var Fishmap = this.setFishmap(dateText, fishText, summaryText);
        },

        clearBaseMap: function() {
            var map = this.map;
            if (map.basemapLayerIds.length > 0) {
                array.forEach(map.basemapLayerIds, function(lid) {
                    map.removeLayer(map.getLayer(lid));
                });
                map.basemapLayerIds = [];
            } else {
                map.removeLayer(map.getLayer(map.layerIds[0]));
            }
        },

        // updateLayerVisibility: function  () {
        //     var inputs = query(".list_item");
        //     // var inputCount = inputs.length;
        //     // //in this application layer 2 is always on.
        //     // visibleLayerIds = [2];

        //     // for (var i = 0; i < inputCount; i++) {
        //     //   if (inputs[i].checked) {
        //     //     visibleLayerIds.push(inputs[i].value);
        //     //   }
        //     // }

        //     // if (visibleLayerIds.length === 0) {
        //     //   visibleLayerIds.push(-1);
        //     // }

        //     layer.setVisibleLayers(visibleLayerIds);
        //   }

        setBasemap: function(basemapText) {
            var map = this.map;
            var l, options;
            this.clearBaseMap();
            switch (basemapText) {
                case 'Water Color':
                    options = {
                        id: 'Water Color',
                        copyright: 'stamen',
                        resampling: true,
                        subDomains: ['a', 'b', 'c', 'd']
                    };
                    l = new WebTiledLayer('http://${subDomain}.tile.stamen.com/watercolor/${level}/${col}/${row}.jpg', options);
                    map.addLayer(l, options);
                    break;

                case 'MapBox Space':

                    options = {
                        id: 'mapbox-space',
                        copyright: 'MapBox',
                        resampling: true,
                        subDomains: ['a', 'b', 'c', 'd']
                    };
                    l = new WebTiledLayer('http://${subDomain}.tiles.mapbox.com/v3/eleanor.ipncow29/${level}/${col}/${row}.jpg', options);
                    map.addLayer(l, options);
                    break;

                case 'Pinterest':
                    options = {
                        id: 'mapbox-pinterest',
                        copyright: 'Pinterest/MapBox',
                        resampling: true,
                        subDomains: ['a', 'b', 'c', 'd']
                    };
                    l = new WebTiledLayer('http://${subDomain}.tiles.mapbox.com/v3/pinterest.map-ho21rkos/${level}/${col}/${row}.jpg', options);
                    map.addLayer(l, options);
                    break;
                case 'Streets':
                    map.setBasemap('streets');
                    break;
                case 'Imagery':
                    map.setBasemap('hybrid');
                    break;
                case 'National Geographic':
                    map.setBasemap('national-geographic');
                    break;
                case 'Topographic':
                    map.setBasemap('topo');
                    break;
                case 'Gray':
                    map.setBasemap('gray');
                    break;
                case 'Open Street Map':
                    map.setBasemap('osm');
                    break;
            }
        }
    });
});