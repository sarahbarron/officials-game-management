<script lang="ts">
    let heading: string = "Additional Comments";

    export let additionalGameDetails = {};
    let delayInStart = "";
    $: matchProgramme = null;
    $: jerseyNumbered = null;
    $: linesmenAttire = "";
    $: pitchMarked = null;
    $: grassCut = null;
    $: extraComments = "";
    $: if (additionalGameDetails != {}) {
        getGameComments(additionalGameDetails);
    }

    let getGameComments = (additionalGameDetails) => {
        delayInStart = additionalGameDetails.delayInStart;
        matchProgramme = additionalGameDetails.matchProgramme;
        jerseyNumbered = additionalGameDetails.jerseyNumbered;
        linesmenAttire = additionalGameDetails.linesmenAttire;
        pitchMarked = additionalGameDetails.pitchMarked;
        grassCut = additionalGameDetails.grassCut;
        extraComments = additionalGameDetails.extraComments;
    };
</script>

<div class="container">
    <h2>{heading}</h2>
    <p class="title-lighter">
        1. If there was any delay in starting what was the cause?
    </p>

    {#if delayInStart != undefined && delayInStart != null}
        <p class="bold">{delayInStart}</p>
    {/if}
    <br />

    <p class="title-lighter col">
        2. Was a match programme provided? (Please check prior to the game)
        {#if matchProgramme != null && matchProgramme != undefined}
            <span class="bold">
                {#if matchProgramme} Yes {:else} No {/if}
            </span>{/if}
    </p>
    <br />

    <p class="title-lighter">
        3. Were players jeresy numbered in accordance with number on programme?
        {#if jerseyNumbered != null && jerseyNumbered != undefined}
            <span class="bold"
                >{#if jerseyNumbered} Yes {:else} No {/if}
            </span>
        {/if}
    </p>
    <br />

    <p class="title-lighter">
        4. Were linesmen properly attired? (if not please give details)
        {#if linesmenAttire != null && linesmenAttire != undefined}
            <span class="bold"> {linesmenAttire}</span>
        {/if}
    </p>

    <br />

    <p class="title-lighter">
        5. Was the pitch properly marked?
        {#if pitchMarked != null && pitchMarked != undefined}
            <span class="bold"
                >{#if pitchMarked}Yes {:else} No{/if}</span
            >
        {/if}
    </p>
    <br />

    <p class="title-lighter">
        6. Was the grass cut short enough?
        {#if grassCut != null && grassCut != undefined}
            <span class="bold"
                >{#if grassCut} Yes{:else} No {/if}</span
            >
        {/if}
    </p>
    <br />
    <p class="title-lighter">
        Give brief comments on stewarding encroachment onto the pitch by
        officials, or any other matter on presentation which you feel should be
        highlighted:
    </p>
    {#if extraComments != undefined && extraComments != null}
        <p class="bold">
            {extraComments}
        </p>
    {/if}
    <br />
</div>

<style>
    .container {
        border-style: solid;
        border-radius: 30px;
        border-color: #f8f9fa;
    }
    .bold {
        font-weight: 400;
    }
</style>
