<script lang="ts">
    export let games = [];

    import UpcomingGameListItem from "./GamesListItem.svelte";
    $: games;
</script>

{#if games.length === 0}
    <p>Retrieving upcoming games one moment ...</p>
{:else}
    <UpcomingGameListItem {games} />
{/if}
