<script lang="ts">
    import UpcomingGames from "./UpcomingGames.svelte";
    export let innerCard: string = "";
    // export let userType: string = "";
    export let games = [];
</script>

<div class="card-body">
    {#if innerCard === "upcoming"}
        <UpcomingGames {games} />
    {/if}
</div>
