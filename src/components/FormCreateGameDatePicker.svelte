<script lang="ts">
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
</script>

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

<style>
    label {
        margin-top: 20px;
    }
</style>
