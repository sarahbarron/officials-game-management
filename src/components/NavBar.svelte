<script lang="ts">
    import NavUl from "./NavUl.svelte";
    import NavBrand from "./NavBrand.svelte";
    import NavToggleBtn from "./NavToggleBtn.svelte";
    export let isActive: string = "";
</script>

<nav id="nav-bar" class="navbar navbar-expand-xl navbar-light bg-light">
    <div class="container-fluid">
        <NavBrand />
        <NavToggleBtn />
        <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNavDarkDropdown"
        >
            <NavUl {isActive} />
        </div>
    </div>
</nav>

<style>
    @media (min-width: 768px) {
        #nav-bar {
            padding: 0px 50px;
        }
        nav {
            margin-bottom: 70px;
        }
    }
</style>
