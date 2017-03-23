<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Student;
class StudentController extends Controller{
  public function test1(){
    // $students=DB::select('select*from student');
    // var_dump($students);
    // DB::insert('insert into student(name,age) values(?,?)',
    // ['asd',19]);
    // DB::update('update student set age=? where name =?',[20,'sean']);
    // $student=DB::select('select*from student');
    // dd($student);
    DB::delete('delete from student where id>?',[1]);
  }
  public function query1(){
    // DB::table('student')->insert(
    //   ['name'=>'imooc','age'=>123]
    // );
    // DB::table('student')->insertGetId(['name'=>'fengyongze','age'=>'1']);
    DB::table('student')->insert([
      ['name'=>'name1','age'=>20],
      ['name'=>'name2','age'=>21]

    ]);
  }
  public function query2(){
    // DB::table('student')
    //     ->where('id',4)
    //     ->update(['age'=>30]);
    DB::table('student')->increment('age');
  }
  public function query3(){
     DB::table('student')
         ->where('id',6)
         ->delete();
  }
  public function query4(){
      $max=DB::table('student')->avg('age');
      var_dump($max);
  }
  public function orm1(){
    // $student=new Student();
    // $student->name='sean2';
    // $student->age=20;
    // $bool=$student->save();
    // dd($bool);
    // $student=Student::find(8);
    // echo $student->created_at;
    // $student=Student::create(
    //   ['name'=>'imooc1','age'=>128]
    // );
    // dd($student);
    // $student=Student::find(1);
    // $student->name='kitty';
    // $bool=$student->save();
    // var_dump($bool);
    $student=Student::find(8);
    $bool=$student->delete();
    var_dump($bool);
  }
}
