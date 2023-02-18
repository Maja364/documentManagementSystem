<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $fillable = [
        "file_name"
    ];

    public function dokument()
    {
        return $this->belongsTo(Dokument::class);
    }
}
