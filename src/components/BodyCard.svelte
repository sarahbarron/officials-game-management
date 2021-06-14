<script lang="ts">
    import UpcomingGames from "./UpcomingGames.svelte";
    export let innerCard: string = "";
    export let userType: string = "";
</script>

<div class="card-body">
    {#if innerCard === "upcoming"}
        <UpcomingGames {userType} />
    {/if}
</div>
