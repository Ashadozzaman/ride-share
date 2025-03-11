<?php

namespace App\Http\Controllers\Auth;

use Validator;
use App\Models\User;
use App\Mail\SendMail;
use Illuminate\Http\Request;
use App\Events\SendEmailEvent;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Response;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        //
        $data = $request->all();
        $validator = Validator::make($data, [
            'email' => ['required'],
            'password' => ['required'],
        ]);

        if ($validator->fails()) {
            return response([
                'errors' => $validator->errors()->all(),
            ], 422);
        }

        $user =  User::getUserByEmail($data['email']);

        if (!$user) {
            return response([
                'errors' => [
                    'message' => 'User not found',
                    // 'isLoggedIn' => false
                ],
            ], 404);
        }

        if (!Hash::check($data['password'], $user->password)) {
            return response([
                'errors' => [
                    'message' => 'Invalid password',
                    // 'isLoggedIn' => false

                ],
            ], 401);
        } else {
            Auth::login($user);
            $token = $request->user()->createToken($data['email']);


            return response()->json([
                'message' => 'Successfully logged in',
                'user' => $user,
                'token' => $token->plainTextToken
            ]);
        }
    }
    public function register(Request $request)
    {
        //
        $data = $request->all();
        $validator = Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            return response(
                ['errors' => $validator->errors()->all()],
                422
            );
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'otp_code' => User::generateOTP(),
            'password' => bcrypt($data['password']),
            'is_valid_email' => User::IS_INVALID_EMAIL,
        ]);

        //Send Email
        // dispatch(new SendEmailEvent($user));
        SendEmailEvent::dispatch($user);

        Auth::login($user);
        $token = $request->user()->createToken($data['email']);

        return response()->json([
            'message' => 'Successfully registered',
            'user' => $user,
            'token' => $token->plainTextToken
        ], 201);
    }

    public function emailVerification(Request $request)
    {
        //
        $data = $request->all();
        $validator = Validator::make($data, [
            'email' => ['required', 'string', 'email', 'max:255'],
            'otp_code' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response([
                'errors' => $validator->errors()->all(),
            ], 422);
        }

        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        } else {
            if ($user->otp_code == $data['otp_code']) {
                $user->is_valid_email = User::IS_VALID_EMAIL;
                $user->save();
                return response()->json([
                    'message' => 'Successfully verified',
                    'user' => $user
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Invalid OTP code',
                ], 422);
            }
        }
    }

    public function logout_(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ], 200);
    }

    public function logout(Request $request)
    {
        $userId = $request->userId;
        $user = User::find($userId);
        DB::table('personal_access_tokens')->where('tokenable_id', $userId)->delete();
        // $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ], 200);
    }

    public function getUsers(Request $request)
    {
        $query = $request->input('query');
        $data = User::select('id', 'name', 'email', 'role')
            ->where('name', 'like', '%' . $query . '%')
            ->paginate(2);
        return response($data, 200);
    }
}
