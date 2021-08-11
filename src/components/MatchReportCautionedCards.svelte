<script lang="ts">
    import MatchReportCardsTable from "./MatchReportCardsTable.svelte";
    let heading: string = "Ímreoirí a fuair rabhadh";
    export let yellowCards = [];
    export let teamA = "";
    export let teamB = "";
    export let teamAid = "";
    export let teamBid = "";
</script>

<div class="container">
    <h2>{heading}</h2>
    <p>Details of players cautioned (Yellow Card)</p>
    <p>(A) Cautionable Foul / Infraction (A Yellow Card)</p>
    <br />
    <MatchReportCardsTable
        cards={yellowCards}
        {teamA}
        {teamB}
        {teamAid}
        {teamBid}
    />
    <br />
</div>

<style>
    .container {
        border-style: solid;
        border-radius: 30px;
        border-color: #f8f9fa;
    }
</style>
