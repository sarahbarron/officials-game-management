<script lang="ts">
    import Auth from "../components/Auth.svelte";
    import Logo from "../components/Logo.svelte";
    import router from "page";
</script>

<div>
    <h1 class="heading">Gaa Officials Game Management</h1>

    <Logo />
    <Auth on:auth={() => router.redirect("/home")} />
    <!-- <Auth on:auth={() => (window.location.href = "/#")} /> -->
</div>
