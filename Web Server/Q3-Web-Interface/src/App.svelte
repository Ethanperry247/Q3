<script>
import Banner from "./Components/Banner.svelte";
import Button from "./Components/Button.svelte";
import Counter from "./Components/Counter.svelte";
import Footer from "./Components/Footer.svelte";
import Sidebar from "./Components/Sidebar.svelte";
import TextField from "./Components/TextField.svelte";
import TextView from "./Components/TextView.svelte";
</script>

<div class="dashboard">
	<div>
		<Sidebar></Sidebar>
	</div>
	<div>
		<header>
			<Banner></Banner>
		</header>
		<main>
			<Button></Button>
			<Counter></Counter>
			<TextField></TextField>
			<TextView></TextView>
		</main>
		<footer>
			<Footer></Footer>
		</footer>
	</div>
</div>

<style>
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	main {
		min-height: 100vh;
	}

	.dashboard {
		display: flex;
	}
</style>