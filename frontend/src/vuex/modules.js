import { mapGetters as mapGettersVuex } from 'vuex';

export const mapGetters = function ({prop, getters}) {
    if (typeof prop === 'undefined') {
	return mapGettersVuex([...getters]);
    }

    return getters.reduce((res, getter) => {
	res[getter] = function mappedGetter () {
	    return this.$store.getters[`${getNamespace(this[prop])}${getter}`];
	};

	res[getter].vuex = true;
	return res;
    }, {});
}

const getNamespace = (prop) => {
    if (typeof prop === 'undefined') {
	return '';
    }

    return `${prop}/`
};
