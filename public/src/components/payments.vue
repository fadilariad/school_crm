<template>
	<div>
		<div v-for="(payment, index) of payments">
			<input type="number" v-model="payment.value" />
			<input type="date" v-model="payment.date" />
			<select v-model="payment.method">
				<option disabled>{{'selectMethod' | translate}}</option>
				<option value="CHECKS">{{'check' | translate}}</option>
				<option value="CASH">{{'cash' | translate}}</option>
			</select>
		</div>
		<button @click="addPayment" type="button" name="button">{{'AddPayment' | translate}}</button>
	</div>
</template>
<script>

	export default {
		props: ['payments'],
		methods: {
			addPayment() {
				this.payments.push({
					value: 0,
					date: new Date(),
					method: undefined
				});
			}
		}
	}
</script>
<style>
</style>
