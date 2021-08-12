<script lang="ts">
    export let cantBeClub = false;
    export let cantBeCounty = false;
</script>

<div class="col-12 col-md-6">
    <div class="row">
        <!-- Club Radio Button -->
        <div class="custom-control custom-radio">
            {#if cantBeClub}
                <input
                    value="club"
                    type="radio"
                    id="club"
                    name="customRadio"
                    class="radio-btn custom-control-input"
                    disabled
                />
            {:else if cantBeCounty}
                <input
                    value="club"
                    type="radio"
                    id="club"
                    name="customRadio"
                    class="radio-btn custom-control-input"
                    checked
                />
            {:else}
                <input
                    value="club"
                    type="radio"
                    id="club"
                    name="customRadio"
                    class="radio-btn custom-control-input"
                />
            {/if}
            <label class="custom-control-label" for="club">Club</label>
        </div>
    </div>
    <div class="row">
        <!-- County Radio Button -->
        <div class="custom-control custom-radio">
            {#if cantBeCounty}
                <input
                    value="county"
                    type="radio"
                    id="county"
                    name="customRadio"
                    class="radio-btn custom-control-input"
                    disabled
                />
            {:else if cantBeClub}
                <input
                    value="county"
                    type="radio"
                    id="county"
                    name="customRadio"
                    class="radio-btn custom-control-input"
                    checked
                />
            {:else}
                <input
                    value="county"
                    type="radio"
                    id="county"
                    name="customRadio"
                    class="radio-btn custom-control-input"
                />
            {/if}
            <label class="custom-control-label" for="county">County</label>
        </div>
        <div class="invalid-feedback">Please choose club or county.</div>
    </div>
</div>

<style>
    .radio-btn {
        width: 10%;
        height: 100%;
        vertical-align: middle;
    }
    .custom-radio {
        padding: 20px 10px;
    }
    label {
        margin-top: 20px;
    }
</style>
