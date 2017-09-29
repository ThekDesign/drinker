<template>
    <div class="wrap">
        <div class="search">
            <input type="text" class="searchTerm" placeholder="想喝水嗎？" @keyup.enter="searching">
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
    import $ from 'jquery';

    export default {
        props: ['msg'],
        name: 'search',
        data() {
            return {
                getplace: [],
                allplace: [],
                placename: [],
                address: [],
                longitude: [],
                latitude: [],
                getlocation: [],
                autocomplete_text: [],
            }
        },
        methods: {
            getInfo(allplace) {
                this.placedata(allplace);
            },
            placedata(allplace) {
                //從Firebase拿取資料(Object)換成Array的形式push到自己定義的陣列中
                for (let j = 0; j < Object.values(allplace).length; j++) {
                    this.placename[j] = allplace[`${j}`]['場所名稱'];
                    this.address[j] = allplace[`${j}`]['場所地址'];
                    this.opentime[j] = allplace[`${j}`]['場所開放時間'];
                    this.management[j] = allplace[`${j}`]['管理單位'];
                    this.longitude[j] = allplace[`${j}`]['經度'];
                    this.latitude[j] = allplace[`${j}`]['緯度'];
                    this.Administrativearea[j] = allplace[`${j}`]['行政區'];
                    this.setplace[j] = allplace[`${j}`]['設置地點'];
                    this.connect[j] = allplace[`${j}`]['連絡電話'];
                    this.numberofdrinker[j] = allplace[`${j}`]['飲水台數'];

                    //從這邊拿取經緯度
                    this.getlocation[j] = {
                        "lat": this.latitude[j],
                        "lng": this.longitude[j]
                    };
                    //Autocomplete的部份，去除重複元素，搜尋範圍限制在開頭文字
                    this.autocomplete_text.push(this.placename[j], this.address[j], this.Administrativearea[j]);
                }
                //autocomplete use data
                this.autocompletes();
            },
            autocompletes: function() {
                //去除重複元素
                ac_text = this.autocomplete_text;
                result = ac_text.filter(function(element, index, arr) {
                    return arr.indexOf(element) === index;
                });
                //限制成開頭
                $('.searchTerm').autocomplete({
                    source: function(request, response) {
                        matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(request.term), "i");
                        response($.grep(result, function(item) {
                            return matcher.test(item);
                        }));
                    }
                });
            },
            searching: function() {
                console.log(this.msg);
                let search_success = false;
                let searchloacation = [];
                let s_allplace = this.getplace;
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

                        indices = [];
                        element = `${$('.searchTerm').val()}`;
                        idx = s_Administrativearea.indexOf(element);
                        while (idx != -1) {
                            indices.push(idx);
                            idx = s_Administrativearea.indexOf(element, idx + 1);
                        }
                        for (o = 0; o < indices.length; o++) {
                            searchloacation.push({
                                "lat": s_latitude[indices[o]],
                                "lng": s_longitude[indices[o]]
                            });
                        }
                        lat_center = this.CalculateAvgLat(searchloacation);
                        lng_center = this.CalculateAvgLng(searchloacation);
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
                center = new google.maps.LatLng(center_lat, center_lng);
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: zoom,
                    center: center,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                labels = 'D';
                markers = searchloacation.map(function(location, i) {
                    return new google.maps.Marker({
                        position: location,
                        label: labels[i % labels.length],
                    });
                });

                options = {
                    imagePath: 'images/markers/m'
                };

                markerCluster = new MarkerClusterer(map, markers, options);
            },
            CalculateAvgLat: function(searcharray) {
                total_lat = 0;
                for (m = 0; m < searcharray.length; m++) {
                    total_lat = total_lat + searcharray[m]['lat'];
                    console.log(searcharray[m]['lat']);
                }
                avg_lat = total_lat / searcharray.length;
                console.log(searcharray[0]['lat']);
                console.log(total_lat);
                console.log(avg_lat);
                console.log(searcharray.length);
                return avg_lat;
            },
            CalculateAvgLng: function(searcharray) {
                total_lng = 0;
                for (m = 0; m < searcharray.length; m++) {
                    total_lng = total_lng + searcharray[m]['lng'];
                }
                avg_lat = total_lng / searcharray.length;
                return avg_lat;
            },
            refresh: function() {
                this.initialize(this.getlocation);
            },
            //將標點點在地圖上的function
            initialize: function(locations) {
                center = new google.maps.LatLng(25.04, 121.54);
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: center,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                labels = 'D';
                markers = locations.map(function(location, i) {
                    return new google.maps.Marker({
                        position: location,
                        label: labels[i % labels.length],
                    });
                });

                options = {
                    imagePath: 'assets/markers/m'
                };

                markerCluster = new MarkerClusterer(map, markers, options);
            }
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

    /*Css to target the dropdownbox*/

    .ui-autocomplete {
        color: #00B4CC;
        font-size: 1.2em;
        text-decoration: none;
        background-color: white;
        list-style-type: none;
        width: 1.5rem;
        cursor: pointer;
        padding-left: 0.3rem;
        li :hover {
            padding-left: 0.3rem;
            background-color: aliceblue;
        }
    }

    .ui-helper-hidden-accessible {
        display: none;
        visibility: hidden;
    }

</style>
