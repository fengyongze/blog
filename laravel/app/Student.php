<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
class Student extends Model{
  protected $table ='student';
  protected $primaryKey='id';
  protected $fillable=['name','age'];
  public $timestamps=true;
  protected function getDateFormat(){
    return time();
  }
  protected function asDateTime($val){
    return $val;
  }
}
