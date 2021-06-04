<script lang="ts">
    import Auth from "../components/Auth.svelte";
    import router from "page";
    export let qs;

    qs.action = qs.action || "login";
    if (!["login"].includes(qs.action)) qs.action = "login";
</script>

<h1 class="w3-center w3-jumbo">GAA Game Management Login</h1>
<Auth on:auth={() => router.redirect("/home")} />
<!-- <Auth on:auth={() => router.redirect(qs.next || "/home")} /> -->

<!-- <Auth on:auth={() => (window.location.href = qs.next || "/")} /> -->
