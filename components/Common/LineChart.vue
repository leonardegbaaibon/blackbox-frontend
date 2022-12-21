<template>
	<client-only>
		<apexcharts :height="height" :width="width" :options="options" :series="options.series" />
	</client-only>
</template>

<script>
export default {
	props: {
		labels: {
			type: Array,
			default: () => [],
		},
		title: {
			type: String,
			default: '',
		},
		yLabel: {
			type: String,
			default: '',
		},
		values: {
			type: Array,
			default: () => [],
		},
		height: {
			type: [String, Number],
			default: '200',
		},
		width: {
			type: [String, Number],
			default: '100%',
		},
	},

	data() {
		return {
			// options: {
			// 	series: this.values,
			// 	chart: {
			// 		// height: '50%',
			// 		// width: '50%',
			// 		type: 'line',
			// 	},
			// 	stroke: {
			// 		width: 7,
			// 		curve: 'smooth',
			// 	},
			// 	xaxis: {
			// 		type: 'datetime',
			// 		categories: this.labels,
			// 		// tickAmount: 10,
			// 		labels: {
			// 			formatter(value, timestamp, opts) {
			// 				return opts.dateFormatter(new Date(timestamp), 'HH:mm, dd MMM yyyy')
			// 			},
			// 		},
			// 	},
			// 	title: {
			// 		text: 'Sales',
			// 		align: 'left',
			// 		style: {
			// 			fontSize: '16px',
			// 			color: '#666',
			// 		},
			// 	},
			// 	fill: {
			// 		type: 'gradient',
			// 		gradient: {
			// 			shade: 'dark',
			// 			gradientToColors: ['#FDD835'],
			// 			shadeIntensity: 1,
			// 			type: 'horizontal',
			// 			opacityFrom: 1,
			// 			opacityTo: 1,
			// 			stops: [0, 100, 100, 100],
			// 		},
			// 	},
			// 	markers: {
			// 		size: 4,
			// 		colors: ['#FFA41B'],
			// 		strokeColors: '#fff',
			// 		strokeWidth: 2,
			// 		hover: {
			// 			size: 7,
			// 		},
			// 	},
			// 	yaxis: {
			// 		min: 0,
			// 		// max: 20000,
			// 		title: {
			// 			text: 'Sales in Naira',
			// 		},
			// 	},
			// },
		}
	},

	computed: {
		options() {
			return {
				series: this.values,
				chart: {
					// height: '50%',
					// width: '50%',
					type: 'line',
				},
				stroke: {
					width: 3,
					curve: 'smooth',
				},
				xaxis: {
					type: 'datetime',
					categories: this.labels,
					// tickAmount: 10,
					labels: {
						formatter(value, timestamp, opts) {
							return opts.dateFormatter(new Date(timestamp), 'HH:mm, dd MMM yyyy')
						},
					},
				},
				title: {
					text: this.title,
					align: 'left',
					style: {
						fontSize: '16px',
						color: '#666',
					},
				},
				grid: {
					row: {
						colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
						opacity: 0.5,
					},
				},
				// fill: {
				// 	type: 'gradient',
				// 	gradient: {
				// 		shade: 'dark',
				// 		gradientToColors: ['#FDD835'],
				// 		shadeIntensity: 1,
				// 		type: 'horizontal',
				// 		opacityFrom: 1,
				// 		opacityTo: 1,
				// 		stops: [0, 100, 100, 100],
				// 	},
				// },
				markers: {
					size: 4,
					colors: ['#FFA41B'],
					strokeColors: '#fff',
					strokeWidth: 2,
					hover: {
						size: 7,
					},
				},
				yaxis: {
					min: 0,

					// max: 20000,
					title: {
						text: this.yLabel,
					},
				},
			}
		},
	},
}
</script>

<style lang="scss" scoped></style>
