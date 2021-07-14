<script lang="ts">
    export let referee: string = "";
    export let linesman1: string = "";
    export let linesman2: string = "";
    export let umpire1: string = "";
    export let umpire2: string = "";
    export let umpire3: string = "";
    export let umpire4: string = "";
    let heading: string = "Game Officials";
</script>

<div class="container">
    <h1>{heading}</h1>
    <div class="row">
        <div class="col-4 title-lighter"><p>Referee:</p></div>
        <div class="col-8"><p>{referee}</p></div>
    </div>

    <div class="row">
        <div class="col-4 title-lighter"><p>linesman 1:</p></div>
        <div class="col-8"><p>{linesman1}</p></div>
    </div>
    <div class="row">
        <div class="col-4 title-lighter"><p>linesman 2:</p></div>
        <div class="col-8"><p>{linesman2}</p></div>
    </div>
    <div class="row">
        <div class="col-4 title-lighter"><p>Umpire 1:</p></div>
        <div class="col-8"><p>{umpire1}</p></div>
    </div>
    <div class="row">
        <div class="col-4 title-lighter"><p>Umpire 2:</p></div>
        <div class="col-8"><p>{umpire2}</p></div>
    </div>
    <div class="row">
        <div class="col-4 title-lighter"><p>Umpire 3:</p></div>
        <div class="col-8"><p>{umpire3}</p></div>
    </div>
    <div class="row">
        <div class="col-4 title-lighter"><p>Umpire 4:</p></div>
        <div class="col-8"><p>{umpire4}</p></div>
    </div>
</div>

<style>
    h1 {
        text-align: left;
    }
    .container {
        border-style: solid;
        border-radius: 30px;
        border-color: #f8f9fa;
        padding-bottom: 50px;
        height: 100%;
    }
</style>
