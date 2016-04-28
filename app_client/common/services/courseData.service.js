/**
 * Created by qianmoxie on 3/3/16.
 */
angular
    .module('onlineApp')
    .service('courseData', courseData);

courseData.$inject = ['$http','coursesR'];

function courseData($http,coursesR) {

    var courses = function(){
        return $http.get('/api/courses');
    }
    var addCourse = function(data){
        return $http.post('/api/courses',data);
    }
    var courseDetail = function (courseid) {
        return $http.get('/api/courses/'+courseid);
    }
    var editVideos = function (courseid,data){
        return $http.post('/api/courses/videos/'+courseid,data);
    }

    return {
        courses: courses,
        addCourse: addCourse,
        courseDetail: courseDetail,
        editVideos: editVideos
    }

}


