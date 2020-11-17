<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
    
    //Ignore update_at and created_at fields in db
    public $timestamps = false;
    
    protected $table = 'product';
    
    /*Many to One relations*/
    public function category() {
        return $this->belongsTo('App\Models\Category', 'FK_Category');
    }
}
