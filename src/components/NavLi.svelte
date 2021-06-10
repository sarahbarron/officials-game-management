<script lang="ts">
    export let active: string = "";
    export let href: string = "";
    export let text: string = "";
    export let id: string = "";
    export let aria: boolean = false;
</script>

<li {id} class="nav-item">
    <a class="nav-link {active}" aria-current={aria} {href}>
        {text} <span class="sr-only">{text}</span></a
    >
</li>

<style>
    @media (min-width: 768px) {
        li {
            font-size: 24px;
            margin: 0px 15px;
        }
    }
</style>
