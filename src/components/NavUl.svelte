<script>
    import Logout from "./Logout.svelte";
    import NavLi from "./NavLi.svelte";
</script>

<ul class="navbar-nav navbar-nav-scroll" style="--bs-scroll-height: 200px;">
    <NavLi
        id="home"
        href="/home"
        text="Home"
        active="active"
        aria-current="home page"
    />
    <NavLi
        id="past-games"
        href="/home"
        text="Past Games"
        active=""
        aria-current="past games"
    />
    <Logout logoutBtnColors="logoutBtnColors" />
</ul>

<style>
    @media (min-width: 768px) {
        ul {
            align-content: right;
        }
    }
</style>
