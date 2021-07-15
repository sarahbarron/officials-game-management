<script lang="ts">
    import router from "page";
    let buttonText: string = "Edit Teamsheet";
    export let gameId: string = "";
    export let teamId: string = "";
    function clickEvent() {
        router.redirect(`/game/${gameId}/team/${teamId}`);
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
    @media (min-width: 768px) {
        button {
            max-width: 50%;
            font-size: 20px;
        }
        .col-12 {
            text-align: right;
        }
    }
</style>
