<script lang="ts">
    import Nav from "../components/NavBar.svelte";
    import { auth } from "../services/firebase";
    import router from "page";
    import Heading1 from "../components/Heading1.svelte";
    import Footer from "../components/Footer.svelte";
    let loginString = `You need to <a href='/login'>Login</a>`;
    let heading = "Referee Dashboard";
    let isActive = "referee";
    interface User {
        email: String;
        uid: String;
    }
    let user: User | null;
    auth.onAuthStateChanged((u) => (user = u));
    $: {
        if (user === null) router.redirect("/login");
    }
</script>

<div class="page-container">
    <div class="container-fluid">
        {#if typeof user === "undefined"}
            <i class="fas fa-spinner w3-spin fa-3x" />
        {:else if user}
            <Nav {isActive} />
            <div class="contaner padding-for-footer">
                <Heading1 {heading} />
            </div>
            <Footer />
        {:else}
            <h2>{@html loginString}</h2>
        {/if}
    </div>
</div>
