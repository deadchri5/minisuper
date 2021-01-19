<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\Discount;

class ShoppingCarController extends Controller
{
    
    public function getProdcutStockFromTheDataBase ($id) {
        
        if (isset($id) && is_numeric($id)) {
            
            try {
                $item = Products::select('Stock as inStock')
                        ->where('ID', $id)->first();
            }
            catch (\Exception $e) {
                $response = array (
                'message'   =>  'Error al consultar el id en la base de datos.',
                'code'  =>  400
                );
            }
            
            if (is_null($item)) {
                $response = array (
                'message' => 'No se encontro ningun producto con el ID indicado.',
                'code'  =>  400
                ); 
            }
            else {
               $response = array (
                'item' =>  $item,
                'code'  =>  200
                ); 
            }
            
        }
        
        else {
            $response = array (
                'message'   =>  'El id no es correcto, tiene que ser numerico.',
                'code'  =>  400
            );
        }
        
        return response()->json($response, $response['code']);
    }
    
    public function discountApply ($code) {
        
        if (isset($code) && !is_null($code)) {
            $discount = Discount::where('Code', $code)->first();
            if (!is_null($discount)) {
               $response = array (
                'message'   =>  'Codigo valido.',
                'code'  =>  200,
                'response' =>   $discount
                ); 
            }
        else {
            $response = array (
                'message'   =>  'Codigo no valido o caducado.',
                'code'  =>  200
            );
        }
    }
    return response()->json($response, $response['code']);
    }
}
