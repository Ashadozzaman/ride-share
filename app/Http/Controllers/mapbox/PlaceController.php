<?php

namespace App\Http\Controllers\mapbox;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PlaceController extends Controller
{
    public function fetchPlaces(Request $request)
    {
        $query = $request->get('query');
        $url = 'https://api.mapbox.com/search/geocode/v6/forward';
        $response = Http::get($url, [
            'q' => !is_null($query) ? $query : '',
            'access_token' => env('MAPBOX_ACCESS_TOKEN'),
            'limit' => 10
        ]);
        // dd(env('MAPBOX_ACCESS_TOKEN'));

        if ($response->successful()) {
            return response($response->json());
        } else {
            return response([
                'message' => 'Something went wrong',
                'status' => $response->status()
            ]);
        }
    }
}
