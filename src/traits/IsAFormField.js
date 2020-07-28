export default {
    props: {
        name: String,
        value: String | Array | Object,
        metas: Array | Object,
        id: Number,
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

        this.bootstrapListeners();

        this.debouncedEvents = window._.debounce(this.dispatchEvents, 500);
    },

    data: () => ({
        actualValue: '',
        emitterValue: null,
        setEmitterValue: true,
    }),

    methods: {
        getFormData() {
            return {
                name: this.name,
                value: this.actualValue,
            };
        },

        dispatchEvents() {
            if (this.emitterValue) {
                Architect.$emit(this.name + '-changed', this.emitterValue);
            }
        },

        bootstrapListeners() {
            Architect.$on(this.listener, () => {
                Architect.$emit(this.emitter, this.getFormData());
            });

            /**
             * listeners [
             *      changed: [
             *          column1
             *          column2
             *      ]
             *  ]
             */

            Object.keys(this.metas.listeners).forEach((event) => {
                let column = this.metas.listeners[event];

                if (typeof column === 'string') {
                    Architect.$on(column + '-' + event, (value) => {
                        Architect.request().post('/listener', {
                            blueprint: this.$route.params.blueprint,
                            event: column + '-' + event,
                            column: this.name,
                            value: JSON.stringify(value)
                        }).then((response) => {
                            this.actualValue = response.data;
                        }).catch(error => {
                            Architect.$emit(error.response.data.message);
                        });
                    });
                }
            });
        },
    },

    watch: {
        emitterValue: function (newValue) {
            if (newValue !== '') {
                this.debouncedEvents();
            }
        },
        actualValue: function (newValue) {
            if (this.setEmitterValue) {
                this.emitterValue = newValue;
            }
        }
    },
}
