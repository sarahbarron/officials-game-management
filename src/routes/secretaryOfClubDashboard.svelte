<script lang="ts">
    import Nav from "../components/NavBar.svelte";
    import { auth } from "../services/firebase";
    import router from "page";
    import Heading1 from "../components/Heading1.svelte";
    import Footer from "../components/Footer.svelte";
    import { onDestroy } from "svelte";
    import { secretaryOfClub } from "../services/storeUser";
    let loginString = `You need to <a href='/login'>Login</a>`;
    let heading = "Secretary Of Club";
    let isActive = "club";
    interface User {
        email: String;
        uid: String;
    }
    let user: User | null;
    auth.onAuthStateChanged((u) => (user = u));
    $: {
        if (user === null) router.redirect("/login");
    }
    let secretary_of_club: boolean;
    const unsubcribeSecOfClub = secretaryOfClub.subscribe((value) => {
        secretary_of_club = value;
    });
    onDestroy(unsubcribeSecOfClub);

    // if the user is not a secretary of a club revert back to login
    $: if (!secretary_of_club) {
        router.redirect("/login");
    }
</script>

<div class="page-container">
    <div class="container-fluid">
        {#if typeof user === "undefined"}
            <i class="fas fa-spinner w3-spin fa-3x" />
        {:else if user}
            {#if secretary_of_club}
                <Nav {isActive} />
                <Heading1 {heading} />
                <div class="container padding-for-footer" />
                <Footer />
            {:else}
                <i class="fas fa-spinner w3-spin fa-3x" />
            {/if}
        {:else}
            <h2>{@html loginString}</h2>
        {/if}
    </div>
</div>
