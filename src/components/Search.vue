<template>
    <div class="wrap">
        <div class="search">
            <input type="text" class="searchTerm" placeholder="ex: 大安" @keyup.enter="searching">
            <button type="submit" class="searchButton" @click="searching">
                <i class="fa fa-search"></i>
            </button>
            <button type="submit" class="refreshButton" @click="refresh">
                <i class="fa fa-refresh"></i>
            </button>
        </div>
    </div>
</template>

<script>
    import swal from 'sweetalert';
    import _ from 'lodash';
    import Vue from 'vue';

    export default {
        props: ['places', 'placename', 'address', 'longitude', 'latitude', 'Administrativearea', 'getlocation', 'autocomplete_text'],
        name: 'search',
        data() {
            return {
                suggestions: [],
            }
        },
        methods: {
            searching: function() {
                let search_success = false;
                let searchloacation = [];
                let s_allplace = this.places;
                let s_placename = this.placename;
                let s_address = this.address;
                let s_latitude = this.latitude;
                let s_longitude = this.longitude;
                let s_Administrativearea = this.Administrativearea;
                for (let m = 0; m < s_allplace.length; m++) {
                    if ($('.searchTerm').val() == s_placename[m]) {

                        searchloacation.push({
                            "lat": s_latitude[m],
                            "lng": s_longitude[m]
                        });

                        this.aftersearch(searchloacation, s_latitude[m], s_longitude[m], 19);

                        $('html,body').animate({
                            scrollTop: $('#map').offset().top - 55
                        }, 1000);
                        search_success = true;
                        break;
                    } else if ($('.searchTerm').val() == s_address[m]) {

                        searchloacation.push({
                            "lat": latitude[m],
                            "lng": longitude[m]
                        });
                        this.aftersearch(searchloacation, s_latitude[m], s_longitude[m], 19);

                        $('html,body').animate({
                            scrollTop: $('#map').offset().top - 55
                        }, 1000);
                        search_success = true;
                        break;
                    } else if ($('.searchTerm').val() == s_Administrativearea[m]) {

                        let indices = [];
                        let element = `${$('.searchTerm').val()}`;
                        let idx = s_Administrativearea.indexOf(element);
                        while (idx != -1) {
                            indices.push(idx);
                            idx = s_Administrativearea.indexOf(element, idx + 1);
                        }
                        for (let o = 0; o < indices.length; o++) {
                            searchloacation.push({
                                "lat": s_latitude[indices[o]],
                                "lng": s_longitude[indices[o]]
                            });
                        }
                        let lat_center = this.CalculateAvgLat(searchloacation);
                        let lng_center = this.CalculateAvgLng(searchloacation);
                        this.aftersearch(searchloacation, lat_center, lng_center, 15);
                        $('html,body').animate({
                            scrollTop: $('#map').offset().top - 55
                        }, 1000);
                        search_success = true;
                        break;
                    }
                }
                if (!search_success) {
                    swal("錯誤！", "請輸入正確的地點！", "error");
                }
            },
            //搜尋框進行搜尋動作後要做的動作
            aftersearch: function(searchloacation, center_lat, center_lng, zoom) {
                let center = new google.maps.LatLng(center_lat, center_lng);
                let map = new google.maps.Map(document.getElementById('map'), {
                    zoom: zoom,
                    center: center,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                let labels = 'D';
                let markers = searchloacation.map(function(location, i) {
                    return new google.maps.Marker({
                        position: location,
                        label: labels[i % labels.length],
                    });
                });

                let options = {
                    imagePath: 'assets/markers/m'
                };

                let markerCluster = new MarkerClusterer(map, markers, options);
            },
            CalculateAvgLat: function(searcharray) {
                let total_lat = 0;
                for (let m = 0; m < searcharray.length; m++) {
                    total_lat = total_lat + searcharray[m]['lat'];
                }
                let avg_lat = total_lat / searcharray.length;
                return avg_lat;
            },
            CalculateAvgLng: function(searcharray) {
                let total_lng = 0;
                for (let m = 0; m < searcharray.length; m++) {
                    total_lng = total_lng + searcharray[m]['lng'];
                }
                let avg_lat = total_lng / searcharray.length;
                return avg_lat;
            },
            refresh: function() {
                this.initialize(this.getlocation);
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
                    imagePath: 'assets/markers/m'
                };

                let markerCluster = new MarkerClusterer(map, markers, options);
            }
        },
        mounted: function() {
            //去除重複元素
            let result_placename = _.toArray(_.mapValues(this.autocomplete_text, "placename"));
            let result_address = _.toArray(_.mapValues(this.autocomplete_text, "address"));
            let result_Administrativearea = _.uniq(_.toArray(_.mapValues(this.autocomplete_text, "Administrativearea")));
            let result = _.concat(result_placename, result_address, result_Administrativearea);
            this.suggestions = result;

            $('.searchTerm').autocomplete({
                source: function(request, response) {
                    let matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
                    response($.grep(result, function(item) {
                        return matcher.test(item);
                    }));
                }
            });
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "~bootstrap/scss/bootstrap";
    @import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css);
    $Mainfont: 'Noto Sans TC',
    sans-serif;

    .wrap {
        .search {
            width: 100%;
            position: relative;
            .searchTerm {
                float: left;
                width: 100%;
                border: 0.2rem solid #00B4CC;
                padding: 0.3rem;
                height: 2.2rem;
                border-radius: 0.3rem;
                outline: none;
                color: #9DBFAF;
                font-size: 1.2rem;
            }
            .searchTerm:focus {
                color: #00B4CC;
            }
            .searchButton {
                position: absolute;
                right: -3.125rem;
                width: 2.3rem;
                height: 2.3rem;
                border: 0.1rem solid #00B4CC;
                background: #00B4CC;
                text-align: center;
                color: #fff;
                border-radius: 0.3rem;
                cursor: pointer;
                font-size: 1.2rem;
            }
            .refreshButton {
                position: absolute;
                right: -6.25rem;
                width: 2.3rem;
                height: 2.3rem;
                border: 0.1rem solid #00B4CC;
                background: #00B4CC;
                text-align: center;
                color: #fff;
                border-radius: 0.3rem;
                cursor: pointer;
                font-size: 1.2rem;
            }
        }
    }

    input[type=search] {
        font-family: $Mainfont;
        font-size: 1.2em;
        background-color: white;
        border: 0;
    }

</style>
