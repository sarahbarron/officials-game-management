<script lang="ts">
    export let active: string = "";
    export let href: string = "";
    export let text: string = "";
</script>

<li class="nav-item ${active}">
    <a class="nav-link" {href}> {text} <span class="sr-only">{text}</span></a>
</li>

<style>
    @media (min-width: 768px) {
        li {
            font-size: 24px;
            margin: 0px 15px;
        }
    }
</style>
