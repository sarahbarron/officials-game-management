<script lang="ts">
    export let players = [];
    $: sortedPlayers = players.sort(function (a, b) {
        console.log(`${a.fieldPosition} - ${b.fieldPosition}`);
        return a.fieldPosition - b.fieldPosition;
    });
</script>

<div class="container">
    <h3>Starting Team</h3>

    {#each sortedPlayers as player}
        {#if !player.unavailable}
            {#if player.fieldPosition != null && player.fieldPosition > 0}
                <div class="col-2">{player.fieldPosition}:</div>
                <div class="col-10">({player.jerseyNumber}){player.name}</div>
            {/if}
        {/if}
    {/each}
    <hr />
    <h3>Substitutes</h3>
    {#each sortedPlayers as player}
        {#if !player.unavailable}
            {#if player.fieldPosition == null || player.fieldPosition == 0}
                <div class="col-10">
                    {#if player.jerseyNumber != null && player.jerseyNumber > 0}
                        ({player.jerseyNumber})
                    {/if}
                    {player.name}
                </div>
            {/if}
        {/if}
    {/each}
</div>

<style>
    .container {
        border-style: solid;
        border-radius: 30px;
        border-color: #f8f9fa;
        padding-bottom: 50px;
        height: 100%;
    }
</style>
