<script lang="ts">
    export let player: {
        id: string;
        name: string;
        fieldPosition: number;
        jerseyNumber: number;
        onField: boolean;
        unavailable: boolean;
    };

    $: if (player.unavailable) {
        player.fieldPosition = null;
        player.jerseyNumber = null;
    }
</script>

<tr>
    <th scope="row">
        {#if !player.unavailable}
            <span id="${player.id}" class="player-name col-6">
                {player.name}
            </span>
        {:else}
            <span class="player-name unavailable col-6">{player.name}</span>
        {/if}
    </th>
    <td>
        {#if !player.unavailable}
            <input
                id="field-${player.id}"
                type="number"
                bind:value={player.fieldPosition}
                min="null"
                max="15"
            />
        {:else}
            <input
                id="field-${player.id}"
                type="number"
                bind:value={player.fieldPosition}
                min="null"
                max="15"
                disabled
            />
        {/if}
    </td>
    <td>
        {#if !player.unavailable}
            <input
                id="jersey-${player.id}"
                type="number"
                bind:value={player.jerseyNumber}
                min="null"
                max="15"
            />
        {:else}
            <input
                id="jersey-${player.id}"
                type="number"
                bind:value={player.jerseyNumber}
                min="null"
                max="15"
                disabled
            />
        {/if}
    </td>
    <td>
        <input
            id="checkbox-${player.id}"
            class="checkbox-size"
            type="checkbox"
            bind:checked={player.unavailable}
        />
    </td>
</tr>

<style>
    input {
        width: 50%;
        height: 100%;
    }

    .checkbox-size {
        width: 20px;
        height: 20px;
    }
    .unavailable {
        text-decoration: line-through;
    }
    .player-name {
        font-size: 20px;
    }
    @media (min-width: 768px) {
        input {
            width: 50%;
            height: 100%;
        }
        input {
            margin: 0 20px;
        }
        .checkbox-size {
            width: 30px;
            height: 30px;
        }
    }
</style>
