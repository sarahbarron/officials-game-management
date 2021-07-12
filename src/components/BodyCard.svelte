<script lang="ts">
    import GamesListItem from "./GamesListItem.svelte";
    export let games = [];
</script>

<div class="card-body">
    <GamesListItem {games} />
</div>
