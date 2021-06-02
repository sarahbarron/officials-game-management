<script lang="ts">
	import router from "page";
	import Auth from "./routes/auth.svelte";
	import Index from "./routes/index.svelte";
	import NotFound from "./routes/notfound.svelte";
	import { queryString } from "./services/util";

	let page;
	let params = {};
	let qs = {};

	router("/", () => (page = Index));
	router(
		"/404/:msg",
		(ctx: { params: {}; querystring: string }, next) => {
			params = ctx.params;
			next();
		},
		() => (page = NotFound)
	);
	router(
		"/auth",
		(ctx, next) => {
			qs = queryString(ctx.querystring);
			next();
		},
		() => (page = Auth)
	);
	router("/login", () => router.redirect("/auth"));
	router("/register", () => router.redirect("/auth"));

	router("/*", () => (page = NotFound));
	router.start();
</script>

<svelte:component this={page} {params} />
