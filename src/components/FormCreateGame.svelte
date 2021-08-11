<script lang="ts">
</script>

<div class="card">
    <div class="card-header"><h2>Create Game</h2></div>
    <div class="card-body">
        <form action="">
            <div class="row">
                <!-- Game Details -->
                <div class="col-12 col-md-6">
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
                                    type="date"
                                    id="datePicker"
                                    name="datePicker"
                                />
                            </div>
                            <!-- Time of match -->
                            <div class="row">
                                <label for="time">Time:</label>
                                <input type="time" id="time" name="time" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Referee / Linesmen / Umpires -->
                <div class="col-12 col-md-6">Hellow</div>
            </div>
            <button type="submit" class="btn btn-primary">Create Game</button>
        </form>
    </div>
</div>

<style>
    form {
        font-size: 20px;
    }
    .card {
        margin-bottom: 20px;
    }

    /* @media (min-width: 768px) { */
    .custom-radio {
        padding: 20px 10px;
    }
    /* } */
    .radio-btn {
        width: 10%;
        height: 100%;
        vertical-align: bottom;
    }
    /* } */
</style>
