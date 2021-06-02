<script lang="ts">
    let src = "images/logo.png";
</script>

<div id="logo-img" class="col-12">
    <img class="img-fluid" {src} alt="Game Management Logo" />
</div>

<style>
    #logo-img {
        text-align: center;
        padding-bottom: 50px;
    }
    #logo-img > img {
        max-width: 50%;
    }
    @media (min-width: 768px) {
        #logo-img > img {
            max-width: 100%;
        }
    }
</style>
