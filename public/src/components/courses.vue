<template>
<div view="courses" class="view">

	<!-- The view title -->
	<div class="view-title">
		<h1 class="inline">{{'courses' | translate}}</h1>

		<!-- add new course button -->
		<popup-button
			icon="plus-circle"
			popupTitle="newCourse"
			:fields="fields"
			v-on:action="save"
			class="inline"
			action-label="save"
			:validate="validate">
		</popup-button>
	</div>

	<!-- filters -->
	<div class="align-end">
		<!-- Search input -->
		<input v-model="search" @keyup="filter"/>
	</div>

	<!-- courses table -->
    <table class="data-table">
        <thead>
            <tr>
                <th>{{'courseName' | translate}}</th>
                <th>{{'price' | translate}}</th>
				<th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(course, index) of courses">
				<!-- course name-->
                <td>{{course.name}}</td>

				<!-- course price-->
				<td>{{course.price}}</td>

				<!-- actions column-->
				<td class="col-actions">
					<!-- delete course -->
                    <font-awesome-icon icon="minus-circle" />

					<!-- edit course-->
					<popup-button
						v-on:open="getCourseStudents(course)"
						icon="edit"
						class="inline"
						popupTitle="course"
						@action="save"
						:validate="validate"
						action-label="save"
						:fields="getFieldsFromCourse(course)">
							<!-- show the students on the course-->
	                        <div v-for="(student, index) of students">
	                            {{student}}
	                        </div>
                    </popup-button>
                </td>
            </tr>
        </tbody>
    </table>

	<!-- Pagination -->
	<div class="align-end">
		<pagination
			:state="paginationState"
			:count="coursesCount"
			:page-size="coursesInPage"
			@goToPage="refreshView">
		</pagination>
	</div>

</div>
</template>
<script>
    import PopupButton from './popupButton';
    import CoursesService from '../services/coursesService';
	import SettingsService from '../services/settingsService';
	import Pagination from './pagination';
	import ValidationError from '../errors/ValidationError'

    export default {
        components: {
            PopupButton,
			Pagination
        },
        created() {
			SettingsService.getByName('PageRecords').then(res => {
				this.coursesInPage = +res.data.value;
				this.refreshView();
			});
        },
        data() {
            return {
                fields: CoursesService.getFields(),
                courses: [],
                students: [],
				search: "",
				paginationState: {
					page: 1
				},
				coursesInPage: 1,
				coursesCount: 1,
				filterTimer: null
            }
        },
        methods: {
			filter() {
				clearTimeout(this.filterTimer);
				this.paginationState.page = 1;
				this.filterTimer = setTimeout(()=>{
					this.refreshView();
				}, 300);
			},
            save(course) {
                CoursesService.save(course).then(()=> {
                    this.refreshView();
                });
            },
            getFieldsFromCourse(course) {
                return CoursesService.getFields(course);
            },
            getCourseStudents(course) {
                CoursesService.getCourseStudents(course).then(res => {
                    this.students = res.data;
                });
            },
			async validate(course) {
				if(!course.name) {
					throw new ValidationError("CourseNameRequired")
				}

				let res = await CoursesService.getCourses("^" + course.name + "&");
				if(res.data.length) {
					throw new ValidationError("CourseNameUnique")
				}
            },
			refreshView() {
				let skip = 0;
				skip = (this.paginationState.page - 1) * this.coursesInPage;
				CoursesService.getCourses(this.search, skip, this.coursesInPage).then(res => {
	                this.courses = res.data;
	            });

				CoursesService.count(this.search).then(res => {
					this.coursesCount = +res.data.count;
				});
			}
        }
    }


</script>
<style lang="scss" scoped="true">
    [view="courses"] {

    }
</style>
