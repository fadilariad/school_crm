<template>
    <div view="students" class="view">
		<!-- The view title -->
		<div class="view-title">
			<h1 class="inline">{{'students' | translate}}</h1>

			<!-- add new student button -->
	        <popup-button
				icon="plus-circle"
			 	popupTitle="newStudent"
				:fields="fields"
				v-on:action="save"
				class="inline"
				action-label="save"
				:validate="validate">
	            	<quote :fields="fields"></quote>
	        </popup-button>
		</div>

		<!-- filters -->
		<div class="align-end">
			<!-- Search input -->
			<input v-model="search" @keyup="filter"/>

			<!-- in dept checkbox -->
			<label>
				<span>{{'InDept' | translate}}</span>
				<input type="checkbox" v-model="showInDept" @change="refreshView"/>
			</label>
		</div>

		<!-- The Students table -->
		<table class="data-table">
            <thead>
                <tr>
                    <th>{{'studentName' | translate}}</th>
                    <th>{{'courses' | translate}}</th>
					<th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, index) of students">
					<!-- student name -->
                    <td>{{student.name}}</td>

					<!-- student courses-->
					<td>{{student.courses}}</td>

					<!-- table actions -->
					<td class="col-actions">
						<!--remove button -->
                        <font-awesome-icon @click="remove(student)" icon="minus-circle" />

						<!-- edit button -->
						<popup-button
							v-on:open="getFieldsFromStudent(student)"
							v-on:action="save"
							icon="edit"
							class="inline"
							popupTitle="student"
							:validate="validate"
							action-label="save"
							:fields="studentFields">
								<quote :fields="studentFields"></quote>
						</popup-button>
                    </td>
                </tr>
            </tbody>
        </table>

		<!-- Pagination -->
		<div class="align-end">
			<pagination
				:state="paginationState"
				:count="studentsCount"
				:page-size="studentsInPage"
				@goToPage="refreshView">
			</pagination>
		</div>
    </div>
</template>

<script>
    import StudentsService from '../services/studentsService';
    import PopupButton from './popupButton';
    import SettingsService from '../services/settingsService';
	import Quote from './quote';
	import Pagination from './pagination'
	import ValidationError from '../errors/ValidationError'

    export default {
        components: {
            PopupButton,
			Quote,
			Pagination
        },
        name: 'Students',
        data() {
            return {
                fields: StudentsService.getFields(),
                students: [],
                studentFields: [],
				arr:[],
				search: "",
				filterTimer: null,
				studentsCount: 0,
				studentsInPage: 1,
				paginationState: {
					page: 1
				},
				showInDept: false
            }
        },
        created(){
			SettingsService.getByName('PageRecords').then(res => {
				this.studentsInPage = +res.data.value;
				this.refreshView();
			});
        },
        methods: {
			filter() {
				clearTimeout(this.filterTimer);
				this.paginationState.page = 1;
				this.filterTimer = setTimeout(()=>{
					this.refreshView();
				}, 300);
			},
			refreshView(){
				let skip = 0;
				skip = (this.paginationState.page - 1) * this.studentsInPage;

				if(this.showInDept){
					StudentsService.getInDept(this.search, skip, this.studentsInPage).then(res=> {
						this.students = res.data.students;
						this.studentsCount = res.data.count;
					});
				} else {
					StudentsService.getStudents(this.search, skip, this.studentsInPage).then(res => {
						this.students = res.data;
					});

					StudentsService.count(this.search).then(res => {
						this.studentsCount = +res.data.count;
					});
				}
			},
            save(student) {
                StudentsService.save(student).then(()=> {
                    this.refreshView();
                });
            },
            getFieldsFromStudent(student) {
                this.studentFields = StudentsService.getFields(student);
            },
            async validate(student) {
				if(!student.name) {
					throw new ValidationError("StudentNameRequired");
				}
            },
            remove(student) {
                StudentsService.remove(student).then(()=> {
                    this.refreshView();
                });
            }
        }
    }

</script>

<style scoped="true" lang="scss">
    [view="students"] {

    }
</style>
