<script lang="ts">
    export let heading: string = "";
    export let games = [];
</script>

<h3>{heading}</h3>
{#each games as game (game.id)}
    <div class="col-12">
        <p>{game.id}</p>
    </div>
{/each}
