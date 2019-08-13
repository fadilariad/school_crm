<template>
	<div>
		<button @click="first"> {{'firstPage'| translate}} </button>
		<button @click="prev"> {{'prevPage' | translate}} </button>
		{{state.page}} / {{numOfPages}}
		<button @click="next"> {{'nextPage' | translate}} </button>
		<button @click="last"> {{'lastPage' | translate}} </button>
	</div>
</template>
<script>

export default {
	props: {
		count: {
			type: Number
		},
		pageSize: {
			type: Number,
			default: 1
		},
		state: {
			type: Object
		}
	},
	computed: {
		numOfPages() {
			return this.getNumOfPages();
		}
	},
	methods: {
		getNumOfPages() {
			return Math.ceil(this.count/this.pageSize);
		},
		first() {
			this.state.page = 1;
			this.goToPage();
		},
		prev() {
			if(this.state.page > 1) {
				this.state.page--;
			}
			this.goToPage();
		},
		next() {
			if(this.state.page < this.getNumOfPages()) {
				this.state.page++;
			}
			this.goToPage();
		},
		last() {
			this.state.page = this.getNumOfPages();
			this.goToPage();
		},
		goToPage() {
			this.$emit('goToPage');
		}
	}

};
</script>
<style>
</style>
