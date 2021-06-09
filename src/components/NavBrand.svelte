<script lang="ts">
    let src = "images/mini-logo.png";
</script>

<a class="navbar-brand" href="/">
    <img {src} class="d-inline-block align-top" alt="GAA Game Mangement Logo" />
    GAA Game Management
</a>

<style>
    .navbar-brand {
        font-family: "Neuton", serif;
        color: #005e82;
    }
    img {
        height: 50px;
        width: 60px;
        margin-right: 10px;
    }
    @media (min-width: 768px) {
        .navbar-brand {
            font-size: 50px;
        }
        img {
            height: 100px;
            width: 125px;
            margin-right: 30px;
        }
    }
</style>
