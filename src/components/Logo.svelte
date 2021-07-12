<script lang="ts">
    let src = "images/logo.png";
</script>

<div id="logo-img" class="col-12 col-lg-3">
    <img class="img-fluid" {src} alt="Game Management Logo" />
</div>

<style>
    #logo-img {
        text-align: center;
        margin: 20px 10px 50px 10px;
    }
    #logo-img > img {
        max-width: 50%;
    }
    @media (min-width: 768px) {
        #logo-img > img {
            max-width: 100%;
        }
        #logo-img {
            margin: 100px 10px 100px 100px;
        }
    }
</style>
