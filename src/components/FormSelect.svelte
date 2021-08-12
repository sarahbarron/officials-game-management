<script lang="ts">
    export let selectId = "";
    export let labelText = "";
    export let values = [];
</script>

<!-- Competition Select Menu -->
<div class="row pb-3">
    <label for={selectId}>{labelText}</label>

    <select id={selectId} class={selectId} required>
        {#each values as value}
            <option value={value.id}>{value.name}</option>
        {/each}
    </select>
</div>

<style>
    label {
        margin-top: 20px;
    }
</style>
