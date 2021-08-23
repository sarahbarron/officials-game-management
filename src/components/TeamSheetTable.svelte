<script lang="ts">
    import {
        addPlayerToTeamSheetInFirestore,
        hasGameStarted,
        removePlayerFromTeamSheetInFirestore,
    } from "../services/firebaseQueries";
    import TeamSheetPlayerRow from "./TeamSheetPlayerRow.svelte";
    export let players = [];
    export let gameId = "";
    export let teamId = "";
    $: error = false;
    $: saved = false;
    $: error_message = "";

    // check if all the field Positions have been filled
    let checkAreAllFieldPosititonsFilled = (fieldNumbersUsed) => {
        fieldNumbersUsed.sort((a, b) => a - b);
        let fieldNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        let isEqual = fieldNumbers.toString() === fieldNumbersUsed.toString();
        return isEqual;
    };

    // return an duplicates in an array
    let checkForDuplication = (numbers) => {
        const set = new Set(numbers);
        const duplicates = numbers.filter((item) => {
            if (set.has(item)) {
                set.delete(item);
            } else {
                return item;
            }
        });
        return duplicates;
    };

    let checkIfAllPlayersHaveAJerseyNumber = () => {
        let player_names_no_jersey = [];

        players.forEach((player) => {
            if (!player.unavailable) {
                if (player.jerseyNumber == null || player.jerseyNumber < 1) {
                    player_names_no_jersey = [
                        ...player_names_no_jersey,
                        player.name,
                    ];
                }
            }
        });

        return player_names_no_jersey;
    };
    // get an array of all jersey numbers entered
    let getAllJerseyNumbers = () => {
        let jerseyNumbersUsed = [];
        players.forEach((player) => {
            if (player.jerseyNumber != null && player.jerseyNumber > 0) {
                jerseyNumbersUsed = [...jerseyNumbersUsed, player.jerseyNumber];
            }
        });
        return jerseyNumbersUsed;
    };

    // get an array of all field positions entered
    let getAllFieldPositionNumbers = () => {
        let fieldNumbersUsed = [];
        players.forEach((player) => {
            if (
                player.fieldPosition != null &&
                player.fieldPosition > 0 &&
                player.fieldPosition < 16
            ) {
                fieldNumbersUsed = [...fieldNumbersUsed, player.fieldPosition];
            }
        });
        return fieldNumbersUsed;
    };
    let checkForValidInput = () => {
        let jerseyNumbers = getAllJerseyNumbers();
        let fieldNumbers = getAllFieldPositionNumbers();
        let duplicateJerseyNumbers = checkForDuplication(jerseyNumbers);
        if (duplicateJerseyNumbers.length > 0) {
            error_message = `${error_message} You have inputted duplicate Jersey Numbers for ${duplicateJerseyNumbers}`;
        }
        let duplicateFieldPositions = checkForDuplication(fieldNumbers);
        if (duplicateFieldPositions.length > 0) {
            if (error_message.length > 0) {
                error_message = `${error_message} and`;
            }
            error_message = `${error_message} You have inputted duplicate Field Posititions for ${duplicateFieldPositions}`;
        }
        if (
            duplicateJerseyNumbers.length > 0 ||
            duplicateFieldPositions.lenght > 0
        ) {
            error = true;
            return false;
        }
        let allFieldPositionsFilled =
            checkAreAllFieldPosititonsFilled(fieldNumbers);
        if (!allFieldPositionsFilled) {
            error_message =
                "You have not filled in all field posititions for 1 to 15";
            error = true;
            return false;
        }
        let player_names_no_jersey = checkIfAllPlayersHaveAJerseyNumber();
        if (player_names_no_jersey.length > 0) {
            error_message = "The following players need valid jersey numbers: ";
            for (let i = 0; i < player_names_no_jersey.length; i++) {
                if (i > 0 && i < player_names_no_jersey.length - 1) {
                    error_message = `${error_message} , `;
                }
                error_message = `${error_message} ${player_names_no_jersey[i]}`;
            }
            error = true;
            return false;
        }
        return true;
    };

    let removeUnavailablePlayersFromFirestore = async () => {
        let unavailablePlayers = [];
        players.forEach((player) => {
            if (player.unavailable) {
                unavailablePlayers = [...unavailablePlayers, player];
            }
        });
        unavailablePlayers.forEach((player) => {
            removePlayerFromTeamSheetInFirestore(gameId, teamId, player.id);
        });
    };
    let saveToFirestore = async () => {
        players.forEach((player) => {
            let unavailable = player.unavailable;
            if (!unavailable) {
                let fieldPosition = player.fieldPosition;
                let jerseyNumber = player.jerseyNumber;
                let onField = player.onField;
                if (
                    fieldPosition == null ||
                    fieldPosition < 1 ||
                    fieldPosition > 15
                ) {
                    onField = false;
                    fieldPosition = null;
                } else {
                    onField = true;
                }
                let firestorePlayer = {
                    id: player.id,
                    jerseyNumber: jerseyNumber,
                    fieldPosition: fieldPosition,
                    onField: onField,
                };
                addPlayerToTeamSheetInFirestore(
                    gameId,
                    teamId,
                    firestorePlayer
                );
            }
        });
    };

    // save the team sheet if input is valid and the game hasn't started already
    let saveTeamSheet = async () => {
        saved = false;
        error = false;
        error_message = "";
        let validInput = checkForValidInput();
        if (validInput) {
            let gameStarted = await hasGameStarted(gameId);
            if (!gameStarted) {
                removeUnavailablePlayersFromFirestore();
                saveToFirestore();
                saved = true;
            } else {
                error_message =
                    "Can't update teamsheet as the game has already started";
                error = true;
            }
        }
    };
</script>

<div class="row">
    <br />
    <h3>Input Teamsheet Details</h3>
    <br />
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col-6">Player Name</th>
                    <th scope="col">Field Position</th>
                    <th scope="col">Jersey Num</th>
                    <th scope="col">Unavailable</th>
                </tr>
            </thead>
            <tbody>
                {#each players as player}
                    <TeamSheetPlayerRow {player} />
                {/each}
            </tbody>
        </table>
        <div class="col-12 btn-right">
            <button on:click={saveTeamSheet} class="btn btn-primary btn-lg"
                >Save Teamsheet</button
            >
        </div>
        {#if error}
            <div class="error">
                <p>{error_message}</p>
            </div>
        {/if}
        {#if saved}
            <div class="saved">
                <p>Team Sheet saved</p>
            </div>
        {/if}
    </div>
</div>

<style>
    .btn-right {
        text-align: right;
    }

    th {
        font-size: 20px;
    }

    .error > p {
        color: red;
    }

    .saved > p {
        color: green;
    }
    .error,
    .saved {
        padding-top: 20px;
        font-weight: bold;
        text-align: right;
    }
</style>
