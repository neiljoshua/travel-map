module.exports = {
	css: {
		loaderOptions: {
			sass: {
				prependData: `
          @import "@/assets/scss/globals/_reset.scss";
					@import "@/assets/scss/globals/_variables.scss";
          @import "@/assets/scss/globals/_mixins.scss";
				`
			}
		}
	}
};
