<script lang="ts">
    import FormCreateGameDatePicker from "./FormCreateGameDatePicker.svelte";
    import FormCreateGameRadioButtons from "./FormCreateGameRadioButtons.svelte";
    import FormCreateGameTime from "./FormCreateGameTime.svelte";
    import FormSelect from "./FormSelect.svelte";
    export let filteredVenues = [];
    export let filteredCompetitions = [];
    export let filteredTeamsA = [];
    export let filteredTeamsB = [];
    export let cantBeClub = false;
    export let cantBeCounty = false;
</script>

<!-- Game Details -->
<div id="game-details" class="col-12 col-md-6">
    <div class="row">
        <!-- radio buttons for club or county -->
        <FormCreateGameRadioButtons {cantBeClub} {cantBeCounty} />

        <div class="col-12 col-md-6">
            <!-- date Of Match -->

            <FormCreateGameDatePicker />
            <!-- Time of match -->
            <FormCreateGameTime />
        </div>
    </div>
    <hr />
    <!-- Venue Select Menu -->
    <FormSelect
        selectId="venueSelect"
        labelText="Select Venue"
        values={filteredVenues}
    />

    <!-- Competition Select Menu -->
    <FormSelect
        selectId="competitionSelect"
        labelText="Select Competition"
        values={filteredCompetitions}
    />

    <!-- Team A Select Menu -->
    <FormSelect
        selectId="teamASelect"
        labelText="Select Team A"
        values={filteredTeamsA}
    />

    <!-- Team B Select Menu -->
    <FormSelect
        selectId="teamBSelect"
        labelText="Select Team B"
        values={filteredTeamsB}
    />
</div>

<style>
    #game-details {
        border-style: solid;
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 20px;

        border-color: #f8f9fa;
    }

    @media (min-width: 769px) {
        #game-details {
            padding: 100px;
        }
    }
</style>
