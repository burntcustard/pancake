<script>
	import { getChartContext } from './Chart.svelte';
	import { default_x, default_y } from '../utils/accessors.js';
	import { round } from '../utils/round.js';

	const { x_scale, y_scale } = getChartContext();

	export let data;
	export let x = default_x;
	export let y = default_y;
	export let precision = 2;

	let prev_x = 0;
	let prev_y = 0;

	$: d = data
		.map((d, i) => {
			const _x = $x_scale(x(d, i));
			const _y = $y_scale(y(d, i));
			const prev_rounded_diff_x = prev_x - round(prev_x, precision);
			const prev_rounded_diff_y = prev_y - round(prev_y, precision);
			const __x = round(_x - prev_x + prev_rounded_diff_x, precision);
			const __y = round(_y - prev_y + prev_rounded_diff_y, precision);
			prev_x = _x;
			prev_y = _y;

			return `m${__x}${__y < 0 ? '' : ' '}${__y}h0`;
		})
		.join('');
</script>

<slot {d} />
