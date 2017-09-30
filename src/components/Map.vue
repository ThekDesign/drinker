<template>
   <div id="map"></div>
</template>

<script>

    export default {
        name: 'maps',
        data() {
            return {
                getplace: [],
                placename: [],
                address: [],
                opentime: [],
                management: [],
                longitude: [],
                latitude: [],
                Administrativearea: [],
                setplace: [],
                connect: [],
                numberofdrinker: [],
                getlocation: []
            }
        },
        props: ['locations'],
        methods: {
            setInfo: function(locations) {
                //將蒐集的標點匯入到Google Map上
                this.initialize(locations);
                google.maps.event.addDomListener(window, 'load', this.initialize);
            },
            //將標點點在地圖上的function
            initialize: function(locations) {
                let center = new google.maps.LatLng(25.04, 121.54);
                let map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: center,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                let labels = 'D';
                let markers = locations.map(function(location, i) {
                    return new google.maps.Marker({
                        position: location,
                        label: labels[i % labels.length],
                    });
                });

                let options = {
                    imagePath: '/assets/markers/m'
                };

                let markerCluster = new MarkerClusterer(map, markers, options);
            }
        },
        mounted: function () {
            this.setInfo(this.locations);
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #map {
        height: 75rem - 39rem;
    }

</style>
