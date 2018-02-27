export const mapGettersByNamespace = function (prop, getters) {
    const result = getters.reduce((res, getter) => {
	res[getter] = function mappedGetter () {
	    return this.$store.getters[`${this[prop]}/${getter}`];
	};

	res[getter].vuex = true;
	return res;
    }, {});

    return result;
}
