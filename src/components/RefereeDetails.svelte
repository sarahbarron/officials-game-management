<script lang="ts">
    export let referee: string = "";
    export let refereeAddressLine1: string = "";
    export let refereeAddressLine2: string = "";
    export let refereeTown: string = "";
    export let refereeCounty: string = "";
    export let refereeEircode: string = "";

    let heading: string = "Referee Details";
</script>

<div class="container">
    <h2>{heading}</h2>
    <div class="row">
        <div class="col-4 title-lighter"><p>Ainm:</p></div>
        <div class="col-8"><p>{referee}</p></div>
    </div>

    <div class="row">
        <div class="col-4 title-lighter"><p>Seoladh:</p></div>
        <div class="col-8">
            <p>
                {#if refereeAddressLine1 != null}{refereeAddressLine1},{/if}
                {#if refereeAddressLine2 != null}{refereeAddressLine2},{/if}
                {#if refereeTown != null}{refereeTown},{/if}
                {#if refereeCounty != null}{refereeCounty},{/if}
                {#if refereeEircode != null}{refereeEircode}.{/if}
            </p>
        </div>
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
