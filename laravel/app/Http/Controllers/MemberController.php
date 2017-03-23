<?php
namespace App\Http\Controllers;
use App\Http\Requests;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Member;
class MemberController extends Controller{
  public function info(){
    return response()->json(array(
      'code' => 1,
      'msg' => '获取成功',
      'data' => [['one'=>'123123123'],['two'=>'asdjalksd']]
    ),200);
  }
  public function post(Request $request){
    $name = $request->input('name');
    return response()->json(array(
      'code' => 1,
      'msg' => '获取成功',
      'data' => [$name]
    ),200);
  }

  public function index(Request $request){
    $indexs = Member::all();
    $BID =$request->input('BID');
    $BID_list=array();
    $contents=array();
    $liebiao=array();
    if($BID!==''){
      $one =Member::where('BID',$BID)
                    ->get();
      foreach($one as $content){
        $contents[0]['bid']=$content->BID;
        $contents[0]['title']=$content->title;
        $contents[0]['date']=$content->date;
        $contents[0]['content'][]=$content->content;
      }
    }else{
      foreach($indexs as $index){
        $BID_list[]=$index->BID;
      }
      $BID_list_unique=array_unique($BID_list);
      foreach ($BID_list_unique as  $value) {
        $list=Member::where('BID',$value)
                      ->get();
        foreach($list as $content){
          $contents[$value]['bid']=$content->BID;
          $contents[$value]['title']=$content->title;
          $contents[$value]['date']=$content->date;
          $contents[$value]['content'][]=$content->content;
        }
      }
    }
    return response()->json(array(
      'code' => 1,
      'msg' => '获取成功',
      'data' => $contents
    ),200);
  }
}
