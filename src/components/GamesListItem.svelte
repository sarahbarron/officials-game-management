<script lang="ts">
    import GameViewButton from "../components/GameViewButton.svelte";
    export let games = [];
</script>

<hr />
{#each games as game (game.id)}
    <div class="row">
        <div class="col-12 col-lg-3 title-lighter"><p>Competition</p></div>
        <div class="col-12 col-lg-9"><h4>{game.competition.name}</h4></div>
    </div>
    <div class="row">
        <div class="col-3">
            <p><span class="title-lighter">Date and Time</span></p>
        </div>
        <div class="col-9">
            <p>{game.date} @ {game.time}</p>
        </div>
    </div>
    <div class="row">
        <div class="col-3">
            <p><span class="title-lighter">Teams</span></p>
        </div>
        <div class="col-9"><p>{game.teamA.name} V {game.teamB.name}</p></div>
    </div>
    <div class="row">
        <div class="col-3">
            <p><span class="title-lighter">Venue</span></p>
        </div>
        <div class="col-9">
            <p>{game.venue.name}</p>
        </div>
    </div>
    <div class="row">
        <div class="col-3">
            <p>
                <span class="title-lighter">Referee</span>
            </p>
        </div>
        <div class="col-9">
            <p>
                {game.referee.firstName}
                {game.referee.lastName}
            </p>
        </div>
        <div class="col-12">
            <GameViewButton gameId={game.id} />
        </div>
    </div>
    <hr />
{/each}
