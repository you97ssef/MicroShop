<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new User([
            'name' => 'Admin',
            'email' => 'admin@microshop.test',
            'username' => 'admin',
            'password' => Hash::make('admin'),
            'role' => User::ADMIN,
        ]);
        $admin->save();

        $shipper = new User([
            'name' => 'Shipper',
            'email' => 'shipper@microshop.test',
            'username' => 'shipper',
            'password' => Hash::make('shipper'),
            'role' => User::SHIPPER,
        ]);
        $shipper->save();

        User::factory(100)->create();
    }
}
