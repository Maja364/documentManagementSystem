<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Autor extends Model
{
    use HasFactory;
     protected $table = 'autors';

    protected $fillable = [
        'ime',
        'prezime',
        'biografija',
        'email'
    ];
    public function dokumenta()
    {
        return $this->hasMany(Dokument::class);
    }
}
