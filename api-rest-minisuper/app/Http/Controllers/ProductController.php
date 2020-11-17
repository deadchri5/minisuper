<?php

/**
 * Author: OCHOA HERNANDEZ CHRISTIAN YESAEL
 * Web page: champrogrammers.github.io/web 
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Products;

class ProductController extends Controller {

    public function showProducts($category = '') {

        if (isset($category) && !is_null($category) && is_numeric($category)) {

            $productsDisplayed = Products::where('FK_Category', $category)->get();

            if (sizeof($productsDisplayed) != 0) {
                $response = array(
                    'code' => 200,
                    'products' => $productsDisplayed
                );
            } else {
                $response = array(
                    'code' => 400,
                    'message' => 'The category dont exists in the database or '
                    . 'there are not products already'
                );
            }
        } else {

            $productsDisplayed = Products::all();

            $response = array(
                'code' => '200',
                'products' => $productsDisplayed
            );
        }

        return response()->json($response, $response['code']);
    }

    public function search(Request $request) {
        
        $json = $request->input('json', null);
        $params = json_decode($json);

        if (!is_null($params)) {
            
            $findedProducts = 
                   Products::where('Name', 'LIKE', '%' . $params->search . '%')
                   ->orWhere('Description', 'LIKE', '%' . $params->search . '%')
                   ->get();

            if (sizeof($findedProducts) > 0) {
                $response = array(
                    'code'      =>  200,
                    'products'  =>  $findedProducts
                );
            } else {
                $response = array(
                    'code'      =>  400,
                    'message'   =>  'We cant find the product you are looking for'
                );
            }
        } 
        else {
            $response = array (
                'message'   =>  'The search parameter must be dont empty',
                'code'      =>  400
            );
        }

        return response()->json($response, $response['code']);
    }
    
    public function addProduct(Request $request) {
        
        $json = $request->input('json', null);
        $params = json_decode($json, true);
        
        if (!empty($params)) {
            
            $validator = Validator::make($params, [
                'id'    => 'required|unique:product'
            ]);
            
            if(!$validator->fails()) {
                $product = new Products();
                $product -> ID = $params['id'];
                $product -> Name = $params['name'];
                $product -> Price = $params['price'];
                $product -> Description = $params['description'];
                $product -> Stock = $params['stock'];
                $product -> FK_Category = $params['fk_category'];
                
            if (isset($params['image'])) {
                $product -> Image = $params['image'];
            }
            
            $product->save();
            
            $response = array(
                'message'   =>  'The product has added succesfully',
                'code'      =>  200,
                'Product'   => $product
            );
            }
            else {
                $response = array (
                    'message' => 'Id field should bee unique',
                    'code'  => 400
                );
            }   
        }
        else {
            $response = array (
                'message'   =>  'You should introduce params to fill a product',
                'status'    =>  'error',
                'code'      =>  400
            );
        }
        
        return response()->json($response, $response['code']);
    }
    
    public function deleteProduct(Request $request) {
        $json = $request->input('json', null);
        $params = json_decode($json);
        
        if (!empty($params) && isset($params->id)) {
            $productID = $params->id;
            Products::where('ID', $productID)->delete();
            
            $response = array (
                'message'   =>  'The product with id '. $productID.' is deleted',
                'code'      =>  200
            );
            
        }
        else {
            $response = array (
                'message'   =>  'Please fill the product id field',
                'code'      =>  400
            );
        }
        
        return response()->json($response, $response['code']);
    }

}
