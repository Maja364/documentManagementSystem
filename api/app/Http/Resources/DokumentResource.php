<?php

namespace App\Http\Resources;

use App\Models\Autor;
use App\Models\File;
use Illuminate\Http\Resources\Json\JsonResource;

class DokumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'autor' => Autor::find($this->autor_id),           
            'godina_izdanja' => $this->godina_izdanja,
            'file' => File::find($this->file_id),
             
        ];
    }
}
