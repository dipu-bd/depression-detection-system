export default {
	stats: {},
	Depression() {
		var depression = this.stats.depression;
		var colors = ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#9D5360'];
		var highlights = ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#916774'];
		var labels = ['None', 'Mild', 'Borderline', 'Moderate', 'Severe', 'Extreme'];
		var config = [];
		for(var i = 0; i < 6; i++) {
			config.push({
				value: (depression[i] && depression[i].count) || 0,
				highlight: highlights[i],
				color: colors[i],
				label: labels[i],
			});
		}
		return config;
	},
	Anxiety() {
		var anxiety = this.stats.anxiety;
		var colors = ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#9D5360'];
		var highlights = ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#916774'];
		var labels = ['Minimum', 'Mild', 'Moderate', 'Severe'];
		var config = [];
		for(var i = 0; i < 4; i++) {
			config.push({
				value: (anxiety[i] && anxiety[i].count) || 0,
				highlight: highlights[i],
				color: colors[i],
				label: labels[i],
			});
		}
		return config;
	},
	Hopeless() {
		var hopeless = this.stats.hopeless;
		var colors = ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#9D5360'];
		var highlights = ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#916774'];
		var labels = ['Not Hopeless', 'Very Hopeless'];
		var config = [];
		for(var i = 0; i < 2; i++) {
			config.push({
				value: (hopeless[i] && hopeless[i].count) || 0,
				highlight: highlights[i],
				color: colors[i],
				label: labels[i],
			});
		}
		return config;
	},
	Suicide() {
		var suicide = this.stats.suicide;
		var colors = ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#9D5360'];
		var highlights = ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#916774'];
		var labels = ['Not at risk', 'At risk'];
		var config = [];
		for(var i = 0; i < 2; i++) {
			config.push({
				value: (suicide[i] && suicide[i].count) || 0,
				highlight: highlights[i],
				color: colors[i],
				label: labels[i],
			});
		}
		return config;
	}
};