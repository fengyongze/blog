<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('basic1',function(){
  return 'Hello World';
});
Route::match(['get','post'],'multy1',function(){
  return 'mylty1';
});
// Route::get('user/{name?}',function($name='sean'){
//   return 'User-'.$name;
// });
// Route::get('user/member-center',['as'=>'center',function(){
//   return route('center');
// }]);
Route::group(['prefix'=>'member'],function(){
    Route::get('user/center',['as'=>'center',function(){
        return route('center');
    }]);
    Route::any('multy2',function(){
        return 'member-multy2';
    });
});
Route::get('view',function(){
    return view('welcome');
});
// Route::get('member/info','MemberController@info');
Route::get('member/info',['uses'=>'MemberController@info']);
Route::any('member/post',['uses'=>'MemberController@post']);
Route::any('member/index',['uses'=>'MemberController@index']);
Route::any('test1',['uses'=>'StudentController@test1']);
Route::any('query1',['uses'=>'StudentController@query1']);
Route::any('query2',['uses'=>'StudentController@query2']);
Route::any('query3',['uses'=>'StudentController@query3']);
Route::any('query4',['uses'=>'StudentController@query4']);
Route::any('orm1',['uses'=>'StudentController@orm1']);
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});
