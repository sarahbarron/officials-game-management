<script lang="ts">
    import router from "page";
    let buttonText: string = "View Teamsheets";
    export let gameId: string = "";
    function clickEvent() {
        router.redirect(`/game/${gameId}/teamsheet`);
    }
</script>

<div class="row">
    <div class="col-12">
        <button type="button" class="btn btn-primary" on:click={clickEvent}>
            {buttonText}
        </button>
    </div>
</div>

<style>
    button {
        margin: 20px;
        padding: 10px;
    }
    .col-12 {
        text-align: right;
    }
    @media (min-width: 768px) {
        button {
            max-width: 50%;
            font-size: 20px;
        }
    }
</style>
