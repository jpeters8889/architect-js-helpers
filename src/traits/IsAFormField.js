export default {
    props: {
        name: String,
        value: String,
        metas: Array | Object,
        listener: {
            type: String,
            default: 'prepare-form-data',
        },
        emitter: {
            type: String,
            default: 'form-field-change',
        }
    },

    mounted() {
        if (this.value !== undefined) {
            this.actualValue = this.value;
        }

        window.Architect.$on(this.listener, () => {
            window.Architect.$emit(this.emitter, this.getFormData());
        });
    },

    data: () => ({
        actualValue: '',
    }),

    methods: {
        getFormData() {
            return {
                name: this.name,
                value: this.actualValue,
            };
        },
    }
}