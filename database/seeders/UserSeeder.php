<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $passwrd = 'Admin@123';
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'otp_code' => User::generateOTP(),
            'role' => User::ADMIN_ROLE,
            'password' => bcrypt($passwrd),
            'is_valid_email' => User::IS_VALID_EMAIL,
        ]);
    }
}
