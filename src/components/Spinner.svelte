<script lang="ts">
    import { onDestroy } from "svelte";
    import { Circle3 } from "svelte-loading-spinners";
    import { spinner } from "../services/storeUser";

    let spin: boolean;
    let unsubscribeSpinner = spinner.subscribe((value) => {
        spin = value;
    });
    onDestroy(unsubscribeSpinner);
    if (spin) {
        setTimeout(() => {
            spinner.set(false);
        }, 15000);
    }
</script>

<div class="div circle">
    {#if spin}
        <Circle3
            size="60"
            ballTopLeft="#00ff11"
            ballTopRight="#005E82"
            ballBottomRight="#fcfc07"
            ballBottomLeft="#fa00ff"
            unit="px"
            duration="1s"
        />
        <h2>Loading .....</h2>
    {/if}
</div>

<style>
    .circle {
        text-align: -webkit-center;
    }
</style>
