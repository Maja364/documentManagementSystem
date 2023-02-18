<?php

namespace Database\Seeders;

use App\Models\Autor;
use Illuminate\Database\Seeder;

class AutorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $autori = [
            [
                'ime' => 'Ana',
                'prezime' => 'Ilić',
                'biografija' => 'Ana Ilić je književnica iz Beograda.',
                'email' => 'ana.ilic@example.com',
            ],
            [
                'ime' => 'Marko',
                'prezime' => 'Petrović',
                'biografija' => 'Marko Petrović je novinar iz Novog Sada.',
                'email' => 'marko.petrovic@example.com',
            ],
            [
                'ime' => 'Jelena',
                'prezime' => 'Kovačević',
                'biografija' => 'Jelena Kovačević je pesnikinja iz Niša.',
                'email' => 'jelena.kovacevic@example.com',
            ],
            [
                'ime' => 'Nikola',
                'prezime' => 'Janković',
                'biografija' => 'Nikola Janković je esejista iz Kragujevca.',
                'email' => 'nikola.jankovic@example.com',
            ],
            [
                'ime' => 'Mila',
                'prezime' => 'Milošević',
                'biografija' => 'Mila Milošević je dramaturg iz Subotice.',
                'email' => 'mila.milosevic@example.com',
            ],
            [
                'ime' => 'Ivan',
                'prezime' => 'Pavlović',
                'biografija' => 'Ivan Pavlović je književni kritičar iz Beograda.',
                'email' => 'ivan.pavlovic@example.com',
            ],
            [
                'ime' => 'Miloš',
                'prezime' => 'Kovačević',
                'biografija' => 'Miloš Kovačević je pisc iz Novog Sada.',
                'email' => 'milos.kovacevic@example.com',
            ],
            [
                'ime' => 'Sara',
                'prezime' => 'Stojanović',
                'biografija' => 'Sara Stojanović je pjesnikinja iz Podgorice.',
                'email' => 'sara.stojanovic@example.com',
            ],
        ];

        foreach ($autori as $autor) {
            Autor::create([
                'ime' => $autor['ime'],
                'prezime' => $autor['prezime'],
                'biografija' => $autor['biografija'],
                'email' => $autor['email'],
            ]);
        }
    }
    
}
