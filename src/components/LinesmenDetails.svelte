<script lang="ts">
    export let linesmen: ["", ""];

    $: linesman1 = "";
    $: linesman2 = "";

    $: if (linesmen.length > 0) {
        linesman1 = linesmen[0];
    }
    $: if (linesmen.length > 1) {
        linesman2 = linesmen[1];
    }
</script>

<div class="row">
    <div class="col-4 title-lighter"><p>linesmen:</p></div>
    {#if linesman1 != ""}
        <div class="col-8"><p>{linesman1}</p></div>
    {/if}
</div>
{#if linesman2 != ""}
    <div class="row">
        <div class="col-8 offset-4"><p>{linesman2}</p></div>
    </div>
{/if}
