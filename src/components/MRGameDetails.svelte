<script lang="ts">
    export let date: string = "";
    export let time: string = "";
    export let venue: string = "";
    export let competition: string = "";
    export let teamA: string = "";
    export let teamB: string = "";
    let heading: string = "Game Details";
</script>

<div class="container">
    <h2>{heading}</h2>

    <div class="row">
        <div class="col-4 title-lighter"><p>Dáta:</p></div>
        <div class="col-8"><p>{date}</p></div>
    </div>

    <div class="row">
        <div class="col-4 title-lighter"><p>Am:</p></div>
        <div class="col-8"><p>{time}</p></div>
    </div>
    <div class="row">
        <div class="col-4 title-lighter"><p>Ionad:</p></div>
        <div class="col-8"><p>{venue}</p></div>
    </div>
    <div class="row">
        <div class="col-4 title-lighter"><p>Comortas:</p></div>
        <div class="col-8"><p>{competition}</p></div>
    </div>
    <div class="row">
        <div class="col-4 title-lighter"><p>Team A:</p></div>
        <div class="col-8"><p>{teamA}</p></div>
    </div>
    <div class="row">
        <div class="col-4 title-lighter"><p>Team B:</p></div>
        <div class="col-8"><p>{teamB}</p></div>
    </div>
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
