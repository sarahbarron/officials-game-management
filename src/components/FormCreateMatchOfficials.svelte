<script lang="ts">
    import FormSelect from "../components/FormSelect.svelte";
    export let filteredReferees = [];
    let none = [{ id: null, name: "No Substitute Referee" }];
    $: subFilteredReferees = none.concat(filteredReferees);
</script>

<!-- Referee / Linesmen / Umpires -->
<div id="ref-details" class="col-12 col-md-6">
    <!-- Referee Select Menu -->

    <FormSelect
        selectId="refereeSelect"
        labelText="Select Referee"
        values={filteredReferees}
    />
    <FormSelect
        selectId="subRefereeSelect"
        labelText="Select Substitue Referee"
        values={subFilteredReferees}
    />

    <div class="row pb-3">
        <label for="linesman1">Linesmen</label>

        <input
            id="linesman1"
            class="form-control-lg"
            type="text"
            placeholder="Linesman 1"
        />
    </div>
    <div class="row pb-3">
        <input
            id="linesman2"
            class="form-control-lg"
            type="text"
            placeholder="Linesman 2"
        />
    </div>

    <div class="row pb-3">
        <label for="umpire1">Umpire</label>

        <input
            id="umpire1"
            class="form-control-lg"
            type="text"
            placeholder="Umpire 1"
        />
    </div>
    <div class="row pb-3">
        <input
            id="umpire2"
            class="form-control-lg"
            type="text"
            placeholder="Umpire 2"
        />
    </div>

    <div class="row pb-3">
        <input
            id="umpire3"
            class="form-control-lg"
            type="text"
            placeholder="Umpire 3"
        />
    </div>
    <div class="row pb-3">
        <input
            id="umpire4"
            class="form-control-lg"
            type="text"
            placeholder="Umpire 4"
        />
    </div>
</div>

<style>
    #ref-details {
        border-style: solid;
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 20px;

        border-color: #f8f9fa;
    }
    @media (min-width: 769px) {
        #ref-details {
            padding: 100px;
        }
    }

    label {
        margin-top: 20px;
    }
</style>
