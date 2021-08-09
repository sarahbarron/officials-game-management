<script lang="ts">
    export let umpires: ["", "", "", ""];

    $: umpire1 = "";
    $: umpire2 = "";
    $: umpire3 = "";
    $: umpire4 = "";

    $: if (umpires.length > 0) {
        umpire1 = umpires[0];
    }
    $: if (umpires.length > 1) {
        umpire2 = umpires[1];
    }
    $: if (umpires.length > 2) {
        umpire3 = umpires[2];
    }
    $: if (umpires.length > 3) {
        umpire4 = umpires[3];
    }
</script>

<div class="row">
    <div class="col-4 title-lighter"><p>Umpires:</p></div>
    {#if umpire1 != ""}
        <div class="col-8"><p>{umpire1}</p></div>
    {/if}
</div>
{#if umpire2 != ""}
    <div class="row">
        <div class="col-8 offset-4"><p>{umpire2}</p></div>
    </div>
{/if}
{#if umpire3 != ""}
    <div class="row">
        <div class="col-8 offset-4"><p>{umpire3}</p></div>
    </div>
{/if}
{#if umpire4 != ""}
    <div class="row">
        <div class="col-8 offset-4"><p>{umpire4}</p></div>
    </div>
{/if}
