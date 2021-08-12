<script lang="ts">
</script>

<div class="card">
    <div class="card-header"><h2>Create Game</h2></div>
    <div class="card-body">
        <form action="">
            <div class="row">
                <!-- Game Details -->
                <div id="game-details" class="col-12 col-md-6">
                    <div class="row">
                        <!-- radio buttons for club or county -->
                        <div class="col-12 col-md-6">
                            <div class="row">
                                <!-- Club Radio Button -->
                                <div class="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        id="club"
                                        name="customRadio"
                                        class="radio-btn custom-control-input"
                                        required
                                    />
                                    <label
                                        class="custom-control-label"
                                        for="club">Club</label
                                    >
                                </div>
                            </div>
                            <div class="row">
                                <!-- County Radio Button -->
                                <div class="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        id="county"
                                        name="customRadio"
                                        class="radio-btn custom-control-input"
                                    />
                                    <label
                                        class="custom-control-label"
                                        for="county">County</label
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- date Of Match -->
                        <div class="col-12 col-md-6">
                            <div class="row pb-3">
                                <label for="datePicker">Date:</label>
                                <input
                                    class="form-control"
                                    type="date"
                                    id="datePicker"
                                    name="datePicker"
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
                    <div class="row pb-3">
                        <label for="venue-select">Select Venue</label>
                        <select class="venue-select" required>
                            <option selected value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <!-- Competition Select Menu -->
                    <div class="row pb-3">
                        <label for="competition-select"
                            >Select Competition</label
                        >

                        <select class="competition-select" required>
                            <option selected value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <!-- Team A Select Menu -->
                    <div class="row pb-3">
                        <label for="teamA-select">Select Team A</label>
                        <select class="teamA-select" required>
                            <option selected value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <!-- Team B Select Menu -->
                    <div class="row pb-3">
                        <label for="teamB-select">Select Team B</label>

                        <select class="teamB-select" required>
                            <option selected value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
                <!-- Referee / Linesmen / Umpires -->
                <div id="ref-details" class="col-12 col-md-6">
                    <!-- Referee Select Menu -->

                    <div class="row pb-3">
                        <label for="referee-select">Select Referee</label>

                        <select class="referee-select" required>
                            <option selected value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
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
