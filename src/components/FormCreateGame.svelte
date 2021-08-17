<script lang="ts">
    import {
        allGames,
        clubRef,
        memberId,
        refereeOfClub,
        refereeOfCounty,
        refUpcomingGames,
        secClubUpcomingGames,
        secCouncilUpcomingGames,
        secCountyUpcomingClubGames,
        secCountyUpcomingCountyGames,
        secProvinceUpcomingGames,
        secretaryOfClub,
        secretaryOfCouncil,
        secretaryOfCounty,
        secretaryOfProvince,
        teamOfficial,
        teamOfficialUpcomingGames,
    } from "../services/storeUser";

    import FormCreateGameDetails from "./FormCreateGameDetails.svelte";
    import FormCreateMatchOfficials from "./FormCreateMatchOfficials.svelte";
    import { onDestroy } from "svelte";
    import {
        createGameInFirestore,
        createGame,
    } from "../services/firebaseQueries";
    import { db } from "../services/firebase";

    // Club / County Radio Buttons
    $: cantBeCounty = false;
    $: cantBeClub = false;

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

    let member_Id: string;
    const unsubscribeMemberId = memberId.subscribe((value) => {
        member_Id = value;
    });
    onDestroy(unsubscribeMemberId);

    function createNewGame(event) {
        try {
            let memberId = member_Id;
            console.log(`member id : ${memberId}`);
            let date = event.target.datePicker.value;
            console.log(`date: ${date}`);
            let time = event.target.time.value;
            console.log(`time ${time}`);
            let venueId = event.target.venueSelect.value;
            console.log(`venueId ${venueId}`);

            let competitionId = event.target.competitionSelect.value;
            console.log(`comp id ${competitionId}`);

            let teamAId = event.target.teamASelect.value;
            console.log(`team A : ${teamAId}`);

            let teamBId = event.target.teamBSelect.value;

            let refereeId = event.target.refereeSelect.value;
            let subReferee = event.target.subRefereeSelect.value;
            let linesman1 = event.target.linesman1.value;
            let linesman2 = event.target.linesman2.value;
            let umpire1 = event.target.umpire1.value;
            let umpire2 = event.target.umpire2.value;
            let umpire3 = event.target.umpire3.value;
            let umpire4 = event.target.umpire4.value;
            firestoreCreateGame(
                memberId,
                date,
                time,
                venueId,
                competitionId,
                teamAId,
                teamBId,
                refereeId,
                subReferee,
                linesman1,
                linesman2,
                umpire1,
                umpire2,
                umpire3,
                umpire4
            );
        } catch (e) {
            console.error(`createGame exception ${e}`);
        }
    }

    // retrieve all games of the user
    let all_games = [];
    let unsubscribeAllGames = allGames.subscribe((value) => {
        all_games = value;
    });
    onDestroy(unsubscribeAllGames);

    // Is the user secretary of council true/false
    let secretary_of_council: boolean;
    const unsubcribeSecOfCouncil = secretaryOfCouncil.subscribe((value) => {
        secretary_of_council = value;
    });
    onDestroy(unsubcribeSecOfCouncil);

    // get the council upcoming games
    let council_games = [];
    if (secretary_of_council) {
        const unsubscribeSecOfCouncilUpcomingGame =
            secCouncilUpcomingGames.subscribe((value) => {
                council_games = value;
            });
        onDestroy(unsubscribeSecOfCouncilUpcomingGame);
    }

    //  Is the user secretary of province true/false
    let secretary_of_province: boolean;
    const unsubcribeSecOfProvince = secretaryOfProvince.subscribe((value) => {
        secretary_of_province = value;
    });
    onDestroy(unsubcribeSecOfProvince);

    // get the provincial upcoming games
    let provincial_games = [];
    if (secretary_of_province) {
        const unsubscribeSecOfProvinceUpcomingGame =
            secProvinceUpcomingGames.subscribe((value) => {
                provincial_games = value;
            });
        onDestroy(unsubscribeSecOfProvinceUpcomingGame);
    }
    // Is the user a secretary of county true/false
    let secretary_of_county: boolean;
    const unsubcribeSecOfCounty = secretaryOfCounty.subscribe((value) => {
        secretary_of_county = value;
    });
    onDestroy(unsubcribeSecOfCounty);

    // get counties upcoming games
    let county_games = [];
    let county_club_games = [];
    if (secretary_of_county) {
        let unsubscribeSecOfCountyCountyGames =
            secCountyUpcomingCountyGames.subscribe((value) => {
                county_games = [];
            });
        onDestroy(unsubscribeSecOfCountyCountyGames);

        // get counties upcoming club games
        const unsubscribeSecOfCountyUpcomingGame =
            secCountyUpcomingClubGames.subscribe((value) => {
                county_club_games = value;
            });
        onDestroy(unsubscribeSecOfCountyUpcomingGame);
    }
    // Is the user secretary of club true/false
    let secretary_of_club: boolean;
    const unsubcribeSecOfClub = secretaryOfClub.subscribe((value) => {
        secretary_of_club = value;
    });
    onDestroy(unsubcribeSecOfClub);

    let club_games = [];
    // get a clubs upcoming games
    if (secretary_of_club) {
        let unsubscribeSecOfClubUpcomingGames = secClubUpcomingGames.subscribe(
            (value) => {
                club_games = value;
            }
        );
        onDestroy(unsubscribeSecOfClubUpcomingGames);
    }
    // get team officials upcoming games
    let team_official: boolean;
    const unsubcribeTeamOfficial = teamOfficial.subscribe((value) => {
        team_official = value;
    });
    onDestroy(unsubcribeTeamOfficial);

    // get team officials upcoming games
    let team_games = [];
    if (team_official) {
        const unsubscribeTeamOfficialUpcomingGame =
            teamOfficialUpcomingGames.subscribe((value) => {
                team_games = value;
            });
        onDestroy(unsubscribeTeamOfficialUpcomingGame);
    }

    // is the user a referee of clubs
    let referee_of_club: boolean;
    let unsubscribeRefOfClub = refereeOfClub.subscribe((value) => {
        referee_of_club = value;
    });
    onDestroy(unsubscribeRefOfClub);
    // is the user a referee of county
    let referee_of_county: boolean;
    let unsubscribeRefOfCounty = refereeOfCounty.subscribe((value) => {
        referee_of_county = value;
    });
    onDestroy(unsubscribeRefOfCounty);

    let referee_games = [];
    if (referee_of_club || referee_of_county) {
        let unsubscribeRefereeGames = refUpcomingGames.subscribe((value) => {
            referee_games = value;
        });
        onDestroy(unsubscribeRefereeGames);
    }

    let firestoreCreateGame = async (
        memberId: string,
        date,
        time,
        venueId,
        competitionId,
        teamAId,
        teamBId,
        refereeId,
        subReferee,
        linesman1,
        linesman2,
        umpire1,
        umpire2,
        umpire3,
        umpire4
    ) => {
        let game = await createGameInFirestore(
            memberId,
            date,
            time,
            venueId,
            competitionId,
            teamAId,
            teamBId,
            refereeId,
            subReferee,
            linesman1,
            linesman2,
            umpire1,
            umpire2,
            umpire3,
            umpire4
        );

        let gameDoc = await db.collection("Game").doc(game.id).get();
        let created_game = await createGame(gameDoc);
        all_games = [...all_games, created_game];
        allGames.set(all_games);
        if (secretary_of_council) {
            council_games = [...council_games, created_game];
            secCouncilUpcomingGames.set(council_games);
        }
        if (secretary_of_province) {
            provincial_games = [...provincial_games, created_game];
            secProvinceUpcomingGames.set(provincial_games);
        }
        if (secretary_of_county) {
            county_club_games = [...county_club_games, created_game];
            county_games = [...county_games, created_game];
            secCountyUpcomingCountyGames.set(county_games);
            secCountyUpcomingClubGames.set(county_club_games);
        }
        if (secretary_of_club) {
            club_games = [...club_games, created_game];
            secClubUpcomingGames.set(club_games);
        }
        if (team_official) {
            team_games = [...team_games, created_game];
            teamOfficialUpcomingGames.set(team_games);
        }
        if (referee_of_club || referee_of_county) {
            referee_games = [...referee_games, created_game];
            refUpcomingGames.set(referee_games);
        }
    };
</script>

<div class="card">
    <div class="card-header"><h2>Create Game</h2></div>
    <div class="card-body">
        <form
            on:submit|preventDefault={createNewGame}
            action=""
            class="needs-validation"
            data-toggle="validator"
        >
            <div class="row">
                <FormCreateGameDetails
                    {filteredVenues}
                    {filteredCompetitions}
                    {filteredTeamsA}
                    {filteredTeamsB}
                    {cantBeClub}
                    {cantBeCounty}
                />
                <FormCreateMatchOfficials {filteredReferees} />
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
    form,
    button {
        font-size: 20px;
    }
    .card {
        margin-bottom: 20px;
    }
</style>
