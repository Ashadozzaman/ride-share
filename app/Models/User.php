<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens,HasFactory, Notifiable;

    const IS_VALID_EMAIL = 1;
    const IS_INVALID_EMAIL = 0;
    const ADMIN_ROLE = 'ADMIN';
    const CUSTOMER_ROLE = 'CUSTOMER';
    const DRIVER_ROLE = 'DRIVER';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'otp_code',
        'google_id',
        'role',
        'is_vaild_email',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public static function generateOTP($length = 6) {
        return mt_rand(100000, 999999);
    }

    public  static function getUserByEmail($email) {
        return User::where('email', $email)->first();
    }
}
