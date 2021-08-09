<script lang="ts">
    import MatchReportCardsTable from "./MatchReportCardsTable.svelte";
    let heading: string = "Ímreoirí a ordaitear don bpáirc";
</script>

<div class="container">
    <h2>{heading}</h2>

    <p>(A) Details of players ordered off the field (Red Card)</p>
    <br />
    <MatchReportCardsTable />
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
    <MatchReportCardsTable />
    <br />
    <p>(C) Cynical Behaviour infraction (A Black Card)(Football Only)</p>
    <MatchReportCardsTable />
</div>

<style>
    .container {
        border-style: solid;
        border-radius: 30px;
        border-color: #f8f9fa;
    }
</style>
