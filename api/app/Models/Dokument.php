<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dokument extends Model
{
    use HasFactory;
    protected $fillable = [
 
        'autor_id',//spoljni kljuc ka tabeli zadatak,
        'godina_izdanja',
        'file_id', //spoljni kljuc ka tabeli u kojoj cuvamo samo fajlove
        'opis'

         
        
    ];

    public function autor()
    {
        return $this->belongsTo(Autor::class);
    }

}
