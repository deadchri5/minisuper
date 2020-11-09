<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeUser extends Model
{
    use HasFactory;
    
    private $table = 'typeuser';
    
    //One to Many relation
    public function user() {
        return $this->hasMany('App\Models\User');
    }
}
