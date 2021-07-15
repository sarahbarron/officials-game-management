<script lang="ts">
	import router from "page";
	import Auth from "./routes/auth.svelte";
	import Index from "./routes/index.svelte";
	import NotFound from "./routes/notfound.svelte";
	import Dashboard from "./routes/dashboard.svelte";
	import { queryString } from "./services/util";
	import SecretaryOfClub from "./routes/secretaryOfClubDashboard.svelte";
	import SecretaryOfCounty from "./routes/secretaryOfCountyDashboard.svelte";
	import SecretaryOfProvince from "./routes/secretaryOfProvinceDashboard.svelte";
	import SecretaryOfCouncil from "./routes/secretaryOfCouncilDashboard.svelte";
	import Referee from "./routes/refereeDashboard.svelte";
	import TeamOfficial from "./routes/teamOfficialDashboard.svelte";
	import SingleGame from "./routes/singleGame.svelte";
	import Logout from "./routes/logout.svelte";
	import MatchReport from "./routes/matchReport.svelte";
	let page;
	let params = {};
	let qs = {};

	router("/", () => (page = Auth));
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
	router("/home", () => (page = Dashboard));
	router("/secretary-of-club", () => (page = SecretaryOfClub));
	router("/secretary-of-county", () => (page = SecretaryOfCounty));
	router("/secretary-of-province", () => (page = SecretaryOfProvince));
	router("/secretary-of-council", () => (page = SecretaryOfCouncil));
	router("/referee", () => (page = Referee));
	router("/team-official", () => (page = TeamOfficial));
	router("/logout", () => (page = Logout));
	router(
		"/game:gameId",
		(ctx: { params: { gameId } }, next) => {
			params = ctx.params;
			next();
		},
		() => (page = SingleGame)
	);
	router(
		"/matchreport:gameId",
		(ctx: { params: { gameId } }, next) => {
			params = ctx.params;
			next();
		},
		() => (page = MatchReport)
	);
	router("/*", () => (page = NotFound));
	router.start();
</script>

<svelte:component this={page} {params} {qs} />
