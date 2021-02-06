<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\Discount;
use App\Models\Cart;

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

    public function deleteProduct(Request $request) {
        $token = $request->header('Authorization');
        $json = $request->input('json', null);
        $params = json_decode($json, false);

        if (isset($params->productID) && is_numeric($params->productID)){
            $jwtAuth = new \JwtAuth();
            $userID = $jwtAuth->checkToken($token, true)->id;

            try{
                Cart::where('FK_product', $params->productID)
                            ->where('FK_user', $userID)
                            ->delete();
            }
            catch(\Illuminate\Database\QueryException $e){
                $response = array (
                    'message' => 'ocurrio un error durante la ejecución de la consulta',
                    'error' =>  $e,
                    'code'  =>  500
                );
            }

            $response = array (
                'message' => 'Elemento eliminado con exito del carrito',
                'code'  =>  200
            );

        }
        else{
            $response = array (
                'message' => 'No se mandaron los parametros necesarios.',
                'code'  =>  400
            );
        }

        return response()->json($response, $response['code']);

    }

    public function cleanCart(Request $request) {
        $token = $request->header('Authorization');
        $jwtAuth = new \JwtAuth();
        $userID = $jwtAuth->checkToken($token, true)->id;
        try{
            Cart::where('FK_user', $userID)->delete();
        }
        catch(\Illuminate\Database\QueryException $e){
            $response = array (
                'message' => 'ocurrio un error durante la ejecución de la consulta',
                'error' =>  $e,
                'code'  =>  500
            );
        }
        $response = array (
            'message' => 'Se ha vaciado el carrito de compras.',
            'code'  =>  200
        );
        return response()->json($response, $response['code']);
    }
}
