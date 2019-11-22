export default {
    props: ['name', 'value', 'metas'],

    mounted() {
        if(this.value !== undefined) {
            this.actualValue = this.value;
        }

        window.Architect.$on('prepare-form-data', () => {
            window.Architect.$emit('form-field-change', this.getFormData());
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