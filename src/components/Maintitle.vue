<template>
        <div id="main_title">
            <div class="story">
                <div class="main-text text-center">
                    <h2>去找水!!!</h2>
                    <br>
                    <div class="ui-widget">
                        <label for="searchTerm"></label>
                        <search :places="places" :placename="placename" :address="address" :longitude="longitude" :latitude="latitude" :Administrativearea="Administrativearea" :getlocation="getlocation" :autocomplete_text="autocomplete_text"></search>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import search from './Search.vue';

    export default {
        name: 'maintitle',
        components: {
            'search': search,
        },
        data() {
            return {
                message: 'Somethings'
            }
        },
        props: ['places', 'placename', 'address', 'longitude', 'latitude', 'Administrativearea', 'getlocation', 'autocomplete_text']
    }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #main_title {
        background-image: url(../assets/water_background.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
        color: white;
        height: 39rem;
        margin: 0 auto;
        padding: 0;
        position: relative;
        opacity: 0.7;

    }

    .text-center {
        text-align: center;
        vertical-align: middle;
    }

    .main-text {
        position: absolute;
        top: 45%;
        left: 0;
        right: 0;
        color: #00B4CC;
    }

    .ui-widget {
        width: 40%;
        position: absolute;
        top: 45%;
        left: 30%;
        right: 30%;
    }

</style>
