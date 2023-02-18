<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AutorSeeder::class);
        User::create([
            'name' => 'korisnik', 
            'email' => 'korisnik@gmail.com', 
            'password' => Hash::make('korisnik')]);
        User::create([
                'name' => 'admin', 
                'email' => 'admin@gmail.com', 
                'admin' => 1, 
                'password' => Hash::make('admin')]);



                
    }
}
