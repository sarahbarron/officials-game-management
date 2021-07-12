<script>
    let year = new Date().getFullYear();
</script>

<!-- Footer -->
<footer class="page-footer">
    <div class="footer-copyright text-center py-3 font-weight-bold">
        © <span id="copyright-year">{year}</span> Copyright: Sarah Barron
    </div>
</footer>

<!-- Footer -->
<style>
    footer {
        background-color: #005e82;
        padding: 5px;
        margin-top: 50px;
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    footer > div {
        color: aliceblue;
    }
    @media (min-width: 768px) {
        footer {
            background-color: #005e82;
            padding: 10px;
        }
        footer > div {
            font-size: larger;
        }
    }
</style>
