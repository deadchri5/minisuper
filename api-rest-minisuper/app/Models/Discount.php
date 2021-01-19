<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;
    
    protected $table = 'discount_codes';
    
    protected $fillable = [
        'Code',
        'Value'
    ];
}
