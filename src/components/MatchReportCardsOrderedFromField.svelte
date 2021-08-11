<script lang="ts">
    import MatchReportCardsTable from "./MatchReportCardsTable.svelte";
    let heading: string = "Ímreoirí a ordaitear don bpáirc";
    export let teamA = "";
    export let teamAid = "";
    export let teamB = "";
    export let teamBid = "";
    export let redCards = [];
    export let blackCards = [];
    export let twoCards = [];
</script>

<div class="container">
    <h2>{heading}</h2>

    <p>(A) Details of players ordered off the field (Red Card)</p>
    <br />
    <MatchReportCardsTable
        cards={redCards}
        {teamA}
        {teamB}
        {teamAid}
        {teamBid}
    />
    <br />
    <p>
        (B) Details of players ordered off on foot of either a second
        cautionalble infraction (Hurling and Football) (A Second Yellow Card
        followed by Red (Hurling and Football))
    </p>
    <br />
    <p>OR</p>
    <br />
    <p>
        A cautionable infraction followed by a cynical behaviour infraction
        (football only)
    </p>
    <p>(A Yellow Card and a Black Card followed by a Red (Football Only))</p>
    <br />
    <MatchReportCardsTable
        cards={twoCards}
        {teamA}
        {teamB}
        {teamAid}
        {teamBid}
    />
    <br />
    <p>(C) Cynical Behaviour infraction (A Black Card)(Football Only)</p>
    <MatchReportCardsTable
        cards={blackCards}
        {teamA}
        {teamB}
        {teamAid}
        {teamBid}
    />
</div>

<style>
    .container {
        border-style: solid;
        border-radius: 30px;
        border-color: #f8f9fa;
    }
</style>
