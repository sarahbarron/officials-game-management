<script lang="ts">
    import { auth } from "../services/firebase";
    import { createEventDispatcher } from "svelte";
    import router from "page";
    const eventDispatch = createEventDispatcher();
    import { resetStore } from "../services/storeUser";
    function logout() {
        if (auth.currentUser) {
            auth.signOut()
                .then(() => {
                    resetStore();
                    router("/auth", () => router.redirect("/auth"));
                    eventDispatch("done");
                    eventDispatch("logout");
                })
                .catch((e) => {
                    throw new Error(e);
                });
        }
    }
    export let logoutBtnColors: string = "btn-primary";
</script>

<button class="btn {logoutBtnColors}" on:click={logout} aria-label="logout">
    Log out
    <i class="fa fa-sign-out font-icons" />
</button>

<style>
    .logoutBtnColors {
        background-color: #f8f9fa;
        color: rgba(0, 0, 0, 0.55);
        font-weight: 400;
        text-align: left;
        margin: 0px;
        padding: 0px;
    }
</style>
