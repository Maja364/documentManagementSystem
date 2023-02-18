<?php

namespace App\Http\Controllers;

use App\Http\Resources\DokumentResource;
use App\Models\Dokument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DokumentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DokumentResource::collection(Dokument::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Dokument  $dokument
     * @return \Illuminate\Http\Response
     */
    public function show(Dokument $dokument)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Dokument  $dokument
     * @return \Illuminate\Http\Response
     */
    public function edit(Dokument $dokument)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Dokument  $dokument
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
 
            'opis' => 'required|string',
            'autor_id'=>'required|integer|exists:autors,id',
            'godina_izdanja'=>'required|integer',
 

             
        ]);

        if ($validator->fails()) 
            return response()->json($validator->errors());
        $d = Dokument::find($id);

            if( $d){
                $d->opis=$request->opis;
                $d->autor_id=$request->autor_id;
                $d->godina_izdanja=$request->godina_izdanja;
 
 
                 
                $d->save();
                return response()->json(['Uspesno izmenjeno!',  $d]);
    
            }else{
                return response()->json('Trazeni objekat ne postoji u bazi');
    
            }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dokument  $dokument
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id)
    {
        $d = Dokument::find($id);
        if($d){
            $d->delete();
            return response()->json(['Uspesno obrisano!', $d]);
        
        }
           
       return response()->json('Trazeni objekat ne postoji u bazi');
    }
}
