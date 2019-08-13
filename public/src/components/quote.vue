<template>
<div view="quote">
	<div v-if="show">
		<h1 class="title">{{'Quote' | translate}}</h1>

		<div class="quote-section">
			<h2>{{'courses' | translate}}</h2>
			<div v-for="(course, index) of courses" class="course-details">
				<span class="name">{{course.name}}</span>
				<span class="price">{{course.price}}</span>
			</div>
		</div>

		<div class="sum quote-section">
			<span class="name">{{'TotalPrice' | translate}}</span>
			<span class="price">{{totalPrice}}</span>
		</div>

		<div v-if="discount" class="quote-section">
			<div class="discount">
				<span class="name">{{'discount' | translate}}</span>
				<span class="price">{{discount}}</span>
			</div>
			<div class="after-discount">
				<span class="name">{{'AfterDiscount' | translate}}</span>
				<span class="price">{{totalPrice - discount}}</span>
			</div>
		</div>

		<div class="payment quote-section">
			<span class="name">{{'Payed' | translate}}</span>
			<span class="price">{{totalPayment}}</span>
		</div>

		<div v-if="debt" class="debt quote-section">
			<span class="name">{{'Debt' | translate}}</span>
			<span class="price">{{debt}}</span>
		</div>
	</div>
</div>
</template>
<script>
import FieldsService from '../services/fieldsService';
import SettingsService from '../services/settingsService';

export default {
	props: ['fields'],
	data() {
		let fields = this.fields;
		return {
			courses: [],
			discounts: [],
		};
	},
	created() {
		SettingsService.getByName('coursesDiscount').then(res => {
			this.discounts = res.data.value;
			this.courses =  FieldsService.getFieldByKey(this.fields, 'courses').value;
		});
	},
	computed: {
		show() {
			return this.courses.length;
		},
		totalPrice() {
			return this.courses.reduce((accumulator, currentValue) => +accumulator + +currentValue.price, 0);
		},

		discount() {
			if(this.courses.length > 1) {
				return +this.discounts[this.courses.length - 2].value;
			}
			return 0;
		},

		totalPayment() {
			let payments = FieldsService.getFieldByKey(this.fields, 'payments').value;
			return payments.reduce((accumulator, currentValue) => +accumulator + +currentValue.value, 0);
		},
		debt() {
			return this.totalPrice - this.discount - this.totalPayment;
		}
	}
}
</script>
<style lang="scss" scoped="true">
[view="quote"] {
	.name {
		display: inline-block;
		width: 200px;
		font-weight: 600;
	}

	.quote-section {
		margin-top: 10px;
	}
}
</style>
