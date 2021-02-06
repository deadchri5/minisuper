<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    
    protected $table = 'user';


    protected $fillable = [
        'ID',
        'Name',
        'LastName',
        'Address',
        'Age',
        'Email',
        'Phone',
        'FK_TypeUser',
        'Password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    //Many to one relation
    public function typeUser() {
        return $this->belongsTo('App\Models\TypeUser', 'FK_TypeUser');
    }
    
    //Many to many relation
    public function cart() {
        return $this->belongsToMany('App\Models\Cart');
    }
}
