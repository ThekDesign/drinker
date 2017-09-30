<template>
  <div id="app">
       <nav v-if="loaded" class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="#">找找飲水機</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
        <div class="collapse navbar-collapse navbar-collapse-center" id="navbarCollapse">
            <ul class="nav navbar-nav">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/">首頁<span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                <router-link class="nav-link" to="/connect" data-toggle="modal">聯繫</router-link>
                </li>
            </ul>
        </div>
    </nav>

    <maintitle v-if="loaded" :places="getplace" :placename="placename" :address="address" :longitude="longitude" :latitude="latitude" :Administrativearea="Administrativearea" :getlocation="getlocation" :autocomplete_text="autocomplete_text"></maintitle>
    <maps v-if="loaded" :locations="getlocation"></maps>
    <div v-if="loaded" class="footer_bottom">
        <p>&copy; 2017 by Thek.</p>
    </div>
  </div>
</template>

<script>
    import maps from '@/components/Map.vue';
    import maintitle from '@/components/Maintitle.vue';

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
        name: 'app',
        components: {
            'maps': maps,
            'maintitle': maintitle
        },
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
                getlocation: [],
                autocomplete_text: [],
                loaded: false
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
                    this.autocomplete_text[j] = {
                        "placename": this.placename[j],
                        "address": this.address[j],
                        "Administrativearea": this.Administrativearea[j]
                    };
                }
            }
        },
        mounted: function() {
            //從Firebase拿取所有資料(Object)，放到allplace裡面
            idRef.once('value', snap => {
                this.getplace = snap.val();
                this.getInfo(this.getplace);
                this.loaded = true;
            });
        }
    }

</script>

<style lang="scss">
    @import "~bootstrap/scss/bootstrap";
    @import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css);
    $height-background: 100%;
    $width-background: 100%;
    $title-font-color: grey;
    $Mainfont: 'Noto Sans TC',
    sans-serif;

    #app {
        min-height: 75rem;
        padding-top: 3.5rem;
        height: $height-background;
        font-family: $Mainfont;
    }

    .navbar-center {
        display: inline;
        float: none;
        vertical-align: top;
    }

    .navbar-collapse-center {
        text-align: center;
    }

    .footer_bottom {
        background-color: gainsboro;
        text-align: center;
        height: 3rem;
        position: relative;
        p {
            position: absolute;
            top: 1rem;
            left: 0;
            right: 0;
            font-size: 0.75rem;
        }
    }

</style>
