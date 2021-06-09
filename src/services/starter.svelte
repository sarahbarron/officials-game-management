<script lang="ts">
    import { auth } from "../services/firebase";
    import router from "page";
    import Logout from "../components/Logout.svelte";
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

{#if typeof user === "undefined"}
    <i class="fas fa-spinner w3-spin fa-3x" />
{:else if user}
    <h1>Logged In</h1>
    <Logout />
{:else}
    <h2>Not Logged In</h2>
{/if}
