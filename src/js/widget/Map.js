define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/dom',

    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/layout/ContentPane',

    'esri/map',
    'esri/dijit/Scalebar',
    'esri/layers/ArcGISDynamicMapServiceLayer',
    'esri/layers/WebTiledLayer',
    'esri/dijit/LocateButton',
    'esri/dijit/Geocoder',
    'esri/layers/ImageParameters',
    'esri/geometry/Extent',
    'esri/SpatialReference',
    'esri/dijit/Legend',
    'esri/dijit/TimeSlider',
    'esri/TimeExtent',

    'bootstrap-map-js/bootstrapmap',

    'dojo/text!./templates/Map.html'
], function(declare, array, dom,
    _WidgetBase, _TemplatedMixin, ContentPane,
    Map, Scalebar, ArcGISDynamicMapServiceLayer, WebTiledLayer, LocateButton, Geocoder, ImageParameters, Extent, SpatialReference, Legend, TimeSlider, TimeExtent,
    BootstrapMap,
    template) {

    //Default values for drop down lists defined in app.js

    var legendDijit;
    var imageParameters = new ImageParameters();
    imageParameters.format = "PNG24"; //set the image type to PNG24, note default is PNG8.            

    //Defines dynamic layer for showing fish data.  Used in setFishmap and _initMap functions
    var decadeCatchDataLayer = new ArcGISDynamicMapServiceLayer("http://prodgis2.agriculture.purdue.edu/arcgis/rest/services/IISGLakeMI/Decade_Catch_Data_LakeMI/MapServer", {
        "opacity": .90,
        imageParameters: imageParameters
    });
    var visibleDataLayerIds = [11];
    decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);

    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,

        postCreate: function() {
            this.inherited(arguments);
            this._initMap();
        },


        legendCreate: function() { //add the legend
            console.log('initializing map');
            legendDijit = new Legend({
                map: this.map,
                layerInfos: [{
                    layer: decadeCatchDataLayer,
                    title: "Fish Catch"
                }]
            }, 'legendDiv');
            legendDijit.startup();
        },

        legendRefresh: function() {
            dom.byId("legendDiv").innerHTML = '';
            legendDijit.refresh([{
                layer: decadeCatchDataLayer,
                title: "Fish Catch"
            }]);
        },

        initSlider: function() {
            console.log('Initializaing time slider');
            var timeSlider = new TimeSlider({
                style: "width: 100%;"
            }, dom.byId("timeSliderDiv"));
            this.map.setTimeSlider(timeSlider);

            var layerTimeExtent = results[2].layer.timeInfo.timeExtent;
            timeSlider.setThumbCount(2);
            timeSlider.createTimeStopsByTimeInterval(layerTimeExtent, 2, "esriTimeUnitsYears");
            timeSlider.setThumbIndexes([0, 1]);
            timeSlider.setThumbMovingRate(2000);
            timeSlider.startup();

            //add labels for every other time stop
            var labels = array.map(timeSlider.timeStops, function(timeStop, i) {
                if (i % 2 === 0) {
                    return timeStop.getUTCFullYear();
                } else {
                    return "";
                }
            });

            timeSlider.setLabels(labels);

            timeSlider.on("time-extent-change", function(evt) {
                var startValString = evt.startTime.getUTCFullYear();
                var endValString = evt.endTime.getUTCFullYear();
                dom.byId("daterange").innerHTML = "<i>" + startValString + " and " + endValString + "<\/i>";
            });
        },

        setFishmap: function(dateText, fishText, summaryText) {
            console.log('ran setFishmap' + dateText + ' , ' + fishText + ' , ' + summaryText);
            var map = this.map;
            var l, options;
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
                        visibleDataLayerIds = [10];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [13];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [16];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 03 - 12, Rainbow Trout, no CPUE match');
                    }
                } else if (fishText == 'Lake Trout') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [20];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [23];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [26];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 03 - 12, Lake Trout, no CPUE match');
                    }
                } else if (fishText == 'Chinook Salmon') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [30];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [33];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [36];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 03 - 12, Chinook Salmon, no CPUE match');
                    }
                } else if (fishText == 'Brown Trout') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [40];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [43];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [46];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                        console.log('Decade 03 - 12, Brown Trout, no CPUE match');
                    }
                } else if (fishText == 'Coho Salmon') {
                    if (summaryText == 'Catch per Trip') {
                        visibleDataLayerIds = [50];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        visibleDataLayerIds = [53];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        visibleDataLayerIds = [56];
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

            var visibleBaseLayerIds = [1, 2, 3, 4, 65];
            decadeCatchBaseLayer.setVisibleLayers(visibleBaseLayerIds);

            // decadeCatchDataLayer defined as global for use in this function and setFishMap function

            this.map.addLayer(decadeCatchDataLayer);
            this.map.addLayer(decadeCatchBaseLayer);
            this.legendCreate();
            // this.initSlider();

        },

        updateFishmap: function(dateText, fishText, summaryText) {
            this.setFishmap(dateText, fishText, summaryText);
            console.log('refreshign legend');
            this.legendRefresh();
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