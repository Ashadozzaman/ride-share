<?php

namespace App\Http\Controllers\Vehicle;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class VehicleController extends Controller
{
    public function getVehicles()
    {
        $vehicles = Vehicle::all();
        return response([
            'vehicles' => $vehicles
        ], 200);
    }

    public function addImages(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'id' => 'required|exists:vehicles,id',
            'images' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        if ($request->hasFile('images')) {
            $image = $request->file('images');
            $name = time() . '.' . $image->getClientOriginalExtension();

            // Store in public disk (accessible via `storage/images/`)
            $path = $image->storeAs('images', $name, 'public');

            $data['image'] = 'storage/' . $path;
        }

        $vehicle = Vehicle::find($data['id']);
        if (!$vehicle) {
            return response(['error' => 'Vehicle not found'], 404);
        }

        $vehicle->image = $data['image']; // Use 'image', not 'images'
        $vehicle->save();

        return response([
            'message' => 'Image added successfully',
            'vehicle' => $vehicle
        ], 200);
    }
    public function store(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'price' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response(
                ['errors' => $validator->errors()->all()],
                422
            );
        }

        $vehicle = Vehicle::create([
            'name' => $data['name'],
            'model' => $data['model'],
            'price' => $data['price'],
        ]);

        return response([
            'message' => 'Vehicle created successfully',
            'vehicle' => $vehicle
        ], 200);
    }
    public function update(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'id' => ['required'],
            'name' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'price' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return response(
                ['errors' => $validator->errors()->all()],
                422
            );
        }

        $vehicle = Vehicle::find($data['id']);
        $vehicle->update($data);

        return response([
            'message' => 'Vehicle updated successfully',
            'vehicle' => $vehicle
        ], 200);
    }
    public function destroy(Request $request)
    {

        $data = $request->all();
        $validator = Validator::make($data, [
            'id' => ['required'],
        ]);

        if ($validator->fails()) {
            return response(
                ['errors' => $validator->errors()->all()],
                422
            );
        }

        Vehicle::where('id', $data['id'])->delete();

        return response([
            'message' => 'Vehicle deleted successfully',
        ], 200);
    }
}
