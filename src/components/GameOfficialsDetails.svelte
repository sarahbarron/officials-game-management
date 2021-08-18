<script lang="ts">
    import LinesmenDetails from "./LinesmenDetails.svelte";
    import UmpiresDetails from "./UmpiresDetails.svelte";

    export let referee: string = "";
    export let linesmen: ["", ""];
    export let umpires: ["", "", "", ""];
    let heading: string = "Game Officials";
</script>

<div class="container">
    <h2>{heading}</h2>
    <div class="row">
        <div class="col-4 title-lighter"><p>Referee:</p></div>
        <div class="col-8"><p>{referee}</p></div>
    </div>

    <LinesmenDetails {linesmen} />
    <UmpiresDetails {umpires} />
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
