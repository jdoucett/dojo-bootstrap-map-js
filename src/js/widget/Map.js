define([
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/dom',

    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/layout/ContentPane',

    'esri/map',
    'esri/dijit/Scalebar',
    'esri/dijit/InfoWindow',
    'esri/InfoTemplate',    
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

    'dojo/text!./templates/Map.html',
    'dojo/dom-construct'
], function(declare, array, dom,
    _WidgetBase, _TemplatedMixin, ContentPane,
    Map, Scalebar, InfoWindow, InfoTemplate, ArcGISDynamicMapServiceLayer, WebTiledLayer, LocateButton, Geocoder, ImageParameters, Extent, SpatialReference, Legend, TimeSlider, TimeExtent,
    BootstrapMap,
    template,domConstruct) {

    var legendDijit;
    //Default values for drop down lists defined in app.js
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];    
    var timeYear = "1993";
    var imageParameters = new ImageParameters();
    imageParameters.format = "PNG24"; //set the image type to PNG24, note default is PNG8.            

    //Defines dynamic layer for showing fish data.  Used in setFishmap and _initMap functions
    var decadeCatchDataLayer = new ArcGISDynamicMapServiceLayer('http://prodgis2.agriculture.purdue.edu/arcgis/rest/services/IISGLakeMI/Decade_Catch_Data_LakeMI/MapServer', {
        'opacity': .90,
        imageParameters: imageParameters
    });
    var bottomLayerIds = 1;
    var fishLayerIds = 11;
    var visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
    decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);

    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,

        postCreate: function() {
            this.inherited(arguments);
            this._initMap();
            this.updateFishmap(dateText, fishText, summaryText);

            var infoWindow = new InfoWindow(null, domConstruct.create("div", null, null));
            infoWindow.startup();
            this.map.setInfoWindow(infoWindow);

            var template = new InfoTemplate();
            template.setTitle('State Name');
            template.setContent('Sub Content');            
        },

        legendCreate: function() { //add the legend
            legendDijit = new Legend({
                map: this.map,
                layerInfos: [{
                    layer: decadeCatchDataLayer,
                    title: 'Fish Catch'
                }]
            }, 'legendDiv');
            legendDijit.startup();
        },

        legendRefresh: function() {
            dom.byId('legendDiv').innerHTML = '';
            legendDijit.refresh([{
                layer: decadeCatchDataLayer,
                title: 'Fish Catch'
            }]);
        },

        initSlider: function() {
            
            if (dijit.byId('timeSlider')) {
              dijit.byId('timeSlider').destroy();
            }
            var tsDiv = dojo.create("div", null, dojo.byId('timeSliderDiv'));
                      
            var timeSlider = new TimeSlider({
                    style: 'width: 100%;',
                    id:'timeSlider'
                }, tsDiv);
            this.map.setTimeSlider(timeSlider);

              var timeExtent = new TimeExtent();
              timeExtent.startTime = new Date('4/31/' + timeYear + ' UTC');
              timeExtent.endTime = new Date('8/31/' + timeYear + ' UTC');
              timeSlider.setThumbCount(1);
              timeSlider.createTimeStopsByTimeInterval(timeExtent, 1, 'esriTimeUnitsMonths');
              timeSlider.setThumbMovingRate(1500);
              timeSlider.startup();

            
              var labels = dojo.map(timeSlider.timeStops, function(timeStop) {
                return monthNames[timeStop.getUTCMonth()];
                });
              timeSlider.setLabels(labels);

        },

        setFishmap: function(dateText, fishText, summaryText) {
            var map = this.map;
            var l, options;
            if (dateText == '1993 - 2002') {
                timeYear = '1993';
                if (fishText == 'Rainbow Trout') {
                    if (summaryText == 'Catch per Trip') {
                        fishLayerIds = 12;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        fishLayerIds = 15;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];                        
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        fishLayerIds = 18;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                    }
                } else if (fishText == 'Lake Trout') {
                    if (summaryText == 'Catch per Trip') {
                        fishLayerIds = 22;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        fishLayerIds = 25;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        fishLayerIds = 28;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                    }
                } else if (fishText == 'Chinook Salmon') {
                    if (summaryText == 'Catch per Trip') {
                        fishLayerIds = 32;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        fishLayerIds = 35;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        fishLayerIds = 38;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                    }
                } else if (fishText == 'Brown Trout') {
                    if (summaryText == 'Catch per Trip') {
                        fishLayerIds = 42;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        fishLayerIds = 45;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        fishLayerIds = 48;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                    }
                } else if (fishText == 'Coho Salmon') {
                    if (summaryText == 'Catch per Trip') {
                        fishLayerIds = 52;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        fishLayerIds = 55;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        fishLayerIds = 58;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                    }
                } else {
                }
            } else if (dateText == '2003 - 2012') {
                timeYear = '2003';                
                if (fishText == 'Rainbow Trout') {
                    if (summaryText == 'Catch per Trip') {
                        fishLayerIds = 11;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        fishLayerIds = 14;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        fishLayerIds = 17;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                    }
                } else if (fishText == 'Lake Trout') {
                    if (summaryText == 'Catch per Trip') {
                        fishLayerIds = 21;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        fishLayerIds = 24;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        fishLayerIds = 27;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                    }
                } else if (fishText == 'Chinook Salmon') {
                    if (summaryText == 'Catch per Trip') {
                        fishLayerIds = 31;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        fishLayerIds = 34;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        fishLayerIds = 37;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                    }
                } else if (fishText == 'Brown Trout') {
                    if (summaryText == 'Catch per Trip') {
                        fishLayerIds = 41;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        fishLayerIds = 44;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        fishLayerIds = 47;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                    }
                } else if (fishText == 'Coho Salmon') {
                    if (summaryText == 'Catch per Trip') {
                        fishLayerIds = 51;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch per Hour') {
                        fishLayerIds = 54;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else if (summaryText == 'Catch Total') {
                        fishLayerIds = 57;
                        visibleDataLayerIds = [fishLayerIds,bottomLayerIds];
                        decadeCatchDataLayer.setVisibleLayers(visibleDataLayerIds);
                    } else {
                    }
                } else {
                }
            } else {
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

            var visibleBaseLayerIds = [66];
            decadeCatchBaseLayer.setVisibleLayers(visibleBaseLayerIds);

            // decadeCatchDataLayer defined as global for use in this function and setFishMap function
            this.map.addLayer(decadeCatchDataLayer);        
            this.map.addLayer(decadeCatchBaseLayer);
            this.legendCreate();

        },

        updateFishmap: function(dateText, fishText, summaryText) {
            this.setFishmap(dateText, fishText, summaryText);
            this.legendRefresh();
            this.initSlider();
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