<template>
  <div id="app">
       <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
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

    <maintitle></maintitle>
    <maps></maps>
    <div class="footer_bottom">
        <p>&copy; 2017 by Thek.</p>
    </div>
  </div>
</template>

<script>
    import maps from '@/components/Map.vue';
    import maintitle from '@/components/Maintitle.vue';
    export default {
        name: 'app',
        components: {
            'maps': maps,
            'maintitle': maintitle
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
