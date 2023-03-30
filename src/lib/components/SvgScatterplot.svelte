<script>
	import { getChartContext } from './Chart.svelte';
	import { default_x, default_y } from '../utils/accessors.js';
	import { round } from '../utils/round.js';

	const { x_scale, y_scale } = getChartContext();

	export let data;
	export let x = default_x;
	export let y = default_y;
	export let precision = 4;

	$: d = data
		.map((d, i) => {
			const _x = $x_scale(x(d, i));
			const _y = $y_scale(y(d, i));

			return `M${round(_x, precision)} ${round(_y, precision)} A0 0 0 0 1 ${round(_x + 0.0001, precision)} ${round(_y + 0.0001, precision)}`;
		})
		.join(' ');
</script>

<slot {d} />
