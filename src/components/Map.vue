<template>
   <div id="map"></div>
</template>

<script>
    import firebase from 'firebase';
    import $ from 'jquery';

    let config = {
        apiKey: "AIzaSyCtLlrzFQ3BMAFosmp5sspNCUfk7AXBWnc",
        authDomain: "drinkmap-dec5e.firebaseapp.com",
        databaseURL: "https://drinkmap-dec5e.firebaseio.com",
        projectId: "drinkmap-dec5e",
        storageBucket: "",
        messagingSenderId: "885775453119"
    }

    let fbset = firebase.initializeApp(config);
    let db = fbset.database();
    let idRef = db.ref('id');

    export default {
        name: 'maps',
        data() {
            return {
                getplace: [],
                allplace: [],
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
        methods: {
            getInfo(allplace) {
                this.placedata(allplace);
                this.setInfo(allplace);
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
                    //                    this.autocomplete_text[j] = this.placename[j], this.address[j], this.Administrativearea[j];
                }
                //autocomplete use data
                //                this.autocompletes();
            },
            setInfo: function(allplace) {
                //將蒐集的標點匯入到Google Map上
                this.initialize(this.getlocation);
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
                    imagePath: './src/assets/markers/m'
                };

                let markerCluster = new MarkerClusterer(map, markers, options);
            }
        },
        mounted: function() {
            //從Firebase拿取所有資料(Object)，放到allplace裡面
            idRef.once('value', snap => {
                this.getplace = snap.val();
                this.getInfo(this.getplace);
            });
        }

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #map {
        height: 75rem - 39rem;
    }

</style>
