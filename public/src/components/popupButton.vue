<template>
    <div view="button-popup">

        <button v-if="caption" @click="open">{{caption | translate}}</button>
        <span v-if="icon" @click="open">
            <font-awesome-icon :icon="icon" />
        </span>
        <div v-if="opened" class="backdrop">
            <div class="popup">
                <header>
                    {{popupTitle | translate}}
                    <span class="close-btn" @click="close">&times;</span>
                </header>
				<div class="popup-content">
                	<div class="error-line">
						{{error}}
					</div>
                    <div v-for="(field, index) of fields">
                        <label v-show="!field.hidden" :class="[field.key, 'field']">
                            <span>{{field.label | translate}}</span>
                            <div v-if="field.type == 'array'">

                                <v-select multiple
                                          label="name"
                                          v-model="field.value"
                                          :options="field.values"
                                          :onChange="field.onchange"
                                          ></v-select>

                            </div>
							<div v-else-if="field.type == 'payments'">
								<payments :payments="field.value"></payments>
							</div>
                            <div v-else>
                                <input :type="field.type" v-model="field.value" />
                            </div>
                        </label>
                    </div>
                    <slot></slot>
                </div>
                <footer class="align-end">
                    <button @click="action">{{actionLabel | translate}}</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
    import FieldsService from '../services/fieldsService';
	import Payments from './payments';

    export default {
        name: "PopupButton",
        props: ['caption', 'fields', 'popupTitle', 'icon', 'validate', 'actionLabel'],
        components: {
        },
        data() {
            return {
                opened: false,
				error: ''
            }
        },

        created() {
            for(let field of this.fields) {
                field.onchange && field.onchange(field.value);
            }
        },
        
        methods: {
            async action() {
				this.error = '';
				try {
                	let valueMap = FieldsService.getFieldsValueMap(this.fields);
					this.validate && await this.validate(valueMap);
					this.$emit('action', valueMap);
                	this.close();
				}catch(e) {
					this.error = e.message;
				}
            },
            open() {
                this.opened = true;
                this.$emit('open');
            },
            close() {
                FieldsService.resetFields(this.fields);
                this.opened = false;
            }
        }

    }


</script>
<style lang="scss" scoped="true">
    [view="button-popup"] {
        .backdrop {
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: rgba(0,0,0,0.5);
        }

        .popup {
            margin: 100px auto auto auto;
			height: calc(100vh - 200px);
            width: 50%;
            background-color: #fff;
            padding: 15px;
            border-radius: 10px;
            position: relative;

            header {
                height: 40px;
                border-bottom: 1px solid #555;
                text-align: center;
                font-size: 20px;

                .close-btn {
                    position: absolute;
                    top: 0;
                    right: 20px;
                    font-size: 20px;
                    padding: 5px;
					cursor: pointer;
                }
            }

			.popup-content {
				height: calc(100% - 100px);
				overflow-y: auto;
				padding-top: 20px;
			}

			footer {
				height: 60px;

				button {
					margin: 10px 20px;
				}
			}

            label {
                margin-bottom: 20px;
                display: block;

                span {
                    width: 100px;
                    display: inline-block;
                }

                input {
                    width: calc(100% - 150px);
                }
            }
        }

		.error-line {
			font-size: 12px;
			color: red;
		}
    }
</style>
<style lang="scss">
	[view="button-popup"] {
		@media print {
			@page {
				size: auto;
				margin: 0;
			}

			.popup {
				margin: 0 !important;
				width: 100% !important;
			}

			.field.courses {
				display: none !important;
			}

			.close-btn,
			button {
				display: none !important;
			}
		}
	}
</style>
