export default {
	stats: {},
	Depression() {
		var depression = this.stats.depression;
		return [
				{
					value: depression[0].count,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "None"
				},
				{
					value: depression[1].count,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Mild"
				},
				{
					value: depression[2].count,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Borderline"
				},
				{
					value: depression[3].count,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "Moderate"
				},
				{
					value: depression[4].count,
					color: "#4D5360",
					highlight: "#616774",
					label: "Severe"
				},
				{
					value: depression[5].count,
					color: "#9D5360",
					highlight: "#916774",
					label: "Extreme"
				}
			];
	},
	Anxiety() {
		var anxiety = this.stats.anxiety;
		return [
				{
					value: anxiety[0].count,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Minimum"
				},
				{
					value: anxiety[1].count,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Mild"
				},
				{
					value: anxiety[2].count,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Moderate"
				},
				{
					value: anxiety[3].count,
					color: "#949FB1",
					highlight: "#A8B3C5",
					label: "Severe"
				}
			];
	},
	Hopeless() {
		var hopeless = this.stats.hopeless;
		return [
				{
					value: hopeless[0].count,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Not Hopeless"
				},
				{
					value: hopeless[1].count,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Very Hopeless"
				}
			];
	},
	Suicide() {
		var suicide = this.stats.suicide;
		return [
				{
					value: suicide[0].count,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "No risk"
				},
				{
					value: suicide[1].count,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "At risk"
				}
			];
	}
};