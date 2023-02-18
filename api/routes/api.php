<?php

use App\Http\Controllers\AutfController;
use App\Http\Controllers\DokumentController;
use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post("/register",[AutfController::class,'register']);
Route::post("/login",[AutfController::class,'login']);


Route::get('/dokument', [DokumentController::class, 'index']);

Route::get('/files', [FileController::class, 'index'])->name('files');

Route::group(['middleware' => ['auth:sanctum']], function () {

 
    Route::post('/dokument', [FileController::class, 'upload'])->name('files');   

  
    Route::post("/logout",[AutfController::class,'logout']);

});

Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function(){  


 

    Route::put("/dokument/{id}",[DokumentController::class,'update']);

    Route::delete("/dokument/{id}",[DokumentController::class,'destroy']);
    
    Route::post("/logoutAdmin",[AutfController::class,'logout']);



});
