<template>
    <div view="settings" class="view">
        <div>
			<!-- view title -->
            <h1 class="view-title">
				{{'settings' | translate}}
			</h1>

			<!-- discounts per courses count settings-->
            <div class="settings-section">
				<div class="section-title">{{'discounts' | translate}}</div>
				<label>
					<span>{{'NumOfCourses' | translate}}</span>
					<span>{{'discount' | translate}}</span>
				</label>

                <div v-for="(discount, index) of coursesDiscount.value">
                    <label>
                        <span>{{index + 2}}</span>
                        <input v-model="discount.value" type="number" />
                    </label>
                </div>

                <button @click="addDiscount">{{'AddDiscount' | translate}}</button>
            </div>

			<!-- Page Settings -->
			<div class="settings-section">
				<div class="section-title">{{'PageSettings' | translate}}</div>
				<label>
					<span>{{'RecordsPerPage' | translate}}</span>
					<input v-model="pageRecords.value" type="number" />
				</label>
			</div>

			<!-- Language Settings -->
			<div class="settings-section">
				<div class="section-title">{{'LanguageSettings' | translate}}</div>
				<label>
					<select v-if="langSettings.value" v-model="langSettings.value.selected">
						<option disabled>{{'SelectLanguage' | translate}}</option>
						<option v-for="lang in langSettings.value.langs" :value="lang.name">
							{{ lang.displayName }}
						</option>
					</select>
				</label>
			</div>



			<div class="actions align-end">
				<button @click="save">{{'save' | translate}}</button>
			</div>

        </div>
    </div>
</template>
<script>
    import SettingsService from '../services/settingsService';
	import EventBus from '../utils/eventBus'
	

    export default {
        data() {
            return {
                coursesDiscount: [],
				pageRecords: {},
				langSettings: {}
            }
        },
        created() {
        	this.refreshView();
        },
        methods: {
            addDiscount() {
                SettingsService.addDiscount(this.coursesDiscount.value);
            },
            async save() {
				await SettingsService.update(this.coursesDiscount);
				await SettingsService.update(this.pageRecords);
				await SettingsService.update(this.langSettings);
				await this.refreshView();
				this.selectLang();
				setTimeout(()=> {
					this.$forceUpdate();
					EventBus.$emit('forceUpdate')
				});
            },
			selectLang() {
            	SettingsService.setDisplayLanguage(this.langSettings.value);
			},
			refreshView() {
				return SettingsService.getAllSettings().then(res => {
					let settings = res.data;
					for(let setting of settings) {
						if(setting.name == 'coursesDiscount') {
							this.coursesDiscount = setting;
						}
						if(setting.name == 'PageRecords') {
							this.pageRecords = setting;
						}
						if(setting.name == "DisplayLanguage") {
							this.langSettings = setting;
						}
					}
				});
			}
        }
	}
</script>
<style scoped="true" lang="scss">
    [view="settings"] {
		label {
			span:first-child {
				display: inline-block;
				width: 150px;
			}
		}

		.settings-section {
			padding-bottom: 20px;
			border-bottom: 1px solid #555;

			.section-title {
				padding: 10px 0;
				font-size: 16px;
			}
		}

		.actions {
			padding-top: 20px;
		}
    }
</style>
