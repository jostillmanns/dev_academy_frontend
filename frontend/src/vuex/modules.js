export const mapGettersByNamespace = function (getters) {
    const result = getters.reduce((res, getter) => {
	res[getter] = function mappedGetter () {
	    return this.$store.getters[`${this.namespace}/${getter}`];
	};

	res[getter].vuex = true;
	return res;
    }, {});

    return result;
}
