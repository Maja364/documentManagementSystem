<?php

namespace App\Http\Controllers;

use App\Models\Dokument;
use App\Models\File;
use App\Models\Rad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
class FileController extends Controller
{
    public function index() {
        $files = File::all();
        return response()->json(["status" => "success", "count" => count($files), "data" => $files]);
    }
 
    public function upload(Request $request) {
  
        $response = [];
 
        $validator = Validator::make($request->all(),
            [
                'files' => 'required',
                'files.*' => 'required|mimetypes:application/pdf,application/msword,application/vnd.ms-excel|max:2048',
                'godina_izdanja' => 'required|integer', 
                'opis' => 'required|string|max:300',                 
                'autor_id' => 'required|integer|exists:autors,id', 
            ]
        );
 
        if ($validator->fails()) 
            return response()->json([
                 'validation_errors'=>$validator->errors(),
            ]);
 
        if($request->has('files')) {
            foreach($request->file('files') as $file) {
                $filename = Str::random(15).".".$file->getClientOriginalExtension();
                $file->move('uploads/', $filename);
 
                 $fajl= File::create([
                    'file_name' => $filename
                ]);
            }
            
          Dokument::create([
                'godina_izdanja' => $request->godina_izdanja, 
                'opis' => $request->opis, 
                'autor_id' => $request->autor_id,
                'file_id' => $fajl->id,
    
            ]);    
            $response["status"] = "200";
            $response["message"] = "Success!"; 

        }
 
        else {
            $response["status"] = "failed";
            $response["message"] = "Failed! image(s) not uploaded";
        }
        return response()->json($response);
    }
}
