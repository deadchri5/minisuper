<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

//Import database models
use App\Models\Products;
use App\Models\Category;

class Pruebas extends Controller
{
    public function testOrm($num) {
        $index = 1;
        $products = Products::all();
        foreach ($products as $product) {
            echo "<h1>producto encontrado: {$index} </h1>";
            echo "<p>Nombre: {$product->Name} </p>";
            echo "<p>Precio: $ {$product->Price}.00 MXN </p>";
            echo "<p>Descripcion: {$product->Description} </p>";
            echo "<p>Categoria: {$product->category->Name} </p>";
            echo '<br>';
            $index++;
        }
        die();
        
        /*
        $products = DB::table('product')->where('FK_Category', $num)->get();
        foreach($products as $product){
            echo $product->Name;
            echo '<br>';
        }
        die();
         */
    }
}
