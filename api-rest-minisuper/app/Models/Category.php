<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    
    protected $table = 'category';
    
    /*One to Many relation */
    public function products() {
        return $this->hasMany('App\Models\Products');
    }
}