<script lang="ts">
    import Card from "./Card.svelte";

    export let cards = [];
    export let teamA = "";
    export let teamB = "";
    export let teamAid = "";
    export let teamBid = "";
</script>

<div class="table-responsive">
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Imreoirí / Player</th>
                <th scope="col">Contae/Club (County/ Club)</th>
                <th scope="col">Mi-iompar / Infraction</th>
            </tr>
        </thead>
        <tbody>
            {#each cards as card}
                <tr>
                    <th
                        >{card.memberName.firstName}
                        {card.memberName.lastName}</th
                    >
                    {#if card.team == teamAid}
                        <td>{teamA}</td>
                    {:else if card.team == teamBid}
                        <td>{teamB}</td>
                    {:else}<td />
                    {/if}
                    <td> {card.note}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
