<script lang="ts">
    import FormSelect from "./FormSelect.svelte";

    // Club / County Radio Buttons
    $: cantBeCounty = false;
    $: cantBeClub = false;

    // Only allow dates from tomorrow onwards to be selected
    let date = new Date();
    date.setDate(date.getDate() + 1);
    let year = `${date.getFullYear()}`;
    let thisMonth = date.getMonth() + 1;
    let day = `${date.getDate()}`;
    let month = `${thisMonth}`;
    let tomorrow: string = "";

    $: if (month != undefined) {
        if (month.length === 1) {
            month = `0${month}`;
        }
    }

    $: if (day != undefined) {
        if (day.length === 1) {
            day = `0${day}`;
        }
    }

    $: tomorrow = `${year}-${month}-${day}`;
    console.log(tomorrow);
    // Venue options
    export let venueOptions = [];
    $: filteredVenues = venueOptions;
    // Competition options
    export let competitionOptions = [];
    $: filteredCompetitions = competitionOptions;
    // Team options
    export let teamOptions = [];
    $: filteredTeamsA = teamOptions;
    $: filteredTeamsB = teamOptions;
    // Referee
    export let refereeOptions = [];
    $: filteredReferees = refereeOptions;

    $: console.log(`Venues: ${venueOptions}`);
    $: console.log(`Competitins ${competitionOptions}`);
    $: console.log(`Teams ${teamOptions}`);
    $: console.log(`Referee ${refereeOptions}`);
</script>

<div class="card">
    <div class="card-header"><h2>Create Game</h2></div>
    <div class="card-body">
        <form action="" class="needs-validation" data-toggle="validator">
            <div class="row">
                <!-- Game Details -->
                <div id="game-details" class="col-12 col-md-6">
                    <div class="row">
                        <!-- radio buttons for club or county -->
                        <div class="col-12 col-md-6">
                            <div class="row">
                                <!-- Club Radio Button -->
                                <div class="custom-control custom-radio">
                                    {#if cantBeClub}
                                        <input
                                            type="radio"
                                            id="club"
                                            name="customRadio"
                                            class="radio-btn custom-control-input"
                                            disabled
                                        />
                                    {:else if cantBeCounty}
                                        <input
                                            type="radio"
                                            id="club"
                                            name="customRadio"
                                            class="radio-btn custom-control-input"
                                            checked
                                        />
                                    {:else}
                                        <input
                                            type="radio"
                                            id="club"
                                            name="customRadio"
                                            class="radio-btn custom-control-input"
                                        />
                                    {/if}
                                    <label
                                        class="custom-control-label"
                                        for="club">Club</label
                                    >
                                </div>
                            </div>
                            <div class="row">
                                <!-- County Radio Button -->
                                <div class="custom-control custom-radio">
                                    {#if cantBeCounty}
                                        <input
                                            type="radio"
                                            id="county"
                                            name="customRadio"
                                            class="radio-btn custom-control-input"
                                            disabled
                                        />
                                    {:else if cantBeClub}
                                        <input
                                            type="radio"
                                            id="county"
                                            name="customRadio"
                                            class="radio-btn custom-control-input"
                                            checked
                                        />
                                    {:else}
                                        <input
                                            type="radio"
                                            id="county"
                                            name="customRadio"
                                            class="radio-btn custom-control-input"
                                        />
                                    {/if}
                                    <label
                                        class="custom-control-label"
                                        for="county">County</label
                                    >
                                </div>
                                <div class="invalid-feedback">
                                    Please choose club or county.
                                </div>
                            </div>
                        </div>
                        <!-- date Of Match -->
                        <div class="col-12 col-md-6">
                            {tomorrow}
                            <div class="row pb-3">
                                <label for="datePicker">Date:</label>
                                <input
                                    class="form-control"
                                    type="date"
                                    id="datePicker"
                                    name="datePicker"
                                    min={tomorrow}
                                    required
                                />
                            </div>
                            <!-- Time of match -->
                            <div class="row pb-3">
                                <label for="time">Time:</label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <!-- Venue Select Menu -->

                    <!-- Team B Select Menu -->
                    <FormSelect
                        selectId="venue-select"
                        labelText="Select Venue"
                        values={filteredVenues}
                    />

                    <!-- Competition Select Menu -->
                    <FormSelect
                        selectId="competition-select"
                        labelText="Select Competition"
                        values={filteredCompetitions}
                    />

                    <!-- Team A Select Menu -->
                    <FormSelect
                        selectId="teamA-select"
                        labelText="Select Team A"
                        values={filteredTeamsA}
                    />

                    <!-- Team B Select Menu -->
                    <FormSelect
                        selectId="teamB-select"
                        labelText="Select Team B"
                        values={filteredTeamsB}
                    />
                </div>
                <!-- Referee / Linesmen / Umpires -->
                <div id="ref-details" class="col-12 col-md-6">
                    <!-- Referee Select Menu -->

                    <FormSelect
                        selectId="referee-select"
                        labelText="Select Referee"
                        values={filteredReferees}
                    />

                    <br />
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
                    <br />
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
            </div>
            <div class="d-flex align-items-end flex-column">
                <button type="submit" class="btn btn-primary"
                    >Create Game</button
                >
            </div>
        </form>
    </div>
</div>

<style>
    #game-details,
    #ref-details {
        border-style: solid;
        border-radius: 20px;
        padding: 20px;
        margin-bottom: 20px;

        border-color: #f8f9fa;
    }
    form,
    button {
        font-size: 20px;
    }
    .card {
        margin-bottom: 20px;
    }

    @media (min-width: 769px) {
        #game-details,
        #ref-details {
            padding: 100px;
        }
    }
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
